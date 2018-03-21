import { vNode, containsWord } from './helpers';

/**

basicSelector[psuedo] | combinator 

1: Separate by combinators and store accordingly
2: Separate selectors from psuedo and store accordingly 
3: execute each selector with the psuedo and combinator.  

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


const getSelectorPartType = selector => {
    /*
        https://developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors
        type selector 
        a
    */


    /*
        https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors
        .spacious
        li.spacious
        li.spacious.elegant
    */

    /*
        https://developer.mozilla.org/en-US/docs/Web/CSS/ID_selectors
        # Id selector 
        #
    */

    /*
        https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors
        # Universal selector:
        ns|* - matches all elements in namespace ns
        *|* - matches all elements
        |* - matches all elements without any declared namespace
    */

    /*
        https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors
        # Attribute selector:
        [attr]
        [attr=value]
        [attr~=value]
        [attr|=value]
        [attr^=value]
        [attr$=value]
        [attr*=value]
    */
    const prefix = selector[0];
    switch (prefix) {
        case '.': // Class
            return 'class';
        case '#': // id
            return 'id';
        default: // tag
            return selector.indexOf('[') === -1 ? 'type' : 'attribute';
    }
}

const unprefixSelector = selector => {
    const prefix = selector[0];
    switch (prefix) {
        case '.': // Class
            return selector.replace(/\./g, ' ').trim();
        case '#': // id
            return selector.substr(1);
        default: // tag
            return selector;
    }
}

const getByattributeOperator = (searchByAttribute, operator, attribute, needle) => {
    // [attr]
    console.log('attribute', attribute, searchByAttribute, operator)
    if (searchByAttribute === true) {
        return attribute !== undefined;
    }
    switch (operator) {
        case '~': // [attr~=value]
            return containsWord(attribute, needle);
        case '|': // [attr|=value]
            return attribute === needle || attribute.startsWith(`${needle}-`);
        case '^': // [attr^=value]
            return attribute.startsWith(needle);
        case '$': // [attr$=value]
            return attribute.endsWith(needle);
        case '*': // [attr*=value]
            return attribute.indexOf(needle) >= 0;
        default:
            // [attr=value]
            return attribute === needle;
    }
}



