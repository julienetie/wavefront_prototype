let classList = () => {

    /*
     * classList.js: Cross-browser full element.classList implementation.
     * 1.1.20150312
     *
     * By Eli Grey, http://eligrey.com
     * License: Dedicated to the public domain.
     *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
     */

    /*global self, document, DOMException */

    /*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

    if ("document" in self) {

        // Full polyfill for browsers with no classList support
        // Including IE < Edge missing SVGElement.classList
        if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {

            (function (view) {

                "use strict";

                if (!('Element' in view)) return;

                var classListProp = "classList",
                    protoProp = "prototype",
                    elemCtrProto = view.Element[protoProp],
                    objCtr = Object,
                    strTrim = String[protoProp].trim || function () {
                    return this.replace(/^\s+|\s+$/g, "");
                },
                    arrIndexOf = Array[protoProp].indexOf || function (item) {
                    var i = 0,
                        len = this.length;
                    for (; i < len; i++) {
                        if (i in this && this[i] === item) {
                            return i;
                        }
                    }
                    return -1;
                }
                // Vendors: please allow content code to instantiate DOMExceptions

                ,
                    DOMEx = function (type, message) {
                    this.name = type;
                    this.code = DOMException[type];
                    this.message = message;
                },
                    checkTokenAndGetIndex = function (classList, token) {
                    if (token === "") {
                        throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
                    }
                    if (/\s/.test(token)) {
                        throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
                    }
                    return arrIndexOf.call(classList, token);
                },
                    ClassList = function (elem) {
                    var trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
                        classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
                        i = 0,
                        len = classes.length;
                    for (; i < len; i++) {
                        this.push(classes[i]);
                    }
                    this._updateClassName = function () {
                        elem.setAttribute("class", this.toString());
                    };
                },
                    classListProto = ClassList[protoProp] = [],
                    classListGetter = function () {
                    return new ClassList(this);
                };
                // Most DOMException implementations don't allow calling DOMException's toString()
                // on non-DOMExceptions. Error's toString() is sufficient here.
                DOMEx[protoProp] = Error[protoProp];
                classListProto.item = function (i) {
                    return this[i] || null;
                };
                classListProto.contains = function (token) {
                    token += "";
                    return checkTokenAndGetIndex(this, token) !== -1;
                };
                classListProto.add = function () {
                    var tokens = arguments,
                        i = 0,
                        l = tokens.length,
                        token,
                        updated = false;
                    do {
                        token = tokens[i] + "";
                        if (checkTokenAndGetIndex(this, token) === -1) {
                            this.push(token);
                            updated = true;
                        }
                    } while (++i < l);

                    if (updated) {
                        this._updateClassName();
                    }
                };
                classListProto.remove = function () {
                    var tokens = arguments,
                        i = 0,
                        l = tokens.length,
                        token,
                        updated = false,
                        index;
                    do {
                        token = tokens[i] + "";
                        index = checkTokenAndGetIndex(this, token);
                        while (index !== -1) {
                            this.splice(index, 1);
                            updated = true;
                            index = checkTokenAndGetIndex(this, token);
                        }
                    } while (++i < l);

                    if (updated) {
                        this._updateClassName();
                    }
                };
                classListProto.toggle = function (token, force) {
                    token += "";

                    var result = this.contains(token),
                        method = result ? force !== true && "remove" : force !== false && "add";

                    if (method) {
                        this[method](token);
                    }

                    if (force === true || force === false) {
                        return force;
                    } else {
                        return !result;
                    }
                };
                classListProto.toString = function () {
                    return this.join(" ");
                };

                if (objCtr.defineProperty) {
                    var classListPropDesc = {
                        get: classListGetter,
                        enumerable: true,
                        configurable: true
                    };
                    try {
                        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                    } catch (ex) {
                        // IE 8 doesn't support enumerable:true
                        if (ex.number === -0x7FF5EC54) {
                            classListPropDesc.enumerable = false;
                            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                        }
                    }
                } else if (objCtr[protoProp].__defineGetter__) {
                    elemCtrProto.__defineGetter__(classListProp, classListGetter);
                }
            })(self);
        } else {
            // There is full or partial native classList support, so just check if we need
            // to normalize the add/remove and toggle APIs.

            (function () {
                "use strict";

                var testElement = document.createElement("_");

                testElement.classList.add("c1", "c2");

                // Polyfill for IE 10/11 and Firefox <26, where classList.add and
                // classList.remove exist but support only one argument at a time.
                if (!testElement.classList.contains("c2")) {
                    var createMethod = function (method) {
                        var original = DOMTokenList.prototype[method];

                        DOMTokenList.prototype[method] = function (token) {
                            var i,
                                len = arguments.length;

                            for (i = 0; i < len; i++) {
                                token = arguments[i];
                                original.call(this, token);
                            }
                        };
                    };
                    createMethod('add');
                    createMethod('remove');
                }

                testElement.classList.toggle("c3", false);

                // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
                // support the second argument.
                if (testElement.classList.contains("c3")) {
                    var _toggle = DOMTokenList.prototype.toggle;

                    DOMTokenList.prototype.toggle = function (token, force) {
                        if (1 in arguments && !this.contains(token) === !force) {
                            return force;
                        } else {
                            return _toggle.call(this, token);
                        }
                    };
                }

                testElement = null;
            })();
        }
    }
};

/**
 * Get index of child node.
 * @param {Node} 
 * @return {Number}
 */
const getChildIndex = node => {
    return [].indexOf.call(node.parentNode.children, node);
};



/**
 * Finds value in an array 
 * @param {Array} haystack - The array to search.
 * @param {*} needle - The value to look for
 */


/**
 * Checks to see if the interface has been added
 * as a render type method. 
 * @param {string} interfaceType 
 * @param {string} interfaceName
 */
const renderHasInterface = (interfaceName, interfaceType) => {
    return render[interfaceType].hasOwnProperty(interfaceName);
};

/**
 * Pass a condition once with a given reference.
 * @param {string} reference - A unique reference per conditon.
 * @return {Boolean}
 */
function once(reference) {
    if (!once.prototype.references) {
        once.prototype.references = {};
    }
    // Store reference if dosen't exist.
    if (!once.prototype.references.hasOwnProperty(reference)) {
        once.prototype.references[reference] = null;
        return true;
    } else {
        return false;
    }
}

function renderBranches$1(tree, selector, interfaceName) {
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
            return string.replace(/-([a-z])/g, function (g) {
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
            renderBranches$1(el[3], newNode, interfaceName);
        }
        selector.appendChild(newNode);
    }
}

function renderVariables(tree, selector, interfaceName) {
    var container = selector.parentNode;
    function recursive(tree, $, interfaceName) {

        const name = 'renderVariables';
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

        // if (!renderVariables.prototype.count) {
        //     console.log('once')
        //     renderVariables.prototype.count = true;
        //     return selector;
        // }


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
                return string.replace(/-([a-z])/g, function (g) {
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

            $.appendChild(newNode);

            if (hasChildren) {
                // console.log('Yes has children', el[3].length)
                recursive(el[3], newNode, interfaceName);
            }
        }
    }

    if (!renderVariables.prototype.containerIndex) {
        renderVariables.prototype.containerIndex = {};
    }
    if (!renderVariables.prototype.containerIndex.interfaceName) {
        renderVariables.prototype.containerIndex.interfaceName = getChildIndex(selector);
    }

    // console.log('parent is ', container)
    // var d = document.createElement('div');
    var clonedParent = selector.cloneNode(false);
    recursive(tree, clonedParent, interfaceName);

    var oldParent = document.body.childNodes[renderVariables.prototype.containerIndex.interfaceName];

    document.body.replaceChild(clonedParent, oldParent);

    // if(document.body.contains(d)){
    //     console.log('new')
    //     document.body.replaceChild(d,d)
    // }else{
    //      console.log('replace updated')
    //     document.body.replaceChild(d,selector) 
    // }

    // console.log(d)
}

let _render = {};

const Render = {
    method1: function () {
        this.tree = 'green';
    },
    method2: function () {
        console.log('i am ' + this.tree);
    },
    renderUpdates(selector, interfaceName, interfaceType) {
        // console.info('New updates Rendered')
        // let currentVirtualTree = __._dynamicStore[interfaceName].currentVirtualTree();
        // let updatedTree = renderVariables(currentVirtualTree, selector, interfaceName);
        // renderVariables.prototype.count = false;

        // console.log(updatedTree);
    },
    initialRender(selector, interfaceName, interfaceType) {
        console.info('New interface Rendered');
        let currentVirtualTree = __._dynamicStore[interfaceName].currentVirtualTree();
        renderBranches$1(currentVirtualTree, selector, interfaceName);
    }
};

_render.static = Object.create(Render);
_render.stateless = Object.create(Render);
_render.dynamic = Object.create(Render);

function addInterfaceRenderMethod(interfaceName, interfaceType) {
    const fnName = 'addInterfaceRenderMethod';
    let intitialRender;
    if (!renderHasInterface(interfaceName, interfaceType)) {
        _render[interfaceType][interfaceName] = function (selector) {
            intitialRender = once(fnName + interfaceName);
            switch (interfaceType) {
                case 'dynamic':
                    if (intitialRender) {
                        this.initialRender(selector, interfaceName, interfaceType);
                    } else {
                        this.renderUpdates(selector, interfaceName, interfaceType);
                    }
                    break;
                case 'stateless':
                    if (intitialRender) {
                        this.initialRender(selector, interfaceName, interfaceType);
                    }
                    break;
                case 'static':
                    if (intitialRender) {
                        this.initialRender(selector, interfaceName, interfaceType);
                    } else {
                        this.renderUpdates(selector, interfaceName, interfaceType);
                    }
                    break;
            }
        };
        console.info('new interface Added');
        window.d = __._dynamicStore;
    }
}

let render$1 = _render;

var _this = undefined;

// TESTING.
window.render = render$1;

function wave(interfaceNamewaveName) {
    let props = {};
    var elementPropertyBlacklist = ['setAttribute', 'setAttributeNS', 'removeAttribute', 'removeAttributeNS', 'setAttributeNode', 'setAttributeNodeNS', 'removeAttributeNode', 'getElementsByTagName', 'getElementsByTagNameNS', 'getElementsByClassName', 'insertAdjacentElement', 'insertAdjacentText', 'insertAdjacentHTML', 'createShadowRoot', 'getDestinationInsertionPoints', 'remove', 'querySelector', 'querySelectorAll', 'attachShadow', 'cloneNode', 'innerHTML', 'insertBefore', 'appendChild', 'replaceChild', 'removeChild', 'addEventListener', ''];
    if (interfaceNamewaveName.indexOf(':') >= 0) {
        let nameParts = interfaceNamewaveName.split(':');
        let element = wave._elementStore[nameParts[0]][nameParts[1]];
        let property;
        let i;
        let blackListLength = elementPropertyBlacklist.length;

        for (property in element) {
            props[property] = element[property];
        }
        for (i = 0; i < blackListLength; i++) {
            props[elementPropertyBlacklist[i]] = undefined;
        }
        props.on = function (event, handler, bubbling) {
            element.addEventListener(event, handler, bubbling);
        };
        return props;
    } else {
        throw new Error('The interface name and wave Id should be separated by a colon.');
    }
}

window.__ = wave;

wave.track = function (interfaceName, value, _tag) {
    if (_tag === undefined) {
        throw new Error(`Please define the _tag for ${ value }`);
    }
    return {
        interfaceName,
        _tag,
        value
    };
};

wave.append = (...args) => {

    let appendValues = Array.from(args);
    let parent = appendValues.pop();
    for (let i = 0; i < appendValues.length; i++) {
        // console.log(appendValues[i])
        // parent.appendChild(appendValues[i].node);
    }
};

wave.polyfills = (...args) => {
    if (args.length) {
        args.forEach(polyfill => {
            polyfill();
        });
    } else {
        classList();
        // List of polyfills.    
    }
};

wave.model = {};

wave._dynamicStore = {};

wave._elementStore = {};

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
};

function renderBranches(tree, selector, interfaceName) {
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
    if (!wave._elementStore.hasOwnProperty(interfaceName)) {
        wave._elementStore[interfaceName] = {};
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
            return string.replace(/-([a-z])/g, function (g) {
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
            wave._elementStore[interfaceName][toCamel(selectorName)] = newNode;
            selectorName = false;
        }

        if (hasChildren) {
            // console.log('Yes has children', el[3].length)
            renderBranches(el[3], newNode, interfaceName);
        }
        selector.appendChild(newNode);
    }
}

wave._registerDynamicInterface = function (interFace, dynamicScope, interfaceName) {
    if (once('_registerDynamicInterface' + interfaceName)) {
        wave.model[interfaceName]['name'] = interfaceName;
        wave._dynamicStore[interfaceName] = {
            lastVirtualTree: interFace.apply(dynamicScope, [wave.model[interfaceName]]),
            currentVirtualTree: () => {
                return interFace.apply(dynamicScope, [wave.model[interfaceName]]);
            }

        };
    }
};

wave.dynamic = function (interfaceName, interFace) {
    registerInterface(interfaceName, 'dynamic');
    wave._registerDynamicInterface(interFace, this, interfaceName);
};

wave.static = (interfaceName, interFace) => {
    registerInterface(interfaceName, 'static');
    wave._registerDynamicInterface(interFace, _this, interfaceName);
};

wave.stateless = (interfaceName, interFace) => {
    registerInterface(interfaceName, 'stateless');
    wave._registerDynamicInterface(interFace, _this, interfaceName);
};

const assembly = tagName => {
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
                children.push(item);
            }
        }

        var node = [tagName, attributes, tracker, children];
        return node;
    };
};

