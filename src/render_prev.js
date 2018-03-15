import cache from './cache';

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

const createAndAppendNode = (frag, node) => {
    const isSVG = node.svg === true;

    // TEXT_NODE        3
    if (node.t === 'TEXT') {
        const textNode = document.createTextNode(node.val);
        frag.appendChild(textNode);
        return;
    }
    // // COMMENT_NODE     8
    if (node.t === 'COM') {
        const commentNode = document.createComment(node.val);
        frag.appendChild(commentNode);
        return;
    }
    const notAnElement = !node.hasOwnProperty('el');

    let element;

    if (notAnElement) {
        // ELEMENT_NODE     1
        element = isSVG ? document.createElementNS(SVG_NAMESPACE, node.t) : document.createElement(node.t);

        // Add attributes
        if (node.at) {
            const attributes = node.at;
            const attributeKeys = Object.keys(attributes);
            const attributesLength = attributeKeys.length;

            for (let i = 0; i < attributesLength; i++) {
                const attributeKey = attributeKeys[i];

                // Standard dataset syntax.
                if (attributeKey.indexOf('data-') === 0) {
                    const dataKey = attributeKey.replace('data-', '');
                    element.dataset[dataKey] = attributes[attributeKey];
                    continue;
                }
                // Shorthand dataset syntax.
                if (attributeKey.indexOf('d-') === 0) {
                    const dataKey = attributeKey.replace('d-', '');
                    element.dataset[dataKey] = attributes[attributeKey];
                    continue;
                }
                // Props: _
                if (attributeKey[0] === '_') {
                    const cleanKey = attributeKey.replace('_', '');
                    element[cleanKey] = attributes[attributeKey];
                    continue;
                }

                const attributeValue = attributes[attributeKey];

                switch (attributeKey) {
                    case 'e':
                    case 'event':
                        element.addEventListener(...attributeValue);
                        break;
                    case '$':
                    case 'style':
                        Object.assign(element.style, attributeValue);
                        break;
                    case 'c':
                    case 'class':
                        element.className = attributes.class;
                        break;
                    default:
                        element.setAttribute(attributeKey, attributeValue);
                        break;
                }
            }
        }
    } else {
        element = node.el;
    }
    // Add children
    frag.appendChild(element);

    if (notAnElement && Array.isArray(node.ch)) {
        node.ch.forEach(childNode => {
            createAndAppendNode(element, childNode)
        });
    }
}


export const beforeRender = callback => {
    cache.beforeRenderCallback = callback;
}




const updateDOM = (initalRootElement, renderFragment, replace) => {
    // const fragmentClone = document.importNode(renderFragment, true);
    if (replace) {
        const parent = initalRootElement.parentElement;
        // console.log('parent', parent)
        const childNodes = parent.childNodes;
        // console.log('childNodes', childNodes)
        const childNodesLength = childNodes.length;
        // console.log(initalRootElement, fragmentClone)
        for (let i = 0; i < childNodesLength; i++) {
            if (childNodes[i] === initalRootElement) {

                if (typeof cache.beforeRenderCallback  === 'function') {
                     cache.beforeRenderCallback(renderFragment)
                }
                initalRootElement.replaceWith(renderFragment)
                break;
            }
        }


    } else {
        console.log('Append child fragment clone ')
        initalRootElement.appendChild(fragmentClone);
    }

}

export const renderPrev = (initalRootElement, vNode, isPartial, replace) => {
    // Cache root element 
    // if (cache.rootElement === null) {
    //     cache.rootElement = initalRootElement;
    // }

    // Creates a new fragment for partials but uses 
    // the fragment cache for the inital render.
    const renderFragment = isPartial === true ? document.createDocumentFragment() : cache.fragment;
    const node = isPartial === true ? vNode : cache.vDOM;

    /** 
     * Dummy wrapper to treat a non-wrap node as wrapped.
     */
    const dummyVDOM = {
        "t": "div",
        "id": 2,
        "at": {
            "id": "dummy"
        },
        "ch": node
    }


    if (Array.isArray(node)) {
        createAndAppendNode(
            renderFragment,
            dummyVDOM
        );
        const dummy = renderFragment.firstElementChild;
        const innerNodes = Array.from(dummy.childNodes);
        const innerNodesLength = innerNodes.length;
        const outerNodeList = [];

        for (let i = 0; i < innerNodesLength; i++) {
            renderFragment.appendChild(innerNodes[i])
        }

        renderFragment.removeChild(dummy);

        requestAnimationFrame(() => {
            updateDOM(
                initalRootElement,
                renderFragment,
                replace
            );
        });
    } else {

        // Wrapped element
        createAndAppendNode(renderFragment, node);
        requestAnimationFrame(() => {
            if (!isPartial) {
                updateDOM(
                    initalRootElement,
                    renderFragment,
                    replace
                );
            }
            return;
        });
    }

    return renderFragment;
}