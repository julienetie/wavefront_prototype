import { isVNode, removeChildren } from './helpers';
import renderPartial from './render-partial';
import cache from './cache';
import render from './render';

export default (rootSelector, vNode, replace) => {
    // allow a string or element as a querySelector value.
    const container = rootSelector instanceof Element ? rootSelector : document.querySelector(rootSelector);

    // Shallowly validate vNode.
    const initalVNode = isVNode(vNode) || Array.isArray(vNode) ? vNode : false;

    if (initalVNode === false) {
        throw new Error(`vNode ${cache.vDOM} is not valid`);
    }

    // Cache valid vDOM
    cache.vDOM = initalVNode;
    // Empty the container

    if (replace === true) {
        render(container, false, undefined, replace);
    } else {
        removeChildren(container);
        // Render the inital virual DOM and cache the selectors.
        render(container, false, undefined, replace);
    }
    return renderPartial;
}