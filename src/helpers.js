export const isPlaneObject = value => ({}).toString.call(value) === '[object Object]';
export const isString = value => typeof value === 'string';
export const isPrimitive = value => isString(value) || typeof value === 'number';
export const isFunction = value => typeof value === 'function';
export const isElement = value => value instanceof Element;
export const isVNode = value => value.hasOwnProperty('t');
export const removeChildren = parentNode => {
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
}
/** 
 * Filter by loop 
 * @param {Array} arr 
 * @param {Function} callback 
 **/
export const filter = (arr, callback) => {
    const store = [];
    const arrLength = arr.length;
    for (let i = 0; i < arrLength; i++) {
        if (callback(arr[i])) {
            store.push(arr[i]);
        }
    }
    return store;
}

/** 
 * Inserts a Node before a reference node.
 */
export const insertBefore = (parent, newNode, refNode) => parent.insertBefore(newNode, refNode);

/** 
 * Inserts a Node after a reference node.
 */
export const insertAfter = (parent, newElement, refNode) => {
    if (parent.lastChild === refNode) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, refNode.nextSibling);
    }
};