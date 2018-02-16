import {
    isPlaneObject,
    isPrimitive,
} from './helpers';


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
export default (tagName, nodeType) => {
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