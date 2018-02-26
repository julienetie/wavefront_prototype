const isPlaneObject = value => ({}).toString.call(value) === '[object Object]';
const isVNode = value => value.hasOwnProperty('t');
const removeChildren = parentNode => {
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
};

/** 
 * Filter by loop 
 * @param {Array} arr 
 * @param {Function} callback 
 **/
const filter = (arr, callback) => {
    const store = [];
    const arrLength = arr.length;
    for (let i = 0; i < arrLength; i++) {
        if (callback(arr[i])) {
            store.push(arr[i]);
        }
    }
    return store;
};

/** 
 * Inserts a Node before a reference node.
 */


/** 
 * Inserts a Node after a reference node.
 */


/** 
 * @param {string} t - Tag name 
 * @param {Object|string} at - Attributes | Primative
 * @param {Array} ch - Children 
 * @param {Boolean} isSVG 
 */
const vNode = (t, at, ch, isSVG) => {
    switch (t) {
        case 'primitive':
            return { t: 'TEXT', val: at };
        case 'comment':
            return { t: 'COM', val: at };
        default:
            return isSVG ? {
                t,
                at,
                ch,
                svg: true
            } : {
                t,
                at,
                ch
            };
    }
};

const getChildNodesAsArray = (childNodes, whitespaceRules) => {
    const ignoreTrim = !(whitespaceRules === 'ignore-trim');
    const childNodesArr = [];
    const childNodesLength = childNodes.length;

    for (let i = 0; i < childNodesLength; i++) {
        if (childNodes[i].nodeType === 3 & ignoreTrim) {
            /*
             *  "\t" TAB \u0009
             *  "\n" LF  \u000A
             *  "\r" CR  \u000D
             *  " "  SPC \u0020
             */
            if (childNodes[i].nodeValue === childNodes[i].nodeValue.replace(/^\s+|\s+$/g, '')) {
                childNodesArr.push(abstract(childNodes[i], whitespaceRules));
            }
        } else {
            childNodesArr.push(abstract(childNodes[i], whitespaceRules));
        }
    }

    return childNodesArr;
};

const getDefinedAttributes = element => {
    const attributes = element.attributes;
    const definedAttributes = {};
    const attributesLength = attributes === null || attributes === undefined ? 0 : attributes.length;

    for (let i = 0; i < attributesLength; i++) {
        const attribute = attributes[i];
        const attributeName = attributes[i].name;
        const style = {};
        const isStyle = attributeName === 'style';

        if (isStyle) {
            const cssText = element.style.cssText; // The interpreted value 
            const cssList = cssText.length > 0 ? cssText.split(';') : ['']; //last item is ignored.
            const cssListLength = cssList.length;

            for (let j = 0; j < cssListLength - 1; j++) {
                const part = cssList[j].split(': ');
                style[part[0].trim()] = part[1];
            }
        }
        definedAttributes[attribute.name] = isStyle ? style : attribute.value;
    }

    return definedAttributes;
};

const abstract = (interfaceSelector, whitespaceRules = 'trim') => {
    const element = typeof interfaceSelector.nodeType === 'number' ? interfaceSelector : document.querySelector(interfaceSelector);
    const definedAttributes = getDefinedAttributes(element);
    const isSVG = element instanceof SVGElement;
    const childNodes = getChildNodesAsArray(element.childNodes, whitespaceRules);

    switch (element.nodeType) {
        case 1:
            return vNode(element.tagName, definedAttributes, childNodes, isSVG);
        case 3:
            return vNode('primitive', element.nodeValue);
        case 8:
            return vNode('comment', element.nodeValue);
    }
};