const find = (typeSelector, psuedoRule, type, waveNode, searchType = 'first') => {
    const cacheResults = [];
    let recursion = true;
    // console.log('plug walk: ', type, typeSelector, waveNode);
    const all = searchType === 'all';
    let final;
    const deepSearch = (nodeLevel, value) => {

        const isType = type === 'type';
        if (isType && nodeLevel.t === value) {
            cacheResults.push(nodeLevel);
            if (all === false) {
                recursion = false;
                return;
            }
        }

        const isClass = type === 'class';
        if (isClass && nodeLevel.at && nodeLevel.at.class && nodeLevel.at.class.indexOf(typeSelector) >= 0) {
            cacheResults.push(nodeLevel);
            if (all === false) {
                recursion = false;
                return;
            }
        }


        const isId = type === 'id';
        if (isId && nodeLevel.at && nodeLevel.at.id && nodeLevel.at.id === typeSelector) {
            cacheResults.push(nodeLevel);
            if (all === false) {
                recursion = false;
                return;
            }
        }


        const isAttribute = type === 'attribute';
        const tagType = (typeSelector.split('[')[0]).toUpperCase();


        const searchByAttribute = typeSelector.indexOf('=') === -1;
        const attrSpecial = searchByAttribute ? typeSelector.split('[')[1].split(']')[0] : typeSelector.split('=')[0].split('[')[1];
        const attr = attrSpecial.replace(/[^\w\s]/gi, '');
        const valueStartIndex = typeSelector.indexOf('=') + 2;
        const valueEndIndex = typeSelector.lastIndexOf(']') - 1;

        // console.log(attr)
        const attrValue = typeSelector.substring(valueStartIndex, valueEndIndex); //@TODO This is cheap not reliable 
        const attrOperator = typeSelector[typeSelector.indexOf('=') - 1];
        console.log('typeSelector', attrOperator)

        if (isAttribute && nodeLevel.t === tagType && nodeLevel.at) {
            console.log('attr', attr)
            const matchByAttribute = getByattributeOperator(
                searchByAttribute,
                attrOperator,
                nodeLevel.at[attr] || '',
                attrValue
            );
            if (matchByAttribute) {
                cacheResults.push(nodeLevel);
                if (all === false) {
                    recursion = false;
                    return;
                }
            }
        }


        if (nodeLevel.ch !== undefined) {
            const childLength = nodeLevel.ch === undefined ? 0 : nodeLevel.ch.length;
            for (let i = 0; i < childLength; i++) {
                if (recursion === true) {
                    deepSearch(nodeLevel.ch[i], value);
                }
            }
        }
        // console.log('cacheResults',cacheResults)
        final = cacheResults;
    }

    const value = type === 'type' ? typeSelector.toUpperCase() : null;

    deepSearch(waveNode, value);
    // Find by tag
    // Find by class

    // Find by id

    // Find by attribute

    // Find by Text
    // console.log(final)
    return final;
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
            const tokens = [];
            const nonDescendants = [
                ' > ', // First children 
                ' ~ ', // Matches all matching siblings that follow next.
                ' + ' // Matches all of type but it's self if ambiguous, matches next element if specific 
            ];
            const descendant = [' ']; // Goes through all generations of children to match selectors.
            const createTokens = (selectorString) => {
                // Get index of first combinator.
                const firstCombinatorIndex = selectorString.indexOf(' ');

                // If there are no more separate parts, add the last and exit.
                if (firstCombinatorIndex === -1) {
                    tokens.push(['part', selectorString]);
                    return;
                }

                // Check second character from index.
                const secondCombinatorChar = selectorString[firstCombinatorIndex + 1];
                const s = secondCombinatorChar;

                // const isNonDescendant = s === '>' || s === '~' || s === '+';
                const nonDescendantIndex = nonDescendants.indexOf(` ${secondCombinatorChar} `);

                // Add first selector part.
                const selectorPart = selectorString.substr(0, firstCombinatorIndex);
                tokens.push(['part', selectorPart]);

                const combinator = nonDescendantIndex > -1 ? nonDescendants[nonDescendantIndex] : descendant;

                // Add first non-descendant combinator.
                tokens.push([combinator]);

                // Remove evaluated parts from string. 
                const unevaluatedSelector = selectorString.substr(firstCombinatorIndex + combinator.length);
                createTokens(unevaluatedSelector);
            }


            createTokens(selector)
            // console.log('tokens', tokens)
            const tokensLength = tokens.length;

            let results;
            for (let i = 0; i < tokensLength; i++) {
                const tokenType = tokens[i][0];

                if (tokenType === 'part') {
                    const part = tokens[i][1];
                    const lastBracketIndex = part.lastIndexOf(']');
                    const lastColonIndex = part.lastIndexOf(':');
                    const secondFromLastColonIndex = part[lastColonIndex - 1] === ':' ? lastColonIndex - 1 : -1;
                    const splitColonIndex = secondFromLastColonIndex >= 0 ? secondFromLastColonIndex : lastColonIndex;
                    const splitPsuedo = splitColonIndex >= 0 && lastBracketIndex >= 0 && splitColonIndex > lastBracketIndex;
                    const selectorPart = splitPsuedo ? part.substr(0, splitColonIndex) : part;
                    const psuedoRule = splitPsuedo ? part.substr(splitColonIndex, part.length - 1) : [];
                    const type = getSelectorPartType(selectorPart);
                    const unprefixedSelector = unprefixSelector(selectorPart);
                    results = find(unprefixedSelector, psuedoRule, type, waveNode, 'all');
                    break;
                }

            }

            // Get Part 
            console.info('results', results);

            // APPLY psuedo rules.

            /*
            (2) ["part", "aside"]   <------------- traverse and find selectors.
            1
            :
            [" "] <--------------------------------For each selector found traverse to find 
            2
            :
            (2) ["part", "span:nth-child(4)"] <------------span  and filter using the psuedo rule 
            3
            :
            " > "             <------------get first children of found 
            4
            :
            (2) ["part", "li"] <-------- of type li 
            5
            :
            " > " <------------------
            6
            :
            (2) ["part", "span"]
            7
            :
            " > "
            8
            :
            (2) ["part", ".something-else"]
            9
            :
            [" "]
            10
            :
            (2) ["part", "#blah"]
            11
            :
            " ~ "
            12
            :
            (2) ["part", "div"]
            13
            :
            " + "
            14
            :
            (2) ["part", "section"]
            15
            :
            " + "
            16
            :
            (2) ["part", "h1"]
            */







            // if (selector.length < 2) {
            //     throw new Error(`Selector ${selector} should be two or more characters`);
            // }
            // const _waveNode = waveNode;
            // const firstChar = selector[0];

            // const searchDetails = searchType(selector);
            // const results = find(searchDetails, waveNode, 'all');

            // return {
            //     element: results
            // }
        }
    }

}

export default abstract;