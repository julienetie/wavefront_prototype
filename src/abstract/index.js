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
        console.log('sss', searchDetails)
        const isRoot = searchDetails === 'root';
        const requirements = isRoot ? []:  Object.keys(searchDetails).map(key => {
            const value = searchDetails[key];
            // Is Array
            if (Array.isArray(value)) {
                return value.length === 0 ? null : key;
            }
            // Is Object
            if (((value) + '').endsWith('Object]')) {
                return null; // update later.
            }
            // Strings
            return !!searchDetails[key] ? key : null;
        }).filter(value => !!value)
        console.log('requirements', requirements)
        

        const loop = (nodeLevel, searchDetails) => {
            const conditions = []; 
            // If Root.
            if (searchDetails === 'root') {
                lastParent = waveNode;
                collection.push(waveNode);
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

            // Has type match
            if(requirements.includes('type')){
              const hasType = nodeLevel.t === searchDetails.type.toUpperCase();
              conditions.push(hasType);
            }

            // Has Id match
            if(requirements.includes('id')){
              const hasId = nodeLevel.at && nodeLevel.at.id 
              ? nodeLevel.at.id === searchDetails.id : false;
              conditions.push(hasId);
            }





            const typeLowerCase = searchDetails.type;
            if (typeof typeLowerCase === 'string') {
                const type = typeLowerCase.toUpperCase();
                nodeLevel.forEach(node => {
                    if (node.t === type) {
                        collection.push(node);
                    }
                })
            }

            /** 
    
            if 
            searchDetails {}
            type classes id 

            





            */

        }

        loop(nodeLevel, searchDetails);
        return collection;
    }

    // deepSearch(waveNode, searchDetails);


    const finalResults = searchDetails.reduce((acc, selectorGroup, i) => {
        const firstParam = i === 0 ? waveNode : acc[i - 1];
        const val = deepSearch(firstParam, selectorGroup);
        acc.push(val);
        return acc;
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

            console.log('Results', results);
        }
    }

}

export default abstract;