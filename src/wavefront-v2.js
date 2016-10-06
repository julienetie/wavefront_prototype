import classList from './polyfills/class-list';
import {
    patch,
    elementOpen,
    elementClose,
    elementVoid,
    text
} from '../libs/incremental-dom-es6';
// const waveFront = () => {
//     window.addEventListener('load', function() {
//         if (window.WAVEFRONT_ENV === 'dev') {
//             console.log('%cWavefront%c::%cDEVELOPMENT MODE', 'color: #cc0000; font-size:1.1rem;', 'color: black; font-size:1rem;', 'color: darkblue; font-size:0.8rem;')
//         }
//     });
// }

// waveFront();




export function __(interfaceNamewaveName) {
    let nameParts = interfaceNamewaveName.split(':');
    var el = __[nameParts[0]][nameParts[1]];
    return {
        on: function(event, handler, bubbling) {
            el.addEventListener(event, handler, bubbling)
            console.log('done',el,event, handler, bubbling)
        }
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


__.data = {}

__._dynamicStore = {};

__._elementStore = {};

__._createNewInterface = (tree, selector, interfaceName) => {
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
    if (!__.hasOwnProperty(interfaceName)) {
        __[interfaceName] = {};
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
            __[interfaceName][toCamel(selectorName)] = newNode;
            selectorName = false;
        }


        if (hasChildren) {
            // console.log('Yes has children', el[3].length)
            __._createNewInterface(el[3], newNode, interfaceName);
        }
        selector.appendChild(newNode);

    }

    // var HTMLInterface = document.querySelector(selector);
    // selector.appendChild(fragment)
    // console.log(HTMLInterface.children)
}


__.renderTree = function _renderTree(interfaceName, selector) {
    let currentVirtualTree = __._dynamicStore[interfaceName].currentVirtualTree();
    if (_renderTree.prototype[interfaceName]) {
        //
    } else {
        _renderTree.prototype[interfaceName] = true;
        console.log('new interface created')
        __._createNewInterface(currentVirtualTree, selector, interfaceName);
    }
}

__._registerDynamicInterface = function _regDynInt(interFace, dynamicScope, interfaceName) {
    if (_regDynInt.prototype.once) {

    } else {
        __.data[interfaceName]['name'] = interfaceName;
        __._dynamicStore[interfaceName] = {
                lastVirtualTree: interFace.apply(dynamicScope, [__.data[interfaceName]]),
                currentVirtualTree: () => {
                    return interFace.apply(dynamicScope, [__.data[interfaceName]]);
                }

            }
            // console.log('once', __._dynamicStore[interfaceName].currentVirtualTree())
        _regDynInt.prototype.once = true;
    }
}


// __.updateInterface = function(interfaceName, data) {

// }


__.dynamic = function(interfaceName, interFace) {
    // Called once to set the inital state.
    __._registerDynamicInterface(interFace, this, interfaceName)
};
__.static = () => {};
__.stateless = () => {};

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
        // args.map((item) => {

        //     if { item.hasOwnProperty('_tag') } {
        //         tracker.value = item.value;
        //         tracker._tag = item._tag;
        //         tracker.canUpdate = true;
        //         item  = item.value
        //     } else {

        //     }

        //     //Check if text node
        //     if (typeof item === 'string') {
        //         children.push(['text', item]);
        //     }

        //     // Attribute check 
        //     if (item.constructor === {}.constructor) {
        //         attributes = item;
        //     }

        //     // Check if child 
        //     if (item instanceof Array) {
        //         children.push(item)
        //     }
        // })


        // var childTree;
        // var childElement;
        // var childWavefrontNodes = [];
        // var attributes;
        // var hasAttributes;
        // var skip = false;

        // function applyAttributes(value) {
        //     return value
        // }

        // function createCommentNode(value, nodeStorage) {
        //     nodeStorage.push({
        //         node: document.createComment(value),
        //         tree: {}
        //     });
        // }

        // function createTextNode(value, nodeStorage, indicator) {
        //     let text = indicator ? value.substring(1) : value;
        //     nodeStorage.push({
        //         node: document.createTextNode(text),
        //         tree: {}
        //     });
        // }

        // function addChildWaveNode(value, nodeStorage) {
        //     nodeStorage.push(value);
        // }

        // function parseStringEntry(value, nodeStorage) {
        //     switch (value[0]) {
        //         case '@':
        //             attributes = value.substring(1);
        //             break;
        //         case '//':
        //             createCommentNode(value, nodeStorage);
        //             break;

        //         case '#':
        //             createTextNode(value, nodeStorage, '#');
        //             break;
        //         default:
        //             createTextNode(value, nodeStorage);
        //     }
        // }

        // function createDOMNode(value, nodeStorage) {
        //     switch (value.nodeType) {
        //         // ELEMENT_NODE
        //         case 1:
        //             // TEXT_NODE
        //         case 3:
        //             // PROCESSING_INSTRUCTION_NODE
        //         case 7:
        //             // COMMENT_NODE
        //         case 8:
        //             // DOCUMENT_NODE
        //         case 9:
        //             // DOCUMENT_TYPE_NODE
        //         case 10:
        //             // DOCUMENT_FRAGMENT_NODE
        //         case 11:
        //             nodeStorage.push({
        //                 node: value,
        //                 tree: {}
        //             })
        //             break;
        //         default:
        //             throw new Error(`${value.nodeType} is not supported.`);
        //     }
        // }

        // const isTruthy = (value) => {
        //     return !!value;
        // }

        // // Check args to see 
        // args.forEach((param, i, isTruthy) => {
        //     let waveNode = param.hasOwnProperty('node') && param.hasOwnProperty('tree');
        //     let string = typeof param === 'string';
        //     let DOMNode = param.hasOwnProperty('nodeType');

        //     if (waveNode) {
        //         addChildWaveNode(param, childWavefrontNodes);
        //     } else if (string) {
        //         parseStringEntry(param, childWavefrontNodes);
        //     } else if (DOMNode) {
        //         createDOMNode(param, childWavefrontNodes);
        //     } else {
        //         throw new Error(`${param} is not a valid Wavefront node.`);
        //     }

        // });

        // function assignAttributes(element, strAttributes) {
        //     var splitAttributes = strAttributes.split('=');
        //     var separatedPairs = [];
        //     var sortedPairs = [];
        //     var last = 0;


        //     let splitOddPairs = (attributePair) => {
        //         var splitFromIndex = attributePair.lastIndexOf(' ');
        //         if (splitFromIndex >= 0) {
        //             return [
        //                 attributePair.slice(0, splitFromIndex),
        //                 attributePair.slice(splitFromIndex, attributePair.length)
        //             ];
        //         } else {
        //             return [attributePair];
        //         }
        //     }

        //     var oddPairs = splitAttributes.map(splitOddPairs);

        //     /**
        //      * Separate odd pairs 
        //      */
        //     for (var i = 0; i < oddPairs.length; i++) {
        //         oddPairs[i].forEach((oddPair) => {
        //             separatedPairs.push(oddPair);
        //         });
        //     }
        //     /**
        //      * Sort every concurrent pair
        //      */
        //     for (i = 0; i < Math.floor(separatedPairs.length / 2); i++) {
        //         sortedPairs[i] = [separatedPairs[last], separatedPairs[last += 1]];
        //         last += 1;
        //     }

        //     /**
        //      * Trim attributes and remove quotes from values.
        //      */
        //     var trimmed = sortedPairs.map((pair) => {
        //         let value = pair[1];
        //         let halfCleaned;
        //         let halfCleanedLength;
        //         let cleanedValue;
        //         if (value[0] === '"' || value[0] === '\'') {
        //             halfCleaned = value.substring(1);
        //             halfCleanedLength = halfCleaned.length - 1;
        //         }

        //         if (halfCleaned[halfCleanedLength] === '"' || value[0] === '\'') {
        //             cleanedValue = halfCleaned.substr(0, halfCleanedLength);
        //         }
        //         return [pair[0].trim(), cleanedValue];
        //     });

        //     /**
        //      * Assign attributes to element.  
        //      */
        //     trimmed.forEach((pair) => {
        //         element.setAttribute(pair[0], pair[1]);
        //     });
        // }


        // /**
        //  * Create new element. 
        //  */
        // function createElement(tagName, attributes, wavefrontNodes) {

        //     var tree = {};
        //     let branch = {};
        //     var element = document.createElement(tagName);
        //     var innerTrees;
        //     var nodeDetails;
        //     /**
        //      * Assign attributes to the new element. 
        //      */
        //     // console.log(attr)
        //     if (attributes) {
        //         assignAttributes(element, attributes);
        //     }
        //     // Dummy new element name system. 
        //     branch[tagName + parseFloat(Math.random(), 10)] = element;

        //     // Ensure an objest is merged.
        //     // innerTree = innerTree || {};
        //     nodeDetails = wavefrontNodes.map((nodeDetail) => {
        //         return nodeDetail.tree || {};
        //     });


        //     // New Tree from current branch and nested trees.
        //     tree = Object.assign(branch, ...nodeDetails);

        //     // Append the child element to the new element.
        //     wavefrontNodes.forEach((node) => {
        //         element.appendChild(node.node);
        //     })
        //     return {
        //         node: element,
        //         tree
        //     };
        // }

        // var wave = createElement(tagName, attributes, childWavefrontNodes);
        // String, object, array of arrays
        var node = [tagName, attributes, tracker, children];


        // if(!__._dynamicRegister[tracker.interfaceName]){
        //     __._dynamicRegister[tracker.interfaceName] = {}
        // }

        // if(tracker.canUpdate){
        // __._dynamicRegister[tracker.interfaceName][tagName + '_' + tracker._tag] = node;       
        // }

        // console.log(__._dynamicRegister[tracker.interfaceName])
        return node;
    };
}


