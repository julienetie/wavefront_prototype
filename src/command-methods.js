// @todo Insert need to be arguments
import {
    insertBefore,
    insertAfter
} from './helpers';

/** 
 * 
 */
export const removeChilds = function(node) {
    let last;
    while (last = node.lastChild) {
        node.removeChild(last);
    };
};



export const ibIa1 = (action,nodeType, queriedParent, newDOMNode, childNode) => {
    console.log(newDOMNode)
    const insert = action.indexOf('ia') >= 0 ? insertAfter : insertBefore;
    // if (nodeType === 't') {
    //     // insert(queriedParent, newDOMNode, childNode);
    //     insert(
    //         queriedParent.parentElement,
    //         newDOMNode,
    //         queriedParent
    //     );
    // } else {
    //     console.log(queriedParent.parentElement, newDOMNode, queriedParent)
    //     insert(
    //         queriedParent.parentElement,
    //         newDOMNode,
    //         queriedParent
    //     );
    // }
    queriedParent.appendChild(newDOMNode)
}

export const ibIa2 = (action, nodeType, childNodesLength, childNode, offset, queriedParent, newDOMNode) => {
    if (nodeType === 't') {
        let textNode;
        for (let i = 0; i < childNodesLength; i++) {
            const childNode = childNodes[i];
            if (childNode.nodeType === 3) {
                textNode = offset === 0 ? childNode : childNodes[i + offset];
                break;
            }
        }
        insert(
            queriedParent,
            newDOMNode,
            textNode
        );
    } else {
        insert(
            queriedParent,
            newDOMNode,
            queriedParent.children[index + offset]
        );
    }
}

export const r1 = (type, selector, nodeType, newDOMNode, CMDHasMany, queriedParent) => {
    if (type === 'all') {

        const children = queriedParent.querySelectorAll(selector);
        const childrenLength = children.length;
        const clones = [];

        if (nodeType !== 't') {
            for (let i = 0; i < childrenLength; i++) {
                clones.push(newDOMNode.cloneNode(true));
            }
        }

        for (let i = 0; i < childrenLength; i++) {
            if (nodeType === 't') {

                children[i].innerHTML = newDOMNode;
            } else {
                children[i].replaceWith(clones[i]);
            }
        }
    } else {
        if (!CMDHasMany) {
            queriedParent.parentElement.replaceChild(newDOMNode, queriedParent);
        }
    }
}


export const r2 = (nodeType, queriedParent, offset, index, newDOMNode) => {
    console.log('')
    switch (nodeType) {
        case 'e':
            let refNode = queriedParent.children[index + offset];
            // queriedParent.replaceChild(newDOMNode, refNode);
            // console.log('refNode', queriedParent)
            // refNode.replace(newDOMNode)
            // queriedParent.parentElement.replaceChild(newDOMNode, queriedParent)
            return;
        case 'n':
            refNode = queriedParent.childNodes[index + offset];
            // queriedParent.replaceChild(newDOMNode, refNode);
            refNode.replace(newDOMNode)
            return;
        case 't':
            // console.log(nodeType, queriedParent, offset, newDOMNode)
            queriedParent.textContent = newDOMNode
            // const childNodes = queriedParent.childNodes;
            // const childNodesLength = childNodes.length
            // let textNode;
            // for (let i = 0; i < childNodesLength; i++) {
            //     const childNode = childNodes[i];
            //     console.log(childNodes[i])
            //     if (childNode.nodeType === 3) {
            //         textNode = offset === 0 ? childNode : childNodes[i + offset];
            //         break;
            //     }
            // }
            // console.log('textNode', textNode)
            // // queriedParent.replaceChild(newDOMNode, textNode);
            // textNode.replace(newDOMNode)
            return;
    }
}



export const replaceNode = (type, queriedParent, query, newDOMNode) => {
    const child = queriedParent.querySelector(query);
    const childRelative = type ? child[type] : child;
    childRelative.replaceWith(newDOMNode);
}


export const rm = (nodeType, type, queriedParent, selector, removeType, offset) => {

    if (nodeType === 't') {

        if (type === 'single') {
            // const children = queriedParent.querySelectorAll(selector);
            queriedParent.style.backgroundColor = 'red'
            const childNodes = queriedParent.childNodes
            const childNodesLength = childNodes.length;

            let textNode;
            for (let i = 0; i < childNodesLength; i++) {
                const childNode = childNodes[i];
                if (childNode.nodeType === 3) {
                    // textNode = offset === 0 ? childNode : childNodes[i + offset];
                    childNode.remove(childNodes[i + offset]);
                    return;
                }
            }
            return;
        }

        if (type === 'all') {
            const matchingSelectors = queriedParent.querySelectorAll(selector);
            const matchingSelectorsLength = matchingSelectors.length;
            for (let j = 0; j < matchingSelectorsLength; j++) {
                const childNodes = matchingSelectors[j].childNodes
                const childNodesLength = childNodes.length;

                for (let i = 0; i < childNodesLength; i++) {
                    const childNode = childNodes[i];
                    if (childNode.nodeType === 3) {
                        matchingSelectors[j].remove(childNodes[i + offset]);
                    }
                }
            }
            return;
        }
    }


    if (type === 'all') {
        const children = queriedParent.querySelectorAll(selector);
        const childrenLength = children.length;

        switch (removeType) {
            case 'selected':
                for (let i = 0; i < childrenLength; i++) {
                    const child = children[i];
                    child.style.backgroundColor = 'pink'
                    child.remove(child);
                }
                return;
            case 'before':
                for (let i = 0; i < childrenLength; i++) {
                    const child = children[i];
                    if (i > 0) {
                        child.remove(child.previousSibling);
                    }
                }
                return;
            case 'after':
                for (let i = 0; i < childrenLength; i++) {
                    const child = children[i];
                    if (i < childrenLength - 1) {
                        const nextSibling = child.nextSibling;
                        nextSibling.remove(nextSibling);
                    }
                }
                return;
        }

    } else {
        switch (removeType) {
            case 'selected':
                queriedParent.parentElement.removeChild(queriedParent);
                return;
            case 'before':
                const previousSibling = queriedParent.previousSibling;
                if (!!previousSibling) {
                    queriedParent.parentElement.removeChild(previousSibling);
                }
                return;
            case 'after':
                const nextSibling = queriedParent.nextSibling;
                if (!!nextSibling) {
                    queriedParent.parentElement.removeChild(nextSibling);
                }
                return;
        }
    }
}