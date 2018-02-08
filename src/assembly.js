import { div } from './tags';

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

var removeChilds = function(node) {
    var last;
    while (last = node.lastChild) node.removeChild(last);
};


const render = (initalRootElement, vNode, isPartial) => {
    // Cache root element 
    if (rootElement === undefined) {
        rootElement = initalRootElement;
    }
    // Creates a new fragment for partials but uses 
    // the fragment cache for the inital render.
    // const renderFragment = isPartial === true ? (document.createDocumentFragment()) : fragment; 
    // console.log('renderFragment', document.createDocumentFragment())
    let renderFragment;
    if(isPartial === true){
        renderFragment = document.createDocumentFragment()
    }else{
        renderFragment = fragment;
    }

    const node = isPartial === true ? vNode : vDOM; 
    console.log('node', node)
    count = 0; // reset counter used for node ids.



    if (Array.isArray(node)) {
        const dummyVDOM = div({ id: 'dummy' }, node);


        function appendMultipleNodes() {
            var args = [].slice.call(arguments);
            for (var x = 1; x < args.length; x++) {
                args[0].appendChild(args[x])
            }
            return args[0]
        }

        createAndAppendNode(renderFragment, dummyVDOM);
        // }
        const dummy = renderFragment.firstElementChild;
        const innerNodes = dummy.childNodes;
        const outerNodeList = [];
        for (let i = 0; i < innerNodes.length; i++) {
            outerNodeList.push(innerNodes[i]);
        }
        renderFragment.removeChild(dummy);

        appendMultipleNodes(renderFragment, ...outerNodeList)

        requestAnimationFrame(() => {
            rootElement.appendChild(renderFragment)

            /** 
               Static Rendering:
               This will generate the inital state
               of the HTML as a string. headers 
               and other content can be generated 
               from the front side or modified on the
               back end...
            **/
            // const staticRender = rootElement.outerHTML;
            // console.log(staticRender)
        });
    } else {
        // Wrapped element
        console.log('1', renderFragment,)
        createAndAppendNode(renderFragment, node);
        console.log('renderFragmentdd',renderFragment)
        // console.log('elementCache', elementCache)
        requestAnimationFrame(() => {
            // if (isPartial) {
            //     removeChilds(rootElement)
            // }
            if (!isPartial) {
                console.log()
                const fragmentClone = document.importNode(renderFragment, true);
                rootElement.appendChild(fragmentClone)
            }
            // console.log('FINAL FRAGMENT', renderFragment)
            /** 
               Static Rendering:
               This will generate the inital state
               of the HTML as a string. headers 
               and other content can be generated 
               from the front side or modified on the
               back end...
            **/
            // const staticRender = rootElement.outerHTML;
            // console.log(staticRender)
            return; 
        });
    }

    return renderFragment;
}

// const elementCache = {
//     class: {},
//     id: {},
//     nonexistent: []
// }
const elementCache = {}

const createAndAppendNode = (frag, node) => {
    const isSVG = node.svg === true;
    // const shouldCacheElements = selectorsToCache.length > 0;
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

    // ELEMENT_NODE     1
    const element = isSVG ? document.createElementNS(SVG_NAMESPACE, node.t) : document.createElement(node.t);

    // const cacheSelectedElements = (attributeValue, element) => {
    //     if (selectorsToCache.indexOf('#' + attributeValue) >= 0) {
    //         elementCache.id[attributeValue] = element;
    //     }

    //     if (selectorsToCache.indexOf('.' + attributeValue) >= 0) {
    //         elementCache.class[attributeValue] = element;
    //     }
    // }


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
                // case '#':
                // case 'id':
                //     if (shouldCacheElements && selectorsToCache.indexOf('#' + attributeValue) >= 0) {
                //         // console.log('TEST', attributeKey)
                //         if (!Array.isArray(elementCache['#' + attributeValue])) {
                //             elementCache['#' + attributeValue] = [];
                //         }
                //         // elementCache.id[attributeValue].push(element);
                //         elementCache['#' + attributeValue].push(element);
                //     }
                //     element.setAttribute(attributeKey, attributes[attributeKey]);
                //     break;
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
                    // if (shouldCacheElements && selectorsToCache.indexOf('.' + attributeValue) >= 0) {

                    //     if (!Array.isArray(elementCache['.' + attributes.class])) {
                    //         elementCache['.' + attributes.class] = [];
                    //     }
                    //     // elementCache.class[attributes.class].push(element);
                    //     elementCache['.' + attributes.class].push(element);

                    //     // console.log('class', attributes.class)
                    // }
                    element.className = attributes.class;
                    break;
                default:
                    element.setAttribute(attributeKey, attributeValue);
                    break;
            }
        }
    }

    // Add children
    frag.appendChild(element);

    if (Array.isArray(node.ch)) {
        node.ch.forEach(childNode => {
            createAndAppendNode(element, childNode)
        });
    }
}


