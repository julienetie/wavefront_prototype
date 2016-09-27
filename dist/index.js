(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

var _this = undefined;

// Parameters: 
// 1. Attributes
// *. Object that contains .element and .tree
// *. Text node.  :: nodeType 3
// *. Element node :: nodeType 1
// *. Comment node :: nodeType 8
// *. IE9 supports all nodes

const div = (attributes, ...args) => {
    var tagName = 'div';
    const ELEMENT_NODE = 1;
    const TEXT_NODE = 3;
    const PROCESSING_INSTRUCTION_NODE = 7;
    const COMMENT_NODE = 8;
    const DOCUMENT_NODE = 9;
    const DOCUMENT_TYPE_NODE = 10;
    const DOCUMENT_FRAGMENT_NODE = 11;
    var childTree;
    var childElement;
    var childWavefrontNodes = [];

    var hasAttributes = typeof attributes === 'string' && !!attributes;
    // if (!hasAttributes) {
    //     throw new Error(`${attributes} is an invalid type for attributes.`);
    // }


    // Check args to see 
    args.map((param, i) => {
        // Every param must be pushed to childWavefrontNodes

        // Wavefront Element Object.
        if (param.hasOwnProperty('node') && param.hasOwnProperty('tree')) {
            childWavefrontNodes.push(param);
        } else if (typeof param === 'string') {
            // Create text nodes from string.
            childWavefrontNodes.push({
                node: document.createTextNode(param),
                tree: {}
            });
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

    //    el-fn('attributes')
    //    el-fn('attributes', function)
    //    el-fn('attributes', 'text')
    //    el-fn('attributes', 'text', function)

    // Attributes 
    // Every space separation is a pair, 
    // Every attribute should have an equals value as a delimiter


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
        console.log(wavefrontNodes);
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
    // return tree;
};

// Rules: Every attribute must have an equals sign:
// var someElement = div('class="container" id="some-id" data-attribute=" some data" contenteditable="" name="bob"', {someOtherElements: 'wfewefwef'},{list1: 'wfewefwef',list2:'hytht',list4:'fwefw'}, 'Hello World')

var someElement = () => {
    console.log('this', _this);

    return div(`class="container" id="some-id"`, 'This is inserted before nested elements', div('', div('id="some-id"', div('id="some-id"', div('id="some-id"', div('class="container" id="some-id" data-attribute=" some data" contenteditable="" name="bob"', 'January')))), div('id="some-id"', div('id="some-id"', div('id="some-id"', div('class="container" id="some-id" data-attribute=" some data" contenteditable="" name="bob"', 'februrary'))))), 'This is inserted after nested elements');
};

document.body.appendChild(someElement().node);
console.log('TREE', someElement);

})));
