import classList from './polyfills/class-list';

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

__.polyfills = (...args)=>{
    if(args.length){
        args.forEach((polyfill)=>{
            polyfill();
        });
    }else{
        classList(); 
        // List of polyfills.    
    }
}

__.comment = (message)=>{
    return document.createComment(message);
};

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


export var a = wavefront('a');
export var abbr = wavefront('abbr');
export var address = wavefront('address');
export var area = wavefront('area');
export var article = wavefront('article');
export var aside = wavefront('aside');
export var audio = wavefront('audio');
export var b = wavefront('b');
export var base = wavefront('base');
export var bdi = wavefront('bdi');
export var bdo = wavefront('bdo');
export var blockquote = wavefront('blockquote');
export var body = wavefront('body');
export var br = wavefront('br');
export var button = wavefront('button');
export var canvas = wavefront('canvas');
export var caption = wavefront('caption');
export var cite = wavefront('cite');
export var code = wavefront('code');
export var col = wavefront('col');
export var colgroup = wavefront('colgroup');
export var command = wavefront('command');
export var dd = wavefront('dd');
export var del = wavefront('del');
export var dfn = wavefront('dfn');
export var div = wavefront('div');
export var dl = wavefront('dl');
export var doctype = wavefront('doctype');
export var dt = wavefront('dt');
export var em = wavefront('em');
export var embed = wavefront('embed');
export var fieldset = wavefront('fieldset');
export var figcaption = wavefront('figcaption');
export var figure = wavefront('figure');
export var footer = wavefront('footer');
export var form = wavefront('form');
export var h1 = wavefront('h1');
export var h2 = wavefront('h2');
export var h3 = wavefront('h3');
export var h4 = wavefront('h4');
export var h5 = wavefront('h5');
export var h6 = wavefront('h6');
export var header = wavefront('header');
export var hgroup = wavefront('hgroup');
export var hr = wavefront('hr');
export var html = wavefront('html');
export var i = wavefront('i');
export var iframe = wavefront('iframe');
export var img = wavefront('img');
export var input = wavefront('input');
export var ins = wavefront('ins');
export var kbd = wavefront('kbd');
export var keygen = wavefront('keygen');
export var label = wavefront('label');
export var legend = wavefront('legend');
export var li = wavefront('li');
export var link = wavefront('link');
export var map = wavefront('map'); 
export var mark = wavefront('mark');
export var menu = wavefront('menu');
export var meta = wavefront('meta');
export var nav = wavefront('nav');
export var noscript = wavefront('noscript');
export var object = wavefront('object');
export var ol = wavefront('ol');
export var optgroup = wavefront('optgroup');
export var option = wavefront('option');
export var p = wavefront('p');
export var param = wavefront('param');
export var pre = wavefront('pre');
export var progress = wavefront('progress');
export var q = wavefront('q');
export var rp = wavefront('rp');
export var rt = wavefront('rt');
export var ruby = wavefront('ruby');
export var s = wavefront('s');
export var samp = wavefront('samp');
export var script = wavefront('script');
export var section = wavefront('section');
export var select = wavefront('select');
export var small = wavefront('small');
export var source = wavefront('source');
export var span = wavefront('span');
export var strong = wavefront('strong');
export var style = wavefront('style');
export var sub = wavefront('sub');
export var sup = wavefront('sup');
export var table = wavefront('table');
export var tbody = wavefront('tbody');
export var td = wavefront('td');
export var textarea = wavefront('textarea');
export var tfoot = wavefront('tfoot');
export var th = wavefront('th');
export var thead = wavefront('thead');
export var title = wavefront('title');
export var tr = wavefront('tr');
export var ul = wavefront('ul');
export var v = wavefront('var');
export var video = wavefront('video');