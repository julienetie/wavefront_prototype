(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.wavefront = global.wavefront || {})));
}(this, (function (exports) { 'use strict';

function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children,
        text: text, elm: elm, key: key };
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};























































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * @license
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash include="isPlainObject" -o isPlainObject.js`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
// ;(function() {

/** Used as the semantic version number. */
var objectTag = '[object Object]';

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

/*--------------------------------------------------------------------------*/

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/** Used to lookup unminified function names. */
function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || objectToString.call(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

/*------------------------------------------------------------------------*/

// Add methods that return unwrapped values in chain sequences.

console.log('vnode', vnode);

function isPrimitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}





function addNS(data, children, sel) {
    data.ns = 'http://www.w3.org/2000/svg';
    if (sel !== 'foreignObject' && children !== undefined) {
        for (var i = 0; i < children.length; ++i) {
            var childData = children[i].data;
            if (childData !== undefined) {
                addNS(childData, children[i].children, children[i].sel);
            }
        }
    }
}

var assembly = function assembly(tagName) {
    return function inner() {
        var sel = '' + tagName;
        var selectorName = tagName;
        var attributes = {};
        var item = void 0;
        var textNode = void 0;
        var childNodes = [];
        var i = void 0;
        var children = void 0;
        var text = void 0;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        for (i = 0; i < args.length; i++) {
            item = args[i] || {};
            var isItemObject = isPlainObject(item);
            var isItemVnode = item.hasOwnProperty('sel');

            // Check if item is a plane object = attribute.
            if (isItemObject && !isItemVnode) {
                console.log('attributes', item);
                if (item.hasOwnProperty('id')) {
                    selectorName += '#' + item.id;
                }
                if (item.hasOwnProperty('class') || item.hasOwnProperty('_')) {
                    selectorName += '.' + item.class;
                }

                for (var property in item) {
                    if (property !== 'class' && property !== 'id' && property !== '_') {
                        if (property === 'event') {
                            attributes.on = item.event;
                        } else {
                            attributes[property] = item[property];
                        }
                    }
                }
                continue;
            }

            // Check if item is an array = group of child elements.
            if (Array.isArray(item)) {
                childNodes = [].concat(toConsumableArray(childNodes), toConsumableArray(item));
                continue;
            }

            // check if item is not an object, array or function = child element.
            if (isItemObject && isItemVnode || isPrimitive) {
                childNodes.push(item);
                continue;
            }
        }

        for (i = 0; i < childNodes.length; ++i) {
            if (isPrimitive(childNodes[i])) {
                childNodes[i] = vnode(undefined, undefined, undefined, childNodes[i]);
            }
        }

        if (selectorName[0] === 's' && selectorName[1] === 'v' && selectorName[2] === 'g' && (selectorName.length === 3 || selectorName[3] === '.' || selectorName[3] === '#')) {
            addNS(attributes, childNodes, selectorName);
        }

        return vnode(selectorName, attributes, childNodes, text, undefined);
    };
};

var a = assembly('a');
var abbr = assembly('abbr');
var address = assembly('address');
var area = assembly('area');
var article = assembly('article');
var aside = assembly('aside');
var audio = assembly('audio');
var childNodes = assembly('childNodes');
var base = assembly('base');
var bdi = assembly('bdi');
var bdo = assembly('bdo');
var blockquote = assembly('blockquote');
var body = assembly('body');
var br = assembly('br');
var button = assembly('button');
var canvas = assembly('canvas');
var caption = assembly('caption');
var cite = assembly('cite');
var code = assembly('code');
var col = assembly('col');
var colgroup = assembly('colgroup');
var command = assembly('command');
var dd = assembly('dd');
var del = assembly('del');
var dfn = assembly('dfn');
var div = assembly('DIV');
var dl = assembly('dl');
var doctype = assembly('doctype');
var dt = assembly('dt');
var em = assembly('em');
var embed = assembly('embed');
var fieldset = assembly('fieldset');
var figcaption = assembly('figcaption');
var figure = assembly('figure');
var footer = assembly('footer');
var form = assembly('form');
var h1 = assembly('h1');
var h2 = assembly('h2');
var h3 = assembly('h3');
var h4 = assembly('h4');
var h5 = assembly('h5');
var h6 = assembly('h6');
var header = assembly('header');
var hgroup = assembly('hgroup');
var hr = assembly('hr');
var html = assembly('html');
var i = assembly('i');
var iframe = assembly('iframe');
var img = assembly('img');
var input = assembly('input');
var ins = assembly('ins');
var kbd = assembly('kbd');
var keygen = assembly('keygen');
var label = assembly('label');
var legend = assembly('legend');
var li = assembly('li');
var link = assembly('link');
var map = assembly('map');
var mark = assembly('mark');
var menu = assembly('menu');
var meta = assembly('meta');
var nav = assembly('nav');
var noscript = assembly('noscript');
var object = assembly('object');
var ol = assembly('ol');
var optgroup = assembly('optgroup');
var option = assembly('option');
var p = assembly('p');
var param = assembly('param');
var pre = assembly('pre');
var progress = assembly('progress');
var q = assembly('q');
var rp = assembly('rp');
var rt = assembly('rt');
var ruby = assembly('ruby');
var s = assembly('s');
var samp = assembly('samp');
var script = assembly('script');
var section = assembly('section');
var select = assembly('select');
var small = assembly('small');
var source = assembly('source');
var span = assembly('span');
var strong = assembly('strong');
var style = assembly('style');
var sub = assembly('sub');
var sup = assembly('sup');
var table = assembly('table');
var tbody = assembly('tbody');
var td = assembly('td');
var textarea = assembly('textarea');
var tfoot = assembly('tfoot');
var th = assembly('th');
var thead = assembly('thead');
var title = assembly('title');
var tr = assembly('tr');
var ul = assembly('ul');
var v = assembly('var');
var video = assembly('video');

exports.a = a;
exports.abbr = abbr;
exports.address = address;
exports.area = area;
exports.article = article;
exports.aside = aside;
exports.audio = audio;
exports.childNodes = childNodes;
exports.base = base;
exports.bdi = bdi;
exports.bdo = bdo;
exports.blockquote = blockquote;
exports.body = body;
exports.br = br;
exports.button = button;
exports.canvas = canvas;
exports.caption = caption;
exports.cite = cite;
exports.code = code;
exports.col = col;
exports.colgroup = colgroup;
exports.command = command;
exports.dd = dd;
exports.del = del;
exports.dfn = dfn;
exports.div = div;
exports.dl = dl;
exports.doctype = doctype;
exports.dt = dt;
exports.em = em;
exports.embed = embed;
exports.fieldset = fieldset;
exports.figcaption = figcaption;
exports.figure = figure;
exports.footer = footer;
exports.form = form;
exports.h1 = h1;
exports.h2 = h2;
exports.h3 = h3;
exports.h4 = h4;
exports.h5 = h5;
exports.h6 = h6;
exports.header = header;
exports.hgroup = hgroup;
exports.hr = hr;
exports.html = html;
exports.i = i;
exports.iframe = iframe;
exports.img = img;
exports.input = input;
exports.ins = ins;
exports.kbd = kbd;
exports.keygen = keygen;
exports.label = label;
exports.legend = legend;
exports.li = li;
exports.link = link;
exports.map = map;
exports.mark = mark;
exports.menu = menu;
exports.meta = meta;
exports.nav = nav;
exports.noscript = noscript;
exports.object = object;
exports.ol = ol;
exports.optgroup = optgroup;
exports.option = option;
exports.p = p;
exports.param = param;
exports.pre = pre;
exports.progress = progress;
exports.q = q;
exports.rp = rp;
exports.rt = rt;
exports.ruby = ruby;
exports.s = s;
exports.samp = samp;
exports.script = script;
exports.section = section;
exports.select = select;
exports.small = small;
exports.source = source;
exports.span = span;
exports.strong = strong;
exports.style = style;
exports.sub = sub;
exports.sup = sup;
exports.table = table;
exports.tbody = tbody;
exports.td = td;
exports.textarea = textarea;
exports.tfoot = tfoot;
exports.th = th;
exports.thead = thead;
exports.title = title;
exports.tr = tr;
exports.ul = ul;
exports.v = v;
exports.video = video;

Object.defineProperty(exports, '__esModule', { value: true });

})));
