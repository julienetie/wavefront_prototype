(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

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

window.render = render$1;

function __$1(interfaceNamewaveName) {
    let props = {};
    var elementPropertyBlacklist = ['setAttribute', 'setAttributeNS', 'removeAttribute', 'removeAttributeNS', 'setAttributeNode', 'setAttributeNodeNS', 'removeAttributeNode', 'getElementsByTagName', 'getElementsByTagNameNS', 'getElementsByClassName', 'insertAdjacentElement', 'insertAdjacentText', 'insertAdjacentHTML', 'createShadowRoot', 'getDestinationInsertionPoints', 'remove', 'querySelector', 'querySelectorAll', 'attachShadow', 'cloneNode', 'innerHTML', 'insertBefore', 'appendChild', 'replaceChild', 'removeChild', 'addEventListener', ''];
    if (interfaceNamewaveName.indexOf(':') >= 0) {
        let nameParts = interfaceNamewaveName.split(':');
        let element = __$1._elementStore[nameParts[0]][nameParts[1]];
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

window.__ = __$1;

__$1.track = function (interfaceName, value, _tag) {
    if (_tag === undefined) {
        throw new Error(`Please define the _tag for ${ value }`);
    }
    return {
        interfaceName,
        _tag,
        value
    };
};

__$1.append = (...args) => {

    let appendValues = Array.from(args);
    let parent = appendValues.pop();
    for (let i = 0; i < appendValues.length; i++) {
        // console.log(appendValues[i])
        // parent.appendChild(appendValues[i].node);
    }
};

__$1.polyfills = (...args) => {
    if (args.length) {
        args.forEach(polyfill => {
            polyfill();
        });
    } else {
        classList();
        // List of polyfills.    
    }
};

__$1.model = {};

__$1._dynamicStore = {};

__$1._elementStore = {};

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
    if (!__$1._elementStore.hasOwnProperty(interfaceName)) {
        __$1._elementStore[interfaceName] = {};
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
            __$1._elementStore[interfaceName][toCamel(selectorName)] = newNode;
            selectorName = false;
        }

        if (hasChildren) {
            // console.log('Yes has children', el[3].length)
            renderBranches(el[3], newNode, interfaceName);
        }
        selector.appendChild(newNode);
    }
}

__$1._registerDynamicInterface = function (interFace, dynamicScope, interfaceName) {
    if (once('_registerDynamicInterface' + interfaceName)) {
        __$1.model[interfaceName]['name'] = interfaceName;
        __$1._dynamicStore[interfaceName] = {
            lastVirtualTree: interFace.apply(dynamicScope, [__$1.model[interfaceName]]),
            currentVirtualTree: () => {
                return interFace.apply(dynamicScope, [__$1.model[interfaceName]]);
            }

        };
    }
};

__$1.dynamic = function (interfaceName, interFace) {
    registerInterface(interfaceName, 'dynamic');
    __$1._registerDynamicInterface(interFace, this, interfaceName);
};

__$1.static = (interfaceName, interFace) => {
    registerInterface(interfaceName, 'static');
    __$1._registerDynamicInterface(interFace, _this, interfaceName);
};

__$1.stateless = (interfaceName, interFace) => {
    registerInterface(interfaceName, 'stateless');
    __$1._registerDynamicInterface(interFace, _this, interfaceName);
};

var assembly = tagName => {
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

__$1.render = render$1;

const a = assembly('a');



const article = assembly('article');
const aside = assembly('aside');


























const figcaption = assembly('figcaption');
const figure = assembly('figure');
const footer = assembly('footer');

const h1 = assembly('h1');
const h2 = assembly('h2');




const header = assembly('header');





const img = assembly('img');






const li = assembly('li');


const mark = assembly('mark');


const nav = assembly('nav');
















const section = assembly('section');

















const ul = assembly('ul');



const comment = message => {
    return ['comment', message];
};

// window.WAVEFRONT_ENV = 'dev';
__$1.polyfills();

/*
 * ./data/
 */
__$1.model.testPage = {
    _image: {
        src: 'https://www.google.co.uk/logos/doodles/2016/100th-anniversary-of-completion-of-the-trans-siberian-railway-6269398706814976-vacta.gif',
        width: 85,
        height: 85,
        alt: 'Jennifer Marsman'
    },
    _articleSection2: 'This is the second article. These articles could be blog posts, etc.',
    _article1Header: 'Article #1h1'
};
__$1.model.otherPage = {
    _image: {
        src: 'https://www.google.co.uk/logos/doodles/2016/100th-anniversary-of-completion-of-the-trans-siberian-railway-6269398706814976-vacta.gif',
        width: 85,
        height: 85,
        alt: 'Jennifer Marsman'
    },
    _articleSection2: 'This is the second article. These articles could be blog posts, etc.',
    _article1Header: 'Article #1h1'
};
/****DATA *****/

/*
 * ./interface/dynamic/*
 */
__$1.dynamic('testPage', ({ _image, _articleSection2, _article1Header, name }) => {
    /**
     * Tracking:: (Variables that are allowed to change)
     */
    let red = 'red';
    let image = __$1.track(name, _image, 'dImage');
    let articleSection2 = __$1.track(name, _articleSection2, 'vArticle');
    let article1Header = __$1.track(name, _article1Header, 'vArticle');

    /*__________________________________________________*/
    return [header({ class: 'red', 'data-hello': 'World!', style: `background: ${ red }; height:auto` }, h1('Header in h1'), comment('This is a comment'), h2('Subheader in h2')), comment('YEa yea yea yYAAAA whatever'), 'This is crazy', nav(ul(li(a({ href: 'http://google.com', class: 'some-class' }, 'Menu Option 1a')), li(a({ href: 'http://facebook.com', class: 'some-class' }, 'Menu Option 2a')), li(a({ href: 'http://youtube.com' }, 'Menu Option 3a')))), section(article(header({ wave: 'juliensHeader' }, h1(article1Header)), section('This is the first article. This is', mark('highlightedmark'), '.')), article(header(h1('Article #2h1')), section({ id: 'whatsUpJack' }, articleSection2))), aside(section(h1('Linksh1'), ul(li(a({ href: '#' }, 'Link 1a')), li(a({ href: '#' }, 'Link 2a')), li(a({ href: '#' }, 'Link 3a')))), figure(img(image), figcaption('Jennifer Marsman'))), footer('Footer - Copyright 2016')];
    /*__________________________________________________*/
});

/*
 * ./interface/dynamic/*
 */
__$1.dynamic('otherPage', ({ _image, _articleSection2, _article1Header, name }) => {
    /**
     * Tracking:: (Variables that are allowed to change)
     */
    let red = 'red';
    let image = __$1.track(name, _image, 'dImage');
    let articleSection2 = __$1.track(name, _articleSection2, 'vArticle');
    let article1Header = __$1.track(name, _article1Header, 'vArticle');

    /*__________________________________________________*/
    return [header({ class: 'red', 'data-hello': 'World!', style: `background: yellow; height:auto` }, h1('This is another interface'), comment('This is a comment'), h2('Subheader in h2')), comment('YEa yea yea yYAAAA whatever'), 'This is another interface', nav(ul(li(a({ href: 'http://google.com', class: 'some-class' }, 'Menu Option 1a')), li(a({ href: 'http://facebook.com', class: 'some-class' }, 'Menu Option 2a')), li(a({ href: 'http://youtube.com' }, 'Menu Option 3a')))), section(article(header({ wave: 'juliensHeader' }, h1(article1Header)), section('This is another interface', mark('highlightedmark'), '.')), article(header(h1('This is another interface')), section({ id: 'whatsUpJack' }, articleSection2))), aside(section(h1('Linksh1'), ul(li(a({ href: '#' }, 'Link 1a')), li(a({ href: '#' }, 'Link 2a')), li(a({ href: '#' }, 'Link 3a')))), figure(img(image), figcaption('Jennifer Marsman'))), footer('Footer - Copyright 2016')];
    /*__________________________________________________*/
});

/*
 * ./render/*
 */
var HTMLInterface1 = document.querySelector('.main-section');
var HTMLInterface2 = document.querySelector('.other-section');

__$1.render.dynamic.testPage(HTMLInterface1);
__$1.render.dynamic.otherPage(HTMLInterface2);

window.__ = __$1;

})));
