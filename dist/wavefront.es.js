const isPlaneObject = value => ({}).toString.call(value) === '[object Object]';
const isString = value => typeof value === 'string';
const isPrimitive = value => isString(value) || typeof value === 'number';

const isElement = value => value instanceof Element;
const isVNode = value => value.hasOwnProperty('t') && value.hasOwnProperty('id');
const removeChildren = parentNode => {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
};

let vDOM;
let rootElement;
const fragment = document.createDocumentFragment();

var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

/** 
 * @param {string} t - Text 
 * @param {Number} id - Identity (Not an attribute)
 * @param {Number} ix - Index 
 * @param {Object|string} at - Attributes | Primative
 * @param {Array} ch - Children 
 */
const node = (t, id, at, ch, isSVG) => {
    switch (t) {
        case 'primitive':
            return { t: 'TEXT', id, val: at };
        case 'comment':
            return { t: 'COM', id, val: at };
        default:
            return isSVG ? {
                t,
                id,
                at,
                chx: ch.length,
                ch,
                svg: true
            } : {
                t,
                id,
                at,
                chx: ch.length,
                ch
            };
    }
};

let count = 0;

/** 
 Assembly is the mechanics of the tag functions. 
 A Wavefront template is a set of nested functions
 which act similar to recursion. 

 The deepest nested tag of the youngest index is
 the first executed tag function.


**/
const assembly = (tagName, nodeType) => {
    const isSVG = nodeType === true;

    // if (typeof nodeType === 'function') {
    //     if (tagName.indexOf('-') >= 0) {
    //         // Define the custom element. 
    //         window.customElements.define(tagName, nodeType);
    //     } else {
    //         throw new Error(`Invalid custom element name ${tagName}`);
    //     }
    // }

    return function inner(...args) {
        const tagNameStr = `${tagName}`;
        let attributes;
        let item;
        let childNodes = [];
        let i;
        for (i = 0; i < args.length; i++) {
            item = args[i] || {};
            let isItemObject = isPlaneObject(item);
            let isItemVnode = item.hasOwnProperty('t');

            // Check if item is a plane object = attribute.
            if (isItemObject && !isItemVnode) {
                // let isSelector = false; 
                attributes = item;
                continue;
            }

            // Check if item is an array = group of child elements.
            if (Array.isArray(item)) {
                childNodes = [...childNodes, ...item];
                continue;
            }

            // check if item is not an object, array or function = child element.
            if (isItemObject && isItemVnode || isPrimitive(item)) {
                childNodes.push(item);
                continue;
            }

            if (item instanceof Node) {
                //@TODO Convert item to vNode and push;
                console.log('item in assembly', item);
                childNodes.push({ el: item });
                // continue;
            }
        }

        for (i = 0; i < childNodes.length; ++i) {
            const childNode = childNodes[i];
            if (isPrimitive(childNode)) {
                let type;
                let value;
                if (childNode[0] === '@') {
                    type = 'comment';
                    value = childNode.slice(1);
                } else {
                    type = 'primitive';
                    value = childNode;
                }
                count++;
                childNodes[i] = node(type, count, value, null, isSVG);
            }
        }

        count++;
        // Update child nodes with parentId
        for (i = 0; i < childNodes.length; ++i) {
            childNodes[i].pid = count;
            childNodes[i].ix = i;
        }

        return node(tagNameStr, count, attributes, childNodes, isSVG);
    };
};

