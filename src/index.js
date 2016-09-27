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

    var hasAttributes = typeof attributes === 'string' && !!attributes;
    if(typeof attributes !== 'string' || attributes !== 0 ){
        throw new Error(`${attributes} is an invalid type for attributes.`);
    }

    // Check args to see 
    args.map((param, i) => {



        // if (typeof param === 'string') {
        //     // we need the position of the text node i
        //     // the string its self param
        //     // create the node 
        //     // then add to the childElements list
        //     let textNode = document.createTextNode(param);
        //     addChildElement(textNode, i);
        //     // } else if (typeof param === 'object') {
        // }  

        // if (param.hasOwnProperty('element') && !param.nodeType) {
        //     // console.log(param)
        //     // Use Lodash to check object literal
        //     // Because the function has already been executed, 
        //     // it should return an object with a list of inner nodes including its self.

        //     // This element takees the list, adds its own property and returns it.
        //     // childTree[i] = param;
        //     // console.log(param)
        //     childElement = param.element;
        //     if (param.hasOwnProperty('tree')) {
        //         childTree = param.tree;
        //     }

        // }

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


        let splitOddPairs = (attributePair) => {
            if (attributePair.lastIndexOf(' ') >= 0) {
                return [
                    attributePair.slice(0, splitFromIndex),
                    attributePair.slice(splitFromIndex, attributePair.length)
                ];
            } else {
                return [attributePair];
            }
        }

        var oddPairs = splitAttributes.map(splitOddPairs);

        /**
         * Separate odd pairs 
         */
        for (var i = 0; i < oddPairs.length; i++) {
            oddPairs[i].forEach((oddPair) => {
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
        var trimmed = sortedPairs.map((pair) => {
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
        trimmed.forEach((pair) => {
            element.setAttribute(pair[0], pair[1]);
        });
    }


    /**
     * Create new element. 
     */
    function createElement(tagName, attr, innerTrees,childElements, hasAttributes) {
        var tree = {};
        let branch = {};
        var element = document.createElement(tagName);
        /**
         * Assign attributes to the new element. 
         */
        if(hasAttributes){
            assignAttributes(element, attr);
        }
        // Dummy new element name system. 
        branch[tagName + parseFloat(Math.random(), 10)] = element;

        // Ensure an objest is merged.
        innerTree = innerTree || {};

        // New Tree from current branch and nested trees.
        tree = Object.assign(branch, innerTree);

        // Append the child element to the new element.
        if (childElement) {
            element.appendChild(childElement);
        }
    }

    createElement(tagName, attributes, childTrees, param.element, hasAttributes);


    // console.log(attr, oddPairs, separatedPairs, sortedPairs, trimmed)
    // document.createElement('div');


    function addChildElement() {

    }


    return {
        element,
        tree
    };
    // return tree;
};

// Rules: Every attribute must have an equals sign:
// var someElement = div('class="container" id="some-id" data-attribute=" some data" contenteditable="" name="bob"', {someOtherElements: 'wfewefwef'},{list1: 'wfewefwef',list2:'hytht',list4:'fwefw'}, 'Hello World')


var someElement =
    div(`class="container" id="some-id"`,
        div('',
            div('id="some-id"',
                div('id="some-id"',
                    div('id="some-id"',
                        div('class="container" id="some-id" data-attribute=" some data" contenteditable="" name="bob"', { someOtherElements: 'wfewefwef' }, { list1: 'wfewefwef', list2: 'hytht', list4: 'fwefw' }, 'Hello World')
                    )
                )
            )
        )
    );
document.body.appendChild(someElement.element);
console.log('TREE', someElement);
