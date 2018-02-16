import {isElement, isVNode} from './helpers';
import renderPartial from './render-partial';
import cache from './cache';
import render from './render';

export default (rootSelector, vNode) => {
    // allow a string or element as a querySelector value.
    const container = isElement(rootSelector) ? rootSelector : document.querySelector(rootSelector);

    // Shallowly validate vNode.
    const initalVNode = isVNode(vNode) || Array.isArray(vNode) ? vNode : false;

    if (initalVNode === false) {
        throw new Error(`vNode ${cache.vDOM} is not valid`);
    }

    // Cache valid vDOM
    cache.vDOM = initalVNode;
    // Render the inital virual DOM and cache the selectors.
    render(container, false);
    
    return renderPartial;
}