const render = (initalRootElement, vNode, isPartial) => {
    console.log('X', vNode);
    // Cache root element 
    if (rootElement === undefined) {
        rootElement = initalRootElement;
    }
    // Creates a new fragment for partials but uses 
    // the fragment cache for the inital render.
    // const renderFragment = isPartial === true ? (document.createDocumentFragment()) : fragment; 
    // console.log('renderFragment', document.createDocumentFragment())
    let renderFragment;
    if (isPartial === true) {
        renderFragment = document.createDocumentFragment();
    } else {
        renderFragment = fragment;
    }

    const node = isPartial === true ? vNode : vDOM;

    count = 0; // reset counter used for node ids.


    if (Array.isArray(node)) {

        const dummyVDOM = {
            "t": "div",
            "id": 2,
            "at": {
                "id": "dummy"
            },
            "chx": 1,
            "ch": node
        };

        function appendMultipleNodes() {
            var args = [].slice.call(arguments);
            for (var x = 1; x < args.length; x++) {
                args[0].appendChild(args[x]);
            }
            return args[0];
        }

        createAndAppendNode(renderFragment, dummyVDOM);
        // }
        const dummy = renderFragment.firstElementChild;
        const innerNodes = dummy.childNodes;
        const outerNodeList = [];
        for (let i = 0; i < innerNodes.length; i++) {
            outerNodeList.push(innerNodes[i]);
        }
        renderFragment.removeChild(dummy);

        appendMultipleNodes(renderFragment, ...outerNodeList);

        requestAnimationFrame(() => {
            rootElement.appendChild(renderFragment);

            /** 
               Static Rendering:
               This will generate the inital state
               of the HTML as a string. headers 
               and other content can be generated 
               from the front side or modified on the
               back end...
            **/
            // const staticRender = rootElement.outerHTML;
            // console.log(staticRender)
        });
    } else {
        // Wrapped element

        createAndAppendNode(renderFragment, node);

        // console.log('elementCache', elementCache)
        requestAnimationFrame(() => {
            // if (isPartial) {
            //     removeChilds(rootElement)
            // }
            if (!isPartial) {
                console.log();
                const fragmentClone = document.importNode(renderFragment, true);
                rootElement.appendChild(fragmentClone);
            }
            // console.log('FINAL FRAGMENT', renderFragment)
            /** 
               Static Rendering:
               This will generate the inital state
               of the HTML as a string. headers 
               and other content can be generated 
               from the front side or modified on the
               back end...
            **/
            // const staticRender = rootElement.outerHTML;
            // console.log(staticRender)
            return;
        });
    }

    return renderFragment;
};

// const elementCache = {
//     class: {},
//     id: {},
//     nonexistent: []
// }
const elementCache = {};

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
        // console.log('node.val', node.val)
        const commentNode = document.createComment(node.val);
        frag.appendChild(commentNode);
        return;
    }
    // console.log('notAnElement', node)
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
        console.log('ELEMENT', node.el);
        element = node.el;
    }
    // Add children
    frag.appendChild(element);

    if (notAnElement && Array.isArray(node.ch)) {
        node.ch.forEach(childNode => {
            createAndAppendNode(element, childNode);
        });
    }
};

const searchAndReplace = (selector, newVNode, retrieveAll) => {
    const exchangeChildren = queriedParent => {
        // convert the node to an element
        const partialElement = render(undefined, newVNode, true);
        // Remove children
        removeChildren(queriedParent);
        // Adopt the new element 
        queriedParent.appendChild(partialElement);
    };

    if (retrieveAll) {
        const queriedParents = fragment.querySelectorAll(selector);

        const queriedParentsLength = queriedParents.length;

        for (let i = 0; i < queriedParentsLength; i++) {
            exchangeChildren(queriedParents[i]);
        }
    } else {
        const queriedParent = fragment.querySelector(selector);
        // console.log('queriedParent',queriedParent)
        exchangeChildren(queriedParent);
    }
};

const partialRenderInner = (partialNodes, retrieveAll) => {

    const partialNodesKeys = Object.keys(partialNodes);
    const partialNodesLength = partialNodesKeys.length;
    const elementCachekeys = Object.keys(elementCache);

    for (let i = 0; i < partialNodesLength; i++) {
        const partialNodeKey = partialNodesKeys[i];
        const newVNode = partialNodes[partialNodeKey];
        console.log('partialNodeKey', newVNode, partialNodeKey);

        searchAndReplace(partialNodeKey, newVNode, retrieveAll);
    }

    // Append modified fragment.
    // Remove children
    removeChildren(rootElement);
    const fragmentClone = document.importNode(fragment, true);
    rootElement.appendChild(fragmentClone);
};
const partialRender = partialNodes => partialRenderInner(partialNodes, false);
partialRender.all = partialNodes => partialRenderInner(partialNodes, true);

