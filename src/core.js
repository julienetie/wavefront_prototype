import classList from './polyfills/class-list';
import { contains, once } from './utils';
import { render, addInterfaceRenderMethod } from './render';
// const waveFront = () => {
//     window.addEventListener('load', function() {
//         if (window.WAVEFRONT_ENV === 'dev') {
//             console.log('%cWavefront%c::%cDEVELOPMENT MODE', 'color: #cc0000; font-size:1.1rem;', 'color: black; font-size:1rem;', 'color: darkblue; font-size:0.8rem;')
//         }
//     });
// }

// waveFront();

let store = {};

// TESTING.
window.render = render;


export function wave(interfaceNamewaveName) {
    let props = {};
    var elementPropertyBlacklist = [
        'setAttribute',
        'setAttributeNS',
        'removeAttribute',
        'removeAttributeNS',
        'setAttributeNode',
        'setAttributeNodeNS',
        'removeAttributeNode',
        'getElementsByTagName',
        'getElementsByTagNameNS',
        'getElementsByClassName',
        'insertAdjacentElement',
        'insertAdjacentText',
        'insertAdjacentHTML',
        'createShadowRoot',
        'getDestinationInsertionPoints',
        'remove',
        'querySelector',
        'querySelectorAll',
        'attachShadow',
        'cloneNode',
        'innerHTML',
        'insertBefore',
        'appendChild',
        'replaceChild',
        'removeChild',
        'addEventListener',
        ''
    ];
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
        props.on = function(event, handler, bubbling) {
            element.addEventListener(event, handler, bubbling)
        }
        return props;
    } else {
        throw new Error('The interface name and wave Id should be separated by a colon.')
    }

}




window.__ = wave;

wave.track = function(interfaceName, value, _tag) {
    if (_tag === undefined) {
        throw new Error(`Please define the _tag for ${value}`);
    };
    return {
        interfaceName,
        _tag,
        value
    }
}

wave.append = (...args) => {

    let appendValues = Array.from(args);
    let parent = appendValues.pop();
    for (let i = 0; i < appendValues.length; i++) {
        // console.log(appendValues[i])
        // parent.appendChild(appendValues[i].node);
    }
}

wave.polyfills = (...args) => {
    if (args.length) {
        args.forEach((polyfill) => {
            polyfill();
        });
    } else {
        classList();
        // List of polyfills.    
    }
}


wave.model = {}

wave.dynamicStore = {};

wave._elementStore = {};

store.staticRegistry = [];
store.dynamicRegistry = [];
store.statelessRegistry = [];

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
}

export function renderBranches(tree, selector, interfaceName) {
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

wave._registerDynamicInterface = function(interFace, dynamicScope, interfaceName) {
    if (once('_registerDynamicInterface' + interfaceName)) {
        wave.model[interfaceName]['name'] = interfaceName;
        wave.dynamicStore[interfaceName] = {
            lastVirtualTree: interFace.apply(dynamicScope, [wave.model[interfaceName]]),
            currentVirtualTree: () => {
                return interFace.apply(dynamicScope, [wave.model[interfaceName]]);
            }

        }
    }
}


wave.dynamic = function(interfaceName, interFace) {
    registerInterface(interfaceName, 'dynamic');
    wave._registerDynamicInterface(interFace, this, interfaceName)
};


wave.static = (interfaceName, interFace) => {
    registerInterface(interfaceName, 'static');
    wave._registerDynamicInterface(interFace, this, interfaceName)
};


wave.stateless = (interfaceName, interFace) => {
    registerInterface(interfaceName, 'stateless');
    wave._registerDynamicInterface(interFace, this, interfaceName)
};

export const assembly = (tagName) => {
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

        var node = [tagName, attributes, tracker, children];
        return node;
    };
}


wave.render = render;

