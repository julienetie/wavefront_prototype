import {
    isPlaneObject,
    isString,
    isPrimitive,
    isFunction,
    isElement,
    isVNode,
    removeChildren
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
    console.log('X',vNode)
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


const searchAndReplace = (selector, newVNode, retrieveAll) => {
    const exchangeChildren = (queriedParent) => {
        // convert the node to an element
        const partialElement = render(undefined, newVNode, true);
        // Remove children
        removeChildren(queriedParent);
        // Adopt the new element 
        queriedParent.appendChild(partialElement)
    }


    if (retrieveAll) {
        const queriedParents = fragment.querySelectorAll(selector);

        const queriedParentsLength = queriedParents.length;

        for (let i = 0; i < queriedParentsLength; i++) {
            exchangeChildren(queriedParents[i])
        }
    } else {
        const queriedParent = fragment.querySelector(selector);
        // console.log('queriedParent',queriedParent)
        exchangeChildren(queriedParent)
    }
}


const partialRenderInner = (partialNodes, retrieveAll) => {

    const partialNodesKeys = Object.keys(partialNodes);
    const partialNodesLength = partialNodesKeys.length;
    const elementCachekeys = Object.keys(elementCache);

    for (let i = 0; i < partialNodesLength; i++) {
        const partialNodeKey = partialNodesKeys[i];
        const newVNode = partialNodes[partialNodeKey];
        console.log('partialNodeKey', newVNode, partialNodeKey)

        searchAndReplace(partialNodeKey, newVNode, retrieveAll);

    }


    // Append modified fragment.
    // Remove children
    removeChildren(rootElement);
    const fragmentClone = document.importNode(fragment, true);
    rootElement.appendChild(fragmentClone);
}
const partialRender = (partialNodes) => partialRenderInner(partialNodes, false);
partialRender.all = (partialNodes) => partialRenderInner(partialNodes, true);



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
