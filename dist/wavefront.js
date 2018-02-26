(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.wavefront = factory());
}(this, (function () { 'use strict';

var isPlaneObject = function isPlaneObject(value) {
    return {}.toString.call(value) === '[object Object]';
};
var isVNode = function isVNode(value) {
    return value.hasOwnProperty('t');
};
var removeChildren = function removeChildren(parentNode) {
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
};

/** 
 * Filter by loop 
 * @param {Array} arr 
 * @param {Function} callback 
 **/
var filter = function filter(arr, callback) {
    var store = [];
    var arrLength = arr.length;
    for (var i = 0; i < arrLength; i++) {
        if (callback(arr[i])) {
            store.push(arr[i]);
        }
    }
    return store;
};

/** 
 * Inserts a Node before a reference node.
 */


/** 
 * Inserts a Node after a reference node.
 */


/** 
 * @param {string} t - Tag name 
 * @param {Object|string} at - Attributes | Primative
 * @param {Array} ch - Children 
 * @param {Boolean} isSVG 
 */
var vNode = function vNode(t, at, ch, isSVG) {
    switch (t) {
        case 'primitive':
            return { t: 'TEXT', val: at };
        case 'comment':
            return { t: 'COM', val: at };
        default:
            return isSVG ? {
                t: t,
                at: at,
                ch: ch,
                svg: true
            } : {
                t: t,
                at: at,
                ch: ch
            };
    }
};

var getChildNodesAsArray = function getChildNodesAsArray(childNodes, whitespaceRules) {
    var ignoreTrim = !(whitespaceRules === 'ignore-trim');
    var childNodesArr = [];
    var childNodesLength = childNodes.length;

    for (var i = 0; i < childNodesLength; i++) {
        if (childNodes[i].nodeType === 3 & ignoreTrim) {
            /*
             *  "\t" TAB \u0009
             *  "\n" LF  \u000A
             *  "\r" CR  \u000D
             *  " "  SPC \u0020
             */
            if (childNodes[i].nodeValue === childNodes[i].nodeValue.replace(/^\s+|\s+$/g, '')) {
                childNodesArr.push(abstract(childNodes[i], whitespaceRules));
            }
        } else {
            childNodesArr.push(abstract(childNodes[i], whitespaceRules));
        }
    }

    return childNodesArr;
};

var getDefinedAttributes = function getDefinedAttributes(element) {
    var attributes = element.attributes;
    var definedAttributes = {};
    var attributesLength = attributes === null || attributes === undefined ? 0 : attributes.length;

    for (var i = 0; i < attributesLength; i++) {
        var attribute = attributes[i];
        var attributeName = attributes[i].name;
        var style = {};
        var isStyle = attributeName === 'style';

        if (isStyle) {
            var cssText = element.style.cssText; // The interpreted value 
            var cssList = cssText.length > 0 ? cssText.split(';') : ['']; //last item is ignored.
            var cssListLength = cssList.length;

            for (var j = 0; j < cssListLength - 1; j++) {
                var part = cssList[j].split(': ');
                style[part[0].trim()] = part[1];
            }
        }
        definedAttributes[attribute.name] = isStyle ? style : attribute.value;
    }

    return definedAttributes;
};

var abstract = function abstract(interfaceSelector) {
    var whitespaceRules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'trim';

    var element = typeof interfaceSelector.nodeType === 'number' ? interfaceSelector : document.querySelector(interfaceSelector);
    var definedAttributes = getDefinedAttributes(element);
    var isSVG = element instanceof SVGElement;
    var childNodes = getChildNodesAsArray(element.childNodes, whitespaceRules);

    switch (element.nodeType) {
        case 1:
            return vNode(element.tagName, definedAttributes, childNodes, isSVG);
        case 3:
            return vNode('primitive', element.nodeValue);
        case 8:
            return vNode('comment', element.nodeValue);
    }
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var assembly = (function (tagName, nodeType) {
    var isSVG = nodeType === true;
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var tagNameStr = '' + tagName;
        var attributes = void 0;
        var childNodes = [];
        var argsLength = args.length;
        var i = void 0;

        for (i = 0; i < argsLength; i++) {
            var item = args[i] || {};
            var isItemObject = isPlaneObject(item);
            var isItemVnode = item.hasOwnProperty('t');

            // Check if item is a plane object = attribute.
            if (isItemObject && !isItemVnode) {
                attributes = item;
                continue;
            }

            // Check if item is an array = group of child elements.
            if (Array.isArray(item)) {
                childNodes = [].concat(toConsumableArray(childNodes), toConsumableArray(item));
                continue;
            }

            // check if item is not an object, array or function = child element.
            if (isItemObject && isItemVnode || typeof item === 'string' || typeof item === 'number') {
                childNodes.push(item);
                continue;
            }

            if (item instanceof Node) {
                //@TODO Convert item to vNode and push;
                childNodes.push({ el: item });
            }
        }

        var childNodesLength = childNodes.length;

        for (i = 0; i < childNodesLength; ++i) {
            var childNode = childNodes[i];
            if (typeof childNode === 'string' || typeof childNode === 'number') {
                var isComment = childNode[0] === '@';
                var type = isComment ? 'comment' : 'primitive';
                var value = isComment ? childNode.slice(1) : childNode;
                childNodes[i] = vNode(type, value, null, isSVG);
            }
        }

        return vNode(tagNameStr, attributes, childNodes, isSVG);
    };
});

/** 
 * Shared cache accessible between modules. 
 */
var cache = {
	vDOM: null,
	rootElement: null,
	fragment: document.createDocumentFragment()
};

var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

var createAndAppendNode = function createAndAppendNode(frag, node) {
    var _element;

    var isSVG = node.svg === true;

    // TEXT_NODE        3
    if (node.t === 'TEXT') {
        var textNode = document.createTextNode(node.val);
        frag.appendChild(textNode);
        return;
    }
    // // COMMENT_NODE     8
    if (node.t === 'COM') {
        var commentNode = document.createComment(node.val);
        frag.appendChild(commentNode);
        return;
    }
    var notAnElement = !node.hasOwnProperty('el');

    var element = void 0;

    if (notAnElement) {
        // ELEMENT_NODE     1
        element = isSVG ? document.createElementNS(SVG_NAMESPACE, node.t) : document.createElement(node.t);

        // Add attributes
        if (node.at) {
            var attributes = node.at;
            var attributeKeys = Object.keys(attributes);
            var attributesLength = attributeKeys.length;

            for (var i = 0; i < attributesLength; i++) {
                var attributeKey = attributeKeys[i];

                // Standard dataset syntax.
                if (attributeKey.indexOf('data-') === 0) {
                    var dataKey = attributeKey.replace('data-', '');
                    element.dataset[dataKey] = attributes[attributeKey];
                    continue;
                }
                // Shorthand dataset syntax.
                if (attributeKey.indexOf('d-') === 0) {
                    var _dataKey = attributeKey.replace('d-', '');
                    element.dataset[_dataKey] = attributes[attributeKey];
                    continue;
                }
                // Props: _
                if (attributeKey[0] === '_') {
                    var cleanKey = attributeKey.replace('_', '');
                    element[cleanKey] = attributes[attributeKey];
                    continue;
                }

                var attributeValue = attributes[attributeKey];

                switch (attributeKey) {
                    case 'e':
                    case 'event':
                        (_element = element).addEventListener.apply(_element, toConsumableArray(attributeValue));
                        break;
                    case '$':
                    case 'style':
                        Object.assign(element.style, attributeValue);
                        break;
                    case 'c':
                    case 'class':
                        element.className = attributes.class;
                        break;
                    default:
                        element.setAttribute(attributeKey, attributeValue);
                        break;
                }
            }
        }
    } else {
        element = node.el;
    }
    // Add children
    frag.appendChild(element);

    if (notAnElement && Array.isArray(node.ch)) {
        node.ch.forEach(function (childNode) {
            createAndAppendNode(element, childNode);
        });
    }
};

var updateDOM = function updateDOM(renderFragment, replace) {
    var fragmentClone = document.importNode(renderFragment, true);
    if (replace) {
        var parent = cache.rootElement.parentElement;
        var childNodes = parent.childNodes;
        var childNodesLength = childNodes.length;

        for (var i = 0; i < childNodesLength; i++) {
            if (childNodes[i] === cache.rootElement) {
                cache.rootElement.replaceWith(fragmentClone);
                cache.rootElement = childNodes[i];
                break;
            }
        }
    } else {
        console.log('Append child fragment clone ');
        cache.rootElement.appendChild(fragmentClone);
    }
};

var render = (function (initalRootElement, vNode, isPartial, replace) {
    // Cache root element 
    if (cache.rootElement === null) {
        cache.rootElement = initalRootElement;
    }

    // Creates a new fragment for partials but uses 
    // the fragment cache for the inital render.
    var renderFragment = isPartial === true ? document.createDocumentFragment() : cache.fragment;
    var node = isPartial === true ? vNode : cache.vDOM;

    /** 
     * Dummy wrapper to treat a non-wrap node as wrapped.
     */
    var dummyVDOM = {
        "t": "div",
        "id": 2,
        "at": {
            "id": "dummy"
        },
        "ch": node
    };

    if (Array.isArray(node)) {
        createAndAppendNode(renderFragment, dummyVDOM);
        var dummy = renderFragment.firstElementChild;
        var innerNodes = Array.from(dummy.childNodes);
        var innerNodesLength = innerNodes.length;
        var outerNodeList = [];

        for (var i = 0; i < innerNodesLength; i++) {
            renderFragment.appendChild(innerNodes[i]);
        }

        renderFragment.removeChild(dummy);

        requestAnimationFrame(function () {
            updateDOM(renderFragment, replace);
        });
    } else {

        // Wrapped element
        createAndAppendNode(renderFragment, node);
        requestAnimationFrame(function () {
            if (!isPartial) {
                updateDOM(renderFragment, replace);
            }
            return;
        });
    }

    return renderFragment;
});

// @todo Insert need to be arguments

/** 
 * 
 */


var ibIa1 = function ibIa1(nodeType, queriedParent, newDOMNode, childNode) {
    if (nodeType === 't') {
        // insert(queriedParent, newDOMNode, childNode);
        insert(queriedParent.parentElement, newDOMNode, queriedParent);
    } else {
        insert(queriedParent.parentElement, newDOMNode, queriedParent);
    }
};

var ibIa2 = function ibIa2(nodeType, childNodesLength, childNode, offset, queriedParent, newDOMNode) {
    if (nodeType === 't') {
        var textNode = void 0;
        for (var i = 0; i < childNodesLength; i++) {
            var _childNode = childNodes[i];
            if (_childNode.nodeType === 3) {
                textNode = offset === 0 ? _childNode : childNodes[i + offset];
                break;
            }
        }
        insert(queriedParent, newDOMNode, textNode);
    } else {
        insert(queriedParent, newDOMNode, queriedParent.children[index + offset]);
    }
};

var r1 = function r1(type, selector, nodeType, newDOMNode, CMDHasMany, queriedParent) {
    if (type === 'all') {
        var children = queriedParent.querySelectorAll(selector);
        var childrenLength = children.length;
        var clones = [];

        if (nodeType !== 't') {
            for (var i = 0; i < childrenLength; i++) {
                clones.push(newDOMNode.cloneNode(true));
            }
        }

        for (var _i = 0; _i < childrenLength; _i++) {
            if (nodeType === 't') {
                children[_i].innerHTML = newDOMNode;
            } else {
                children[_i].replaceWith(clones[_i]);
            }
        }
    } else {
        if (!CMDHasMany) {
            queriedParent.parentElement.replaceChild(newDOMNode, queriedParent);
        }
    }
};

var r2 = function r2(nodeType, queriedParent, offset, newDOMNode, refNode, childNode) {
    switch (nodeType) {
        case 'e':
            var _refNode = queriedParent.children[index + offset];
            queriedParent.replaceChild(newDOMNode, _refNode);
            return;
        case 'n':
            _refNode = queriedParent.childNodes[index + offset];
            queriedParent.replaceChild(newDOMNode, _refNode);
            return;
        case 't':
            var textNode = void 0;
            for (var i = 0; i < childNodesLength; i++) {
                var _childNode2 = childNodes[i];
                if (_childNode2.nodeType === 3) {
                    textNode = offset === 0 ? _childNode2 : childNodes[i + offset];
                    break;
                }
            }
            queriedParent.replaceChild(newDOMNode, textNode);
            return;
    }
};

var replaceNode = function replaceNode(type, queriedParent, query, newDOMNode) {
    var child = queriedParent.querySelector(query);
    var childRelative = type ? child[type] : child;
    childRelative.replaceWith(newDOMNode);
};

var rm = function rm(nodeType, type, queriedParent, selector, removeType, offset) {

    if (nodeType === 't') {

        if (type === 'single') {
            // const children = queriedParent.querySelectorAll(selector);
            queriedParent.style.backgroundColor = 'red';
            var _childNodes = queriedParent.childNodes;
            var _childNodesLength = _childNodes.length;

            var textNode = void 0;
            for (var i = 0; i < _childNodesLength; i++) {
                var childNode = _childNodes[i];
                if (childNode.nodeType === 3) {
                    // textNode = offset === 0 ? childNode : childNodes[i + offset];
                    childNode.remove(_childNodes[i + offset]);
                    return;
                }
            }
            return;
        }

        if (type === 'all') {
            var matchingSelectors = queriedParent.querySelectorAll(selector);
            var matchingSelectorsLength = matchingSelectors.length;
            for (var j = 0; j < matchingSelectorsLength; j++) {
                var _childNodes2 = matchingSelectors[j].childNodes;
                var _childNodesLength2 = _childNodes2.length;

                for (var _i2 = 0; _i2 < _childNodesLength2; _i2++) {
                    var _childNode3 = _childNodes2[_i2];
                    if (_childNode3.nodeType === 3) {
                        matchingSelectors[j].remove(_childNodes2[_i2 + offset]);
                    }
                }
            }
            return;
        }
    }

    if (type === 'all') {
        var children = queriedParent.querySelectorAll(selector);
        var childrenLength = children.length;

        switch (removeType) {
            case 'selected':
                for (var _i3 = 0; _i3 < childrenLength; _i3++) {
                    var child = children[_i3];
                    child.style.backgroundColor = 'pink';
                    child.remove(child);
                }
                return;
            case 'before':
                for (var _i4 = 0; _i4 < childrenLength; _i4++) {
                    var _child = children[_i4];
                    if (_i4 > 0) {
                        _child.remove(_child.previousSibling);
                    }
                }
                return;
            case 'after':
                for (var _i5 = 0; _i5 < childrenLength; _i5++) {
                    var _child2 = children[_i5];
                    if (_i5 < childrenLength - 1) {
                        var nextSibling = _child2.nextSibling;
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
                var previousSibling = queriedParent.previousSibling;
                if (!!previousSibling) {
                    queriedParent.parentElement.removeChild(previousSibling);
                }
                return;
            case 'after':
                var _nextSibling = queriedParent.nextSibling;
                if (!!_nextSibling) {
                    queriedParent.parentElement.removeChild(_nextSibling);
                }
                return;
        }
    }
};

var updateCachedFragmentByCommand = function updateCachedFragmentByCommand(selector, CMD, queriedParent, newDOMNode, type) {
    var CMDList = CMD.split(' ');
    var CMDListLength = CMDList.length;
    var CMDHasMany = CMDListLength > 1;
    var lastCommand = CMDList[CMDListLength - 1];
    var thirdCommand = CMDList[2];
    var secondCommand = CMDList[1];
    var action = CMDList[0];

    var childNodes = queriedParent.childNodes;
    var childNodesLength = childNodes.length;
    var childLengthAsIndex = childNodesLength - 1;

    // offset. 
    var hasOffset = CMDHasMany ? lastCommand[0] === '+' : false;
    var initialOffset = hasOffset ? parseInt(lastCommand.slice(1), 10) : 0;

    // index.
    var hasIndex = !!thirdCommand ? thirdCommand[0] === 'i' : false;
    var initalIndex = hasIndex ? parseInt(thirdCommand.slice(1), 10) : 0;

    // Limit the index to the child nodes length.
    var index = initalIndex + offset > childLengthAsIndex ? childLengthAsIndex : initalIndex;
    var offset = index + initialOffset > childLengthAsIndex ? 0 : initialOffset;

    // nodeType.
    var nodeType = !!secondCommand ? secondCommand[0] : 'e';

    // query.
    var hasQuery = !!secondCommand ? secondCommand.indexOf('=') >= 0 : false;
    var query = hasQuery ? secondCommand.split('=')[1] : null;

    /** 
     * NodeType|Index|Offset|Query
     *  CMDcode is a binary representation of 
     * the presetnt commands. 
     * Action is present by default.
     */
    var CMDcode = parseInt([1, hasIndex + 0, hasOffset + 0, hasQuery + 0].join(''), 2);

    var ibIa = function ibIa(CMDcode) {
        switch (CMDcode) {
            case 0: // ib
            case 8:
                // ib e
                ibIa1(nodeType, queriedParent, newDOMNode);
                return;
            case 10: // ib e +1
            case 12: // ib e i0
            case 14:
                // ib e i0 +1
                ibIa2(nodeType, childNodesLength, undefined, offset, queriedParent, newDOMNode);
                return;
        }
    };

    var r = function r(CMDcode) {
        switch (CMDcode) {
            case 8:
                // r e
                console.log('newDOMNode', newDOMNode);
                r1(type, selector, nodeType, newDOMNode, CMDHasMany, queriedParent);
                return;
            case 12:
            case 14:
                r2(nodeType, queriedParent, offset, newDOMNode, refNode, childNode);
                return;
            case 9:
                replaceNode(null, queriedParent, query, newDOMNode);
                return;
        }
    };

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
                replaceNode('previousSibling', queriedParent, query, newDOMNode);
            }
            break;
        case 'ra':
            if (CMDcode === 9) {
                replaceNode('nextSibling', queriedParent, query, newDOMNode);
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
};

/** 
 * Updates the cached fragment by creating the new node 
 * and then replacing the childNodes. Updating by command
 * will only modify portions of the cached DOM tree.
 * @param {string} query - The selector and Wavefront query.  
 * @param {Object|string} newVNode - The new node or text
 * @param {Boolean} type - Truthy for .all()
 */
var updateCachedFragment = function updateCachedFragment(query, newVNode, type) {
    var parts = void 0;
    var hasCommand = (parts = query.split('|')).length === 2;
    var selector = parts[0];
    var command = parts[1];

    // The .all method uses the fragment for querySelectorAll and the queried node for querySelector
    var cachedNode = type === 'all' ? cache.fragment : cache.fragment.querySelector(selector);
    // When using `|r t` with .all() a string value will be expected.  
    var newDOMNode = typeof newVNode === 'string' ? newVNode : render(undefined, newVNode, true, false);

    if (hasCommand) {
        updateCachedFragmentByCommand(selector, command, cachedNode, newDOMNode, type);
    } else {
        removeChildren(cachedNode);
        // Append the new node to the cached fragment.
        cachedNode.appendChild(newDOMNode);
    }
};

var partialRenderInner = function partialRenderInner(partialNodes, type) {

    var partialNodesKeys = Object.keys(partialNodes);
    var partialNodesLength = partialNodesKeys.length;

    for (var i = 0; i < partialNodesLength; i++) {
        var partialNodeKey = partialNodesKeys[i];
        var newVNode = partialNodes[partialNodeKey];
        updateCachedFragment(partialNodeKey, newVNode, type);
    }
    // // Render the DOM with the updated cachedFragment.

    removeChildren(cache.rootElement);
    var fragmentClone = document.importNode(cache.fragment, true);
    console.log(cache.fragment);
    cache.rootElement.appendChild(fragmentClone);
};

var renderPartial = function renderPartial(partialNodes) {
    return partialRenderInner(partialNodes, 'single');
};
renderPartial.all = function (partialNodes) {
    return partialRenderInner(partialNodes, 'all');
};

var initialize = (function (rootSelector, vNode$$1, replace) {
    // allow a string or element as a querySelector value.
    var container = rootSelector instanceof Element ? rootSelector : document.querySelector(rootSelector);

    // Shallowly validate vNode.
    var initalVNode = isVNode(vNode$$1) || Array.isArray(vNode$$1) ? vNode$$1 : false;

    if (initalVNode === false) {
        throw new Error('vNode ' + cache.vDOM + ' is not valid');
    }

    // Cache valid vDOM
    cache.vDOM = initalVNode;
    // Empty the container

    if (replace === true) {
        render(container, false, undefined, replace);
    } else {
        removeChildren(container);
        // Render the inital virual DOM and cache the selectors.
        render(container, false, undefined, replace);
    }
    return renderPartial;
});

var or = function or(vNodes, conditions, exclude) {
    var filteredVNodes = [];
    var filteredIndexes = [];

    // Return the vNode of a given index.
    if (typeof conditions === 'number') {
        return vNodes[conditions];
    }

    // Ensure toggle is an array. 
    var toggle = typeof conditions === 'string' ? [conditions] : conditions;

    // Non-operational.
    if (!Array.isArray(toggle) || toggle.length === 0) {
        return vNodes;
    }

    // Define conditions required.
    var classes = filter(toggle, function (e) {
        return e.indexOf('.') > -1;
    });
    var classesLength = classes.length;
    var ids = filter(toggle, function (e) {
        return e.indexOf('#') === 0;
    });
    var tags = filter(toggle, function (e) {
        return (/^[a-z0-9]+$/i.test(e)
        );
    });
    var children = filter(toggle, function (e) {
        return e.indexOf('~') === 0;
    });
    var indexes = filter(toggle, function (e) {
        return typeof e === 'number';
    });
    var vNodesLength = vNodes.length;

    var _loop = function _loop(i) {
        var vNode$$1 = vNodes[i];
        var attributes = vNode$$1.at;

        // Check class.
        if (classesLength > 0) {
            for (var j = 0; j < classesLength; j++) {
                if (attributes.class.includes(classes[j].slice(1))) {
                    filteredIndexes.push(i);
                }
            }
        }

        // Check ids.
        if (ids.length > 0) {
            ids.forEach(function (c) {
                if (attributes.id === c.slice(1)) {
                    filteredIndexes.push(i);
                }
            });
        }

        // Check tags.
        if (tags.length > 0) {
            tags.forEach(function (c) {
                if (vNode$$1.t.toUpperCase() === c.toUpperCase()) {
                    filteredIndexes.push(i);
                }
            });
        }

        // Check children.
        if (children.length > 0) {
            children.forEach(function (x) {
                var childrenLength = vNode$$1.ch.filter(function (c) {
                    return c.t !== 'TEXT' && c.t !== 'COM';
                }).length;
                if (childrenLength == x.slice(1)) {
                    filteredIndexes.push(i);
                }
            });
        }
    };

    for (var i = 0; i < vNodesLength; i++) {
        _loop(i);
    }

    // Remove duplicate indexes.
    var indexList = [].concat(toConsumableArray(new Set(filteredIndexes)));

    if (exclude === true) {
        return filter(vNodes, function (item, i) {
            return indexList.indexOf(i) === -1;
        });
    } else {
        indexList.forEach(function (index) {
            filteredVNodes.push(vNodes[index]);
        });
        return filteredVNodes;
    }
};

/** 
 * or is used when you explicitly want the to inidicate
 * that an item is being looped by n times or via data
 * 
 * @param {Object|Array} vNodes 
 * @param {*} Data 
 */
var loop = function loop(vNodes, data) {
    var groupVnodes = Array.isArray(vNodes);
    var hasNumber = typeof data === 'number';

    if (hasNumber) {
        var _loopedVnodes = [];
        var singleVnode = isPlaneObject(vNodes);

        // Single vnode looped by an integer.
        if (singleVnode) {
            for (var i = 0; i < data; i++) {
                _loopedVnodes.push(vNodes);
            }
        }

        // Grouped vnode looped by an integer.
        if (groupVnodes) {
            for (var _i = 0; _i < data; _i++) {
                _loopedVnodes.push.apply(_loopedVnodes, toConsumableArray(vNodes));
            }
        }
        return _loopedVnodes;
    } else {
        if (typeof vNodes === 'function') {
            return vNodes(data);

            if (!Array.isArray(loopedVnodes)) {
                throw new Error('loop() should return an Array of vnodes');
            }
        }
    }
};

var tags$1 = {
    a: assembly('a'),
    abbr: assembly('abbr'),
    abstract: abstract,
    address: assembly('address'),
    area: assembly('area'),
    article: assembly('article'),
    aside: assembly('aside'),
    assembly: assembly,
    audio: assembly('audio'),
    childNodes: assembly('childNodes'),
    base: assembly('base'),
    bdi: assembly('bdi'),
    bdo: assembly('bdo'),
    blockquote: assembly('blockquote'),
    body: assembly('body'),
    br: assembly('br'),
    button: assembly('button'),
    canvas: assembly('canvas'),
    caption: assembly('caption'),
    cite: assembly('cite'),
    code: assembly('code'),
    col: assembly('col'),
    colgroup: assembly('colgroup'),
    command: assembly('command'),
    dd: assembly('dd'),
    del: assembly('del'),
    dfn: assembly('dfn'),
    div: assembly('div'),
    dl: assembly('dl'),
    doctype: assembly('doctype'),
    dt: assembly('dt'),
    em: assembly('em'),
    embed: assembly('embed'),
    fieldset: assembly('fieldset'),
    figcaption: assembly('figcaption'),
    figure: assembly('figure'),
    footer: assembly('footer'),
    form: assembly('form'),
    h1: assembly('h1'),
    h2: assembly('h2'),
    h3: assembly('h3'),
    h4: assembly('h4'),
    h5: assembly('h5'),
    h6: assembly('h6'),
    header: assembly('header'),
    hgroup: assembly('hgroup'),
    hr: assembly('hr'),
    html: assembly('html'),
    i: assembly('i'),
    iframe: assembly('iframe'),
    img: assembly('img'),
    initialize: initialize,
    input: assembly('input'),
    ins: assembly('ins'),
    kbd: assembly('kbd'),
    keygen: assembly('keygen'),
    label: assembly('label'),
    legend: assembly('legend'),
    li: assembly('li'),
    link: assembly('link'),
    loop: loop,
    map: assembly('map'),
    mark: assembly('mark'),
    menu: assembly('menu'),
    meta: assembly('meta'),
    nav: assembly('nav'),
    noscript: assembly('noscript'),
    object: assembly('object'),
    ol: assembly('ol'),
    optgroup: assembly('optgroup'),
    option: assembly('option'),
    or: or,
    p: assembly('p'),
    param: assembly('param'),
    pre: assembly('pre'),
    progress: assembly('progress'),
    q: assembly('q'),
    rp: assembly('rp'),
    rt: assembly('rt'),
    ruby: assembly('ruby'),
    s: assembly('s'),
    samp: assembly('samp'),
    script: assembly('script'),
    section: assembly('section'),
    select: assembly('select'),
    small: assembly('small'),
    source: assembly('source'),
    span: assembly('span'),
    strong: assembly('strong'),
    style: assembly('style'),
    sub: assembly('sub'),
    sup: assembly('sup'),
    table: assembly('table'),
    tbody: assembly('tbody'),
    td: assembly('td'),
    textarea: assembly('textarea'),
    tfoot: assembly('tfoot'),
    th: assembly('th'),
    thead: assembly('thead'),
    title: assembly('title'),
    tr: assembly('tr'),
    ul: assembly('ul'),
    Var: assembly('var'), // First capital
    video: assembly('video'),

    // SVG Elements.
    svg: assembly('svg', true),
    altGlyph: assembly('altGlyph', true),
    altGlyphDef: assembly('altGlyphDef', true),
    altGlyphItem: assembly('altGlyphItem', true),
    animate: assembly('animate'),
    animateColor: assembly('animateColor', true),
    animateMotion: assembly('animateMotion', true),
    animateTransform: assembly('animateTransform', true),
    animation: assembly('animation', true),
    circle: assembly('circle', true),
    clipPath: assembly('clipPath', true),
    colorProfile: assembly('color-profile', true), // color-profile
    cursor: assembly('cursor', true),
    defs: assembly('defs', true),
    desc: assembly('desc', true),
    discard: assembly('discard', true),
    ellipse: assembly('ellipse', true),
    feBlend: assembly('feBlend', true),
    feColorMatrix: assembly('feComposite', true),
    feComponentTransfer: assembly('feComponentTransfer', true),
    feComposite: assembly('feComposite', true),
    feConvolveMatrix: assembly('feConvolveMatrix', true),
    feDiffuseLighting: assembly('feDiffuseLighting', true),
    feDisplacementMap: assembly('feDistantLight', true),
    feDistantLight: assembly('feDistantLight', true),
    feDropShadow: assembly('feDropShadow', true),
    feFlood: assembly('feFlood', true),
    feFuncA: assembly('feFuncA', true),
    feFuncB: assembly('feFuncB', true),
    feFuncG: assembly('feFuncG', true),
    feFuncR: assembly('feFuncR', true),
    feGaussianBlur: assembly('feGaussianBlur', true),
    feImage: assembly('feImage', true),
    feMerge: assembly('feMerge', true),
    feMergeNode: assembly('feMergeNode', true),
    feMorphology: assembly('feMorphology', true),
    feOffset: assembly('feOffset', true),
    fePointLight: assembly('fePointLight', true),
    feSpecularLighting: assembly('feSpecularLighting', true),
    feSpotLight: assembly('feSpotLight', true),
    feTile: assembly('feTile', true),
    feTurbulence: assembly('feTurbulence', true),
    filter: assembly('filter', true),
    font: assembly('font', true),
    fontFace: assembly('font-face', true), // fontFace
    fontFaceFormat: assembly('font-face-format', true), // fontFaceFormat
    fontFaceName: assembly('font-face-name', true), // fontFaceName
    fontFaceSrc: assembly('font-face-src', true), // fontFaceSrc
    fontFaceUri: assembly('font-face-uri', true), // fontFaceUri
    foreignObject: assembly('foreignObject', true),
    g: assembly('g', true),
    glyph: assembly('glyph', true),
    glyphRef: assembly('glyphRef', true),
    handler: assembly('handler', true),
    hatch: assembly('hatch', true),
    hatchpath: assembly('hatchpath', true),
    hkern: assembly('hkern', true),
    image: assembly('image', true),
    line: assembly('line', true),
    linearGradient: assembly('linearGradient', true),
    listener: assembly('listener'),
    marker: assembly('marker', true),
    mask: assembly('mask', true),
    mesh: assembly('mesh', true),
    meshgradient: assembly('meshgradient', true),
    meshpatch: assembly('meshpatch', true),
    meshrow: assembly('meshrow', true),
    metadata: assembly('metadata', true),
    missingGlyph: assembly('missing-glyph', true), // missing-glyph
    mpath: assembly('mpath', true),
    path: assembly('path', true),
    pattern: assembly('pattern', true),
    polygon: assembly('polygon', true),
    polyline: assembly('polyline', true),
    prefetch: assembly('prefetch', true),
    radialGradient: assembly('radialGradient', true),
    rect: assembly('rect', true),
    set: assembly('set', true),
    solidColor: assembly('solidColor', true),
    solidcolor: assembly('solidcolor', true),
    Stop: assembly('stop', true), // First capital
    Switch: assembly('switch', true), // First capital
    symbol: assembly('symbol', true),
    tbreak: assembly('tbreak', true),
    text: assembly('text', true),
    textArea: assembly('textArea', true),
    textPath: assembly('textPath', true),
    tref: assembly('tref', true),
    tspan: assembly('tspan', true),
    unknown: assembly('unknown', true),
    use: assembly('use', true),
    view: assembly('view', true),
    vkern: assembly('vkern', true)
};

return tags$1;

})));
//# sourceMappingURL=wavefront.js.map