var assembly = ((tagName, nodeType) => {
    const isSVG = nodeType === true;
    return (...args) => {
        const tagNameStr = `${tagName}`;
        let attributes;
        let childNodes = [];
        const argsLength = args.length;
        let i;

        for (i = 0; i < argsLength; i++) {
            const item = args[i] || {};
            let isItemObject = isPlaneObject(item);
            let isItemVnode = item.hasOwnProperty('t');

            // Check if item is a plane object = attribute.
            if (isItemObject && !isItemVnode) {
                attributes = item;
                continue;
            }

            // Check if item is an array = group of child elements.
            if (Array.isArray(item)) {
                childNodes = [...childNodes, ...item];
                continue;
            }

            // check if item is not an object, array or function = child element.
            if (isItemObject && isItemVnode || typeof item === 'string' || typeof item === 'number') {
                childNodes.push(item);
                continue;
            }

            if (item instanceof Node) {
                //@TODO Convert item to vNode and push;
                childNodes.push({ el: item });
            }
        }

        const childNodesLength = childNodes.length;

        for (i = 0; i < childNodesLength; ++i) {
            const childNode = childNodes[i];
            if (typeof childNode === 'string' || typeof childNode === 'number') {
                const isComment = childNode[0] === '@';
                const type = isComment ? 'comment' : 'primitive';
                const value = isComment ? childNode.slice(1) : childNode;
                childNodes[i] = vNode(type, value, null, isSVG);
            }
        }

        return vNode(tagNameStr, attributes, childNodes, isSVG);
    };
});

/** 
 * Shared cache accessible between modules. 
 */
const cache = {
	vDOM: null,
	rootElement: null,
	fragment: document.createDocumentFragment()
};

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

const createAndAppendNode = (frag, node) => {
    const isSVG = node.svg === true;

    // TEXT_NODE        3
    if (node.t === 'TEXT') {
        const textNode = document.createTextNode(node.val);
        frag.appendChild(textNode);
        return;
    }
    // // COMMENT_NODE     8
    if (node.t === 'COM') {
        const commentNode = document.createComment(node.val);
        frag.appendChild(commentNode);
        return;
    }
    const notAnElement = !node.hasOwnProperty('el');

    let element;

    if (notAnElement) {
        // ELEMENT_NODE     1
        element = isSVG ? document.createElementNS(SVG_NAMESPACE, node.t) : document.createElement(node.t);

        // Add attributes
        if (node.at) {
            const attributes = node.at;
            const attributeKeys = Object.keys(attributes);
            const attributesLength = attributeKeys.length;

            for (let i = 0; i < attributesLength; i++) {
                const attributeKey = attributeKeys[i];

                // Standard dataset syntax.
                if (attributeKey.indexOf('data-') === 0) {
                    const dataKey = attributeKey.replace('data-', '');
                    element.dataset[dataKey] = attributes[attributeKey];
                    continue;
                }
                // Shorthand dataset syntax.
                if (attributeKey.indexOf('d-') === 0) {
                    const dataKey = attributeKey.replace('d-', '');
                    element.dataset[dataKey] = attributes[attributeKey];
                    continue;
                }
                // Props: _
                if (attributeKey[0] === '_') {
                    const cleanKey = attributeKey.replace('_', '');
                    element[cleanKey] = attributes[attributeKey];
                    continue;
                }

                const attributeValue = attributes[attributeKey];

                switch (attributeKey) {
                    case 'e':
                    case 'event':
                        element.addEventListener(...attributeValue);
                        break;
                    case '$':
                    case 'style':
                        Object.assign(element.style, attributeValue);
                        break;
                    case 'c':
                    case 'class':
                        element.className = attributes.class;
                        break;
                    default:
                        element.setAttribute(attributeKey, attributeValue);
                        break;
                }
            }
        }
    } else {
        element = node.el;
    }
    // Add children
    frag.appendChild(element);

    if (notAnElement && Array.isArray(node.ch)) {
        node.ch.forEach(childNode => {
            createAndAppendNode(element, childNode);
        });
    }
};

const updateDOM = (renderFragment, replace) => {
    const fragmentClone = document.importNode(renderFragment, true);
    if (replace) {
        const parent = cache.rootElement.parentElement;
        const childNodes = parent.childNodes;
        const childNodesLength = childNodes.length;

        for (let i = 0; i < childNodesLength; i++) {
            if (childNodes[i] === cache.rootElement) {
                cache.rootElement.replaceWith(fragmentClone);
                cache.rootElement = childNodes[i];
                break;
            }
        }
    } else {
        console.log('Append child fragment clone ');
        cache.rootElement.appendChild(fragmentClone);
    }
};

