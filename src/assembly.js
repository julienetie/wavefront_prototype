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


let vDOM;
let rootElement;
const fragment = document.createDocumentFragment();

var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

/** 
 * @param {string} t - Text 
 * @param {Number} id - Identity (Not an attribute)
 * @param {Number} ix - Index 
 * @param {Object|string} at - Attributes | Primative
 * @param {Array} ch - Children 
 */
const node = (t, id, at, ch, isSVG) => {
    switch (t) {
        case 'primitive':
            return { t: 'TEXT', id, val: at };
        case 'comment':
            return { t: 'COM', id, val: at };
        default:
            return isSVG ? {
                t,
                id,
                at,
                chx: ch.length,
                ch,
                svg: true
            } : {
                t,
                id,
                at,
                chx: ch.length,
                ch
            };
    }
}

let count = 0;

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
                console.log('item in assembly', item)
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
                count++;
                childNodes[i] = node(type, count, value, null, isSVG);
            }
        }

        count++;
        // Update child nodes with parentId
        for (i = 0; i < childNodes.length; ++i) {
            childNodes[i].pid = count;
            childNodes[i].ix = i;
        }

        return node(tagNameStr, count, attributes, childNodes, isSVG);
    }
}

var removeChilds = function(node) {
    var last;
    while (last = node.lastChild) node.removeChild(last);
};


const render = (initalRootElement, vNode, isPartial) => {
    console.log('X', vNode)
    // Cache root element 
    if (rootElement === undefined) {
        rootElement = initalRootElement;
    }
    // Creates a new fragment for partials but uses 
    // the fragment cache for the inital render.

    let renderFragment;
    if (isPartial === true) {
        renderFragment = document.createDocumentFragment()
    } else {
        renderFragment = fragment;
    }

    const node = isPartial === true ? vNode : vDOM;

    count = 0; // reset counter used for node ids.



    if (Array.isArray(node)) {
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

        function appendMultipleNodes() {
            var args = [].slice.call(arguments);
            for (var x = 1; x < args.length; x++) {
                args[0].appendChild(args[x])
            }
            return args[0]
        }

        createAndAppendNode(renderFragment, dummyVDOM);

        const dummy = renderFragment.firstElementChild;
        const innerNodes = dummy.childNodes;
        const innerNodesLength = innerNodes.length;
        const outerNodeList = [];

        for (let i = 0; i < innerNodesLength; i++) {
            outerNodeList.push(innerNodes[i]);
        }
        renderFragment.removeChild(dummy);

        appendMultipleNodes(renderFragment, ...outerNodeList)

        requestAnimationFrame(() => {
            rootElement.appendChild(renderFragment)
        });
    } else {
        // Wrapped element
        createAndAppendNode(renderFragment, node);
        requestAnimationFrame(() => {
            if (!isPartial) {
                console.log()
                const fragmentClone = document.importNode(renderFragment, true);
                rootElement.appendChild(fragmentClone)
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
        // console.log('node.val', node.val)
        const commentNode = document.createComment(node.val);
        frag.appendChild(commentNode);
        return;
    }
    // console.log('notAnElement', node)
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

const r1 = (type,selector, nodeType, newDOMNode, CMDHasMany, queriedParent) => {
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

    // console.log('CMDcode', CMDcode)
    // console.log('action', action)
    // console.log('nodeType', nodeType)
    // console.log('index', index)
    // console.log('offset', offset)
    // console.log('query', query)

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
            break;
        case 'rm':
            //
            break;
        case 'rmb':
            //
            break;
        case 'rma':
            //
            break;
        case 'rmA':
            //
            break;
        case 'rmAa':
            //
            break;
        case 'rmAb':
            //
            break;

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
    removeChildren(rootElement);
    const fragmentClone = document.importNode(fragment, true);
    rootElement.appendChild(fragmentClone);
}

const partialRender = (partialNodes) => partialRenderInner(partialNodes, 'single');
partialRender.all = (partialNodes) => partialRenderInner(partialNodes, 'all');

export const initialize = (rootSelector, vNode) => {
    // allow a string or element as a querySelector value.
    const container = isElement(rootSelector) ? rootSelector : document.querySelector(rootSelector);

    // Shallowly validate vNode.
    const initalVNode = isVNode(vNode) ? vNode : false;

    if (initalVNode === false) {
        throw new Error(`vNode ${vDOM} is not valid`);
    }

    // Cache valid vDOM
    vDOM = initalVNode;

    // Render the inital virual DOM and cache the selectors.
    render(container, false);

    return partialRender;
}