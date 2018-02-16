const isPlaneObject = value => ({}).toString.call(value) === '[object Object]';
const isString = value => typeof value === 'string';
const isPrimitive = value => isString(value) || typeof value === 'number';

const isElement = value => value instanceof Element;
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
const insertBefore = (parent, newNode, refNode) => parent.insertBefore(newNode, refNode);

/** 
 * Inserts a Node after a reference node.
 */
const insertAfter = (parent, newElement, refNode) => {
    if (parent.lastChild === refNode) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, refNode.nextSibling);
    }
};

/** 
 * Shared cache accessible between modules. 
 */
const cache = {
  vDOM: null,
  rootElement: null
};

const fragment = document.createDocumentFragment();

var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

/** 
 * @param {string} t - Text 
 * @param {Number} id - Identity (Not an attribute)
 * @param {Number} ix - Index 
 * @param {Object|string} at - Attributes | Primative
 * @param {Array} ch - Children 
 */
const node = (t, at, ch, isSVG) => {
    switch (t) {
        case 'primitive':
            return { t: 'TEXT', val: at };
        case 'comment':
            return { t: 'COM', val: at };
        default:
            return isSVG ? {
                t,
                at,
                chx: ch.length,
                ch,
                svg: true
            } : {
                t,
                at,
                chx: ch.length,
                ch
            };
    }
};

/** 
 Assembly is the mechanics of the tag functions. 
 A Wavefront template is a set of nested functions
 which act similar to recursion. 

 The deepest nested tag of the youngest index is
 the first executed tag function.
**/
const assembly = (tagName, nodeType) => {
    const isSVG = nodeType === true;

    return function inner(...args) {
        const tagNameStr = `${tagName}`;
        let attributes;
        let item;
        let childNodes = [];
        let i;
        const argsLength = args.length;

        for (i = 0; i < argsLength; i++) {
            item = args[i] || {};
            let isItemObject = isPlaneObject(item);
            let isItemVnode = item.hasOwnProperty('t');

            // Check if item is a plane object = attribute.
            if (isItemObject && !isItemVnode) {
                // let isSelector = false; 
                attributes = item;
                continue;
            }

            // Check if item is an array = group of child elements.
            if (Array.isArray(item)) {
                childNodes = [...childNodes, ...item];
                continue;
            }

            // check if item is not an object, array or function = child element.
            if (isItemObject && isItemVnode || isPrimitive(item)) {
                childNodes.push(item);
                continue;
            }

            if (item instanceof Node) {
                //@TODO Convert item to vNode and push;
                childNodes.push({ el: item });
            }
        }

        for (i = 0; i < childNodes.length; ++i) {
            const childNode = childNodes[i];
            if (isPrimitive(childNode)) {
                let type;
                let value;
                if (childNode[0] === '@') {
                    type = 'comment';
                    value = childNode.slice(1);
                } else {
                    type = 'primitive';
                    value = childNode;
                }
                childNodes[i] = node(type, value, null, isSVG);
            }
        }

        // Update child nodes with parentId
        for (i = 0; i < childNodes.length; ++i) {
            childNodes[i].ix = i;
        }

        return node(tagNameStr, attributes, childNodes, isSVG);
    };
};

const render = (initalRootElement, vNode, isPartial) => {
    // Cache root element 
    if (cache.rootElement === null) {
        cache.rootElement = initalRootElement;
    }

    // Creates a new fragment for partials but uses 
    // the fragment cache for the inital render.
    const renderFragment = isPartial === true ? document.createDocumentFragment() : fragment;

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
        "chx": 1,
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
            const fragmentClone = document.importNode(renderFragment, true);
            cache.rootElement.appendChild(fragmentClone);
        });
    } else {

        // Wrapped element
        createAndAppendNode(renderFragment, node);
        requestAnimationFrame(() => {
            if (!isPartial) {
                const fragmentClone = document.importNode(renderFragment, true);
                cache.rootElement.appendChild(fragmentClone);
            }
            return;
        });
    }

    return renderFragment;
};

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
const ibIa1 = (nodeType, queriedParent, newDOMNode, childNode) => {
    if (nodeType === 't') {
        insert(queriedParent, newDOMNode, childNode);
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
                    console.log('childNodes', childNode);
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
                matchingSelectors[j].style.backgroundColor = 'red';
                const childNodesLength = childNodes.length;

                let textNode;
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
                console.log('BEFORE');
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
    const insert = action === 'ia' ? insertAfter : insertBefore;
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
                ibIa1(nodeType, queriedParent, newDOMNode, childNode);
                return;
            case 10: // ib e +1
            case 12: // ib e i0
            case 14:
                // ib e i0 +1
                ibIa2(nodeType, childNodesLength, childNode, offset, queriedParent, newDOMNode);
                return;
        }
    };

    const r = CMDcode => {
        switch (CMDcode) {
            case 8:
                // r e
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
    const cachedNode = type === 'all' ? fragment : fragment.querySelector(selector);
    // When using `|r t` with .all() a string value will be expected.  
    const newDOMNode = typeof newVNode === 'string' ? newVNode : render(undefined, newVNode, true);

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
    // Render the DOM with the updated cachedFragment.
    removeChildren(cache.rootElement);
    const fragmentClone = document.importNode(fragment, true);

    cache.rootElement.appendChild(fragmentClone);
};

const partialRender = partialNodes => partialRenderInner(partialNodes, 'single');
partialRender.all = partialNodes => partialRenderInner(partialNodes, 'all');

const initialize = (rootSelector, vNode) => {
    // allow a string or element as a querySelector value.
    const container = isElement(rootSelector) ? rootSelector : document.querySelector(rootSelector);

    // Shallowly validate vNode.
    const initalVNode = isVNode(vNode) || Array.isArray(vNode) ? vNode : false;

    if (initalVNode === false) {
        throw new Error(`vNode ${cache.vDOM} is not valid`);
    }

    // Cache valid vDOM
    cache.vDOM = initalVNode;
    // Render the inital virual DOM and cache the selectors.
    render(container, false);

    return partialRender;
};

const or = (vNodes, conditions, exclude) => {
    const filteredVNodes = [];
    const filteredIndexes = [];

    // Return the vNode of a given index.
    if (typeof conditions === 'number') {
        return vNodes[conditions];
    }

    // Ensure toggle is an array. 
    const toggle = isString(conditions) ? [conditions] : conditions;

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
        const vNode = vNodes[i];
        const attributes = vNode.at;

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
                if (vNode.t.toUpperCase() === c.toUpperCase()) {
                    filteredIndexes.push(i);
                }
            });
        }

        // Check children.
        if (children.length > 0) {
            children.forEach(x => {
                const childrenLength = vNode.ch.filter(c => c.t !== 'TEXT' && c.t !== 'COM').length;
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
