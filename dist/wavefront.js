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

function isPrimitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}

function isObject(val) {
    return val != null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && Array.isArray(val) === false;
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
    return function inner(props, b) {
        var sel = '' + tagName;
        var selectorName = tagName;
        var d = {};

        if (isObject(props)) {
            if (props.hasOwnProperty('id')) {
                selectorName += '#' + props.id;
            }
            if (props.hasOwnProperty('class') || props.hasOwnProperty('_')) {
                selectorName += '.' + props.class;
            }

            for (var prop in props) {
                if (prop !== 'class' && prop !== 'id' && prop !== '_') {
                    if (prop === 'event') {
                        d.on = props.event;
                    } else {
                        d[prop] = props[prop];
                    }
                }
            }
        } else {
            throw new Error('Props is not an object');
        }

        var children, text, i;
        if (b !== undefined) {
            if (Array.isArray(b)) {
                children = b;
            } else if (isPrimitive(b)) {
                text = b;
            } else if (b && b.sel) {
                children = [b];
            }
        }

        if (Array.isArray(children)) {
            for (i = 0; i < children.length; ++i) {
                if (isPrimitive(children[i])) children[i] = vnode(undefined, undefined, undefined, children[i]);
            }
        }
        if (selectorName[0] === 's' && selectorName[1] === 'v' && selectorName[2] === 'g' && (selectorName.length === 3 || selectorName[3] === '.' || selectorName[3] === '#')) {
            addNS(d, children, selectorName);
        }

        return vnode(selectorName, d, children, text, undefined);
    };
};

var a = assembly('a');
var abbr = assembly('abbr');
var address = assembly('address');
var area = assembly('area');
var article = assembly('article');
var aside = assembly('aside');
var audio = assembly('audio');
var b = assembly('b');
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
exports.b = b;
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
