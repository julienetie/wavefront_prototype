(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('dotenv')) :
    typeof define === 'function' && define.amd ? define(['dotenv'], factory) :
    (factory(global.dotenv));
}(this, (function (dotenv) { 'use strict';

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
