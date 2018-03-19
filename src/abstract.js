import { vNode } from './helpers';

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
                childNodesArr.push(abstract(childNodes[i], whitespaceRules));
            }
        } else {
            childNodesArr.push(abstract(childNodes[i], whitespaceRules));
        }
    }

    return childNodesArr;
}


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
            return { attribute: {
                    [
                        [type]
                    ]: value } };
        case '&': // text
            return { text: remainder };
        default: // tag
            return { tag: selector };
    }
}

const abstract = (interfaceSelector, whitespaceRules = 'trim') => {
    const element = typeof interfaceSelector.nodeType === 'number' ? interfaceSelector : document.querySelector(interfaceSelector);
    const definedAttributes = getDefinedAttributes(element);
    const isSVG = element instanceof SVGElement;
    const childNodes = getChildNodesAsArray(element.childNodes, whitespaceRules);


    const waveNode = createWaveNode(element, definedAttributes, childNodes, isSVG);

    return {
        collage(selector) {
            if (selector.length < 2) {
                throw new Error(`Selector ${selector} should be two or more characters`);
            }
            const _waveNode = waveNode;
            const firstChar = selector[0];


            const type = searchType(selector)
            console.log('firstChar', type)

            // findBy[type]()

            return {

            }

        },
        collageAll: function() {
            // this.waveNode = waveNode;
            return this;
        }
    }
    return waveNode
}

export default abstract;