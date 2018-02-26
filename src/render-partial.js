import {
    removeChildren,
    insertBefore,
    insertAfter
} from './helpers';
import cache from './cache';
import render from './render';
import {
    removeChilds, 
    ibIa1,
    ibIa2,
    r1,
    r2,
    replaceNode,
    rm
} from './command-methods';
/**
 * 
 *
 */
const updateCachedFragmentByCommand = (selector, CMD, queriedParent, newDOMNode, type) => {
    const CMDList = CMD.split(' ');
    const CMDListLength = CMDList.length;
    const CMDHasMany = CMDListLength > 1;
    const lastCommand = CMDList[CMDListLength - 1];
    const thirdCommand = CMDList[2];
    const secondCommand = CMDList[1];
    const action = CMDList[0];

    const childNodes = queriedParent.childNodes;
    const childNodesLength = childNodes.length;
    const childLengthAsIndex = childNodesLength - 1;

    // offset. 
    const hasOffset = CMDHasMany ? lastCommand[0] === '+' : false;
    let initialOffset = hasOffset ? parseInt(lastCommand.slice(1), 10) : 0;

    // index.
    const hasIndex = !!thirdCommand ? thirdCommand[0] === 'i' : false;
    let initalIndex = hasIndex ? parseInt(thirdCommand.slice(1), 10) : 0;

    // Limit the index to the child nodes length.
    const index = initalIndex + offset > childLengthAsIndex ? childLengthAsIndex : initalIndex;
    const offset = index + initialOffset > childLengthAsIndex ? 0 : initialOffset;

    // nodeType.
    const nodeType = !!secondCommand ? secondCommand[0] : 'e';

    // query.
    const hasQuery = !!secondCommand ? secondCommand.indexOf('=') >= 0 : false;
    const query = hasQuery ? secondCommand.split('=')[1] : null;

    /** 
     * NodeType|Index|Offset|Query
     *  CMDcode is a binary representation of 
     * the presetnt commands. 
     * Action is present by default.
     */
    const CMDcode = parseInt([
        1,
        hasIndex + 0,
        hasOffset + 0,
        hasQuery + 0
    ].join(''), 2);

    const ibIa = CMDcode => {
        switch (CMDcode) {
            case 0: // ib
            case 8: // ib e
                ibIa1(
                    nodeType,
                    queriedParent,
                    newDOMNode
                );
                return;
            case 10: // ib e +1
            case 12: // ib e i0
            case 14: // ib e i0 +1
                ibIa2(
                    nodeType,
                    childNodesLength,
                    undefined,
                    offset,
                    queriedParent,
                    newDOMNode
                );
                return;
        }
    }

    const r = (CMDcode) => {
        switch (CMDcode) {
            case 8: // r e
            console.log('newDOMNode',newDOMNode)
                r1(
                    type,
                    selector,
                    nodeType,
                    newDOMNode,
                    CMDHasMany,
                    queriedParent
                );
                return;
            case 12:
            case 14:
                r2(
                    nodeType,
                    queriedParent,
                    offset,
                    newDOMNode,
                    refNode,
                    childNode
                );
                return;
            case 9:
                replaceNode(null, queriedParent, query, newDOMNode);
                return;
        }
    }


    switch (action) {
        /**
         * Insert Before Insert After
         * Insert before|after without an index will insert the new node
         * before the parent.
         */
        case 'ib':
        case 'ia':
            ibIa(CMDcode);
            return;
            /** 
                Replace Node
            **/
        case 'r':
            r(CMDcode);
            break;
        case 'rb':
            if (CMDcode === 9) {
                replaceNode(
                    'previousSibling',
                    queriedParent,
                    query,
                    newDOMNode
                );
            }
            break;
        case 'ra':
            if (CMDcode === 9) {
                replaceNode(
                    'nextSibling',
                    queriedParent,
                    query,
                    newDOMNode
                );
            }
            return;
        case 'rm':


            rm(nodeType, type, queriedParent, selector, 'selected', offset);
            return;
        case 'rmb':
            rm(nodeType, type, queriedParent, selector, 'before', offset);
            return;
        case 'rma':
            rm(nodeType, type, queriedParent, selector, 'after', offset);
            return;
    }
}


/** 
 * Updates the cached fragment by creating the new node 
 * and then replacing the childNodes. Updating by command
 * will only modify portions of the cached DOM tree.
 * @param {string} query - The selector and Wavefront query.  
 * @param {Object|string} newVNode - The new node or text
 * @param {Boolean} type - Truthy for .all()
 */
const updateCachedFragment = (query, newVNode, type) => {
    let parts;
    const hasCommand = (parts = query.split('|')).length === 2;
    const selector = parts[0];
    const command = parts[1];

    // The .all method uses the fragment for querySelectorAll and the queried node for querySelector
    const cachedNode = type === 'all' ? cache.fragment : cache.fragment.querySelector(selector);
    // When using `|r t` with .all() a string value will be expected.  
    const newDOMNode = typeof newVNode === 'string' ? newVNode : render(undefined, newVNode, true, false);

    if (hasCommand) {
        updateCachedFragmentByCommand(selector, command, cachedNode, newDOMNode, type);
    } else {
        removeChildren(cachedNode);
        // Append the new node to the cached fragment.
        cachedNode.appendChild(newDOMNode);
    }
}


const partialRenderInner = (partialNodes, type) => {

    const partialNodesKeys = Object.keys(partialNodes);
    const partialNodesLength = partialNodesKeys.length;

    for (let i = 0; i < partialNodesLength; i++) {
        const partialNodeKey = partialNodesKeys[i];
        const newVNode = partialNodes[partialNodeKey];
        updateCachedFragment(partialNodeKey, newVNode, type);
    }
    // // Render the DOM with the updated cachedFragment.

    removeChildren(cache.rootElement);
    const fragmentClone = document.importNode(cache.fragment, true);
    console.log(cache.fragment)
    cache.rootElement.appendChild(fragmentClone);


}

const renderPartial = (partialNodes) => partialRenderInner(partialNodes, 'single');
renderPartial.all = (partialNodes) => partialRenderInner(partialNodes, 'all');

export default renderPartial;