var render = ((initalRootElement, vNode, isPartial, replace) => {
    // Cache root element 
    if (cache.rootElement === null) {
        cache.rootElement = initalRootElement;
    }

    // Creates a new fragment for partials but uses 
    // the fragment cache for the inital render.
    const renderFragment = isPartial === true ? document.createDocumentFragment() : cache.fragment;
    const node = isPartial === true ? vNode : cache.vDOM;

    /** 
     * Dummy wrapper to treat a non-wrap node as wrapped.
     */
    const dummyVDOM = {
        "t": "div",
        "id": 2,
        "at": {
            "id": "dummy"
        },
        "ch": node
    };

    if (Array.isArray(node)) {
        createAndAppendNode(renderFragment, dummyVDOM);
        const dummy = renderFragment.firstElementChild;
        const innerNodes = Array.from(dummy.childNodes);
        const innerNodesLength = innerNodes.length;
        const outerNodeList = [];

        for (let i = 0; i < innerNodesLength; i++) {
            renderFragment.appendChild(innerNodes[i]);
        }

        renderFragment.removeChild(dummy);

        requestAnimationFrame(() => {
            updateDOM(renderFragment, replace);
        });
    } else {

        // Wrapped element
        createAndAppendNode(renderFragment, node);
        requestAnimationFrame(() => {
            if (!isPartial) {
                updateDOM(renderFragment, replace);
            }
            return;
        });
    }

    return renderFragment;
});

// @todo Insert need to be arguments

/** 
 * 
 */


const ibIa1 = (nodeType, queriedParent, newDOMNode, childNode) => {
    if (nodeType === 't') {
        // insert(queriedParent, newDOMNode, childNode);
        insert(queriedParent.parentElement, newDOMNode, queriedParent);
    } else {
        insert(queriedParent.parentElement, newDOMNode, queriedParent);
    }
};

const ibIa2 = (nodeType, childNodesLength, childNode, offset, queriedParent, newDOMNode) => {
    if (nodeType === 't') {
        let textNode;
        for (let i = 0; i < childNodesLength; i++) {
            const childNode = childNodes[i];
            if (childNode.nodeType === 3) {
                textNode = offset === 0 ? childNode : childNodes[i + offset];
                break;
            }
        }
        insert(queriedParent, newDOMNode, textNode);
    } else {
        insert(queriedParent, newDOMNode, queriedParent.children[index + offset]);
    }
};

const r1 = (type, selector, nodeType, newDOMNode, CMDHasMany, queriedParent) => {
    if (type === 'all') {
        const children = queriedParent.querySelectorAll(selector);
        const childrenLength = children.length;
        const clones = [];

        if (nodeType !== 't') {
            for (let i = 0; i < childrenLength; i++) {
                clones.push(newDOMNode.cloneNode(true));
            }
        }

        for (let i = 0; i < childrenLength; i++) {
            if (nodeType === 't') {
                children[i].innerHTML = newDOMNode;
            } else {
                children[i].replaceWith(clones[i]);
            }
        }
    } else {
        if (!CMDHasMany) {
            queriedParent.parentElement.replaceChild(newDOMNode, queriedParent);
        }
    }
};

const r2 = (nodeType, queriedParent, offset, newDOMNode, refNode, childNode) => {
    switch (nodeType) {
        case 'e':
            let refNode = queriedParent.children[index + offset];
            queriedParent.replaceChild(newDOMNode, refNode);
            return;
        case 'n':
            refNode = queriedParent.childNodes[index + offset];
            queriedParent.replaceChild(newDOMNode, refNode);
            return;
        case 't':
            let textNode;
            for (let i = 0; i < childNodesLength; i++) {
                const childNode = childNodes[i];
                if (childNode.nodeType === 3) {
                    textNode = offset === 0 ? childNode : childNodes[i + offset];
                    break;
                }
            }
            queriedParent.replaceChild(newDOMNode, textNode);
            return;
    }
};

