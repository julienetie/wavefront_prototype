import classList from './polyfills/class-list';
import { contains, once } from './utils';
import { render, addInterfaceRenderMethod } from './render';
// const waveFront = () => {
//     window.addEventListener('load', function() {
//         if (window.WAVEFRONT_ENV === 'dev') {
//             console.log('%cWavefront%c::%cDEVELOPMENT MODE', 'color: #cc0000; font-size:1.1rem;', 'color: black; font-size:1rem;', 'color: darkblue; font-size:0.8rem;')
//         }
//     });
// }

// waveFront();

let store = {};

// TESTING.
window.render = render;


export function __(interfaceNamewaveName) {
    let props = {};
    var elementPropertyBlacklist = [
        'setAttribute',
        'setAttributeNS',
        'removeAttribute',
        'removeAttributeNS',
        'setAttributeNode',
        'setAttributeNodeNS',
        'removeAttributeNode',
        'getElementsByTagName',
        'getElementsByTagNameNS',
        'getElementsByClassName',
        'insertAdjacentElement',
        'insertAdjacentText',
        'insertAdjacentHTML',
        'createShadowRoot',
        'getDestinationInsertionPoints',
        'remove',
        'querySelector',
        'querySelectorAll',
        'attachShadow',
        'cloneNode',
        'innerHTML',
        'insertBefore',
        'appendChild',
        'replaceChild',
        'removeChild',
        'addEventListener',
        ''
    ];
    if (interfaceNamewaveName.indexOf(':') >= 0) {
        let nameParts = interfaceNamewaveName.split(':');
        let element = __._elementStore[nameParts[0]][nameParts[1]];
        let property;
        let i;
        let blackListLength = elementPropertyBlacklist.length;

        for (property in element) {
            props[property] = element[property];
        }
        for (i = 0; i < blackListLength; i++) {
            props[elementPropertyBlacklist[i]] = undefined;
        }
        props.on = function(event, handler, bubbling) {
            element.addEventListener(event, handler, bubbling)
        }
        return props;
    } else {
        throw new Error('The interface name and wave Id should be separated by a colon.')
    }

}




window.__ = __;

__.track = function(interfaceName, value, _tag) {
    if (_tag === undefined) {
        throw new Error(`Please define the _tag for ${value}`);
    };
    return {
        interfaceName,
        _tag,
        value
    }
}

__.append = (...args) => {

    let appendValues = Array.from(args);
    let parent = appendValues.pop();
    for (let i = 0; i < appendValues.length; i++) {
        // console.log(appendValues[i])
        // parent.appendChild(appendValues[i].node);
    }
}

__.polyfills = (...args) => {
    if (args.length) {
        args.forEach((polyfill) => {
            polyfill();
        });
    } else {
        classList();
        // List of polyfills.    
    }
}


__.model = {}

__._dynamicStore = {};

__._elementStore = {};

store.staticRegistry = [];
store.dynamicRegistry = [];
store.statelessRegistry = [];

/**
 * Registers the interface and it's state.
 * @param {string} interfaceName - Name of the new interface
 * @param {string} registryType - dynamicRegistry | statelessRegistry | staticRegistry
 */
const registerInterface = (interfaceName, interfaceType) => {
    // let registry = store[ interfaceType + Registry];
    // Check if render interface types contains the given interface.
    addInterfaceRenderMethod(interfaceName, interfaceType);

    // if (contains(interfaceName, registry)) {
    //     let record;

    //     switch (registryType) {
    //         case 'dynamicRegistry':
    //             record = {};
    //             break;
    //         case 'statelessRegistry':
    //             record = {
    //                 name: interfaceName,
    //                 rendered: false
    //             }
    //             break;
    //         case 'staticRegistry':
    //             record = {};
    //             break;
    //     }
    //     registry.push(record);
    // }
}

