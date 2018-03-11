import { isVNode, removeChildren } from './helpers';
// import renderPartial from './render-partial';
import cache from './cache';
import renderPrev from './render_prev';

const getElement = value => document.querySelector(value);
export default (selector, vNode, replace) => {
    // allow a string or element as a querySelector value.
    const container = typeof selector === 'string' ? getElement(selector) : selector;

    // Shallowly validate vNode.
    const initalVNode = isVNode(vNode) || Array.isArray(vNode) ? vNode : false;

    // Throw an error if not a valid vNode.
    if (initalVNode === false) {
        throw new Error(`vNode ${cache.vDOM} is not valid`);
    }

    // Cache valid vDOM
    cache.vDOM = initalVNode;
    // Empty the container

    if (replace === true) {
        renderPrev(container, initalVNode, undefined, replace);
    } else {
        removeChildren(container);
        // Render the inital virual DOM and cache the selectors.
        renderPrev(container, initalVNode, undefined, replace);
    }
}