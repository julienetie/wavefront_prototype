import { vNode, containsWord } from '../helpers';
import setGroupDetails from './set-group-details';
import splitGroups from './split-groups';
/**

basicSelector[pseudo] | combinator 

1: Separate by combinators and store accordingly
2: Separate selectors from pseudo and store accordingly 
3: execute each selector with the pseudo and combinator.  

*/
const standardPseudoClasses = [
    // 'active',
    // 'any',
    'any-link', // links
    'checked', // checked 
    'default', // checked/ default/ etc
    // 'defined',
    'dir(', // direction
    'disabled', //
    'empty', // elements that have no children 
    'enabled', // not disabled (inputs)
    // 'first', 
    'first-child', //
    'first-of-type', //
    // 'fullscreen', 
    // 'focus',
    // 'focus-visible',
    'host',
    'host(',
    'host-context(',
    // 'hover',
    'indeterminate', //
    'in-range', //
    'invalid', //
    'lang(', //
    'last-child', //
    'last-of-type', //
    // 'left',
    'link', //
    'not(', //
    'nth-child(', //
    'nth-last-child(', //
    'nth-last-of-type(', ///
    'nth-of-type(', //
    'only-child', // elment with no siblings
    'only-of-type', //
    'optional', //
    'out-of-range', //
    'read-only', // content editable
    'read-write', // content editable
    'required', //
    // 'right',
    'root', //
    'scope', //
    'target', //
    'valid', //
    // 'visited'
];

/** 

checked 
empty 
first-child
first-of-type
last-child
last-of-type
link
only-child

nth-child()
nth-last-child()
nth-last-of-type()
nth-of-type()

**/

const standardPsuedoElements = [
    // '::after',
    // '::before',
    // '::cue',
    '::first-letter',
    '::first-line',
    '::selection',
    '::slotted',
    '::backdrop',
    '::placeholder',
    '::marker',
    // '::spelling-error',
    // '::grammar-error'
]


const combinators = [
    ' + ',
    ' ~ ',
    ' > ',
    ' '
];


const getDefinedAttributes = (element) => {
    const attributes = element.attributes;
    const definedAttributes = {};
    const attributesLength = attributes === null || attributes === undefined ? 0 : attributes.length;

    for (let i = 0; i < attributesLength; i++) {
        const attribute = attributes[i];
        const attributeName = attributes[i].name;
        const style = {};
        const isStyle = attributeName === 'style';

        if (isStyle) {
            const cssText = element.style.cssText; // The interpreted value 
            const cssList = cssText.length > 0 ? cssText.split(';') : ['']; //last item is ignored.
            const cssListLength = cssList.length;

            for (let j = 0; j < cssListLength - 1; j++) {
                const part = cssList[j].split(': ');
                style[part[0].trim()] = part[1];
            }
        }
        definedAttributes[attribute.name] = isStyle ? style : attribute.value;
    }

    return definedAttributes;
}


const createWaveNode = (element, definedAttributes, childNodes, isSVG) => {
    switch (element.nodeType) {
        case 1:
            return vNode(
                element.tagName,
                definedAttributes,
                childNodes,
                isSVG
            );
        case 3:
            return vNode(
                'primitive',
                element.nodeValue
            );
        case 8:
            return vNode(
                'comment',
                element.nodeValue
            );
    }
}


// const getSelectorPartType = selector => {
//     /*
//         https://developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors
//         type selector 
//         a
//     */


//     /*
//         https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors
//         .spacious
//         li.spacious
//         li.spacious.elegant
//     */

//     /*
//         https://developer.mozilla.org/en-US/docs/Web/CSS/ID_selectors
//         # Id selector 
//         #
//     */


//         https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors
//         # Universal selector:
//         ns|* - matches all elements in namespace ns
//         *|* - matches all elements
//         |* - matches all elements without any declared namespace


//     /*
//         https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors
//         # Attribute selector:
//         [attr]
//         [attr=value]
//         [attr~=value]
//         [attr|=value]
//         [attr^=value]
//         [attr$=value]
//         [attr*=value]
//     */
//     const prefix = selector[0];
//     switch (prefix) {
//         case '.': // Class
//             return 'class';
//         case '#': // id
//             return 'id';
//         default: // tag
//             return selector.indexOf('[') === -1 ? 'type' : 'attribute';
//     }
// }

// const unprefixSelector = selector => {
//     const prefix = selector[0];
//     switch (prefix) {
//         case '.': // Class
//             return selector.replace(/\./g, ' ').trim();
//         case '#': // id
//             return selector.substr(1);
//         default: // tag
//             return selector;
//     }
// }

