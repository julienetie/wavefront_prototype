import vnode from '../libs/vnode';
import isPlaneObject from '../libs/is-plane-object';
import { init } from 'snabbdom';
import { classModule } from 'snabbdom/modules/class';
import { datasetModule } from 'snabbdom/modules/dataset';
import attributes from './attributes';
import props from './props';
import { heroModule } from 'snabbdom/modules/hero';
import { styleModule } from 'snabbdom/modules/style';
import eventListenersModule from '../libs/eventlisteners';



var startTime;
var lastMeasure;
var startMeasure = function(name) {
    startTime = performance.now();
    lastMeasure = name;
}
var stopMeasure = function() {
    var last = lastMeasure;
    if (lastMeasure) {
        window.setTimeout(function() {
            lastMeasure = null;
            var stop = performance.now();
            var duration = 0;
            console.log(last + " took " + (stop - startTime));
        }, 0);
    }
}

function _random(max) {
    return Math.round(Math.random() * 1000) % max;
}

const buildData = (count = 1000) => {
    let id = 0;
    var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
    var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
    var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
    var data = [];
    for (var i = 0; i < count; i++)
        data.push({ id, label: adjectives[_random(adjectives.length)] + " " + colours[_random(colours.length)] + " " + nouns[_random(nouns.length)] });
    return data;
}




const isString = value => typeof value === 'string';
const isPrimitive = value => isString(value) || typeof value === 'number';
const isFunction = value => typeof value === 'function';
const isElement = value => value instanceof Element;

// Internal storage API
const $$$store = { modules: {} };

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


const attributeHas = (key, prop) => prop.some(attribute => key.indexOf(attributeHas) >= 0);


// "use strict";

// function vnode(sel, data, children, text, elm) {
//     var key = data === undefined ? undefined : data.key;
//     return {
//         sel: sel,
//         data: data,
//         children: children,
//         text: text,
//         elm: elm,
//         key: key
//     };
// }
// export default vnode;

node('primitive', count, id, childNodes[i]);
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
}

let count = 0;
let currentTree;