wave.render = render$1;

const a = assembly('a');
const abbr = assembly('abbr');
const address = assembly('address');
const area = assembly('area');
const article = assembly('article');
const aside = assembly('aside');
const audio = assembly('audio');
const b = assembly('b');
const base = assembly('base');
const bdi = assembly('bdi');
const bdo = assembly('bdo');
const blockquote = assembly('blockquote');
const body = assembly('body');
const br = assembly('br');
const button = assembly('button');
const canvas = assembly('canvas');
const caption = assembly('caption');
const cite = assembly('cite');
const code = assembly('code');
const col = assembly('col');
const colgroup = assembly('colgroup');
const command = assembly('command');
const dd = assembly('dd');
const del = assembly('del');
const dfn = assembly('dfn');
const div = assembly('div');
const dl = assembly('dl');
const doctype = assembly('doctype');
const dt = assembly('dt');
const em = assembly('em');
const embed = assembly('embed');
const fieldset = assembly('fieldset');
const figcaption = assembly('figcaption');
const figure = assembly('figure');
const footer = assembly('footer');
const form = assembly('form');
const h1 = assembly('h1');
const h2 = assembly('h2');
const h3 = assembly('h3');
const h4 = assembly('h4');
const h5 = assembly('h5');
const h6 = assembly('h6');
const header = assembly('header');
const hgroup = assembly('hgroup');
const hr = assembly('hr');
const html = assembly('html');
const i = assembly('i');
const iframe = assembly('iframe');
const img = assembly('img');
const input = assembly('input');
const ins = assembly('ins');
const kbd = assembly('kbd');
const keygen = assembly('keygen');
const label = assembly('label');
const legend = assembly('legend');
const li = assembly('li');
const link = assembly('link');
const map = assembly('map');
const mark = assembly('mark');
const menu = assembly('menu');
const meta = assembly('meta');
const nav = assembly('nav');
const noscript = assembly('noscript');
const object = assembly('object');
const ol = assembly('ol');
const optgroup = assembly('optgroup');
const option = assembly('option');
const p = assembly('p');
const param = assembly('param');
const pre = assembly('pre');
const progress = assembly('progress');
const q = assembly('q');
const rp = assembly('rp');
const rt = assembly('rt');
const ruby = assembly('ruby');
const s = assembly('s');
const samp = assembly('samp');
const script = assembly('script');
const section = assembly('section');
const select = assembly('select');
const small = assembly('small');
const source = assembly('source');
const span = assembly('span');
const strong = assembly('strong');
const style = assembly('style');
const sub = assembly('sub');
const sup = assembly('sup');
const table = assembly('table');
const tbody = assembly('tbody');
const td = assembly('td');
const textarea = assembly('textarea');
const tfoot = assembly('tfoot');
const th = assembly('th');
const thead = assembly('thead');
const title = assembly('title');
const tr = assembly('tr');
const ul = assembly('ul');
const v = assembly('var');
const video = assembly('video');

const comment = message => {
    return ['comment', message];
};
const text = message => {
    return ['text', message];
};
const loop = () => {
    // Takes an object, array or JSON and loops though,
    // Return the elements/ nodes to make up a list.
    // you can nest loops.
};

const __$1 = wave;

export { a, abbr, address, area, article, aside, audio, b, base, bdi, bdo, blockquote, body, br, button, canvas, caption, cite, code, col, colgroup, command, dd, del, dfn, div, dl, doctype, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, hr, html, i, iframe, img, input, ins, kbd, keygen, label, legend, li, link, map, mark, menu, meta, nav, noscript, object, ol, optgroup, option, p, param, pre, progress, q, rp, rt, ruby, s, samp, script, section, select, small, source, span, strong, style, sub, sup, table, tbody, td, textarea, tfoot, th, thead, title, tr, ul, v, video, comment, text, loop, __$1 as __ };
