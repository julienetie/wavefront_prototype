const isPlaneObject = value => ({}).toString.call(value) === '[object Object]';
const isVNode = value => value.hasOwnProperty('t');
const removeChildren = parentNode => {
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
};

/** 
 * Filter by loop 
 * @param {Array} arr 
 * @param {Function} callback 
 **/
const filter = (arr, callback) => {
    const store = [];
    const arrLength = arr.length;
    for (let i = 0; i < arrLength; i++) {
        if (callback(arr[i])) {
            store.push(arr[i]);
        }
    }
    return store;
};

/** 
 * @param {string} t - Tag name 
 * @param {Object|string} at - Attributes | Primative
 * @param {Array} ch - Children 
 * @param {Boolean} isSVG 
 */
const vNode = (t, at, ch, isSVG) => {
    switch (t) {
        case 'primitive':
            return { t: 'TEXT', val: at };
        case 'comment':
            return { t: 'COM', val: at };
        default:
            return isSVG ? {
                t,
                at,
                ch,
                svg: true
            } : {
                t,
                at,
                ch
            };
    }
};

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
};

const getDefinedAttributes = element => {
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
};

const abstract = (interfaceSelector, whitespaceRules = 'trim') => {
    const element = typeof interfaceSelector.nodeType === 'number' ? interfaceSelector : document.querySelector(interfaceSelector);
    const definedAttributes = getDefinedAttributes(element);
    const isSVG = element instanceof SVGElement;
    const childNodes = getChildNodesAsArray(element.childNodes, whitespaceRules);

    switch (element.nodeType) {
        case 1:
            return vNode(element.tagName, definedAttributes, childNodes, isSVG);
        case 3:
            return vNode('primitive', element.nodeValue);
        case 8:
            return vNode('comment', element.nodeValue);
    }
};

/** 
 Assembly is the mechanics of the tag functions. 
 A Wavefront template is a set of nested functions
 which act similar to recursion. 

 The deepest nested tag of the youngest index is
 the first executed tag function.
**/
var assembly = ((tagName, nodeType) => {
    const isSVG = nodeType === true;
    return (...args) => {
        const tagNameStr = `${tagName}`;
        let attributes;
        let childNodes = [];
        const argsLength = args.length;
        let i;

        for (i = 0; i < argsLength; i++) {
            const item = args[i] || {};
            let isItemObject = isPlaneObject(item);
            let isItemVnode = item.hasOwnProperty('t');

            // Check if item is a plane object = attribute.
            if (isItemObject && !isItemVnode) {
                attributes = item;
                continue;
            }

            // Check if item is an array = group of child elements.
            if (Array.isArray(item)) {
                childNodes = [...childNodes, ...item];
                continue;
            }

            // check if item is not an object, array or function = child element.
            if (isItemObject && isItemVnode || typeof item === 'string' || typeof item === 'number') {
                childNodes.push(item);
                continue;
            }

            if (item instanceof Node) {
                //@TODO Convert item to vNode and push;
                childNodes.push({ el: item });
            }
        }

        const childNodesLength = childNodes.length;

        for (i = 0; i < childNodesLength; ++i) {
            const childNode = childNodes[i];
            if (typeof childNode === 'string' || typeof childNode === 'number') {
                const isComment = childNode[0] === '@';
                const type = isComment ? 'comment' : 'primitive';
                const value = isComment ? childNode.slice(1) : childNode;
                childNodes[i] = vNode(type, value, null, isSVG);
            }
        }

        return vNode(tagNameStr, attributes, childNodes, isSVG);
    };
});

/** 
 * Shared cache accessible between modules. 
 */
const cache = {
	vDOM: null,
	rootElement: null,
	fragment: document.createDocumentFragment()
};

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
            createAndAppendNode(element, childNode);
        });
    }
};

const updateDOM = (initalRootElement, renderFragment, replace) => {
    const fragmentClone = document.importNode(renderFragment, true);
    if (replace) {
        const parent = initalRootElement.parentElement;
        const childNodes = parent.childNodes;
        const childNodesLength = childNodes.length;
        console.log(initalRootElement, fragmentClone);
        for (let i = 0; i < childNodesLength; i++) {
            if (childNodes[i] === initalRootElement) {
                initalRootElement.replaceWith(fragmentClone);
                break;
            }
        }
    } else {
        console.log('Append child fragment clone ');
        initalRootElement.appendChild(fragmentClone);
    }
};

var renderPrev = ((initalRootElement, vNode, isPartial, replace) => {
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
    };

    if (Array.isArray(node)) {
        createAndAppendNode(renderFragment, dummyVDOM);
        const dummy = renderFragment.firstElementChild;
        const innerNodes = Array.from(dummy.childNodes);
        const innerNodesLength = innerNodes.length;

        for (let i = 0; i < innerNodesLength; i++) {
            renderFragment.appendChild(innerNodes[i]);
        }

        renderFragment.removeChild(dummy);

        requestAnimationFrame(() => {
            updateDOM(initalRootElement, renderFragment, replace);
        });
    } else {

        // Wrapped element
        createAndAppendNode(renderFragment, node);
        requestAnimationFrame(() => {
            if (!isPartial) {
                updateDOM(initalRootElement, renderFragment, replace);
            }
            return;
        });
    }

    return renderFragment;
});

const getElement = value => document.querySelector(value);
var render = ((selector, vNode$$1, replace) => {
    // allow a string or element as a querySelector value.
    const container = typeof selector === 'string' ? getElement(selector) : selector;

    // Shallowly validate vNode.
    const initalVNode = isVNode(vNode$$1) || Array.isArray(vNode$$1) ? vNode$$1 : false;

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
});

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
    const classes = filter(toggle, e => e.indexOf('.') > -1);
    const classesLength = classes.length;
    const ids = filter(toggle, e => e.indexOf('#') === 0);
    const tags = filter(toggle, e => /^[a-z0-9]+$/i.test(e));
    const children = filter(toggle, e => e.indexOf('~') === 0);
    const indexes = filter(toggle, e => typeof e === 'number');
    const vNodesLength = vNodes.length;

    for (let i = 0; i < vNodesLength; i++) {
        const vNode$$1 = vNodes[i];
        const attributes = vNode$$1.at;

        // Check class.
        if (classesLength > 0) {
            for (let j = 0; j < classesLength; j++) {
                if (attributes.class.includes(classes[j].slice(1))) {
                    filteredIndexes.push(i);
                }
            }
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
                if (vNode$$1.t.toUpperCase() === c.toUpperCase()) {
                    filteredIndexes.push(i);
                }
            });
        }

        // Check children.
        if (children.length > 0) {
            children.forEach(x => {
                const childrenLength = vNode$$1.ch.filter(c => c.t !== 'TEXT' && c.t !== 'COM').length;
                if (childrenLength == x.slice(1)) {
                    filteredIndexes.push(i);
                }
            });
        }
    }

    // Remove duplicate indexes.
    const indexList = [...new Set(filteredIndexes)];

    if (exclude === true) {
        return filter(vNodes, (item, i) => indexList.indexOf(i) === -1);
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
        const singleVnode = isPlaneObject(vNodes);

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
const tags = {
    a: assembly('a'),
    abbr: assembly('abbr'),
    abstract,
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
    render,
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

export default tags;
//# sourceMappingURL=wavefront.es.js.map