export var a = assembly('a');
export var abbr = assembly('abbr');
export var address = assembly('address');
export var area = assembly('area');
export var article = assembly('article');
export var aside = assembly('aside');
export var audio = assembly('audio');
export var b = assembly('b');
export var base = assembly('base');
export var bdi = assembly('bdi');
export var bdo = assembly('bdo');
export var blockquote = assembly('blockquote');
export var body = assembly('body');
export var br = assembly('br');
export var button = assembly('button');
export var canvas = assembly('canvas');
export var caption = assembly('caption');
export var cite = assembly('cite');
export var code = assembly('code');
export var col = assembly('col');
export var colgroup = assembly('colgroup');
export var command = assembly('command');
export var dd = assembly('dd');
export var del = assembly('del');
export var dfn = assembly('dfn');
export var div = assembly('div');
export var dl = assembly('dl');
export var doctype = assembly('doctype');
export var dt = assembly('dt');
export var em = assembly('em');
export var embed = assembly('embed');
export var fieldset = assembly('fieldset');
export var figcaption = assembly('figcaption');
export var figure = assembly('figure');
export var footer = assembly('footer');
export var form = assembly('form');
export var h1 = assembly('h1');
export var h2 = assembly('h2');
export var h3 = assembly('h3');
export var h4 = assembly('h4');
export var h5 = assembly('h5');
export var h6 = assembly('h6');
export var header = assembly('header');
export var hgroup = assembly('hgroup');
export var hr = assembly('hr');
export var html = assembly('html');
export var i = assembly('i');
export var iframe = assembly('iframe');
export var img = assembly('img');
export var input = assembly('input');
export var ins = assembly('ins');
export var kbd = assembly('kbd');
export var keygen = assembly('keygen');
export var label = assembly('label');
export var legend = assembly('legend');
export var li = assembly('li');
export var link = assembly('link');
export var map = assembly('map');
export var mark = assembly('mark');
export var menu = assembly('menu');
export var meta = assembly('meta');
export var nav = assembly('nav');
export var noscript = assembly('noscript');
export var object = assembly('object');
export var ol = assembly('ol');
export var optgroup = assembly('optgroup');
export var option = assembly('option');
export var p = assembly('p');
export var param = assembly('param');
export var pre = assembly('pre');
export var progress = assembly('progress');
export var q = assembly('q');
export var rp = assembly('rp');
export var rt = assembly('rt');
export var ruby = assembly('ruby');
export var s = assembly('s');
export var samp = assembly('samp');
export var script = assembly('script');
export var section = assembly('section');
export var select = assembly('select');
export var small = assembly('small');
export var source = assembly('source');
export var span = assembly('span');
export var strong = assembly('strong');
export var style = assembly('style');
export var sub = assembly('sub');
export var sup = assembly('sup');
export var table = assembly('table');
export var tbody = assembly('tbody');
export var td = assembly('td');
export var textarea = assembly('textarea');
export var tfoot = assembly('tfoot');
export var th = assembly('th');
export var thead = assembly('thead');
export var title = assembly('title');
export var tr = assembly('tr');
export var ul = assembly('ul');
export var v = assembly('var');
export var video = assembly('video');

export var comment = (message) => {
    return ['comment', message];
};