// const getByAttributeOperator = (searchByAttribute, operator, attributeSensitive, needleSensitive, isInsensitive) => {
//     const attribute = isInsensitive ? attributeSensitive.toLowerCase() : attributeSensitive;
//     const needle = isInsensitive ? needleSensitive.toLowerCase() : needleSensitive;
//     if (searchByAttribute === true) {
//         return attribute !== undefined;
//     }
//     switch (operator) {
//         case '~': // [attr~=value]
//             return containsWord(attribute, needle);
//         case '|': // [attr|=value]
//             return attribute === needle || attribute.startsWith(`${needle}-`);
//         case '^': // [attr^=value]
//             return attribute.startsWith(needle);
//         case '$': // [attr$=value]
//             return attribute.endsWith(needle);
//         case '*': // [attr*=value]
//             return attribute.indexOf(needle) >= 0;
//         default:
//             // [attr=value]
//             return attribute === needle;
//     }
// }



// const find = (typeSelector, pseudoRule, type, waveNode, searchType = 'first') => {
//     const cacheResults = [];
//     let recursion = true;
//     const all = searchType === 'all';
//     let final;
//     const deepSearch = (nodeLevel, value) => {

//         const isType = type === 'type';
//         if (isType && nodeLevel.t === value) {
//             cacheResults.push(nodeLevel);
//             if (all === false) {
//                 recursion = false;
//                 return;
//             }
//         }

//         const isClass = type === 'class';
//         if (isClass && nodeLevel.at && nodeLevel.at.class && nodeLevel.at.class.indexOf(typeSelector) >= 0) {
//             cacheResults.push(nodeLevel);
//             if (all === false) {
//                 recursion = false;
//                 return;
//             }
//         }


//         const isId = type === 'id';
//         if (isId && nodeLevel.at && nodeLevel.at.id && nodeLevel.at.id === typeSelector) {
//             cacheResults.push(nodeLevel);
//             if (all === false) {
//                 recursion = false;
//                 return;
//             }
//         }


//         const isAttribute = type === 'attribute';
//         const cleanedSelector = typeSelector.replace(/ /g, '');
//         const isInsensitive = cleanedSelector.indexOf('i]') >= 0;
//         const attrSelector = isInsensitive ? cleanedSelector.replace(/i]/, ']') : cleanedSelector;
//         // console.log('attrSelector', attrSelector)

//         const tagType = (attrSelector.split('[')[0]).toUpperCase();



//         const searchByAttribute = attrSelector.indexOf('=') === -1;

//         const attrSpecial = searchByAttribute ? attrSelector.split('[')[1].split(']')[0] : attrSelector.split('=')[0].split('[')[1];
//         const attr = attrSpecial.replace(/[^\w\s]/gi, '');
//         const valueStartIndex = attrSelector.indexOf('=') + 2;
//         const valueEndIndex = attrSelector.lastIndexOf(']') - 1;



//         // console.log(attr)
//         const attrValue = attrSelector.substring(valueStartIndex, valueEndIndex); //@TODO This is cheap not reliable 
//         const attrOperator = attrSelector[attrSelector.indexOf('=') - 1];
//         // console.log('attrSelector', attrOperator)
//         if (isAttribute && nodeLevel.t === tagType && nodeLevel.at) {
//             // console.log('attr', attr)
//             const matchByAttribute = getByAttributeOperator(
//                 searchByAttribute,
//                 attrOperator,
//                 nodeLevel.at[attr] || '',
//                 attrValue,
//                 isInsensitive
//             );
//             if (matchByAttribute) {
//                 cacheResults.push(nodeLevel);
//                 if (all === false) {
//                     recursion = false;
//                     return;
//                 }
//             }
//         }


//         if (nodeLevel.ch !== undefined) {
//             const childLength = nodeLevel.ch === undefined ? 0 : nodeLevel.ch.length;
//             for (let i = 0; i < childLength; i++) {
//                 if (recursion === true) {
//                     deepSearch(nodeLevel.ch[i], value);
//                 }
//             }
//         }
//         // console.log('cacheResults',cacheResults)
//         final = cacheResults;
//     }

//     const value = type === 'type' ? typeSelector.toUpperCase() : null;

//     deepSearch(waveNode, value);
//     // Find by tag
//     // Find by class

//     // Find by id

//     // Find by attribute

//     // Find by Text
//     // console.log(final)
//     return final;
// }



