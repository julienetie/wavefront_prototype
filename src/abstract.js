import { vNode } from './helpers';

const getChildNodesAsArray = (childNodes, whitespaceRules) => {
    const ignoreTrim = !(whitespaceRules === 'ignore-trim');
    const childNodesArr = [];
    const childNodesLength = childNodes.length;

    for (let i = 0; i < childNodesLength; i++) {
        if (childNodes[i].nodeType === 3 & ignoreTrim) {
            /*
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


const abstract = (interfaceSelector, whitespaceRules = 'trim') => {
    const element = typeof interfaceSelector.nodeType === 'number' ? interfaceSelector : document.querySelector(interfaceSelector);
    const definedAttributes = getDefinedAttributes(element);
    const isSVG = element instanceof SVGElement;
    const childNodes = getChildNodesAsArray(element.childNodes, whitespaceRules);

    switch (element.nodeType) {
        case 1:
          console.log(element.tagName)
            return vNode(
                element.tagName,
                definedAttributes,
                childNodes,
                isSVG
            );
        case 3:
              console.log(element.nodeValue)
            return vNode(
                'primitive',
                element.nodeValue
            );
        case 8:
            console.log(element.nodeValue)
            return vNode(
                'comment',
                element.nodeValue
            );
    }
}

export default abstract;