const replaceNode = (type, queriedParent, query, newDOMNode) => {
    const child = queriedParent.querySelector(query);
    const childRelative = type ? child[type] : child;
    childRelative.replaceWith(newDOMNode);
};

const rm = (nodeType, type, queriedParent, selector, removeType, offset) => {

    if (nodeType === 't') {

        if (type === 'single') {
            // const children = queriedParent.querySelectorAll(selector);
            queriedParent.style.backgroundColor = 'red';
            const childNodes = queriedParent.childNodes;
            const childNodesLength = childNodes.length;

            let textNode;
            for (let i = 0; i < childNodesLength; i++) {
                const childNode = childNodes[i];
                if (childNode.nodeType === 3) {
                    // textNode = offset === 0 ? childNode : childNodes[i + offset];
                    childNode.remove(childNodes[i + offset]);
                    return;
                }
            }
            return;
        }

        if (type === 'all') {
            const matchingSelectors = queriedParent.querySelectorAll(selector);
            const matchingSelectorsLength = matchingSelectors.length;
            for (let j = 0; j < matchingSelectorsLength; j++) {
                const childNodes = matchingSelectors[j].childNodes;
                const childNodesLength = childNodes.length;

                for (let i = 0; i < childNodesLength; i++) {
                    const childNode = childNodes[i];
                    if (childNode.nodeType === 3) {
                        matchingSelectors[j].remove(childNodes[i + offset]);
                    }
                }
            }
            return;
        }
    }

    if (type === 'all') {
        const children = queriedParent.querySelectorAll(selector);
        const childrenLength = children.length;

        switch (removeType) {
            case 'selected':
                for (let i = 0; i < childrenLength; i++) {
                    const child = children[i];
                    child.style.backgroundColor = 'pink';
                    child.remove(child);
                }
                return;
            case 'before':
                for (let i = 0; i < childrenLength; i++) {
                    const child = children[i];
                    if (i > 0) {
                        child.remove(child.previousSibling);
                    }
                }
                return;
            case 'after':
                for (let i = 0; i < childrenLength; i++) {
                    const child = children[i];
                    if (i < childrenLength - 1) {
                        const nextSibling = child.nextSibling;
                        nextSibling.remove(nextSibling);
                    }
                }
                return;
        }
    } else {
        switch (removeType) {
            case 'selected':
                queriedParent.parentElement.removeChild(queriedParent);
                return;
            case 'before':
                const previousSibling = queriedParent.previousSibling;
                if (!!previousSibling) {
                    queriedParent.parentElement.removeChild(previousSibling);
                }
                return;
            case 'after':
                const nextSibling = queriedParent.nextSibling;
                if (!!nextSibling) {
                    queriedParent.parentElement.removeChild(nextSibling);
                }
                return;
        }
    }
};

