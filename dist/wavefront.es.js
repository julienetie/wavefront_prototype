const isPlaneObject$1 = value => ({}).toString.call(value) === '[object Object]';
const isString$1 = value => typeof value === 'string';
const isPrimitive$1 = value => isString$1(value) || typeof value === 'number';
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
const assembly = (tagName, isSVG) => {

    return function inner(...args) {
        const tagNameStr = `${tagName}`;
        let attributes;
        let item;
        let childNodes$$1 = [];
        let i$$1;
        for (i$$1 = 0; i$$1 < args.length; i$$1++) {
            item = args[i$$1] || {};
            let isItemObject = isPlaneObject$1(item);
            let isItemVnode = item.hasOwnProperty('t');

            // Check if item is a plane object = attribute.
            if (isItemObject && !isItemVnode) {
                // let isSelector = false;
                attributes = item;
                continue;
            }

            // Check if item is an array = group of child elements.
            if (Array.isArray(item)) {
                childNodes$$1 = [...childNodes$$1, ...item];
                continue;
            }

            // check if item is not an object, array or function = child element.
            if (isItemObject && isItemVnode || isPrimitive$1) {
                childNodes$$1.push(item);
                continue;
            }
        }

        for (i$$1 = 0; i$$1 < childNodes$$1.length; ++i$$1) {
            const childNode = childNodes$$1[i$$1];
            if (isPrimitive$1(childNode)) {
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

const renderPartial = selector => {
    const container = document.querySelector(selector);
    const fragment = document.createDocumentFragment();
    return (newNode, cache) => {
        count = 0; // reset counter used for node ids.

        if (cache === undefined) {
            if (Array.isArray(newNode)) {
                const wrappedVTree = div({ id: 'dummy' }, newNode);
                const unWrappedVTree = wrappedVTree.ch;

                function appendMultipleNodes() {
                    var args = [].slice.call(arguments);
                    for (var x = 1; x < args.length; x++) {
                        args[0].appendChild(args[x]);
                    }
                    return args[0];
                }

                createAndAppendNode(fragment, wrappedVTree);
                // }
                const dummy = fragment.firstElementChild;
                const innerNodes = dummy.childNodes;
                const outerNodeList = [];
                for (let i$$1 = 0; i$$1 < innerNodes.length; i$$1++) {
                    outerNodeList.push(innerNodes[i$$1]);
                }
                fragment.removeChild(dummy);

                appendMultipleNodes(fragment, ...outerNodeList);

                requestAnimationFrame(() => {
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

                requestAnimationFrame(() => {
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

const createAndAppendNode = (fragment, node) => {
    const isSVG = node.svg === true;
    // TEXT_NODE        3
    if (node.t === 'TEXT') {
        const textNode = document.createTextNode(node.val);
        fragment.appendChild(textNode);
        return;
    }
    // // COMMENT_NODE     8
    if (node.t === 'COM') {
        console.log('node.val', node.val);
        const commentNode = document.createComment(node.val);
        fragment.appendChild(commentNode);
        return;
    }

    // ELEMENT_NODE     1
    const element = isSVG ? document.createElementNS(SVG_NAMESPACE, node.t) : document.createElement(node.t);

    // Add attributes
    if (node.at) {
        const attributes = node.at;
        const attributeKeys = Object.keys(attributes);
        const attributesLength = attributeKeys.length;

        for (let i$$1 = 0; i$$1 < attributesLength; i$$1++) {

            const attributeKey = attributeKeys[i$$1];

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
            createAndAppendNode(element, childNode);
        });
    }
};

const a = assembly('a');
























const div = assembly('DIV');










const h1 = assembly('h1');
const h2 = assembly('h2');

















const li = assembly('li');






















const section = assembly('section');



const span = assembly('span');






const td = assembly('td');





const tr = assembly('tr');
const ul = assembly('ul');
 // First capital


// SVG Elements.
const svg = assembly('svg', true);










 // color-profile

const defs = assembly('defs', true);


const ellipse = assembly('ellipse', true);



























 // fontFace
 // fontFaceFormat
 // fontFaceName
 // fontFaceSrc
 // fontFaceUri










const linearGradient = assembly('linearGradient', true);








 // missing-glyph











const Stop = assembly('stop', true); // First capital
 // First capital

const isPlaneObject$2 = value => ({}).toString.call(value) === '[object Object]';

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
        const singleVnode = isPlaneObject$2(vNodes);

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

//////////////////
// test.
var startTime;
var lastMeasure;
var startMeasure = function (name) {
    startTime = performance.now();
    lastMeasure = name;
};
var stopMeasure = function () {
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

const buildData = (count = 1000) => {
    let id = 0;
    var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
    var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
    var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
    var data = [];
    for (var i$$1 = 0; i$$1 < count; i$$1++) data.push({ id, label: adjectives[_random(adjectives.length)] + " " + colours[_random(colours.length)] + " " + nouns[_random(nouns.length)] });
    return data;
};

const lotsData = buildData(10000);
console.log('lotsData', lotsData);
const table$$1 = dat => tr({ class: 'menu-item' }, [td({ class: 'col-md-1' }, dat.id), td({ class: 'col-md-4' }, a({ class: 'lbl' }, dat.label)), td({ class: 'col-md-1' }, a({ class: 'remove' }, span({
    class: 'glyphicon glyphicon-remove remove'
}))), td({ class: 'col-md-6' })]);

const buildTable = data => {
    const arrayOfChildren = [];
    for (let i$$1 = 0; i$$1 < data.length; i$$1++) {
        arrayOfChildren.push(table$$1(data[i$$1]));
    }
    console.log('arrayOfChildren', arrayOfChildren);
    return arrayOfChildren;
};

//////////////////


const twitterHref = 'http://google.com';
const facebookHref = 'http://facebook.com';
const someUI = div({ class: 'wrapper' }, div({ id: 'block-social-responsive', class: 'footer__social' }, ul({ class: 'menu' }, li({ class: 'menu-item' }, a({ href: twitterHref, class: 'icon-twitter', target: '_blank' }, 'TWITTER')), li({ class: 'menu-item' }, a({
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
li({ class: 'menu-item' }, a({ href: 'https://www.linkedin.com/company/208777', class: 'icon-in', target: '_blank' }, 'Linkedin'), `@This is a single line comment`), loop(li({ style: { backgroundColor: 'pink', fontSize: 20 } }, 'HELLO WORLD'), 5), loop(buildTable, lotsData))), section({ id: 'blah', class: 'wefw' }, 'TEST SECTION'), svg({ height: 150, width: 400 }, defs(linearGradient({ id: 'grad1', x1: '0%', y1: '0%', x2: '0%', y2: '100%' }, Stop({ offset: '0%', style: { 'stop-color': 'rgb(255,0,0)', 'stop-opacity': 1 } }), Stop({ offset: '100%', style: { 'stop-color': 'rgb(255,255,0)', 'stop-opacity': 1 } }))), ellipse({ cx: 200, cy: 70, rx: 85, ry: 55, fill: 'url(#grad1)' }), 'Sorry, your browser does not support inline SVG.'), `@This comment is outside`);

document.addEventListener('click', () => {
    startMeasure('Wavefront');
    const render = renderPartial('#root');
    render(someUI);
    stopMeasure();
}, false);
//# sourceMappingURL=wavefront.es.js.map
