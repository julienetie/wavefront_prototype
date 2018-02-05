import { div } from './tags';

const isPlaneObject = value => ({}).toString.call(value) === '[object Object]';
const isString = value => typeof value === 'string';
const isPrimitive = value => isString(value) || typeof value === 'number';
const isFunction = value => typeof value === 'function';
const isElement = value => value instanceof Element;


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
export const assembly = (tagName, isSVG) => {

    return function inner(...args) {
        const tagNameStr = `${tagName}`;
        let attributes;
        let item;
        let childNodes = [];
        let i;
        for (i = 0; i < args.length; i++) {
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
            if (isItemObject && isItemVnode || isPrimitive) {
                childNodes.push(item);
                continue;
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



export const renderPartial = (selector) => {
    const container = document.querySelector(selector);
    const fragment = document.createDocumentFragment();
    return (newNode, cache) => {
        count = 0; // reset counter used for node ids.

        if (cache === undefined) {
            if (Array.isArray(newNode)) {
                const wrappedVTree = div({ id: 'dummy' }, newNode);
                const unWrappedVTree = wrappedVTree.ch;

                function appendMultipleNodes() {
                    var args = [].slice.call(arguments);
                    for (var x = 1; x < args.length; x++) {
                        args[0].appendChild(args[x])
                    }
                    return args[0]
                }

                createAndAppendNode(fragment, wrappedVTree);
                // }
                const dummy = fragment.firstElementChild;
                const innerNodes = dummy.childNodes;
                const outerNodeList = [];
                for (let i = 0; i < innerNodes.length; i++) {
                    outerNodeList.push(innerNodes[i]);
                }
                fragment.removeChild(dummy);

                appendMultipleNodes(fragment, ...outerNodeList)

                requestAnimationFrame(() => {
                    container.appendChild(fragment)

                    /** 
                       Static Rendering:
                       This will generate the inital state
                       of the HTML as a string. headers 
                       and other content can be generated 
                       from the front side or modified on the
                       back end...
                    **/
                    // const staticRender = container.outerHTML;
                    // console.log(staticRender)
                });
            } else {
                // Wrapped element
                createAndAppendNode(fragment, newNode);

                requestAnimationFrame(() => {
                    container.appendChild(fragment)

                    /** 
                       Static Rendering:
                       This will generate the inital state
                       of the HTML as a string. headers 
                       and other content can be generated 
                       from the front side or modified on the
                       back end...
                    **/
                    // const staticRender = container.outerHTML;
                    // console.log(staticRender)
                });
            }
        }
    }
}



const createAndAppendNode = (fragment, node) => {
    const isSVG = node.svg === true;
    // TEXT_NODE        3
    if (node.t === 'TEXT') {
        const textNode = document.createTextNode(node.val);
        fragment.appendChild(textNode);
        return;
    }
    // // COMMENT_NODE     8
    if (node.t === 'COM') {
        console.log('node.val', node.val)
        const commentNode = document.createComment(node.val);
        fragment.appendChild(commentNode);
        return;
    }

    // ELEMENT_NODE     1
    const element = isSVG ? document.createElementNS(SVG_NAMESPACE, node.t) : document.createElement(node.t);

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

            switch (attributeKey) {
                case 'e':
                case 'event':
                    element.addEventListener(...attributes[attributeKey]);
                    break;
                case '$':
                case 'style':
                    Object.assign(element.style, attributes[attributeKey]);
                    break;
                case 'c':
                case 'class':
                    element.className = attributes.class;
                    break;
                default:
                    element.setAttribute(attributeKey, attributes[attributeKey]);
                    break;
            }
        }
    }

    // Add children
    fragment.appendChild(element);

    if (Array.isArray(node.ch)) {
        node.ch.forEach(childNode => {
            createAndAppendNode(element, childNode)
        });
    }
}