const updateCachedFragmentByCommand = (selector, CMD, queriedParent, newDOMNode, type) => {
    const CMDList = CMD.split(' ');
    const CMDListLength = CMDList.length;
    const CMDHasMany = CMDListLength > 1;
    const lastCommand = CMDList[CMDListLength - 1];
    const thirdCommand = CMDList[2];
    const secondCommand = CMDList[1];
    const action = CMDList[0];

    const childNodes = queriedParent.childNodes;
    const childNodesLength = childNodes.length;
    const childLengthAsIndex = childNodesLength - 1;

    // offset. 
    const hasOffset = CMDHasMany ? lastCommand[0] === '+' : false;
    let initialOffset = hasOffset ? parseInt(lastCommand.slice(1), 10) : 0;

    // index.
    const hasIndex = !!thirdCommand ? thirdCommand[0] === 'i' : false;
    let initalIndex = hasIndex ? parseInt(thirdCommand.slice(1), 10) : 0;

    // Limit the index to the child nodes length.
    const index = initalIndex + offset > childLengthAsIndex ? childLengthAsIndex : initalIndex;
    const offset = index + initialOffset > childLengthAsIndex ? 0 : initialOffset;

    // nodeType.
    const nodeType = !!secondCommand ? secondCommand[0] : 'e';

    // query.
    const hasQuery = !!secondCommand ? secondCommand.indexOf('=') >= 0 : false;
    const query = hasQuery ? secondCommand.split('=')[1] : null;

    /** 
     * NodeType|Index|Offset|Query
     *  CMDcode is a binary representation of 
     * the presetnt commands. 
     * Action is present by default.
     */
    const CMDcode = parseInt([1, hasIndex + 0, hasOffset + 0, hasQuery + 0].join(''), 2);

    const ibIa = CMDcode => {
        switch (CMDcode) {
            case 0: // ib
            case 8:
                // ib e
                ibIa1(nodeType, queriedParent, newDOMNode);
                return;
            case 10: // ib e +1
            case 12: // ib e i0
            case 14:
                // ib e i0 +1
                ibIa2(nodeType, childNodesLength, undefined, offset, queriedParent, newDOMNode);
                return;
        }
    };

    const r = CMDcode => {
        switch (CMDcode) {
            case 8:
                // r e
                console.log('newDOMNode', newDOMNode);
                r1(type, selector, nodeType, newDOMNode, CMDHasMany, queriedParent);
                return;
            case 12:
            case 14:
                r2(nodeType, queriedParent, offset, newDOMNode, refNode, childNode);
                return;
            case 9:
                replaceNode(null, queriedParent, query, newDOMNode);
                return;
        }
    };

    switch (action) {
        /**
         * Insert Before Insert After
         * Insert before|after without an index will insert the new node
         * before the parent.
         */
        case 'ib':
        case 'ia':
            ibIa(CMDcode);
            return;
        /** 
            Replace Node
        **/
        case 'r':
            r(CMDcode);
            break;
        case 'rb':
            if (CMDcode === 9) {
                replaceNode('previousSibling', queriedParent, query, newDOMNode);
            }
            break;
        case 'ra':
            if (CMDcode === 9) {
                replaceNode('nextSibling', queriedParent, query, newDOMNode);
            }
            return;
        case 'rm':

            rm(nodeType, type, queriedParent, selector, 'selected', offset);
            return;
        case 'rmb':
            rm(nodeType, type, queriedParent, selector, 'before', offset);
            return;
        case 'rma':
            rm(nodeType, type, queriedParent, selector, 'after', offset);
            return;
    }
};

/** 
 * Updates the cached fragment by creating the new node 
 * and then replacing the childNodes. Updating by command
 * will only modify portions of the cached DOM tree.
 * @param {string} query - The selector and Wavefront query.  
 * @param {Object|string} newVNode - The new node or text
 * @param {Boolean} type - Truthy for .all()
 */
const updateCachedFragment = (query, newVNode, type) => {
    let parts;
    const hasCommand = (parts = query.split('|')).length === 2;
    const selector = parts[0];
    const command = parts[1];

    // The .all method uses the fragment for querySelectorAll and the queried node for querySelector
    const cachedNode = type === 'all' ? cache.fragment : cache.fragment.querySelector(selector);
    // When using `|r t` with .all() a string value will be expected.  
    const newDOMNode = typeof newVNode === 'string' ? newVNode : render(undefined, newVNode, true, false);

    if (hasCommand) {
        updateCachedFragmentByCommand(selector, command, cachedNode, newDOMNode, type);
    } else {
        removeChildren(cachedNode);
        // Append the new node to the cached fragment.
        cachedNode.appendChild(newDOMNode);
    }
};

const partialRenderInner = (partialNodes, type) => {

    const partialNodesKeys = Object.keys(partialNodes);
    const partialNodesLength = partialNodesKeys.length;

    for (let i = 0; i < partialNodesLength; i++) {
        const partialNodeKey = partialNodesKeys[i];
        const newVNode = partialNodes[partialNodeKey];
        updateCachedFragment(partialNodeKey, newVNode, type);
    }
    // // Render the DOM with the updated cachedFragment.

    removeChildren(cache.rootElement);
    const fragmentClone = document.importNode(cache.fragment, true);
    console.log(cache.fragment);
    cache.rootElement.appendChild(fragmentClone);
};