/** 
 Assembly is the mechanics of the tag functions. 
 A Wavefront template is a set of nested functions
 which act similar to recursion. 

 The deepest nested tag of the youngest index is
 the first executed tag function.


**/
const assembly = (tagName, isSVG) => {

    return function inner(...args) {
        let tagNameStr = `${tagName}`;
        let selectorName = tagName;
        let attributes;
        let item;
        let textNode;
        let childNodes = [];
        let i;
        let children;
        let text;

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
            if (isItemObject && isItemVnode || isPrimitive) {
                childNodes.push(item);
                continue;
            }
        }



        for (i = 0; i < childNodes.length; ++i) {
            const childNode = childNodes[i];
            if (isPrimitive(childNode)) {
                let type;
                let value;
                if (childNode[0] === '@') {
                    type = 'comment';
                    value = childNode.slice(1)
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

        // if (selectorName[0] === 's' && selectorName[1] === 'v' && selectorName[2] === 'g' &&
        //     (selectorName.length === 3 || selectorName[3] === '.' || selectorName[3] === '#')) {
        //     addNS(attributes, childNodes, selectorName);
        // }

        // console.log('currentTree',currentTree)
        // console.log('attributes', attributes)
        return node(tagNameStr, count, attributes, childNodes, isSVG);
    }
}




// HTML Elements.
export const a = assembly('a');
export const abbr = assembly('abbr');
export const address = assembly('address');
export const area = assembly('area');
export const article = assembly('article');
export const aside = assembly('aside');
export const audio = assembly('audio');
export const childNodes = assembly('childNodes');
export const base = assembly('base');
export const bdi = assembly('bdi');
export const bdo = assembly('bdo');
export const blockquote = assembly('blockquote');
export const body = assembly('body');
export const br = assembly('br');
export const button = assembly('button');
export const canvas = assembly('canvas');
export const caption = assembly('caption');
export const cite = assembly('cite');
export const code = assembly('code');
export const col = assembly('col');
export const colgroup = assembly('colgroup');
export const command = assembly('command');
export const dd = assembly('dd');
export const del = assembly('del');
export const dfn = assembly('dfn');
export const div = assembly('DIV');
export const dl = assembly('dl');
export const doctype = assembly('doctype');
export const dt = assembly('dt');
export const em = assembly('em');
export const embed = assembly('embed');
export const fieldset = assembly('fieldset');
export const figcaption = assembly('figcaption');
export const figure = assembly('figure');
export const footer = assembly('footer');
export const form = assembly('form');
export const h1 = assembly('h1');
export const h2 = assembly('h2');
export const h3 = assembly('h3');
export const h4 = assembly('h4');
export const h5 = assembly('h5');
export const h6 = assembly('h6');
export const header = assembly('header');
export const hgroup = assembly('hgroup');
export const hr = assembly('hr');
export const html = assembly('html');
export const i = assembly('i');
export const iframe = assembly('iframe');
export const img = assembly('img');
export const input = assembly('input');
export const ins = assembly('ins');
export const kbd = assembly('kbd');
export const keygen = assembly('keygen');
export const label = assembly('label');
export const legend = assembly('legend');
export const li = assembly('li');
export const link = assembly('link');
export const map = assembly('map');
export const mark = assembly('mark');
export const menu = assembly('menu');
export const meta = assembly('meta');
export const nav = assembly('nav');
export const noscript = assembly('noscript');
export const object = assembly('object');
export const ol = assembly('ol');
export const optgroup = assembly('optgroup');
export const option = assembly('option');
export const p = assembly('p');
export const param = assembly('param');
export const pre = assembly('pre');
export const progress = assembly('progress');
export const q = assembly('q');
export const rp = assembly('rp');
export const rt = assembly('rt');
export const ruby = assembly('ruby');
export const s = assembly('s');
export const samp = assembly('samp');
export const script = assembly('script');
export const section = assembly('section');
export const select = assembly('select');
export const small = assembly('small');
export const source = assembly('source');
export const span = assembly('span');
export const strong = assembly('strong');
export const style = assembly('style');
export const sub = assembly('sub');
export const sup = assembly('sup');
export const table = assembly('table');
export const tbody = assembly('tbody');
export const td = assembly('td');
export const textarea = assembly('textarea');
export const tfoot = assembly('tfoot');
export const th = assembly('th');
export const thead = assembly('thead');
export const title = assembly('title');
export const tr = assembly('tr');
export const ul = assembly('ul');
export const Var = assembly('var'); // First capital
export const video = assembly('video');

// SVG Elements.
export const svg = assembly('svg', true);
export const altGlyph = assembly('altGlyph', true);
export const altGlyphDef = assembly('altGlyphDef', true);
export const altGlyphItem = assembly('altGlyphItem', true);
export const animate = assembly('animate');
export const animateColor = assembly('animateColor', true);
export const animateMotion = assembly('animateMotion', true);
export const animateTransform = assembly('animateTransform', true);
export const animation = assembly('animation', true);
export const circle = assembly('circle', true);
export const clipPath = assembly('clipPath', true);
export const colorProfile = assembly('color-profile', true); // color-profile
export const cursor = assembly('cursor', true);
export const defs = assembly('defs', true);
export const desc = assembly('desc', true);
export const discard = assembly('discard', true);
export const ellipse = assembly('ellipse', true);
export const feBlend = assembly('feBlend', true);
export const feColorMatrix = assembly('feComposite', true);
export const feComponentTransfer = assembly('feComponentTransfer', true);
export const feComposite = assembly('feComposite', true);
export const feConvolveMatrix = assembly('feConvolveMatrix', true);
export const feDiffuseLighting = assembly('feDiffuseLighting', true);
export const feDisplacementMap = assembly('feDistantLight', true);
export const feDistantLight = assembly('feDistantLight', true);
export const feDropShadow = assembly('feDropShadow', true);
export const feFlood = assembly('feFlood', true);
export const feFuncA = assembly('feFuncA', true);
export const feFuncB = assembly('feFuncB', true);
export const feFuncG = assembly('feFuncG', true);
export const feFuncR = assembly('feFuncR', true);
export const feGaussianBlur = assembly('feGaussianBlur', true);
export const feImage = assembly('feImage', true);
export const feMerge = assembly('feMerge', true);
export const feMergeNode = assembly('feMergeNode', true);
export const feMorphology = assembly('feMorphology', true);
export const feOffset = assembly('feOffset', true);
export const fePointLight = assembly('fePointLight', true);
export const feSpecularLighting = assembly('feSpecularLighting', true);
export const feSpotLight = assembly('feSpotLight', true);
export const feTile = assembly('feTile', true);
export const feTurbulence = assembly('feTurbulence', true);
export const filter = assembly('filter', true);
export const font = assembly('font', true);
export const fontFace = assembly('font-face', true); // fontFace
export const fontFaceFormat = assembly('font-face-format', true); // fontFaceFormat
export const fontFaceName = assembly('font-face-name', true); // fontFaceName
export const fontFaceSrc = assembly('font-face-src', true); // fontFaceSrc
export const fontFaceUri = assembly('font-face-uri', true); // fontFaceUri
export const foreignObject = assembly('foreignObject', true);
export const g = assembly('g', true);
export const glyph = assembly('glyph', true);
export const glyphRef = assembly('glyphRef', true);
export const handler = assembly('handler', true);
export const hatch = assembly('hatch', true);
export const hatchpath = assembly('hatchpath', true);
export const hkern = assembly('hkern', true);
export const image = assembly('image', true);
export const line = assembly('line', true);
export const linearGradient = assembly('linearGradient', true);
export const listener = assembly('listener');
export const marker = assembly('marker', true);
export const mask = assembly('mask', true);
export const mesh = assembly('mesh', true);
export const meshgradient = assembly('meshgradient', true);
export const meshpatch = assembly('meshpatch', true);
export const meshrow = assembly('meshrow', true);
export const metadata = assembly('metadata', true);
export const missingGlyph = assembly('missing-glyph', true); // missing-glyph
export const mpath = assembly('mpath', true);
export const path = assembly('path', true);
export const pattern = assembly('pattern', true);
export const polygon = assembly('polygon', true);
export const polyline = assembly('polyline', true);
export const prefetch = assembly('prefetch', true);
export const radialGradient = assembly('radialGradient', true);
export const rect = assembly('rect', true);
export const set = assembly('set', true);
export const solidColor = assembly('solidColor', true);
export const solidcolor = assembly('solidcolor', true);
export const Stop = assembly('stop', true); // First capital
export const Switch = assembly('switch', true); // First capital
export const symbol = assembly('symbol', true);
export const tbreak = assembly('tbreak', true);
export const text = assembly('text', true);
export const textArea = assembly('textArea', true);
export const textPath = assembly('textPath', true);
export const tref = assembly('tref', true);
export const tspan = assembly('tspan', true);
export const unknown = assembly('unknown', true);
export const use = assembly('use', true);
export const view = assembly('view', true);
export const vkern = assembly('vkern', true);

/** 
 * or is used when you explicitly want the to inidicate
 * a condition is being made in the template. 
 * @param {Array} vNodes - An array of vNodes 
 * @param {Number|Array} switch - A number or series of inidcators (as an array) of what elements to display.
 * @exclude {Boolean} exclude - 
 * 
 */
export const or = (vNodes, $witch, exclude) => {
    const includeVNodes = [];
    const includeIndexes = [];


    // Return the vNode of a given index.
    if (typeof $witch === 'number') {
        return vNodes[$witch];
    }

    // Treat toggle as an array. 
    const toggle = typeof $witch === 'string' ? [$witch] : $witch;


    // If toggle is not an array or empty do nothing.
    if (!Array.isArray(toggle) || toggle.length === 0) {
        return vNodes;
    }


    const classes = toggle.filter(e => e.indexOf('.') > -1);
    const ids = toggle.filter(e => e.indexOf('#') === 0);
    const tags = toggle.filter(e => /^[a-z0-9]+$/i.test(e));
    const numberOfChildren = toggle.filter(e => e.indexOf('~') === 0);
    const indexes = toggle.filter(e => typeof e === 'number');
       
    for (let i = 0; i < vNodes.length; i++) {

        const vNode = vNodes[i];
        const attribute = vNode.at;

        // Check class
        if (classes.length > 0) {
            classes.forEach(c => {
                if (attribute.class.includes(c.slice(1))) {
                    includeIndexes.push(i);
                }
            });
        }

        // Check ids
        if (ids.length > 0) {
            ids.forEach(c => {
                if (attribute.id === c.slice(1)) {
                    includeIndexes.push(i);
                }
            });
        }


        // Check tags
        if (tags.length > 0) {
            tags.forEach(c => {
                if (vNode.t.toUpperCase() === c.toUpperCase()) {
                    includeIndexes.push(i);
                }
            });
        }

        // Check numberOfChildren
        if (numberOfChildren.length > 0) {
            numberOfChildren.forEach(x => {
               const childrenLength = vNode.ch.filter(c => c.t !== 'TEXT' && c.t !== 'COM').length
                console.log('childrenLength',childrenLength)
                if (childrenLength == x.slice(1)) {
                    includeIndexes.push(i);
                }
            });
        }
    }
    console.log('includeIndexes', includeIndexes)
    // Remove duplicates
    const indexList = [...(new Set(includeIndexes))];

    console.log('indexList', indexList)
    if (exclude === true) {
        return vNodes.filter(function(item, i) {
            return indexList.indexOf(i) === -1;
        });

    } else {
        indexList.forEach(index => {
            includeVNodes.push(vNodes[index])
        })
        return includeVNodes;
    }
}



/** 
 * or is used when you explicitly want the to inidicate
 * that an item is being looped by n times or via data
 * 
 * @param {Object|Array} vNodes 
 * @param {*} Data 
 */
export const loop = (vNodes, data) => {
    const singleVnode = isPlaneObject(vNodes);
    const groupVnodes = Array.isArray(vNodes);
    const hasNumber = typeof data === 'number';

    let loopedVnodes = [];

    if (hasNumber) {
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
    } else {
        if (typeof vNodes === 'function') {
            loopedVnodes = vNodes(data)

            if (!Array.isArray(loopedVnodes)) {
                throw new Error('loop() should return an Array of vnodes');
            }
        }
    }

    console.log('loop', loopedVnodes)
    return loopedVnodes;
}

// Render API
// export const patch = init([
//     classModule,
//     props,
//     attributes,
//     heroModule,
//     styleModule,
//     datasetModule,
//     eventListenersModule
// ]);

// const renderPartial = () => {
//     let previousVNode;
//     let DOMContainer;
//     let selectorString;
//     let documentRef = document;
//     /**
//      * @param {string | HTMLElement} selector - Root HTML element 
//      * @param {Object} newVNode - New virtual node
//      * @param {Boolean} cache - Cache element, defaults to true.
//      */
//     return (selector, newVNode, cache) => {
//         // Set HTML element.
//         if (isString(selector)) {
//             if (selector !== selectorString && !cache) {
//                 DOMContainer = documentRef.querySelector(selector);
//                 selectorString = selector;
//             }
//         } else if (isElement(selector) && !cache) {
//             if (selector !== selectorString) {
//                 DOMContainer = selector;
//             }
//         }


//         // Diff and patch the DOM. 
//         if (!previousVNode) {
//             patch(DOMContainer, newVNode);
//         }
//         if (previousVNode && previousVNode !== newVNode) {
//             patch(previousVNode, newVNode);
//         }
//         previousVNode = newVNode;
//     }
// }

// export const render = renderPartial();


// const someUI = div({ class: 'side-bar', id: 'someId' }, [
//     span({ class: 'wpefow', id: 'red' }, [
//         'Dig vbar wefwef'
//     ]),
//     a({ class: 'wpefow', id: 'yellow' }, [
//         23984729
//     ]),
// ])

// console.log('DATA', buildData(10000))

// var rows = this.rows,
//     s_data = this.store.data,
//     data = this.data,
//     tbody = this.tbody;
// for (let i = rows.length; i < s_data.length; i++) {
//     let tr = this.createRow(s_data[i]);
//     rows[i] = tr;
//     data[i] = s_data[i];
//     tbody.appendChild(tr);
// }
let thing = [];
const lotsData = buildData(10000);

// console.log(lotsData[0])
// for (let i = 0; i < lotsData.length; i++) {
//     // console.log(i)
//     const dat = lotsData[i];
//     thing.push(
//         tr({ class: 'menu-item' }, [
//             td({ class: 'col-md-1' },
//                 dat.id
//             ),
//             td({ class: 'col-md-4' },
//                 a({ class: 'lbl' }, dat.label)
//             ),
//             td({ class: 'col-md-1' },
//                 a({ class: 'remove' },
//                     span({
//                         class: 'glyphicon glyphicon-remove remove'
//                     })
//                 )
//             ),
//             td({ class: 'col-md-6' })
//         ]))
// }
// console.log('thing',thing)


const responseData = [
    'I\'m fine how are you?',
    'Not bad thanks',
    'La La La',
    'I am well thank you',
    'Excusemoi'
];
const responseList = data => {
    return data.map((response, i) =>
        span({
                style: {
                    'color': `rgb(${parseInt(i * 50,10)},${255},${parseInt(500 /i,10)})`,
                    display: 'block'
                }
            },
            response
        )
    )
}


const twitterHref = 'http://google.com';
const facebookHref = 'http://facebook.com';
const someUI = [
    div({ id: 'block-social-responsive', class: 'footer__social' },
        ul({ class: 'menu' },
            li({ class: 'menu-item' },
                a({ href: twitterHref, class: 'icon-twitter', target: '_blank' },
                    'TWITTER'
                )
            ),
            li({ class: 'menu-item' },
                a({
                        href: facebookHref,
                        class: 'icon-fb',
                        target: '_blank',
                        _innerHTML: 'HELOOOOOOO',
                        // event: ['mouseover', (e) => { console.log('THIS ELEMENT', e.target) }, false],
                        $: { backgroundColor: 'red', color: 'yellow' },
                        'd-foijfwoeifjw': 2000000000,
                        name: 'jack'
                    },
                    'FACEBOOK'
                )
            ),
            or([
                div({ class: 'hello', id: 'yeaa' }, 'HELLO'),
                div({ class: 'foo' }, 'FOO'),
                a({ class: 'bar', id: 'yeaa' },
                    h1('This is H TAG 1'),
                    h2('This is H TAG 2'),
                    'BAR'
                ),
                div({ class: 'baz' }, 'BAZ'),
                section({ class: 'hello' },
                    h1('This is H TAG 1'),
                    h2('This is H TAG 2'),
                ),
                section({ class: 'world' }, 'WORLD'),
            ], ['~2','.world'], true),
            // Without variables...
            li({ class: 'menu-item' },
                a({ href: 'https://www.linkedin.com/company/208777', class: 'icon-in', target: '_blank' },
                    'Linkedin'
                ),
                `@This is a single line comment`
            ),
            loop(li({ style: { backgroundColor: 'pink', fontSize: 20 } }, 'HELLO WORLD'), 5),
            loop(responseList, responseData),
        )
    ),
    section({ id: 'blah', class: 'wefw' }, 'TEST SECTION'),
    svg({ height: 150, width: 400 },
        defs(
            linearGradient({ id: 'grad1', x1: '0%', y1: '0%', x2: '0%', y2: '100%' },
                Stop({ offset: '0%', style: { 'stop-color': 'rgb(255,0,0)', 'stop-opacity': 1 } }),
                Stop({ offset: '100%', style: { 'stop-color': 'rgb(255,255,0)', 'stop-opacity': 1 } })
            )
        ),
        ellipse({ cx: 200, cy: 70, rx: 85, ry: 55, fill: 'url(#grad1)' }),
        'Sorry, your browser does not support inline SVG.'
    ),
    `@This is a single line comment`, // not working
    // tbody({ id: 'tbody' }, thing)
    // loop(div('HELLO WORLD'), 20),
    // [div('HELLO WORLD'),
    // div('HELLO WORLD'),
    // div('HELLO WORLD')]
];


const createAndAppendNode = (fragment, node) => {
    console.log('node', node)
    // TEXT_NODE        3
    if (node.t === 'TEXT') {
        const textNode = document.createTextNode(node.val);
        fragment.appendChild(textNode);
        return;
    }
    // COMMENT_NODE     8
    if (node.t === 'COM') {
        const commentNode = document.createComment(node.val);
        fragment.appendChild(commentNode);
        return;
    }

    // ELEMENT_NODE     1
    const element = node.svg ? document.createElementNS('http://www.w3.org/2000/svg', node.t) : document.createElement(node.t);

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

            switch (attributeKey) {
                case 'e':
                case 'event':
                    element.addEventListener(...attributes[attributeKey]);
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
        node.ch.forEach(childNode => {
            createAndAppendNode(element, childNode)
        });
    }
}


const renderPartial = (selector) => {
    const container = document.querySelector(selector);
    const fragment = document.createDocumentFragment();
    return (newNode, cache) => {
        count = 0; // reset counter used for node ids.
        // 1st render.
        // container
        if (cache === undefined) {
            if (Array.isArray(newNode)) {
                // Group of elements 
                for (let i = 0; i < newNode.length; i++) {
                    const currentNewNode = newNode[i]
                    // console.log('currentNewNode', currentNewNode)
                    /*
                        We are not handeling string and comment nodes in 
                        an group. This needs to be handeled.

                    */


                    createAndAppendNode(fragment, currentNewNode);
                }

                console.log('FINISHED', fragment)
            } else {
                // Wrapped element
            }
            requestAnimationFrame(() => {
                container.appendChild(fragment)

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
}


document.addEventListener('click', () => {
    startMeasure('Wavefront')
    const render = renderPartial('#root');
    render(someUI);
    stopMeasure()
}, false)


// console.log(someUI)
// render(
//     document.getElementById('root'),
//     someUI
//     )




// /**
//  * A simple plugin integration system.
//  * {
//  *      dependencies:[api, api, api],
//  *      waveModules: [wModule, wModule, wModule]
//  * }
//  *
//  */

// export const registerModules = (plugins) => {
//     // Register dependencies 
//     $$$store.dependencies = plugins.dependencies
//         // Register waveModules
//     $$$store.waveModules = plugins.waveModules
//         // Check dependenicies exist for waveModules
//     $$$store.waveModules.forEach((waveObject, i) =>
//         $$$store.modules[$$$store.waveModules[i].name] = (...args) =>
//         waveObject(...args).plugin($$$store, waveObject().dependencies)
//     );
//     // return $$$store.modules;
// }

// export const modules = $$$store.modules;








/*******
 @ Issue with Array.isArray polyfill, when using event prop.

**/