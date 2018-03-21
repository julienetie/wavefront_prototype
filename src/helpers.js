export const isPlaneObject = value => ({}).toString.call(value) === '[object Object]';
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


/** 
 * @param {string} t - Tag name 
 * @param {Object|string} at - Attributes | Primative
 * @param {Array} ch - Children 
 * @param {Boolean} isSVG 
 */
export const vNode = (t, at, ch, isSVG) => {
    switch (t) {
        case 'primitive':
            return { t: 'TEXT', val: at };
        case 'comment':
            return { t: 'COM', val: at };
        default:
            return isSVG ? {
                t,
                at,
                ch,
                svg: true
            } : {
                t,
                at,
                ch
            };
    }
}

/** 
 * Finds a complete word in a string separated by a delimiter.
 * delimiter defaults to spaces.
 * @param {string} string - Haystack.
 * @param {string} word - Needle
 * @returns {Boolean}
 */
export const containsWord = (string, word, delimiter = ' ') => {
    const isLegalWord = word.indexOf(delimiter) === -1;
    const isEndWord = string[string.length - word.length - 1] === delimiter && string.endsWith(word);
    const isStartWord = string[word.length] === delimiter && string.startsWith(word);
    const isCentralWord = string.indexOf(delimiter + word + delimiter) >= 0;
    return (isEndWord || isStartWord || isCentralWord) && isLegalWord;
}