const renderPartial = partialNodes => partialRenderInner(partialNodes, 'single');
renderPartial.all = partialNodes => partialRenderInner(partialNodes, 'all');

var initialize = ((rootSelector, vNode$$1, replace) => {
    // allow a string or element as a querySelector value.
    const container = rootSelector instanceof Element ? rootSelector : document.querySelector(rootSelector);

    // Shallowly validate vNode.
    const initalVNode = isVNode(vNode$$1) || Array.isArray(vNode$$1) ? vNode$$1 : false;

    if (initalVNode === false) {
        throw new Error(`vNode ${cache.vDOM} is not valid`);
    }

    // Cache valid vDOM
    cache.vDOM = initalVNode;
    // Empty the container

    if (replace === true) {
        render(container, false, undefined, replace);
    } else {
        removeChildren(container);
        // Render the inital virual DOM and cache the selectors.
        render(container, false, undefined, replace);
    }
    return renderPartial;
});

const or = (vNodes, conditions, exclude) => {
    const filteredVNodes = [];
    const filteredIndexes = [];

    // Return the vNode of a given index.
    if (typeof conditions === 'number') {
        return vNodes[conditions];
    }

    // Ensure toggle is an array. 
    const toggle = typeof conditions === 'string' ? [conditions] : conditions;

    // Non-operational.
    if (!Array.isArray(toggle) || toggle.length === 0) {
        return vNodes;
    }

    // Define conditions required.
    const classes = filter(toggle, e => e.indexOf('.') > -1);
    const classesLength = classes.length;
    const ids = filter(toggle, e => e.indexOf('#') === 0);
    const tags = filter(toggle, e => /^[a-z0-9]+$/i.test(e));
    const children = filter(toggle, e => e.indexOf('~') === 0);
    const indexes = filter(toggle, e => typeof e === 'number');
    const vNodesLength = vNodes.length;

    for (let i = 0; i < vNodesLength; i++) {
        const vNode$$1 = vNodes[i];
        const attributes = vNode$$1.at;

        // Check class.
        if (classesLength > 0) {
            for (let j = 0; j < classesLength; j++) {
                if (attributes.class.includes(classes[j].slice(1))) {
                    filteredIndexes.push(i);
                }
            }
        }

        // Check ids.
        if (ids.length > 0) {
            ids.forEach(c => {
                if (attributes.id === c.slice(1)) {
                    filteredIndexes.push(i);
                }
            });
        }

        // Check tags.
        if (tags.length > 0) {
            tags.forEach(c => {
                if (vNode$$1.t.toUpperCase() === c.toUpperCase()) {
                    filteredIndexes.push(i);
                }
            });
        }

        // Check children.
        if (children.length > 0) {
            children.forEach(x => {
                const childrenLength = vNode$$1.ch.filter(c => c.t !== 'TEXT' && c.t !== 'COM').length;
                if (childrenLength == x.slice(1)) {
                    filteredIndexes.push(i);
                }
            });
        }
    }

    // Remove duplicate indexes.
    const indexList = [...new Set(filteredIndexes)];

    if (exclude === true) {
        return filter(vNodes, (item, i) => indexList.indexOf(i) === -1);
    } else {
        indexList.forEach(index => {
            filteredVNodes.push(vNodes[index]);
        });
        return filteredVNodes;
    }
};

/** 
 * or is used when you explicitly want the to inidicate
 * that an item is being looped by n times or via data
 * 
 * @param {Object|Array} vNodes 
 * @param {*} Data 
 */
const loop = (vNodes, data) => {
    const groupVnodes = Array.isArray(vNodes);
    const hasNumber = typeof data === 'number';

    if (hasNumber) {
        const loopedVnodes = [];
        const singleVnode = isPlaneObject(vNodes);

        // Single vnode looped by an integer.
        if (singleVnode) {
            for (let i = 0; i < data; i++) {
                loopedVnodes.push(vNodes);
            }
        }

        // Grouped vnode looped by an integer.
        if (groupVnodes) {
            for (let i = 0; i < data; i++) {
                loopedVnodes.push(...vNodes);
            }
        }
        return loopedVnodes;
    } else {
        if (typeof vNodes === 'function') {
            return vNodes(data);

            if (!Array.isArray(loopedVnodes)) {
                throw new Error('loop() should return an Array of vnodes');
            }
        }
    }
};

