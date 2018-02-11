(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.wavefront = factory());
}(this, (function () { 'use strict';

var isPlaneObject = function isPlaneObject(value) {
    return {}.toString.call(value) === '[object Object]';
};
var isString = function isString(value) {
    return typeof value === 'string';
};
var isPrimitive = function isPrimitive(value) {
    return isString(value) || typeof value === 'number';
};

var isElement = function isElement(value) {
    return value instanceof Element;
};
var isVNode = function isVNode(value) {
    return value.hasOwnProperty('t') && value.hasOwnProperty('id');
};
var removeChildren = function removeChildren(parentNode) {
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
};
/** 
 * Filter by loop 
 * @param {Array} arr 
 * @param {Function} callback 
**/
var filter = function filter(arr, callback) {
    var store = [];
    var arrLength = arr.length;
    for (var i = 0; i < arrLength; i++) {
        if (callback(arr[i])) {
            store.push(arr[i]);
        }
    }
    return store;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var vDOM = void 0;
var rootElement = void 0;
var fragment = document.createDocumentFragment();

var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

/** 
 * @param {string} t - Text 
 * @param {Number} id - Identity (Not an attribute)
 * @param {Number} ix - Index 
 * @param {Object|string} at - Attributes | Primative
 * @param {Array} ch - Children 
 */
var node = function node(t, id, at, ch, isSVG) {
    switch (t) {
        case 'primitive':
            return { t: 'TEXT', id: id, val: at };
        case 'comment':
            return { t: 'COM', id: id, val: at };
        default:
            return isSVG ? {
                t: t,
                id: id,
                at: at,
                chx: ch.length,
                ch: ch,
                svg: true
            } : {
                t: t,
                id: id,
                at: at,
                chx: ch.length,
                ch: ch
            };
    }
};

var count = 0;

/** 
 Assembly is the mechanics of the tag functions. 
 A Wavefront template is a set of nested functions
 which act similar to recursion. 

 The deepest nested tag of the youngest index is
 the first executed tag function.
**/
var assembly = function assembly(tagName, nodeType) {
    var isSVG = nodeType === true;

    return function inner() {
        var tagNameStr = '' + tagName;
        var attributes = void 0;
        var item = void 0;
        var childNodes = [];
        var i = void 0;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var argsLength = args.length;

        for (i = 0; i < argsLength; i++) {
            item = args[i] || {};
            var isItemObject = isPlaneObject(item);
            var isItemVnode = item.hasOwnProperty('t');

            // Check if item is a plane object = attribute.
            if (isItemObject && !isItemVnode) {
                // let isSelector = false; 
                attributes = item;
                continue;
            }

            // Check if item is an array = group of child elements.
            if (Array.isArray(item)) {
                childNodes = [].concat(toConsumableArray(childNodes), toConsumableArray(item));
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
            }
        }

        for (i = 0; i < childNodes.length; ++i) {
            var childNode = childNodes[i];
            if (isPrimitive(childNode)) {
                var type = void 0;
                var value = void 0;
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

var render = function render(initalRootElement, vNode, isPartial) {
    console.log('X', vNode);
    // Cache root element 
    if (rootElement === undefined) {
        rootElement = initalRootElement;
    }
    // Creates a new fragment for partials but uses 
    // the fragment cache for the inital render.

    var renderFragment = void 0;
    if (isPartial === true) {
        renderFragment = document.createDocumentFragment();
    } else {
        renderFragment = fragment;
    }

    var node = isPartial === true ? vNode : vDOM;

    count = 0; // reset counter used for node ids.


    if (Array.isArray(node)) {
        var appendMultipleNodes = function appendMultipleNodes() {
            var args = [].slice.call(arguments);
            for (var x = 1; x < args.length; x++) {
                args[0].appendChild(args[x]);
            }
            return args[0];
        };

        /** 
         * Dummy wrapper to treat a non-wrap node as wrapped.
         */
        var dummyVDOM = {
            "t": "div",
            "id": 2,
            "at": {
                "id": "dummy"
            },
            "chx": 1,
            "ch": node
        };

        createAndAppendNode(renderFragment, dummyVDOM);

        var dummy = renderFragment.firstElementChild;
        var innerNodes = dummy.childNodes;
        var innerNodesLength = innerNodes.length;
        var outerNodeList = [];

        for (var i = 0; i < innerNodesLength; i++) {
            outerNodeList.push(innerNodes[i]);
        }
        renderFragment.removeChild(dummy);

        appendMultipleNodes.apply(undefined, [renderFragment].concat(outerNodeList));

        requestAnimationFrame(function () {
            rootElement.appendChild(renderFragment);
        });
    } else {
        // Wrapped element
        createAndAppendNode(renderFragment, node);
        requestAnimationFrame(function () {
            if (!isPartial) {
                console.log();
                var fragmentClone = document.importNode(renderFragment, true);
                rootElement.appendChild(fragmentClone);
            }
            return;
        });
    }

    return renderFragment;
};

var elementCache = {};

var createAndAppendNode = function createAndAppendNode(frag, node) {
    var _element;

    var isSVG = node.svg === true;

    // TEXT_NODE        3
    if (node.t === 'TEXT') {
        var textNode = document.createTextNode(node.val);
        frag.appendChild(textNode);
        return;
    }
    // // COMMENT_NODE     8
    if (node.t === 'COM') {
        // console.log('node.val', node.val)
        var commentNode = document.createComment(node.val);
        frag.appendChild(commentNode);
        return;
    }
    // console.log('notAnElement', node)
    var notAnElement = !node.hasOwnProperty('el');

    var element = void 0;

    if (notAnElement) {
        // ELEMENT_NODE     1
        element = isSVG ? document.createElementNS(SVG_NAMESPACE, node.t) : document.createElement(node.t);

        // Add attributes
        if (node.at) {
            var attributes = node.at;
            var attributeKeys = Object.keys(attributes);
            var attributesLength = attributeKeys.length;

            for (var i = 0; i < attributesLength; i++) {
                var attributeKey = attributeKeys[i];

                // Standard dataset syntax.
                if (attributeKey.indexOf('data-') === 0) {
                    var dataKey = attributeKey.replace('data-', '');
                    element.dataset[dataKey] = attributes[attributeKey];
                    continue;
                }
                // Shorthand dataset syntax.
                if (attributeKey.indexOf('d-') === 0) {
                    var _dataKey = attributeKey.replace('d-', '');
                    element.dataset[_dataKey] = attributes[attributeKey];
                    continue;
                }
                // Props: _
                if (attributeKey[0] === '_') {
                    var cleanKey = attributeKey.replace('_', '');
                    element[cleanKey] = attributes[attributeKey];
                    continue;
                }

                var attributeValue = attributes[attributeKey];

                switch (attributeKey) {
                    case 'e':
                    case 'event':
                        (_element = element).addEventListener.apply(_element, toConsumableArray(attributeValue));
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
        node.ch.forEach(function (childNode) {
            createAndAppendNode(element, childNode);
        });
    }
};
var elmentModifier = function elmentModifier(selector, CMD, queriedParent, partialDOMNode) {
    var CMDList = CMD.split(' ');
    var CMDListLength = CMDList.length;
    var CMDHasMany = CMDListLength > 1;
    var lastCommand = CMDList[CMDListLength - 1];
    var thirdCommand = CMDList[2];
    var secondCommand = CMDList[1];
    var firstCommand = CMDList[0];

    // offset. 
    var hasOffset = CMDHasMany ? lastCommand[0] === '+' : false;
    var offset = hasOffset ? parseInt(lastCommand.slice(1), 10) : 0;

    // index.
    var hasIndex = !!thirdCommand ? thirdCommand[0] === 'i' : false;
    var index = hasIndex ? parseInt(thirdCommand.slice(1), 10) : 0;

    // nodeType.
    var nodeType = !!secondCommand ? secondCommand[0] : 'e';

    // query.
    var hasQuery = !!secondCommand ? secondCommand.indexOf('=') >= 0 : false;
    var query = hasQuery ? secondCommand.split('=')[1] : null;

    // Action
    var action = firstCommand;

    // NodeType|Index|Offset|Query
    var CMDcode = parseInt([true + 0, hasIndex + 0, hasOffset + 0, hasQuery + 0].join(''), 2);

    console.log('CMDcode', CMDcode);
    console.log('action', action);
    console.log('nodeType', nodeType);
    console.log('index', index);
    console.log('offset', offset);
    console.log('query', query);

    // Define insert functions, 
    var insertBefore = function insertBefore(parent, newNode, refNode) {
        return parent.insertBefore(newNode, refNode);
    };

    function insertAfter(parent, newElement, refNode) {
        console.log(parent, newElement, refNode);
        if (parent.lastChild === refNode) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement, refNode.nextSibling);
        }
    }
    var childNodes = queriedParent.childNodes;
    var childNodesLength = childNodes.length;
    var childLengthAsIndex = childNodesLength - 1;
    // Limit the index to the child nodes length.
    index = index + offset > childLengthAsIndex ? childLengthAsIndex : index;
    offset = index + offset > childLengthAsIndex ? 0 : offset;
    // First command 
    switch (action) {
        /**
         Insert before without an index will insert the new node
         before the parent. 
         **/
        case 'ib':
        case 'ia':
            var insert = action === 'ib' ? insertBefore : insertAfter;
            switch (CMDcode) {
                case 0: // ib
                case 8:
                    // ib e
                    if (nodeType === 't') {
                        var textNode = void 0;
                        for (var i = 0; i < childNodesLength; i++) {
                            var childNode = childNodes[i];
                            if (childNode.nodeType === 3) {
                                console.log('@', childNode, childNodes[i + offset], offset, i);
                                textNode = offset === 0 ? childNode : childNodes[i + offset];
                                break;
                            }
                        }
                        insert(queriedParent, partialDOMNode, textNode);
                        return;
                    }

                    insert(queriedParent.parentElement, partialDOMNode, queriedParent);
                    return;
                case 10: // ib e +1
                case 12: // ib e i0
                case 14:
                    // ib e i0 +1
                    if (nodeType === 't') {
                        var _textNode = void 0;
                        for (var _i = 0; _i < childNodesLength; _i++) {
                            var _childNode = childNodes[_i];
                            if (_childNode.nodeType === 3) {
                                console.log('@', _childNode, childNodes[_i + offset], offset, _i);
                                _textNode = offset === 0 ? _childNode : childNodes[_i + offset];
                                break;
                            }
                        }
                        insert(queriedParent, partialDOMNode, _textNode);
                        return;
                    }
                    insert(queriedParent, partialDOMNode, queriedParent.children[index + offset]);
                    return;
            }
            return;
        case 'r':
            //
            break;
        case 'rb':
            //
            break;
        case 'ra':
            //
            break;
        case 'rA':
            //
            break;
        case 'rAa':
            //
            break;
        case 'rAb':
            //
            break;
        case 'rm':
            //
            break;
        case 'rmb':
            //
            break;
        case 'rma':
            //
            break;
        case 'rmAa':
            //
            break;
        case 'rmAb':
            //
            break;
        case 'rmA':
            //
            break;
    }
};

var exchangeChildren = function exchangeChildren(queriedParent, newVNode, hasCommand, selector, command) {
    // convert the node to an element
    var partialDOMNode = render(undefined, newVNode, true);

    // Update the queriedParent.
    // This will remove children and carry out the partialDOMNode modification. 
    if (hasCommand) {
        elmentModifier(selector, command, queriedParent, partialDOMNode);
    } else {
        // Remove children
        removeChildren(queriedParent);
        // Modifier...
        // // Adopt the new element 
        queriedParent.appendChild(partialDOMNode);
    }
};

var searchAndReplace = function searchAndReplace(query, newVNode, type) {
    var parts = void 0;
    var hasCommand = (parts = query.split('|')).length === 2;
    var selector = parts[0];
    var command = parts[1];
    console.log('XXXX', hasCommand, selector, command);
    if (type === 'single') {
        var queriedParent = fragment.querySelector(selector);
        // console.log(queriedParent, newVNode, hasCommand, selector, command)
        exchangeChildren(queriedParent, newVNode, hasCommand, selector, command);
        return;
    }

    // if (type === 'all') {
    //     const queriedParents = fragment.querySelectorAll(selector);

    //     const queriedParentsLength = queriedParents.length;

    //     for (let i = 0; i < queriedParentsLength; i++) {
    //         exchangeChildren(queriedParents[i], newVNode)
    //     }
    //     return;
    // }
};

var partialRenderInner = function partialRenderInner(partialNodes, type) {
    console.log('yea');
    var partialNodesKeys = Object.keys(partialNodes);
    var partialNodesLength = partialNodesKeys.length;
    var elementCachekeys = Object.keys(elementCache);

    for (var i = 0; i < partialNodesLength; i++) {
        var partialNodeKey = partialNodesKeys[i];
        var newVNode = partialNodes[partialNodeKey];
        console.log(partialNodeKey, newVNode, type);
        searchAndReplace(partialNodeKey, newVNode, type);
    }

    // Append modified fragment.
    // Remove children
    removeChildren(rootElement);
    var fragmentClone = document.importNode(fragment, true);
    rootElement.appendChild(fragmentClone);
};
var partialRender = function partialRender(partialNodes) {
    return partialRenderInner(partialNodes, 'single');
};
partialRender.all = function (partialNodes) {
    return partialRenderInner(partialNodes, 'all');
};

// partialRender.attr = (partialNodes) => partialRenderInner(partialNodes, 'attr');
// partialRender.attrAll = (partialNodes) => partialRenderInner(partialNodes, 'attr-all');
// partialRender.attr = (partialNodes) => partialRenderInner(partialNodes, 'attr');
// partialRender.attrAll = (partialNodes) => partialRenderInner(partialNodes, 'attr-all');

var initialize = function initialize(rootSelector, vNode) {
    // allow a string or element as a querySelector value.
    var container = isElement(rootSelector) ? rootSelector : document.querySelector(rootSelector);

    // Shallowly validate vNode.
    var initalVNode = isVNode(vNode) ? vNode : false;

    if (initalVNode === false) {
        throw new Error('vNode ' + vDOM + ' is not valid');
    }

    // Cache valid vDOM
    vDOM = initalVNode;

    // Render the inital virual DOM and cache the selectors.
    render(container, false);

    return partialRender;
};

var or = function or(vNodes, conditions, exclude) {
    var filteredVNodes = [];
    var filteredIndexes = [];

    // Return the vNode of a given index.
    if (typeof conditions === 'number') {
        return vNodes[conditions];
    }

    // Ensure toggle is an array. 
    var toggle = isString(conditions) ? [conditions] : conditions;

    // Non-operational.
    if (!Array.isArray(toggle) || toggle.length === 0) {
        return vNodes;
    }

    // Define conditions required.
    var classes = filter(toggle, function (e) {
        return e.indexOf('.') > -1;
    });
    var classesLength = classes.length;
    var ids = filter(toggle, function (e) {
        return e.indexOf('#') === 0;
    });
    var tags = filter(toggle, function (e) {
        return (/^[a-z0-9]+$/i.test(e)
        );
    });
    var children = filter(toggle, function (e) {
        return e.indexOf('~') === 0;
    });
    var indexes = filter(toggle, function (e) {
        return typeof e === 'number';
    });
    var vNodesLength = vNodes.length;

    var _loop = function _loop(i) {
        var vNode = vNodes[i];
        var attributes = vNode.at;

        // Check class.
        if (classesLength > 0) {
            for (var j = 0; j < classesLength; j++) {
                if (attributes.class.includes(classes[j].slice(1))) {
                    filteredIndexes.push(i);
                }
            }
        }

        // Check ids.
        if (ids.length > 0) {
            ids.forEach(function (c) {
                if (attributes.id === c.slice(1)) {
                    filteredIndexes.push(i);
                }
            });
        }

        // Check tags.
        if (tags.length > 0) {
            tags.forEach(function (c) {
                if (vNode.t.toUpperCase() === c.toUpperCase()) {
                    filteredIndexes.push(i);
                }
            });
        }

        // Check children.
        if (children.length > 0) {
            children.forEach(function (x) {
                var childrenLength = vNode.ch.filter(function (c) {
                    return c.t !== 'TEXT' && c.t !== 'COM';
                }).length;
                if (childrenLength == x.slice(1)) {
                    filteredIndexes.push(i);
                }
            });
        }
    };

    for (var i = 0; i < vNodesLength; i++) {
        _loop(i);
    }

    // Remove duplicate indexes.
    var indexList = [].concat(toConsumableArray(new Set(filteredIndexes)));

    if (exclude === true) {
        return filter(vNodes, function (item, i) {
            return indexList.indexOf(i) === -1;
        });
    } else {
        indexList.forEach(function (index) {
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
var loop = function loop(vNodes, data) {
    var groupVnodes = Array.isArray(vNodes);
    var hasNumber = typeof data === 'number';

    if (hasNumber) {
        var _loopedVnodes = [];
        var singleVnode = isPlaneObject(vNodes);

        // Single vnode looped by an integer.
        if (singleVnode) {
            for (var i = 0; i < data; i++) {
                _loopedVnodes.push(vNodes);
            }
        }

        // Grouped vnode looped by an integer.
        if (groupVnodes) {
            for (var _i = 0; _i < data; _i++) {
                _loopedVnodes.push.apply(_loopedVnodes, toConsumableArray(vNodes));
            }
        }
        return _loopedVnodes;
    } else {
        if (typeof vNodes === 'function') {
            return vNodes(data);

            if (!Array.isArray(loopedVnodes)) {
                throw new Error('loop() should return an Array of vnodes');
            }
        }
    }
};

var tags$1 = {
    a: assembly('a'),
    abbr: assembly('abbr'),
    address: assembly('address'),
    area: assembly('area'),
    article: assembly('article'),
    aside: assembly('aside'),
    assembly: assembly,
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
    initialize: initialize,
    input: assembly('input'),
    ins: assembly('ins'),
    kbd: assembly('kbd'),
    keygen: assembly('keygen'),
    label: assembly('label'),
    legend: assembly('legend'),
    li: assembly('li'),
    link: assembly('link'),
    loop: loop,
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
    or: or,
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

return tags$1;

})));
//# sourceMappingURL=wavefront.js.map
