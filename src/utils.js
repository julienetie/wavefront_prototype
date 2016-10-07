/**
 * Get index of child node.
 * @param {Node} 
 * @return {Number}
 */
export const getChildIndex = (node) => {
    return [].indexOf.call(node.parentNode.children, node);
}


export const isElement = (element) => {
    return element instanceof Element;
}


/**
 * Finds value in an array 
 * @param {Array} haystack - The array to search.
 * @param {*} needle - The value to look for
 */
export const contains = (haystack, needle) => {
    return haystack.indexOf(needle) === -1;
}


/**
 * Checks to see if the interface has been added
 * as a render type method. 
 * @param {string} interfaceType 
 * @param {string} interfaceName
 */
export const renderHasInterface = (interfaceName, interfaceType) => {
    return render[interfaceType].hasOwnProperty(interfaceName);
}


/**
 * Pass a condition once with a given reference.
 * @param {string} reference - A unique reference per conditon.
 * @return {Boolean}
 */
export function once(reference) {
    if (!once.prototype.references) {
        once.prototype.references = {};
    }
    // Store reference if dosen't exist.
    if (!once.prototype.references.hasOwnProperty(reference)) {
        once.prototype.references[reference] = null;
        return true;
    } else {
        return false;
    }
}
