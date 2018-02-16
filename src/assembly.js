import {
    isPlaneObject,
    isString,
    isPrimitive,
    isFunction,
    isElement,
    isVNode,
    removeChildren,
    filter,
    insertBefore,
    insertAfter
} from './helpers';

import cache from './cache';


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
}

/** 
 Assembly is the mechanics of the tag functions. 
 A Wavefront template is a set of nested functions
 which act similar to recursion. 

 The deepest nested tag of the youngest index is
 the first executed tag function.
**/
export const assembly = (tagName, nodeType) => {
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
                    value = childNode.slice(1)
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
    }
}

var removeChilds = function(node) {
    var last;
    while (last = node.lastChild) node.removeChild(last);
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
    }


    if (Array.isArray(node)) {

        createAndAppendNode(renderFragment, dummyVDOM);
        const dummy = renderFragment.firstElementChild;
        const innerNodes = Array.from(dummy.childNodes);
        const innerNodesLength = innerNodes.length;
        const outerNodeList = [];

        for (let i = 0; i < innerNodesLength; i++) {
            renderFragment.appendChild(innerNodes[i])
        }

        renderFragment.removeChild(dummy);

        requestAnimationFrame(() => {
            const fragmentClone = document.importNode(renderFragment, true);
            cache.rootElement.appendChild(fragmentClone)
        });
    } else {

        // Wrapped element
        createAndAppendNode(renderFragment, node);
        requestAnimationFrame(() => {
            if (!isPartial) {
                const fragmentClone = document.importNode(renderFragment, true);
                cache.rootElement.appendChild(fragmentClone)
            }
            return;
        });
    }

    return renderFragment;
}

const elementCache = {}

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
            createAndAppendNode(element, childNode)
        });
    }
}
const getReferenceNode = (parent, selector) => {

}


const ibIa1 = (nodeType, queriedParent, newDOMNode, childNode) => {
    if (nodeType === 't') {
        insert(queriedParent, newDOMNode, childNode);
    } else {
        insert(
            queriedParent.parentElement,
            newDOMNode,
            queriedParent
        );
    }
}

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
        insert(
            queriedParent,
            newDOMNode,
            textNode
        );
    } else {
        insert(
            queriedParent,
            newDOMNode,
            queriedParent.children[index + offset]
        );
    }
}

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
}


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
}



const replaceNode = (type, queriedParent, query, newDOMNode) => {
    const child = queriedParent.querySelector(query);
    const childRelative = type ? child[type] : child;
    childRelative.replaceWith(newDOMNode);
}


const rm = (nodeType, type, queriedParent, selector, removeType, offset) => {

    if (nodeType === 't') {

        if (type === 'single') {
            // const children = queriedParent.querySelectorAll(selector);
            queriedParent.style.backgroundColor = 'red'
            const childNodes = queriedParent.childNodes
            const childNodesLength = childNodes.length;

            let textNode;
            for (let i = 0; i < childNodesLength; i++) {
                const childNode = childNodes[i];
                if (childNode.nodeType === 3) {
                    // textNode = offset === 0 ? childNode : childNodes[i + offset];
                    console.log('childNodes', childNode)
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
                const childNodes = matchingSelectors[j].childNodes
                matchingSelectors[j].style.backgroundColor = 'red'
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
                    child.style.backgroundColor = 'pink'
                    child.remove(child);
                }
                return;
            case 'before':
                console.log('BEFORE')
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
}


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
    const CMDcode = parseInt([
        1,
        hasIndex + 0,
        hasOffset + 0,
        hasQuery + 0
    ].join(''), 2);

    const ibIa = CMDcode => {
        switch (CMDcode) {
            case 0: // ib
            case 8: // ib e
                ibIa1(
                    nodeType,
                    queriedParent,
                    newDOMNode,
                    childNode
                );
                return;
            case 10: // ib e +1
            case 12: // ib e i0
            case 14: // ib e i0 +1
                ibIa2(
                    nodeType,
                    childNodesLength,
                    childNode,
                    offset,
                    queriedParent,
                    newDOMNode
                );
                return;
        }
    }

    const r = (CMDcode) => {
        switch (CMDcode) {
            case 8: // r e
                r1(
                    type,
                    selector,
                    nodeType,
                    newDOMNode,
                    CMDHasMany,
                    queriedParent
                );
                return;
            case 12:
            case 14:
                r2(
                    nodeType,
                    queriedParent,
                    offset,
                    newDOMNode,
                    refNode,
                    childNode
                );
                return;
            case 9:
                replaceNode(null, queriedParent, query, newDOMNode);
                return;
        }
    }


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
                replaceNode(
                    'previousSibling',
                    queriedParent,
                    query,
                    newDOMNode
                );
            }
            break;
        case 'ra':
            if (CMDcode === 9) {
                replaceNode(
                    'nextSibling',
                    queriedParent,
                    query,
                    newDOMNode
                );
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
}




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
}


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


}

const partialRender = (partialNodes) => partialRenderInner(partialNodes, 'single');
partialRender.all = (partialNodes) => partialRenderInner(partialNodes, 'all');

export const initialize = (rootSelector, vNode) => {
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
}