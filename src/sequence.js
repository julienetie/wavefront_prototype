import { createVDOMSequence } from './wavefront-v2';

export function sequence(tree, selector, interfaceName) {


console.log()




    // let treeLength = tree.length;
    // let el;
    // let createdElement;
    // let type;
    // let newNode;
    // let attrMsg;
    // let elTypeof;
    // let hasChildren;
    // let selectorName = false;

    // // Create the element store for the interface.
    // if (!__._elementStore.hasOwnProperty(interfaceName)) {
    //     __._elementStore[interfaceName] = {};
    // }

    // // var fragment = document.createDocumentFragment();
    // for (let i = 0; i < treeLength; i++) {
    //     el = tree[i];
    //     type = el[0];
    //     attrMsg = el[1];
    //     elTypeof = typeof el;
    //     hasChildren = !!(el[3] ? el[3].constructor === [].constructor : false);
    //     switch (elTypeof) {
    //         case 'string':
    //             // Text node
    //             newNode = document.createTextNode(el);
    //             break;
    //         case 'object':
    //             parseNode();
    //             break;
    //         case 'function':
    //             // 
    //             break;
    //     }

    //     function toCamel(string) {
    //         return string.replace(/-([a-z])/g, function(g) {
    //             return g[1].toUpperCase();
    //         });
    //     }



    //     // Create element
    //     function parseNode() {
    //         switch (type) {
    //             case 'text':
    //                 // Text node
    //                 newNode = document.createTextNode(attrMsg);
    //                 break;
    //             case 'comment':
    //                 // Comment node
    //                 newNode = document.createComment(attrMsg);
    //                 break;
    //             default:
    //                 // Element node
    //                 newNode = createElement(type, attrMsg);
    //         }
    //     }



    //     function createElement(tagName, attributes) {
    //         // Create element node.
    //         let element = document.createElement(tagName);
    //         let attr;
    //         // Apply attributes.
    //         if (attributes) {
    //             for (attr in attributes) {
    //                 // data-* , accept-charset, http-equiv keys must be strings.
    //                 // Styles are defined using template strings.
    //                 if (attr !== 'wave') {
    //                     element.setAttribute(attr, attributes[attr]);
    //                 }
    //                 switch (attr) {
    //                     case 'wave':
    //                         selectorName = selectorName ? false : attributes.wave;
    //                         break;
    //                     case 'id':
    //                         selectorName = selectorName ? false : attributes.id;
    //                         break;
    //                 }
    //             }
    //         }
    //         return element;
    //     }

    //     // Add node to elemeent store.
    //     if (selectorName) {
    //         __._elementStore[interfaceName][toCamel(selectorName)] = newNode;
    //         selectorName = false;
    //     }


    //     if (hasChildren) {
    //         // console.log('Yes has children', el[3].length)
    //         sequence(el[3], newNode, interfaceName);
    //     }
    //     selector.appendChild(newNode);
    // }
}