const tags$1 = {
    a: assembly('a'),
    abbr: assembly('abbr'),
    abstract,
    address: assembly('address'),
    area: assembly('area'),
    article: assembly('article'),
    aside: assembly('aside'),
    assembly,
    audio: assembly('audio'),
    childNodes: assembly('childNodes'),
    base: assembly('base'),
    bdi: assembly('bdi'),
    bdo: assembly('bdo'),
    blockquote: assembly('blockquote'),
    body: assembly('body'),
    br: assembly('br'),
    button: assembly('button'),
    canvas: assembly('canvas'),
    caption: assembly('caption'),
    cite: assembly('cite'),
    code: assembly('code'),
    col: assembly('col'),
    colgroup: assembly('colgroup'),
    command: assembly('command'),
    dd: assembly('dd'),
    del: assembly('del'),
    dfn: assembly('dfn'),
    div: assembly('div'),
    dl: assembly('dl'),
    doctype: assembly('doctype'),
    dt: assembly('dt'),
    em: assembly('em'),
    embed: assembly('embed'),
    fieldset: assembly('fieldset'),
    figcaption: assembly('figcaption'),
    figure: assembly('figure'),
    footer: assembly('footer'),
    form: assembly('form'),
    h1: assembly('h1'),
    h2: assembly('h2'),
    h3: assembly('h3'),
    h4: assembly('h4'),
    h5: assembly('h5'),
    h6: assembly('h6'),
    header: assembly('header'),
    hgroup: assembly('hgroup'),
    hr: assembly('hr'),
    html: assembly('html'),
    i: assembly('i'),
    iframe: assembly('iframe'),
    img: assembly('img'),
    initialize,
    input: assembly('input'),
    ins: assembly('ins'),
    kbd: assembly('kbd'),
    keygen: assembly('keygen'),
    label: assembly('label'),
    legend: assembly('legend'),
    li: assembly('li'),
    link: assembly('link'),
    loop,
    map: assembly('map'),
    mark: assembly('mark'),
    menu: assembly('menu'),
    meta: assembly('meta'),
    nav: assembly('nav'),
    noscript: assembly('noscript'),
    object: assembly('object'),
    ol: assembly('ol'),
    optgroup: assembly('optgroup'),
    option: assembly('option'),
    or,
    p: assembly('p'),
    param: assembly('param'),
    pre: assembly('pre'),
    progress: assembly('progress'),
    q: assembly('q'),
    rp: assembly('rp'),
    rt: assembly('rt'),
    ruby: assembly('ruby'),
    s: assembly('s'),
    samp: assembly('samp'),
    script: assembly('script'),
    section: assembly('section'),
    select: assembly('select'),
    small: assembly('small'),
    source: assembly('source'),
    span: assembly('span'),
    strong: assembly('strong'),
    style: assembly('style'),
    sub: assembly('sub'),
    sup: assembly('sup'),
    table: assembly('table'),
    tbody: assembly('tbody'),
    td: assembly('td'),
    textarea: assembly('textarea'),
    tfoot: assembly('tfoot'),
    th: assembly('th'),
    thead: assembly('thead'),
    title: assembly('title'),
    tr: assembly('tr'),
    ul: assembly('ul'),
    Var: assembly('var'), // First capital
    video: assembly('video'),

    // SVG Elements.
    svg: assembly('svg', true),
    altGlyph: assembly('altGlyph', true),
    altGlyphDef: assembly('altGlyphDef', true),
    altGlyphItem: assembly('altGlyphItem', true),
    animate: assembly('animate'),
    animateColor: assembly('animateColor', true),
    animateMotion: assembly('animateMotion', true),
    animateTransform: assembly('animateTransform', true),
    animation: assembly('animation', true),
    circle: assembly('circle', true),
    clipPath: assembly('clipPath', true),
    colorProfile: assembly('color-profile', true), // color-profile
    cursor: assembly('cursor', true),
    defs: assembly('defs', true),
    desc: assembly('desc', true),
    discard: assembly('discard', true),
    ellipse: assembly('ellipse', true),
    feBlend: assembly('feBlend', true),
    feColorMatrix: assembly('feComposite', true),
    feComponentTransfer: assembly('feComponentTransfer', true),
    feComposite: assembly('feComposite', true),
    feConvolveMatrix: assembly('feConvolveMatrix', true),
    feDiffuseLighting: assembly('feDiffuseLighting', true),
    feDisplacementMap: assembly('feDistantLight', true),
    feDistantLight: assembly('feDistantLight', true),
    feDropShadow: assembly('feDropShadow', true),
    feFlood: assembly('feFlood', true),
    feFuncA: assembly('feFuncA', true),
    feFuncB: assembly('feFuncB', true),
    feFuncG: assembly('feFuncG', true),
    feFuncR: assembly('feFuncR', true),
    feGaussianBlur: assembly('feGaussianBlur', true),
    feImage: assembly('feImage', true),
    feMerge: assembly('feMerge', true),
    feMergeNode: assembly('feMergeNode', true),
    feMorphology: assembly('feMorphology', true),
    feOffset: assembly('feOffset', true),
    fePointLight: assembly('fePointLight', true),
    feSpecularLighting: assembly('feSpecularLighting', true),
    feSpotLight: assembly('feSpotLight', true),
    feTile: assembly('feTile', true),
    feTurbulence: assembly('feTurbulence', true),
    filter: assembly('filter', true),
    font: assembly('font', true),
    fontFace: assembly('font-face', true), // fontFace
    fontFaceFormat: assembly('font-face-format', true), // fontFaceFormat
    fontFaceName: assembly('font-face-name', true), // fontFaceName
    fontFaceSrc: assembly('font-face-src', true), // fontFaceSrc
    fontFaceUri: assembly('font-face-uri', true), // fontFaceUri
    foreignObject: assembly('foreignObject', true),
    g: assembly('g', true),
    glyph: assembly('glyph', true),
    glyphRef: assembly('glyphRef', true),
    handler: assembly('handler', true),
    hatch: assembly('hatch', true),
    hatchpath: assembly('hatchpath', true),
    hkern: assembly('hkern', true),
    image: assembly('image', true),
    line: assembly('line', true),
    linearGradient: assembly('linearGradient', true),
    listener: assembly('listener'),
    marker: assembly('marker', true),
    mask: assembly('mask', true),
    mesh: assembly('mesh', true),
    meshgradient: assembly('meshgradient', true),
    meshpatch: assembly('meshpatch', true),
    meshrow: assembly('meshrow', true),
    metadata: assembly('metadata', true),
    missingGlyph: assembly('missing-glyph', true), // missing-glyph
    mpath: assembly('mpath', true),
    path: assembly('path', true),
    pattern: assembly('pattern', true),
    polygon: assembly('polygon', true),
    polyline: assembly('polyline', true),
    prefetch: assembly('prefetch', true),
    radialGradient: assembly('radialGradient', true),
    rect: assembly('rect', true),
    set: assembly('set', true),
    solidColor: assembly('solidColor', true),
    solidcolor: assembly('solidcolor', true),
    Stop: assembly('stop', true), // First capital
    Switch: assembly('switch', true), // First capital
    symbol: assembly('symbol', true),
    tbreak: assembly('tbreak', true),
    text: assembly('text', true),
    textArea: assembly('textArea', true),
    textPath: assembly('textPath', true),
    tref: assembly('tref', true),
    tspan: assembly('tspan', true),
    unknown: assembly('unknown', true),
    use: assembly('use', true),
    view: assembly('view', true),
    vkern: assembly('vkern', true)
};

export default tags$1;
//# sourceMappingURL=wavefront.es.js.map
