export const removeChilds = function(node) {
    var last;
    while (last = node.lastChild) node.removeChild(last);
};



export const ibIa1 = (nodeType, queriedParent, newDOMNode, childNode) => {
    if (nodeType === 't') {
        insert(queriedParent, newDOMNode, childNode);
    } else {
        insert(
            queriedParent.parentElement,
            newDOMNode,
            queriedParent
        );
    }
}

export const ibIa2 = (nodeType, childNodesLength, childNode, offset, queriedParent, newDOMNode) => {
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


export const r2 = (nodeType, queriedParent, offset, newDOMNode, refNode, childNode) => {
    switch (nodeType) {
        case 'e':
            let refNode = queriedParent.children[index + offset];
            queriedParent.replaceChild(newDOMNode, refNode);
            return;
        case 'n':
            refNode = queriedParent.childNodes[index + offset];
            queriedParent.replaceChild(newDOMNode, refNode);
            return;
        case 't':
            let textNode;
            for (let i = 0; i < childNodesLength; i++) {
                const childNode = childNodes[i];
                if (childNode.nodeType === 3) {
                    textNode = offset === 0 ? childNode : childNodes[i + offset];
                    break;
                }
            }
            queriedParent.replaceChild(newDOMNode, textNode);
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
                    console.log('childNodes', childNode)
                    childNode.remove(childNodes[i + offset]);
                    return;
                }
            }
            return;
        }

        if (type === 'all') {
            console.log('RM ALL')
            console.log(nodeType, type, queriedParent, selector, removeType, offset )
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
                console.log('BEFORE')
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
