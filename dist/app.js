(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('dotenv')) :
    typeof define === 'function' && define.amd ? define(['dotenv'], factory) :
    (factory(global.dotenv));
}(this, (function (dotenv) { 'use strict';

let classList = () => {
    console.log('polyfilled class List');

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

// const waveFront = () => {
//     window.addEventListener('load', function() {
//         if (window.WAVEFRONT_ENV === 'dev') {
//             console.log('%cWavefront%c::%cDEVELOPMENT MODE', 'color: #cc0000; font-size:1.1rem;', 'color: black; font-size:1rem;', 'color: darkblue; font-size:0.8rem;')
//         }
//     });
// }

// waveFront();

// var __ = {}
// __.comment = (message)=>{
//     return document.createComment(message);
// };


function __() {}
__.append = (...args) => {
    let appendValues = Array.from(args);
    let parent = appendValues.pop();
    for (let i = 0; i < appendValues.length; i++) {
        parent.appendChild(appendValues[i].node);
    }
};
__.polyfills = (...args) => {
    if (args.length) {
        args.forEach(polyfill => {
            polyfill();
        });
    } else {
        classList();
        // List of polyfills.    
    }
};

var wavefront = tagName => {
    return (...args) => {
        // var tagName = 'div';

        var childTree;
        var childElement;
        var childWavefrontNodes = [];
        var attributes;
        var hasAttributes;

        // Check args to see 
        args.forEach((param, i) => {
            // Every param must be pushed to childWavefrontNodes

            // Wavefront Element Object.
            if (param.hasOwnProperty('node') && param.hasOwnProperty('tree')) {
                childWavefrontNodes.push(param);
            } else if (typeof param === 'string') {

                if (param[0] === '@') {
                    // Treat as attribute.
                    attributes = param.substring(1);
                    console.log('attributes', attributes);
                    hasAttributes = typeof attributes === 'string' && !!attributes;
                } else {
                    // Create text nodes from string.
                    childWavefrontNodes.push({
                        node: document.createTextNode(param),
                        tree: {}
                    });
                }
            }

            // Parse DOM nodes.
            if (param.nodeType) {
                switch (param.nodeType) {
                    // ELEMENT_NODE
                    case 1:
                    // TEXT_NODE
                    case 3:
                    // PROCESSING_INSTRUCTION_NODE
                    case 7:
                    // COMMENT_NODE
                    case 8:
                    // DOCUMENT_NODE
                    case 9:
                    // DOCUMENT_TYPE_NODE
                    case 10:
                    // DOCUMENT_FRAGMENT_NODE
                    case 11:
                        childWavefrontNodes.push({
                            node: param,
                            tree: {}
                        });
                        break;
                    default:
                        throw new Error(`${ param.nodeType } is not supported.`);
                }
            }
        });

        function assignAttributes(element, strAttributes) {
            var splitAttributes = strAttributes.split('=');
            var separatedPairs = [];
            var sortedPairs = [];
            var last = 0;

            let splitOddPairs = attributePair => {
                var splitFromIndex = attributePair.lastIndexOf(' ');
                if (splitFromIndex >= 0) {
                    return [attributePair.slice(0, splitFromIndex), attributePair.slice(splitFromIndex, attributePair.length)];
                } else {
                    return [attributePair];
                }
            };

            var oddPairs = splitAttributes.map(splitOddPairs);

            /**
             * Separate odd pairs 
             */
            for (var i = 0; i < oddPairs.length; i++) {
                oddPairs[i].forEach(oddPair => {
                    separatedPairs.push(oddPair);
                });
            }
            /**
             * Sort every concurrent pair
             */
            for (i = 0; i < Math.floor(separatedPairs.length / 2); i++) {
                sortedPairs[i] = [separatedPairs[last], separatedPairs[last += 1]];
                last += 1;
            }

            /**
             * Trim attributes and remove quotes from values.
             */
            var trimmed = sortedPairs.map(pair => {
                let value = pair[1];
                let halfCleaned;
                let halfCleanedLength;
                let cleanedValue;
                if (value[0] === '"' || value[0] === '\'') {
                    halfCleaned = value.substring(1);
                    halfCleanedLength = halfCleaned.length - 1;
                }

                if (halfCleaned[halfCleanedLength] === '"' || value[0] === '\'') {
                    cleanedValue = halfCleaned.substr(0, halfCleanedLength);
                }
                return [pair[0].trim(), cleanedValue];
            });

            /**
             * Assign attributes to element.  
             */
            trimmed.forEach(pair => {
                element.setAttribute(pair[0], pair[1]);
            });
        }

        /**
         * Create new element. 
         */
        function createElement(tagName, attr, wavefrontNodes, hasAttributes) {
            var tree = {};
            let branch = {};
            var element = document.createElement(tagName);
            var innerTrees;
            var nodeDetails;
            /**
             * Assign attributes to the new element. 
             */
            if (hasAttributes) {
                assignAttributes(element, attr);
            }
            // Dummy new element name system. 
            branch[tagName + parseFloat(Math.random(), 10)] = element;

            // Ensure an objest is merged.
            // innerTree = innerTree || {};
            nodeDetails = wavefrontNodes.map(nodeDetail => {
                return nodeDetail.tree || {};
            });

            // New Tree from current branch and nested trees.
            tree = Object.assign(branch, ...nodeDetails);

            // Append the child element to the new element.
            wavefrontNodes.forEach(node => {
                element.appendChild(node.node);
            });
            return {
                node: element,
                tree
            };
        }

        var wave = createElement(tagName, attributes, childWavefrontNodes, hasAttributes);

        return wave;
    };
};


var ul = wavefront('ul');
var li = wavefront('li');
var h1 = wavefront('h1');
var h2 = wavefront('h2');




var article = wavefront('article');
var section = wavefront('section');
var header = wavefront('header');
var footer = wavefront('footer');
var nav = wavefront('nav');
var a = wavefront('a');
var mark = wavefront('mark');
var aside = wavefront('aside');
var figure = wavefront('figure');
var img = wavefront('img');
var figcaption = wavefront('figcaption');

// var dotenv =require('dotenv').config();

window.WAVEFRONT_ENV = 'dev';
__.polyfills();

// Rules: Every attribute must have an equals sign:
// var someElement = div('class="container" id="some-id" data-attribute=" some data" contenteditable="" name="bob"', {someOtherElements: 'wfewefwef'},{list1: 'wfewefwef',list2:'hytht',list4:'fwefw'}, 'Hello World')


// var message = 'don\'t forget to turn the oven off';
// var comment = document.createComment(message);

// var comment = __.comment('don\'t forget to turn the oven off');           
/*______________________________________*/
// let someElement = 
//     div(`class="container" id="some-id"`, 'This is inserted before nested elements',
//         div('',comment,
//             div('id="some-id"',
//                 div('id="some-id" style="background:red;"',
//                     div('id="some-id"',
//                         div('class="container" id="some-id" data-attribute=" some data" contenteditable="" name="bob"', 'January')
//                     )
//                 )
//             ),
//             div('id="some-id"',
//                 div('id="some-id"',
//                     div('id="some-id"',
//                         div('class="container" id="some-id" data-attribute=" some data" contenteditable="" name="bob"', 'februrary')
//                     )
//                 )
//             ),
//         ), 'This is inserted after nested elements');
/*______________________________________*/
// __.append(1,2,3,4,5,6,'someParentElement')
// console.log('__', __, 'div', div, 'li', li);

/**
 * Data
 */
const image = {
    src: 'http://www.windowsdevbootcamp.com/Images/JennMar.jpg',
    width: 85,
    height: 85,
    alt: 'Jennifer Marsman'
};
const imgAttr = `@width="${ image.width }" height="${ image.height }" src="${ image.src }" alt="${ image.alt }"`;
const articleSection2 = 'This is the second article. These articles could be blog posts, etc.';
const article1Header = 'Article #1h1';

/*__________________________________________________*/
__.append(header(h1('Header in h1'), h2('Subheader in h2')), nav(ul(li(a('@href="#"', 'Menu Option 1a')), li(a('@href="#"', 'Menu Option 2a')), li(a('@href="#"', 'Menu Option 3a')))), section(article(header(h1(article1Header)), section('This is the first article. This is', mark('highlightedmark'), '.')), article(header(h1('Article #2h1')), section(articleSection2))), aside(section(h1('Linksh1'), ul(li(a('@href="#"', 'Link 1a')), li(a('@href="#"', 'Link 2a')), li(a('@href="#"', 'Link 3a')))), figure(img(imgAttr), figcaption('Jennifer Marsman'))), footer('Footer - Copyright 2016'), document.body);
/*__________________________________________________*/

// Append to the page.
// document.body.appendChild(someElement.node);
// console.log('TREE', someElement);

})));