const initialize = (rootSelector, vNode) => {
    // allow a string or element as a querySelector value.
    const container = isElement(rootSelector) ? rootSelector : document.querySelector(rootSelector);

    // Shallowly validate vNode.
    const initalVNode = isVNode(vNode) ? vNode : false;

    if (initalVNode === false) {
        throw new Error(`vNode ${vDOM} is not valid`);
    }

    // Cache valid vDOM
    vDOM = initalVNode;

    // Render the inital virual DOM and cache the selectors.
    render(container, false);

    // console.log('initialize', container, vNode, selectors)
    return partialRender;
};

// const r = initialize('#root', fullTemplate, '#thisID', '.thisClass', '.childClass');


// setTimeout(() => {
// r({
//     '.thisClass': {
//         "t": "DIV",
//         "id": 90046,
//         "at": {
//             "class": "new-shit",
//             "style": {
//                 "display": "block",
//                 "background": 'yellow',
//                 "padding": "1rem"
//             }
//         },
//         "chx": 1,
//         "ch": [{
//             "t": "TEXT",
//             "id": 90045,
//             "val": "NEW SHIT NEW SHIT",
//             "pid": 90046,
//             "ix": 0
//         }]
//     }
// });
// }, 2000)

const isPlaneObject$1 = value => ({}).toString.call(value) === '[object Object]';

/** 
 * The or method explicitly defines a condition between an array of nodes. 
 * @param {Array} vNodes - An array of vNodes 
 * @param {Number|Array} switch - A number or series of inidcators (as an array) of what elements to display.
 * @exclude {Boolean} exclude - 
 * 
 */
const or = (vNodes, conditions, exclude) => {
    const filteredVNodes = [];
    const filteredIndexes = [];

    // Return the vNode of a given index.
    if (typeof conditions === 'number') {
        return vNodes[conditions];
    }

    // Ensure toggle is an array. 
    const toggle = typeof conditions === 'string' ? [conditions] : conditions;

    // Non-operational.
    if (!Array.isArray(toggle) || toggle.length === 0) {
        return vNodes;
    }

    // Define conditions required.
    const classes = toggle.filter(e => e.indexOf('.') > -1);
    const ids = toggle.filter(e => e.indexOf('#') === 0);
    const tags = toggle.filter(e => /^[a-z0-9]+$/i.test(e));
    const children = toggle.filter(e => e.indexOf('~') === 0);
    const indexes = toggle.filter(e => typeof e === 'number');

    const vNodesLength = vNodes.length;

    for (let i = 0; i < vNodesLength; i++) {

        const vNode = vNodes[i];
        const attributes = vNode.at;

        // Check class.
        if (classes.length > 0) {
            classes.forEach(c => {
                if (attributes.class.includes(c.slice(1))) {
                    filteredIndexes.push(i);
                }
            });
        }

        // Check ids.
        if (ids.length > 0) {
            ids.forEach(c => {
                if (attributes.id === c.slice(1)) {
                    filteredIndexes.push(i);
                }
            });
        }

        // Check tags.
        if (tags.length > 0) {
            tags.forEach(c => {
                if (vNode.t.toUpperCase() === c.toUpperCase()) {
                    filteredIndexes.push(i);
                }
            });
        }

        // Check children.
        if (children.length > 0) {
            children.forEach(x => {
                const childrenLength = vNode.ch.filter(c => c.t !== 'TEXT' && c.t !== 'COM').length;
                if (childrenLength == x.slice(1)) {
                    filteredIndexes.push(i);
                }
            });
        }
    }

    // Remove duplicate indexes.
    const indexList = [...new Set(filteredIndexes)];

    if (exclude === true) {
        return vNodes.filter(function (item, i) {
            return indexList.indexOf(i) === -1;
        });
    } else {
        indexList.forEach(index => {
            filteredVNodes.push(vNodes[index]);
        });
        return filteredVNodes;
    }
};

/** 
 * or is used when you explicitly want the to inidicate
 * that an item is being looped by n times or via data
 * 
 * @param {Object|Array} vNodes 
 * @param {*} Data 
 */