export function renderBranches(tree, selector, interfaceName) {
    let treeLength = tree.length;
    let el;
    let createdElement;
    let type;
    let newNode;
    let attrMsg;
    let elTypeof;
    let hasChildren;
    let selectorName = false;

    // Create the element store for the interface.
    if (!__._elementStore.hasOwnProperty(interfaceName)) {
        __._elementStore[interfaceName] = {};
    }

    // var fragment = document.createDocumentFragment();
    for (let i = 0; i < treeLength; i++) {
        el = tree[i];
        type = el[0];
        attrMsg = el[1];
        elTypeof = typeof el;
        hasChildren = !!(el[3] ? el[3].constructor === [].constructor : false);
        switch (elTypeof) {
            case 'string':
                // Text node
                newNode = document.createTextNode(el);
                break;
            case 'object':
                parseNode();
                break;
            case 'function':
                // 
                break;
        }

        function toCamel(string) {
            return string.replace(/-([a-z])/g, function(g) {
                return g[1].toUpperCase();
            });
        }



        // Create element
        function parseNode() {
            switch (type) {
                case 'text':
                    // Text node
                    newNode = document.createTextNode(attrMsg);
                    break;
                case 'comment':
                    // Comment node
                    newNode = document.createComment(attrMsg);
                    break;
                default:
                    // Element node
                    newNode = createElement(type, attrMsg);
            }
        }



        function createElement(tagName, attributes) {
            // Create element node.
            let element = document.createElement(tagName);
            let attr;
            // Apply attributes.
            if (attributes) {
                for (attr in attributes) {
                    // data-* , accept-charset, http-equiv keys must be strings.
                    // Styles are defined using template strings.
                    if (attr !== 'wave') {
                        element.setAttribute(attr, attributes[attr]);
                    }
                    switch (attr) {
                        case 'wave':
                            selectorName = selectorName ? false : attributes.wave;
                            break;
                        case 'id':
                            selectorName = selectorName ? false : attributes.id;
                            break;
                    }
                }
            }
            return element;
        }

        // Add node to elemeent store.
        if (selectorName) {
            __._elementStore[interfaceName][toCamel(selectorName)] = newNode;
            selectorName = false;
        }


        if (hasChildren) {
            // console.log('Yes has children', el[3].length)
            renderBranches(el[3], newNode, interfaceName);
        }
        selector.appendChild(newNode);
    }
}

__._registerDynamicInterface = function(interFace, dynamicScope, interfaceName) {
    if (once('_registerDynamicInterface' + interfaceName)) {
        __.model[interfaceName]['name'] = interfaceName;
        __._dynamicStore[interfaceName] = {
            lastVirtualTree: interFace.apply(dynamicScope, [__.model[interfaceName]]),
            currentVirtualTree: () => {
                return interFace.apply(dynamicScope, [__.model[interfaceName]]);
            }

        }
    }
}


__.dynamic = function(interfaceName, interFace) {
    registerInterface(interfaceName, 'dynamic');
    __._registerDynamicInterface(interFace, this, interfaceName)
};


__.static = (interfaceName, interFace) => {
    registerInterface(interfaceName, 'static');
    __._registerDynamicInterface(interFace, this, interfaceName)
};


__.stateless = (interfaceName, interFace) => {
    registerInterface(interfaceName, 'stateless');
    __._registerDynamicInterface(interFace, this, interfaceName)
};

var assembly = (tagName) => {
    return (...args) => {

        let children = [];
        let attributes = {};
        let stringChild;
        let tracker = {};
        // nodes return as a waveArrayNode
        // entered text converts to a waveArrayNode
        // Attributes are passed as objects

        var item;
        for (let i = 0; i < args.length; i++) {
            item = args[i];
            if (item.hasOwnProperty('_tag')) {
                tracker = Object.assign(tracker, item);
                tracker.canUpdate = true;
                item = item.value;
            } else {
                tracker.canUpdate = false;
                item = item;
            }

            //Check if text node
            if (typeof item === 'string') {
                children.push(['text', item, tracker]);
            }

            // Attribute check 
            if (item.constructor === {}.constructor) {
                attributes = item;
            }

            // Check if child 
            if (item instanceof Array) {
                children.push(item)
            }
        }

        var node = [tagName, attributes, tracker, children];
        return node;
    };
}


__.render = render;


export const a = assembly('a');
export const abbr = assembly('abbr');
export const address = assembly('address');
export const area = assembly('area');
export const article = assembly('article');
export const aside = assembly('aside');
export const audio = assembly('audio');
export const b = assembly('b');
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
export const div = assembly('div');
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
export const v = assembly('var');
export const video = assembly('video');

export const comment = (message) => {
    return ['comment', message];
};
export const text = (message) => {
    return ['text', message];
};
export const loop = () => {
    // Takes an object, array or JSON and loops though,
    // Return the elements/ nodes to make up a list.
    // you can nest loops.
};