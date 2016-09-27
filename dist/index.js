(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, function () { 'use strict';

    const div = (attributes, ...args) => {
        var tree = {};
        var childTree;
        var childElement;
        // Check args to see 
        args.map((param, i) => {
            if (typeof param === 'string') {
                // we need the position of the text node i
                // the string its self param
                // create the node 
                // then add to the childElements list
                let textNode = document.createTextNode(param);
                addChildElement(textNode, i);
                // } else if (typeof param === 'object') {
            } else if (param.hasOwnProperty('element')) {
                // console.log(param)
                // Use Lodash to check object literal
                // Because the function has already been executed, 
                // it should return an object with a list of inner nodes including its self.

                // This element takees the list, adds its own property and returns it.
                // childTree[i] = param;
                // console.log(param)
                childElement = param.element;
                if (param.hasOwnProperty('tree')) {
                    childTree = param.tree;
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
        var attr = attributes.split('=');

        var oddPairs = attr.map(attributePair => {
            var splitIndex = attributePair.lastIndexOf(' ');
            if (splitIndex >= 0) {
                return [attributePair.slice(0, splitIndex), attributePair.slice(splitIndex, attributePair.length)];
            } else {
                return [attributePair];
            }
            // return attributePair.slice(splitIndex,attr.length -1);
        });

        var separatedPairs = [];
        for (var i = 0; i < oddPairs.length; i++) {
            oddPairs[i].forEach(part => {
                separatedPairs.push(part);
            });
        }
        var sortedPairs = [];
        var last = 0;
        for (i = 0; i < Math.floor(separatedPairs.length / 2); i++) {
            sortedPairs[i] = [separatedPairs[last], separatedPairs[last += 1]];
            last += 1;
        }

        // Trim attributes. 
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

        // Create Element
        var element = document.createElement('div');

        // Add to tree
        var newTree = {};
        newTree['div' + parseFloat(Math.random(), 10)] = element;
        childTree = childTree || {};

        tree = Object.assign(newTree, childTree);
        // Merge with child tree

        // Add attributes
        trimmed.forEach(pair => {
            element.setAttribute(pair[0], pair[1]);
        });
        // Add Inner HTML 


        // For testing append to body (wrong document.body for mulitple body elements)
        if (childElement) {
            element.appendChild(childElement);
        }

        // console.log(attr, oddPairs, separatedPairs, sortedPairs, trimmed)
        // document.createElement('div');


        function addChildElement() {}
        return {
            element,
            tree
        };
        // return tree;
    };

    // Rules: Every attribute must have an equals sign:
    // var someElement = div('class="container" id="some-id" data-attribute=" some data" contenteditable="" name="bob"', {someOtherElements: 'wfewefwef'},{list1: 'wfewefwef',list2:'hytht',list4:'fwefw'}, 'Hello World')


    var someElement = div(`class="container" id="some-id"`, div('id="some-id"', div('id="some-id"', div('id="some-id"', div('id="some-id"', div('class="container" id="some-id" data-attribute=" some data" contenteditable="" name="bob"', { someOtherElements: 'wfewefwef' }, { list1: 'wfewefwef', list2: 'hytht', list4: 'fwefw' }, 'Hello World'))))));
    document.body.appendChild(someElement.element);
    console.log('TREE', someElement);

}));