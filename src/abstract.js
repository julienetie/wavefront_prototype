import { vNode } from './helpers';




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


const searchType = selector => {
    const prefix = selector[0];
    const remainder = selector.substr(1);
    switch (prefix) {
        case '.': // Class
            return { class: remainder };
        case '#': // id
            return { id: remainder };
        case '~': // ~attr=value
            const parts = remainder.split('=')
            const value = parts[1];
            const type = parts[0];
            return {
                attribute: {
                    [
                        [type]
                    ]: value
                }
            };
        case '&': // text
            return { text: remainder };
        default: // tag
            return { tag: selector };
    }
}



const find = (details, waveNode, searchType = 'first') => {
    const cacheResults = [];
    const type = Object.keys(details)[0];
    let recursion = true;
    // console.log(type,details,waveNode);
    const all = searchType === 'all';
    let final;
    const deepSearch = (nodeLevel, type, value) => {
        if (nodeLevel.t === value) {
            cacheResults.push(nodeLevel);
            if (all === false) {
                recursion = false;
                return;
            }
        }

        if (nodeLevel.ch) {
            const childLength = nodeLevel.ch === undefined ? 0 : nodeLevel.ch.length;
            for (let i = 0; i < childLength; i++) {
                if (recursion === true) {
                    deepSearch(nodeLevel.ch[i], type, value);
                }
            }
        }
        final = cacheResults;
    }

    const value = details[type].toUpperCase();
    deepSearch(waveNode, type, value);
    // Find by tag
    // Find by class

    // Find by id

    // Find by attribute

    // Find by Text
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
        collage(selector) {
            if (selector.length < 2) {
                throw new Error(`Selector ${selector} should be two or more characters`);
            }
            const _waveNode = waveNode;
            const firstChar = selector[0];

            const searchDetails = searchType(selector);
            const results = find(searchDetails, waveNode, 'all');
 
            return {
                element: results
            }

        },
        collageAll: function() {
            // this.waveNode = waveNode;
            return this;
        }
    }

}

export default abstract;