const fullTemplate = {
    "t": "DIV",
    "id": 90046,
    "at": {
        "class": "thisClass",
        "id": "thisID",
        "style": {
            "display": "block",
            "background": 'red',
            "padding": "1rem"
        }
    },
    "chx": 1,
    "ch": [{
            "t": "TEXT",
            "id": 90045,
            "val": "THIS IS A FULL TEMPLATE",
            "pid": 90046,
            "ix": 0
        },
        {
            "t": "DIV",
            "id": 90046,
            "at": {
                "class": "thisClass",
                "style": {
                    "display": "block",
                    "background": 'red',
                    "padding": "1rem"
                }
            },
            "chx": 1,
            "ch": [{
                "t": "TEXT",
                "id": 90045,
                "val": "THIS IS A child text node",
                "pid": 90046,
                "ix": 0
            }]
        }
    ]
}

const searchAndReplace = (selector, newVNode) => {
    const queriedParent =  fragment.querySelector(selector);
    // console.log('queriedParent', queriedParent, selector)

    // convert the node to an element
    const partialElement = render(undefined, newVNode, true); 
    console.log('partialElement', partialElement)

    // Remove children
    removeChildren(queriedParent); 



    // Adopt the new element 
    queriedParent.appendChild(partialElement)

    // Remove children
    removeChildren(rootElement);

    // Append modified fragment.
    const fragmentClone = document.importNode(fragment, true);
     rootElement.appendChild(fragmentClone); 
    // console.info('searchAndReplace')
    // console.log('vDOM', vDOM)
    // console.log('newVNode', newVNode)
    // if (Array.isArray(vDOM)) {

    // } else {
    //     console.log('OBJECT')
    //     // If the first node contains the selector of the given type
    //     // replace the first node's child.

    //     const traverse = (node) => {
    //         if (node.at[type].indexOf(selector) >= 0) {
    //             node.ch = [newVNode];
    //             node.chx = 1;
    //         } else {
    //             const nodeChildren = node.ch;
    //             const nodeChildLength = nodeChildren.length; 
    //             for(i = 0; i < nodeChildLength; i++){
    //                 nodeChildren
    //             }
    //         }
    //     }

    //     traverse(vDOM);
    // }
    // console.log('final vDOM', vDOM)
    // render(undefined, true);


}


const partialRender = (partialNodes) => {
    // console.log('elementCache', elementCache)
    const partialNodesKeys = Object.keys(partialNodes);
    const partialNodesLength = partialNodesKeys.length;
    const elementCachekeys = Object.keys(elementCache);
    let selector;
    let type;

    for (let i = 0; i < partialNodesLength; i++) {
        const partialNodeKey = partialNodesKeys[i];
        const newVNode = partialNodes[partialNodeKey];
        console.log('partialNodeKey', newVNode, partialNodeKey)
        // console.log('newVNode', newVNode)

        // Check if class
        // if (partialNodeKey[0] === '.') {
        //     type = 'class';
        //     selector = partialNodeKey.slice(1);
        // }
        // // Check if class
        // if (partialNodeKey[0] === '#') {
        //     type = 'id';
        //     selector = partialNodeKey.slice(1);
        // }


        searchAndReplace(partialNodeKey, newVNode);
        // searchAndReplace(type, selector, newVNode);

        // const elementsIndex = elementCachekeys.indexOf(partialNodesKeys[i])
        // const parentsToUpdate = elementCache[elementCachekeys[elementsIndex]];
        // const parentsToUpdateLength = parentsToUpdate.length;

        // for (let j = 0; j < parentsToUpdateLength; j++) {
        //     render(parentsToUpdate[j], partialNodes[partialNodesKeys[i]], undefined, true);
        // }

    }
}



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

    // console.log('initialize', container, vNode, selectors)
    return partialRender;
}

// const r = initialize('#root', fullTemplate, '#thisID', '.thisClass', '.childClass');


// setTimeout(() => {
// r({
//     '.thisClass': {
//         "t": "DIV",
//         "id": 90046,
//         "at": {
//             "class": "new-shit",
//             "style": {
//                 "display": "block",
//                 "background": 'yellow',
//                 "padding": "1rem"
//             }
//         },
//         "chx": 1,
//         "ch": [{
//             "t": "TEXT",
//             "id": 90045,
//             "val": "NEW SHIT NEW SHIT",
//             "pid": 90046,
//             "ix": 0
//         }]
//     }
// });
// }, 2000)