const loop = (vNodes, data) => {
    const groupVnodes = Array.isArray(vNodes);
    const hasNumber = typeof data === 'number';

    if (hasNumber) {
        const loopedVnodes = [];
        const singleVnode = isPlaneObject$1(vNodes);

        // Single vnode looped by an integer.
        if (singleVnode) {
            for (let i = 0; i < data; i++) {
                loopedVnodes.push(vNodes);
            }
        }

        // Grouped vnode looped by an integer.
        if (groupVnodes) {
            for (let i = 0; i < data; i++) {
                loopedVnodes.push(...vNodes);
            }
        }
        return loopedVnodes;
    } else {
        if (typeof vNodes === 'function') {
            return vNodes(data);

            if (!Array.isArray(loopedVnodes)) {
                throw new Error('loop() should return an Array of vnodes');
            }
        }
    }
};

// HTML Elements.
const tags$1 = {
    a: assembly('a'),
    abbr: assembly('abbr'),
    address: assembly('address'),
    area: assembly('area'),
    article: assembly('article'),
    aside: assembly('aside'),
    assembly,
    audio: assembly('audio'),
    childNodes: assembly('childNodes'),
    base: assembly('base'),
    bdi: assembly('bdi'),
    bdo: assembly('bdo'),
    blockquote: assembly('blockquote'),
    body: assembly('body'),
    br: assembly('br'),
    button: assembly('button'),
    canvas: assembly('canvas'),
    caption: assembly('caption'),
    cite: assembly('cite'),
    code: assembly('code'),
    col: assembly('col'),
    colgroup: assembly('colgroup'),
    command: assembly('command'),
    dd: assembly('dd'),
    del: assembly('del'),
    dfn: assembly('dfn'),
    div: assembly('div'),
    dl: assembly('dl'),
    doctype: assembly('doctype'),
    dt: assembly('dt'),
    em: assembly('em'),
    embed: assembly('embed'),
    fieldset: assembly('fieldset'),
    figcaption: assembly('figcaption'),
    figure: assembly('figure'),
    footer: assembly('footer'),
    form: assembly('form'),
    h1: assembly('h1'),
    h2: assembly('h2'),
    h3: assembly('h3'),
    h4: assembly('h4'),
    h5: assembly('h5'),
    h6: assembly('h6'),
    header: assembly('header'),
    hgroup: assembly('hgroup'),
    hr: assembly('hr'),
    html: assembly('html'),
    i: assembly('i'),
    iframe: assembly('iframe'),
    img: assembly('img'),
    initialize,
    input: assembly('input'),
    ins: assembly('ins'),
    kbd: assembly('kbd'),
    keygen: assembly('keygen'),
    label: assembly('label'),
    legend: assembly('legend'),
    li: assembly('li'),
    link: assembly('link'),
    loop,
    map: assembly('map'),
    mark: assembly('mark'),
    menu: assembly('menu'),
    meta: assembly('meta'),
    nav: assembly('nav'),
    noscript: assembly('noscript'),
    object: assembly('object'),
    ol: assembly('ol'),
    optgroup: assembly('optgroup'),
    option: assembly('option'),
    or,
    p: assembly('p'),
    param: assembly('param'),
    pre: assembly('pre'),
    progress: assembly('progress'),
    q: assembly('q'),
    rp: assembly('rp'),
    rt: assembly('rt'),
    ruby: assembly('ruby'),
    s: assembly('s'),
    samp: assembly('samp'),
    script: assembly('script'),
    section: assembly('section'),
    select: assembly('select'),
    small: assembly('small'),
    source: assembly('source'),
    span: assembly('span'),
    strong: assembly('strong'),
    style: assembly('style'),
    sub: assembly('sub'),
    sup: assembly('sup'),
    table: assembly('table'),
    tbody: assembly('tbody'),
    td: assembly('td'),
    textarea: assembly('textarea'),
    tfoot: assembly('tfoot'),
    th: assembly('th'),
    thead: assembly('thead'),
    title: assembly('title'),
    tr: assembly('tr'),
    ul: assembly('ul'),
    Var: assembly('var'), // First capital
    video: assembly('video'),

    // SVG Elements.
    svg: assembly('svg', true),
    altGlyph: assembly('altGlyph', true),
    altGlyphDef: assembly('altGlyphDef', true),
    altGlyphItem: assembly('altGlyphItem', true),
    animate: assembly('animate'),
    animateColor: assembly('animateColor', true),
    animateMotion: assembly('animateMotion', true),
    animateTransform: assembly('animateTransform', true),
    animation: assembly('animation', true),
    circle: assembly('circle', true),
    clipPath: assembly('clipPath', true),
    colorProfile: assembly('color-profile', true), // color-profile
    cursor: assembly('cursor', true),
    defs: assembly('defs', true),
    desc: assembly('desc', true),
    discard: assembly('discard', true),
    ellipse: assembly('ellipse', true),
    feBlend: assembly('feBlend', true),
    feColorMatrix: assembly('feComposite', true),
    feComponentTransfer: assembly('feComponentTransfer', true),
    feComposite: assembly('feComposite', true),
    feConvolveMatrix: assembly('feConvolveMatrix', true),
    feDiffuseLighting: assembly('feDiffuseLighting', true),
    feDisplacementMap: assembly('feDistantLight', true),
    feDistantLight: assembly('feDistantLight', true),
    feDropShadow: assembly('feDropShadow', true),
    feFlood: assembly('feFlood', true),
    feFuncA: assembly('feFuncA', true),
    feFuncB: assembly('feFuncB', true),
    feFuncG: assembly('feFuncG', true),
    feFuncR: assembly('feFuncR', true),
    feGaussianBlur: assembly('feGaussianBlur', true),
    feImage: assembly('feImage', true),
    feMerge: assembly('feMerge', true),
    feMergeNode: assembly('feMergeNode', true),
    feMorphology: assembly('feMorphology', true),
    feOffset: assembly('feOffset', true),
    fePointLight: assembly('fePointLight', true),
    feSpecularLighting: assembly('feSpecularLighting', true),
    feSpotLight: assembly('feSpotLight', true),
    feTile: assembly('feTile', true),
    feTurbulence: assembly('feTurbulence', true),
    filter: assembly('filter', true),
    font: assembly('font', true),
    fontFace: assembly('font-face', true), // fontFace
    fontFaceFormat: assembly('font-face-format', true), // fontFaceFormat
    fontFaceName: assembly('font-face-name', true), // fontFaceName
    fontFaceSrc: assembly('font-face-src', true), // fontFaceSrc
    fontFaceUri: assembly('font-face-uri', true), // fontFaceUri
    foreignObject: assembly('foreignObject', true),
    g: assembly('g', true),
    glyph: assembly('glyph', true),
    glyphRef: assembly('glyphRef', true),
    handler: assembly('handler', true),
    hatch: assembly('hatch', true),
    hatchpath: assembly('hatchpath', true),
    hkern: assembly('hkern', true),
    image: assembly('image', true),
    line: assembly('line', true),
    linearGradient: assembly('linearGradient', true),
    listener: assembly('listener'),
    marker: assembly('marker', true),
    mask: assembly('mask', true),
    mesh: assembly('mesh', true),
    meshgradient: assembly('meshgradient', true),
    meshpatch: assembly('meshpatch', true),
    meshrow: assembly('meshrow', true),
    metadata: assembly('metadata', true),
    missingGlyph: assembly('missing-glyph', true), // missing-glyph
    mpath: assembly('mpath', true),
    path: assembly('path', true),
    pattern: assembly('pattern', true),
    polygon: assembly('polygon', true),
    polyline: assembly('polyline', true),
    prefetch: assembly('prefetch', true),
    radialGradient: assembly('radialGradient', true),
    rect: assembly('rect', true),
    set: assembly('set', true),
    solidColor: assembly('solidColor', true),
    solidcolor: assembly('solidcolor', true),
    Stop: assembly('stop', true), // First capital
    Switch: assembly('switch', true), // First capital
    symbol: assembly('symbol', true),
    tbreak: assembly('tbreak', true),
    text: assembly('text', true),
    textArea: assembly('textArea', true),
    textPath: assembly('textPath', true),
    tref: assembly('tref', true),
    tspan: assembly('tspan', true),
    unknown: assembly('unknown', true),
    use: assembly('use', true),
    view: assembly('view', true),
    vkern: assembly('vkern', true)
};

export default tags$1;
//# sourceMappingURL=wavefront.es.js.map
