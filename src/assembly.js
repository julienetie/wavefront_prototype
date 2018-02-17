import {
    isPlaneObject,
    vNode 
} from './helpers';

/** 
 Assembly is the mechanics of the tag functions. 
 A Wavefront template is a set of nested functions
 which act similar to recursion. 

 The deepest nested tag of the youngest index is
 the first executed tag function.
**/
export default (tagName, nodeType) => {
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
            if (isItemObject && isItemVnode || (typeof item === 'string' || typeof item === 'number')) {
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
                const type =   isComment ? 'comment' : 'primitive';
                const value = isComment ? childNode.slice(1) : childNode;
                childNodes[i] = vNode(type, value, null, isSVG);
            }
        }

        return vNode(tagNameStr, attributes, childNodes, isSVG);
    }
}