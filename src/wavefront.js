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

export function __(){

}
__.append = (...args)=>{
    let appendValues = Array.from(args);
    let parent = appendValues.pop();
    for(let i =0;i< appendValues.length; i++){
        parent.appendChild(appendValues[i].node);
    }
}


var wavefront = (tagName) => {
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

                if(param[0] === '@'){
                // Treat as attribute.
                    attributes = param.substring(1);
                    console.log('attributes',attributes)
                    hasAttributes = typeof attributes === 'string' && !!attributes;
                }else{
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
                        })
                        break;
                    default:
                        throw new Error(`${param.nodeType} is not supported.`);
                }
            }


        });

        function assignAttributes(element, strAttributes) {
            var splitAttributes = strAttributes.split('=');
            var separatedPairs = [];
            var sortedPairs = [];
            var last = 0;


            let splitOddPairs = (attributePair) => {
                var splitFromIndex = attributePair.lastIndexOf(' ');
                if (splitFromIndex >= 0) {
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
            nodeDetails = wavefrontNodes.map((nodeDetail) => {
                return nodeDetail.tree || {};
            });


            // New Tree from current branch and nested trees.
            tree = Object.assign(branch, ...nodeDetails);

            // Append the child element to the new element.
            wavefrontNodes.forEach((node) => {
                element.appendChild(node.node);
            })
            return {
                node: element,
                tree
            };
        }

        var wave = createElement(tagName, attributes, childWavefrontNodes, hasAttributes);

        return wave;
    };
}


export var div = wavefront('div');
export var ul = wavefront('ul');
export var li = wavefront('li');
export var h1 = wavefront('h1');
export var h2 = wavefront('h2');
export var h3 = wavefront('h3');
export var h4 = wavefront('h4');
export var h5 = wavefront('h5');
export var h6 = wavefront('h6');
export var article = wavefront('article');
export var section = wavefront('section');
export var header = wavefront('header');
export var footer = wavefront('footer');
export var nav = wavefront('nav');
export var a = wavefront('a');
export var mark = wavefront('mark');
export var aside = wavefront('aside');
export var figure = wavefront('figure');
export var img = wavefront('img');
export var figcaption = wavefront('figcaption');