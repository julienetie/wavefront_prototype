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
const node = (t, id, at, ch) => {
    if (t === 'primitive') {
        return {
            t: '@p',
            id,
            val: at
        }
    }


    return {
        t,
        id,
        at,
        chx: ch.length,
        ch,
    }

}

let count = 0;
let currentTree;
const assembly = (tagName) => {

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
            let isItemVnode = item.hasOwnProperty('<t></t>');

            // Check if item is a plane object = attribute.
            if (isItemObject && !isItemVnode) {
                // let isSelector = false;
                attributes = item;
                // const attrKeys = Object.keys(item);

                // Create virtual id selector.
                // if (item.hasOwnProperty('id') || item.hasOwnProperty('#')) {
                //     selectorName += '#' + item.id;
                //     isSelector = true;
                // }
                // Create virtual class selectors.
                // if (item.hasOwnProperty('class') || item.hasOwnProperty('.')) {
                //     selectorName += '.' + item.class;
                //     isSelector = true;
                // }
                // console.log('attrKeys', attrKeys)
                // attrKeys.forEach((key) => {
                //     // If not selector
                //     if (['id', '#', 'class', '.'].indexOf(key) < 0) {
                //         switch (key) {
                //             case 'e':
                //             case 'event':
                //                 attributes.on = item[key];
                //                 break;
                //             case 'p':
                //             case 'props':
                //                 attributes.props = item[key];
                //             case 'h':
                //             case 'hook':
                //                 attributes.hook = item[key];
                //                 break;
                //             case '$':
                //             case 'style':
                //                 attributes.style = item[key];
                //                 break;
                //             case 'd':
                //             case 'dataset':
                //                 attributes.dataset = item[key];
                //                 break;
                //             default:
                //                 attributes.attrs[key] = item[key];
                //         }
                //     }
                // });
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
            if (isPrimitive(childNodes[i])) {
                count++;
                currentTree = node('primitive', count, childNodes[i]);
                console.log('currentTree', currentTree)
                childNodes[i] = currentTree
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
        console.log('attributes', attributes)
        return node(tagNameStr, count, attributes, childNodes);
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
export const altGlyph = assembly('altGlyph');
export const altGlyphDef = assembly('altGlyphDef');
export const altGlyphItem = assembly('altGlyphItem');
export const animate = assembly('animate');
export const animateColor = assembly('animateColor');
export const animateMotion = assembly('animateMotion');
export const animateTransform = assembly('animateTransform');
export const animation = assembly('animation');
export const circle = assembly('circle');
export const clipPath = assembly('clipPath');
export const colorProfile = assembly('color-profile'); // color-profile
export const cursor = assembly('cursor');
export const defs = assembly('defs');
export const desc = assembly('desc');
export const discard = assembly('discard');
export const ellipse = assembly('ellipse');
export const feBlend = assembly('feBlend');
export const feColorMatrix = assembly('feComposite');
export const feComponentTransfer = assembly('feComponentTransfer');
export const feComposite = assembly('feComposite');
export const feConvolveMatrix = assembly('feConvolveMatrix');
export const feDiffuseLighting = assembly('feDiffuseLighting');
export const feDisplacementMap = assembly('feDistantLight');
export const feDistantLight = assembly('feDistantLight');
export const feDropShadow = assembly('feDropShadow');
export const feFlood = assembly('feFlood');
export const feFuncA = assembly('feFuncA');
export const feFuncB = assembly('feFuncB');
export const feFuncG = assembly('feFuncG');
export const feFuncR = assembly('feFuncR');
export const feGaussianBlur = assembly('feGaussianBlur');
export const feImage = assembly('feImage');
export const feMerge = assembly('feMerge');
export const feMergeNode = assembly('feMergeNode');
export const feMorphology = assembly('feMorphology');
export const feOffset = assembly('feOffset');
export const fePointLight = assembly('fePointLight');
export const feSpecularLighting = assembly('feSpecularLighting');
export const feSpotLight = assembly('feSpotLight');
export const feTile = assembly('feTile');
export const feTurbulence = assembly('feTurbulence');
export const filter = assembly('filter');
export const font = assembly('font');
export const fontFace = assembly('font-face'); // fontFace
export const fontFaceFormat = assembly('font-face-format'); // fontFaceFormat
export const fontFaceName = assembly('font-face-name'); // fontFaceName
export const fontFaceSrc = assembly('font-face-src'); // fontFaceSrc
export const fontFaceUri = assembly('font-face-uri'); // fontFaceUri
export const foreignObject = assembly('foreignObject');
export const g = assembly('g');
export const glyph = assembly('glyph');
export const glyphRef = assembly('glyphRef');
export const handler = assembly('handler');
export const hatch = assembly('hatch');
export const hatchpath = assembly('hatchpath');
export const hkern = assembly('hkern');
export const image = assembly('image');
export const line = assembly('line');
export const linearGradient = assembly('linearGradient');
export const listener = assembly('listener');
export const marker = assembly('marker');
export const mask = assembly('mask');
export const mesh = assembly('mesh');
export const meshgradient = assembly('meshgradient');
export const meshpatch = assembly('meshpatch');
export const meshrow = assembly('meshrow');
export const metadata = assembly('metadata');
export const missingGlyph = assembly('missing-glyph'); // missing-glyph
export const mpath = assembly('mpath');
export const path = assembly('path');
export const pattern = assembly('pattern');
export const polygon = assembly('polygon');
export const polyline = assembly('polyline');
export const prefetch = assembly('prefetch');
export const radialGradient = assembly('radialGradient');
export const rect = assembly('rect');
export const set = assembly('set');
export const solidColor = assembly('solidColor');
export const solidcolor = assembly('solidcolor');
export const stop = assembly('stop');
export const Switch = assembly('switch'); // First capital
export const symbol = assembly('symbol');
export const tbreak = assembly('tbreak');
export const text = assembly('text');
export const textArea = assembly('textArea');
export const textPath = assembly('textPath');
export const tref = assembly('tref');
export const tspan = assembly('tspan');
export const unknown = assembly('unknown');
export const use = assembly('use');
export const view = assembly('view');
export const vkern = assembly('vkern')


// Render API
export const patch = init([
    classModule,
    props,
    attributes,
    heroModule,
    styleModule,
    datasetModule,
    eventListenersModule
]);

const renderPartial = () => {
    let previousVNode;
    let DOMContainer;
    let selectorString;
    let documentRef = document;
    /**
     * @param {string | HTMLElement} selector - Root HTML element 
     * @param {Object} newVNode - New virtual node
     * @param {Boolean} cache - Cache element, defaults to true.
     */
    return (selector, newVNode, cache) => {
        // Set HTML element.
        if (isString(selector)) {
            if (selector !== selectorString && !cache) {
                DOMContainer = documentRef.querySelector(selector);
                selectorString = selector;
            }
        } else if (isElement(selector) && !cache) {
            if (selector !== selectorString) {
                DOMContainer = selector;
            }
        }


        // Diff and patch the DOM. 
        if (!previousVNode) {
            patch(DOMContainer, newVNode);
        }
        if (previousVNode && previousVNode !== newVNode) {
            patch(previousVNode, newVNode);
        }
        previousVNode = newVNode;
    }
}

export const render = renderPartial();


// const someUI = div({ class: 'side-bar', id: 'someId' }, [
//     span({ class: 'wpefow', id: 'red' }, [
//         'Dig vbar wefwef'
//     ]),
//     a({ class: 'wpefow', id: 'yellow' }, [
//         23984729
//     ]),
// ])
const twitterHref = 'http://google.com';
const facebookHref = 'http://facebook.com';
const someUI = [
        div({ id: 'block-social-responsive', class: 'footer__social' },
            ul({ class: 'menu' },
                li({ class: 'menu-item' },
                    a({ href: twitterHref, class: 'icon-twitter', target: '_blank'},
                        'TWITTER'
                    )
                ),
                li({ class: 'menu-item' },
                    a({ href: facebookHref, class: 'icon-fb', target: '_blank' },
                        'FACEBOOK'
                    )
                ),
                // Without variables...
                li({ class: 'menu-item' },
                    a({ href: 'https://www.linkedin.com/company/208777', class: 'icon-in', target: '_blank' },
                        'Linkedin'
                    )
                ),
                li({ class: 'menu-item' },
                    a({ href: 'https://www.youtube.com/user/TheLinuxFoundation', class: 'icon-youtube', target: '_blank' },
                        'Youtube'
                    )
                )
            )
        )
    ];









console.log(someUI)
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