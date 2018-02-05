(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var isPlaneObject$1 = function isPlaneObject(value) {
    return {}.toString.call(value) === '[object Object]';
};
var isString$1 = function isString(value) {
    return typeof value === 'string';
};
var isPrimitive$1 = function isPrimitive(value) {
    return isString$1(value) || typeof value === 'number';
};
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
var assembly = function assembly(tagName, isSVG) {

    return function inner() {
        var tagNameStr = '' + tagName;
        var attributes = void 0;
        var item = void 0;
        var childNodes$$1 = [];
        var i$$1 = void 0;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        for (i$$1 = 0; i$$1 < args.length; i$$1++) {
            item = args[i$$1] || {};
            var isItemObject = isPlaneObject$1(item);
            var isItemVnode = item.hasOwnProperty('t');

            // Check if item is a plane object = attribute.
            if (isItemObject && !isItemVnode) {
                // let isSelector = false;
                attributes = item;
                continue;
            }

            // Check if item is an array = group of child elements.
            if (Array.isArray(item)) {
                childNodes$$1 = [].concat(toConsumableArray(childNodes$$1), toConsumableArray(item));
                continue;
            }

            // check if item is not an object, array or function = child element.
            if (isItemObject && isItemVnode || isPrimitive$1) {
                childNodes$$1.push(item);
                continue;
            }
        }

        for (i$$1 = 0; i$$1 < childNodes$$1.length; ++i$$1) {
            var childNode = childNodes$$1[i$$1];
            if (isPrimitive$1(childNode)) {
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
                childNodes$$1[i$$1] = node(type, count, value, null, isSVG);
            }
        }

        count++;
        // Update child nodes with parentId
        for (i$$1 = 0; i$$1 < childNodes$$1.length; ++i$$1) {
            childNodes$$1[i$$1].pid = count;
            childNodes$$1[i$$1].ix = i$$1;
        }

        return node(tagNameStr, count, attributes, childNodes$$1, isSVG);
    };
};

var renderPartial = function renderPartial(selector) {
    var container = document.querySelector(selector);
    var fragment = document.createDocumentFragment();
    return function (newNode, cache) {
        count = 0; // reset counter used for node ids.

        if (cache === undefined) {
            if (Array.isArray(newNode)) {
                var appendMultipleNodes = function appendMultipleNodes() {
                    var args = [].slice.call(arguments);
                    for (var x = 1; x < args.length; x++) {
                        args[0].appendChild(args[x]);
                    }
                    return args[0];
                };

                var wrappedVTree = div({ id: 'dummy' }, newNode);
                var unWrappedVTree = wrappedVTree.ch;

                createAndAppendNode(fragment, wrappedVTree);
                // }
                var dummy = fragment.firstElementChild;
                var innerNodes = dummy.childNodes;
                var outerNodeList = [];
                for (var i$$1 = 0; i$$1 < innerNodes.length; i$$1++) {
                    outerNodeList.push(innerNodes[i$$1]);
                }
                fragment.removeChild(dummy);

                appendMultipleNodes.apply(undefined, [fragment].concat(outerNodeList));

                requestAnimationFrame(function () {
                    container.appendChild(fragment);

                    /** 
                       Static Rendering:
                       This will generate the inital state
                       of the HTML as a string. headers 
                       and other content can be generated 
                       from the front side or modified on the
                       back end...
                    **/
                    // const staticRender = container.outerHTML;
                    // console.log(staticRender)
                });
            } else {
                // Wrapped element
                createAndAppendNode(fragment, newNode);

                requestAnimationFrame(function () {
                    container.appendChild(fragment);

                    /** 
                       Static Rendering:
                       This will generate the inital state
                       of the HTML as a string. headers 
                       and other content can be generated 
                       from the front side or modified on the
                       back end...
                    **/
                    // const staticRender = container.outerHTML;
                    // console.log(staticRender)
                });
            }
        }
    };
};

var createAndAppendNode = function createAndAppendNode(fragment, node) {
    var isSVG = node.svg === true;
    // TEXT_NODE        3
    if (node.t === 'TEXT') {
        var textNode = document.createTextNode(node.val);
        fragment.appendChild(textNode);
        return;
    }
    // // COMMENT_NODE     8
    if (node.t === 'COM') {
        console.log('node.val', node.val);
        var commentNode = document.createComment(node.val);
        fragment.appendChild(commentNode);
        return;
    }

    // ELEMENT_NODE     1
    var element = isSVG ? document.createElementNS(SVG_NAMESPACE, node.t) : document.createElement(node.t);

    // Add attributes
    if (node.at) {
        var attributes = node.at;
        var attributeKeys = Object.keys(attributes);
        var attributesLength = attributeKeys.length;

        for (var i$$1 = 0; i$$1 < attributesLength; i$$1++) {

            var attributeKey = attributeKeys[i$$1];

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

            switch (attributeKey) {
                case 'e':
                case 'event':
                    element.addEventListener.apply(element, toConsumableArray(attributes[attributeKey]));
                    break;
                case '$':
                case 'style':
                    Object.assign(element.style, attributes[attributeKey]);
                    break;
                case 'c':
                case 'class':
                    element.className = attributes.class;
                    break;
                default:
                    element.setAttribute(attributeKey, attributes[attributeKey]);
                    break;
            }
        }
    }

    // Add children
    fragment.appendChild(element);

    if (Array.isArray(node.ch)) {
        node.ch.forEach(function (childNode) {
            createAndAppendNode(element, childNode);
        });
    }
};

var a = assembly('a');
























var div = assembly('DIV');










var h1 = assembly('h1');
var h2 = assembly('h2');

















var li = assembly('li');






















var section = assembly('section');



var span = assembly('span');






var td = assembly('td');





var tr = assembly('tr');
var ul = assembly('ul');
 // First capital


// SVG Elements.
var svg = assembly('svg', true);










 // color-profile

var defs = assembly('defs', true);


var ellipse = assembly('ellipse', true);



























 // fontFace
 // fontFaceFormat
 // fontFaceName
 // fontFaceSrc
 // fontFaceUri










var linearGradient = assembly('linearGradient', true);








 // missing-glyph











var Stop = assembly('stop', true); // First capital
 // First capital

var isPlaneObject$2 = function isPlaneObject(value) {
    return {}.toString.call(value) === '[object Object]';
};

/** 
 * The or method explicitly defines a condition between an array of nodes. 
 * @param {Array} vNodes - An array of vNodes 
 * @param {Number|Array} switch - A number or series of inidcators (as an array) of what elements to display.
 * @exclude {Boolean} exclude - 
 * 
 */
var or = function or(vNodes, conditions, exclude) {
    var filteredVNodes = [];
    var filteredIndexes = [];

    // Return the vNode of a given index.
    if (typeof conditions === 'number') {
        return vNodes[conditions];
    }

    // Ensure toggle is an array. 
    var toggle = typeof conditions === 'string' ? [conditions] : conditions;

    // Non-operational.
    if (!Array.isArray(toggle) || toggle.length === 0) {
        return vNodes;
    }

    // Define conditions required.
    var classes = toggle.filter(function (e) {
        return e.indexOf('.') > -1;
    });
    var ids = toggle.filter(function (e) {
        return e.indexOf('#') === 0;
    });
    var tags = toggle.filter(function (e) {
        return (/^[a-z0-9]+$/i.test(e)
        );
    });
    var children = toggle.filter(function (e) {
        return e.indexOf('~') === 0;
    });
    var indexes = toggle.filter(function (e) {
        return typeof e === 'number';
    });

    var vNodesLength = vNodes.length;

    var _loop = function _loop(i) {

        var vNode = vNodes[i];
        var attributes = vNode.at;

        // Check class.
        if (classes.length > 0) {
            classes.forEach(function (c) {
                if (attributes.class.includes(c.slice(1))) {
                    filteredIndexes.push(i);
                }
            });
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
        return vNodes.filter(function (item, i) {
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
        var singleVnode = isPlaneObject$2(vNodes);

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

//////////////////
// test.
var startTime;
var lastMeasure;
var startMeasure = function startMeasure(name) {
    startTime = performance.now();
    lastMeasure = name;
};
var stopMeasure = function stopMeasure() {
    var last = lastMeasure;
    if (lastMeasure) {
        window.setTimeout(function () {
            lastMeasure = null;
            var stop = performance.now();
            var duration = 0;
            console.log(last + " took " + (stop - startTime));
        }, 0);
    }
};

function _random(max) {
    return Math.round(Math.random() * 1000) % max;
}

var buildData = function buildData() {
    var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;

    var id = 0;
    var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
    var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
    var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
    var data = [];
    for (var i$$1 = 0; i$$1 < count; i$$1++) {
        data.push({ id: id, label: adjectives[_random(adjectives.length)] + " " + colours[_random(colours.length)] + " " + nouns[_random(nouns.length)] });
    }return data;
};

var lotsData = buildData(10000);
console.log('lotsData', lotsData);
var table$$1 = function table$$1(dat) {
    return tr({ class: 'menu-item' }, [td({ class: 'col-md-1' }, dat.id), td({ class: 'col-md-4' }, a({ class: 'lbl' }, dat.label)), td({ class: 'col-md-1' }, a({ class: 'remove' }, span({
        class: 'glyphicon glyphicon-remove remove'
    }))), td({ class: 'col-md-6' })]);
};

var buildTable = function buildTable(data) {
    var arrayOfChildren = [];
    for (var i$$1 = 0; i$$1 < data.length; i$$1++) {
        arrayOfChildren.push(table$$1(data[i$$1]));
    }
    console.log('arrayOfChildren', arrayOfChildren);
    return arrayOfChildren;
};

//////////////////


var twitterHref = 'http://google.com';
var facebookHref = 'http://facebook.com';
var someUI = div({ class: 'wrapper' }, div({ id: 'block-social-responsive', class: 'footer__social' }, ul({ class: 'menu' }, li({ class: 'menu-item' }, a({ href: twitterHref, class: 'icon-twitter', target: '_blank' }, 'TWITTER')), li({ class: 'menu-item' }, a({
    href: facebookHref,
    class: 'icon-fb',
    target: '_blank',
    _innerHTML: 'HELOOOOOOO',
    // event: ['mouseover', (e) => { console.log('THIS ELEMENT', e.target) }, false],
    $: { backgroundColor: 'red', color: 'yellow' },
    'd-foijfwoeifjw': 2000000000,
    name: 'jack'
}, 'FACEBOOK')), or([div({ class: 'hello', id: 'yeaa' }, 'HELLO'), div({ class: 'foo' }, 'FOO'), a({ class: 'bar', id: 'yeaa' }, h1('This is H TAG 1'), h2('This is H TAG 2'), 'BAR'), div({ class: 'baz' }, 'BAZ'), section({ class: 'hello' }, h1('This is H TAG 1'), h2('This is H TAG 2')), section({ class: 'world' }, 'WORLD')], ['~2', '.world'], true),
// Without variables...
li({ class: 'menu-item' }, a({ href: 'https://www.linkedin.com/company/208777', class: 'icon-in', target: '_blank' }, 'Linkedin'), '@This is a single line comment'), loop(li({ style: { backgroundColor: 'pink', fontSize: 20 } }, 'HELLO WORLD'), 5), loop(buildTable, lotsData))), section({ id: 'blah', class: 'wefw' }, 'TEST SECTION'), svg({ height: 150, width: 400 }, defs(linearGradient({ id: 'grad1', x1: '0%', y1: '0%', x2: '0%', y2: '100%' }, Stop({ offset: '0%', style: { 'stop-color': 'rgb(255,0,0)', 'stop-opacity': 1 } }), Stop({ offset: '100%', style: { 'stop-color': 'rgb(255,255,0)', 'stop-opacity': 1 } }))), ellipse({ cx: 200, cy: 70, rx: 85, ry: 55, fill: 'url(#grad1)' }), 'Sorry, your browser does not support inline SVG.'), '@This comment is outside');

document.addEventListener('click', function () {
    startMeasure('Wavefront');
    var render = renderPartial('#root');
    render(someUI);
    stopMeasure();
}, false);

})));
//# sourceMappingURL=wavefront.js.map