const match = {
    contains(haystack, needle) {
        return needle.every(elem => haystack.indexOf(elem) > -1);
    }
}


/** 
 * @param {Array} searchDetails - List of selector groups.  
 * @param {Object} waveNode - Node to search.
 * @param {string} searchType - all or first search type.
 * @returns {Object} waveNode
 */
const find = (partialSearchDetails, waveNode, searchType = 'first') => {
    // Informs deepsearch to start from the root.
    const searchDetails = ['root', ...partialSearchDetails];

    console.log('find:searchDetails', searchDetails)

    // console.log('Find', searchDetails, searchType);



    // Root node will change per selector group.
    let rootNode = waveNode;
    let lastParent;
    const deepSearch = (nodeLevel, searchDetails) => {
        const collection = [];
        const loop = (nodeLevel, searchDetails) => {
            // If Root.
            // console.log('searchDetails', searchDetails)
            if (searchDetails === 'root') {
                lastParent = waveNode;
                collection.push(waveNode);
            }

            if (nodeLevel === undefined) {
                return ['lastResults', null]
            }


            // Is Universal.
            if (searchDetails.universal === true) {
                if (Array.isArray(nodeLevel)) {
                    nodeLevel.forEach(node => {
                        // console.log('node', node)
                        if (node.ch === undefined) {
                            collection.push([]);
                        } else {
                            // Add node to collection.
                            collection.push(node);
                            const childNodes = node.ch;
                            const childNodesLength = childNodes.length;
                            for (let i = 0; i < childNodesLength; i++) {
                                const child = childNodes[i];
                                loop([child], searchDetails);
                            }
                        }
                    });
                }
            }


            // 

        }

        loop(nodeLevel, searchDetails);
        return collection;
    }

    // deepSearch(waveNode, searchDetails);


    const finalResults = searchDetails.reduce((acc, selectorGroup, i) => {
        let val;

        if (i === 0) {
            val = deepSearch(waveNode, selectorGroup);
        } else {
            val = deepSearch(acc[i - 1], selectorGroup)
        }

        // val = deepSearch(waveNode, selectorGroup);

        acc.push(val);
        return acc
    }, []);

    return finalResults;
}













const abstract = (interfaceSelector, whitespaceRules = 'trim') => {
    const getChildNodesAsArray = (childNodes, whitespaceRules) => {
        const ignoreTrim = !(whitespaceRules === 'ignore-trim');
        const childNodesArr = [];
        const childNodesLength = childNodes.length;

        for (let i = 0; i < childNodesLength; i++) {
            if (childNodes[i].nodeType === 3 & ignoreTrim) {
                /*
                 * @TODO TBA
                 *
                 *  "\t" TAB \u0009
                 *  "\n" LF  \u000A
                 *  "\r" CR  \u000D
                 *  " "  SPC \u0020
                 */
                if (childNodes[i].nodeValue === childNodes[i].nodeValue.replace(/^\s+|\s+$/g, '')) {
                    childNodesArr.push(abstractRecursive(childNodes[i], whitespaceRules));
                }
            } else {
                childNodesArr.push(abstractRecursive(childNodes[i], whitespaceRules));
            }
        }

        return childNodesArr;
    }

    const abstractRecursive = (interfaceSelector, whitespaceRules = 'trim') => {
        const element = typeof interfaceSelector.nodeType === 'number' ? interfaceSelector : document.querySelector(interfaceSelector);
        const definedAttributes = getDefinedAttributes(element);
        const isSVG = element instanceof SVGElement;
        const childNodes = getChildNodesAsArray(element.childNodes, whitespaceRules);
        return createWaveNode(element, definedAttributes, childNodes, isSVG);
    }

    const waveNode = abstractRecursive(interfaceSelector, whitespaceRules);




    return {
        // collage(selector) {
        //     if (selector.length < 2) {
        //         throw new Error(`Selector ${selector} should be two or more characters`);
        //     }
        //     const _waveNode = waveNode;
        //     const firstChar = selector[0];

        //     const searchDetails = searchType(selector);
        //     const results = find(searchDetails, waveNode, 'all');

        //     return {
        //         element: results
        //     }

        // },
        collageAll(selector) {
            const collection = splitGroups(selector);
            // console.log('splitGroups', collection)
            const searchDetails = setGroupDetails(collection);
            // console.log('searchDetails', searchDetails)
            const results = find(searchDetails, waveNode, 'all');

            // console.log('Results', results);
        }
    }

}

export default abstract;