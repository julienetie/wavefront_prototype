(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.wavefront = global.wavefront || {})));
}(this, (function (exports) { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};























































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * @license
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash include="isPlainObject" -o isPlainObject.js`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
// ;(function() {

/** Used as the semantic version number. */
var objectTag = '[object Object]';

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

/*--------------------------------------------------------------------------*/

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/** Used to lookup unminified function names. */
function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || objectToString.call(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

/*------------------------------------------------------------------------*/

// Add methods that return unwrapped values in chain sequences.

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var vnode_1 = createCommonjsModule(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children,
        text: text, elm: elm, key: key };
}
exports.vnode = vnode;
exports.default = vnode;
//# sourceMappingURL=vnode.js.map
});

var is = createCommonjsModule(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.array = Array.isArray;
function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}
exports.primitive = primitive;
//# sourceMappingURL=is.js.map
});

var htmldomapi = createCommonjsModule(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function createElement(tagName) {
    return document.createElement(tagName);
}
function createElementNS(namespaceURI, qualifiedName) {
    return document.createElementNS(namespaceURI, qualifiedName);
}
function createTextNode(text) {
    return document.createTextNode(text);
}
function createComment(text) {
    return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    node.removeChild(child);
}
function appendChild(node, child) {
    node.appendChild(child);
}
function parentNode(node) {
    return node.parentNode;
}
function nextSibling(node) {
    return node.nextSibling;
}
function tagName(elm) {
    return elm.tagName;
}
function setTextContent(node, text) {
    node.textContent = text;
}
function getTextContent(node) {
    return node.textContent;
}
function isElement(node) {
    return node.nodeType === 1;
}
function isText(node) {
    return node.nodeType === 3;
}
function isComment(node) {
    return node.nodeType === 8;
}
exports.htmlDomApi = {
    createElement: createElement,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    getTextContent: getTextContent,
    isElement: isElement,
    isText: isText,
    isComment: isComment
};
exports.default = exports.htmlDomApi;
//# sourceMappingURL=htmldomapi.js.map
});

var h_1 = createCommonjsModule(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


function addNS(data, children, sel) {
    data.ns = 'http://www.w3.org/2000/svg';
    if (sel !== 'foreignObject' && children !== undefined) {
        for (var i = 0; i < children.length; ++i) {
            var childData = children[i].data;
            if (childData !== undefined) {
                addNS(childData, children[i].children, children[i].sel);
            }
        }
    }
}
function h(sel, b, c) {
    var data = {},
        children,
        text,
        i;
    if (c !== undefined) {
        data = b;
        if (is.array(c)) {
            children = c;
        } else if (is.primitive(c)) {
            text = c;
        } else if (c && c.sel) {
            children = [c];
        }
    } else if (b !== undefined) {
        if (is.array(b)) {
            children = b;
        } else if (is.primitive(b)) {
            text = b;
        } else if (b && b.sel) {
            children = [b];
        } else {
            data = b;
        }
    }
    if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
            if (is.primitive(children[i])) children[i] = vnode_1.vnode(undefined, undefined, undefined, children[i]);
        }
    }
    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' && (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
        addNS(data, children, sel);
    }
    return vnode_1.vnode(sel, data, children, text, undefined);
}
exports.h = h;

exports.default = h;
//# sourceMappingURL=h.js.map
});

var thunk = createCommonjsModule(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

function copyToThunk(vnode, thunk) {
    thunk.elm = vnode.elm;
    vnode.data.fn = thunk.data.fn;
    vnode.data.args = thunk.data.args;
    thunk.data = vnode.data;
    thunk.children = vnode.children;
    thunk.text = vnode.text;
    thunk.elm = vnode.elm;
}
function init(thunk) {
    var cur = thunk.data;
    var vnode = cur.fn.apply(undefined, cur.args);
    copyToThunk(vnode, thunk);
}
function prepatch(oldVnode, thunk) {
    var i,
        old = oldVnode.data,
        cur = thunk.data;
    var oldArgs = old.args,
        args = cur.args;
    if (old.fn !== cur.fn || oldArgs.length !== args.length) {
        copyToThunk(cur.fn.apply(undefined, args), thunk);
        return;
    }
    for (i = 0; i < args.length; ++i) {
        if (oldArgs[i] !== args[i]) {
            copyToThunk(cur.fn.apply(undefined, args), thunk);
            return;
        }
    }
    copyToThunk(oldVnode, thunk);
}
exports.thunk = function thunk(sel, key, fn, args) {
    if (args === undefined) {
        args = fn;
        fn = key;
        key = undefined;
    }
    return h_1.h(sel, {
        key: key,
        hook: { init: init, prepatch: prepatch },
        fn: fn,
        args: args
    });
};
exports.default = exports.thunk;
//# sourceMappingURL=thunk.js.map
});

var snabbdom = createCommonjsModule(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });



function isUndef(s) {
    return s === undefined;
}
function isDef(s) {
    return s !== undefined;
}
var emptyNode = vnode_1.default('', {}, [], undefined, undefined);
function sameVnode(vnode1, vnode2) {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}
function isVnode(vnode) {
    return vnode.sel !== undefined;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i,
        map = {},
        key,
        ch;
    for (i = beginIdx; i <= endIdx; ++i) {
        ch = children[i];
        if (ch != null) {
            key = ch.key;
            if (key !== undefined) map[key] = i;
        }
    }
    return map;
}
var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];

exports.h = h_1.h;

exports.thunk = thunk.thunk;
function init(modules, domApi) {
    var i,
        j,
        cbs = {};
    var api = domApi !== undefined ? domApi : htmldomapi.default;
    for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];
        for (j = 0; j < modules.length; ++j) {
            var hook = modules[j][hooks[i]];
            if (hook !== undefined) {
                cbs[hooks[i]].push(hook);
            }
        }
    }
    function emptyNodeAt(elm) {
        var id = elm.id ? '#' + elm.id : '';
        var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
        return vnode_1.default(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
    }
    function createRmCb(childElm, listeners) {
        return function rmCb() {
            if (--listeners === 0) {
                var parent_1 = api.parentNode(childElm);
                api.removeChild(parent_1, childElm);
            }
        };
    }
    function createElm(vnode, insertedVnodeQueue) {
        var i,
            data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.init)) {
                i(vnode);
                data = vnode.data;
            }
        }
        var children = vnode.children,
            sel = vnode.sel;
        if (sel === '!') {
            if (isUndef(vnode.text)) {
                vnode.text = '';
            }
            vnode.elm = api.createComment(vnode.text);
        } else if (sel !== undefined) {
            // Parse selector
            var hashIdx = sel.indexOf('#');
            var dotIdx = sel.indexOf('.', hashIdx);
            var hash = hashIdx > 0 ? hashIdx : sel.length;
            var dot = dotIdx > 0 ? dotIdx : sel.length;
            var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
            var elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag) : api.createElement(tag);
            if (hash < dot) elm.setAttribute('id', sel.slice(hash + 1, dot));
            if (dotIdx > 0) elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '));
            for (i = 0; i < cbs.create.length; ++i) {
                cbs.create[i](emptyNode, vnode);
            }if (is.array(children)) {
                for (i = 0; i < children.length; ++i) {
                    var ch = children[i];
                    if (ch != null) {
                        api.appendChild(elm, createElm(ch, insertedVnodeQueue));
                    }
                }
            } else if (is.primitive(vnode.text)) {
                api.appendChild(elm, api.createTextNode(vnode.text));
            }
            i = vnode.data.hook; // Reuse variable
            if (isDef(i)) {
                if (i.create) i.create(emptyNode, vnode);
                if (i.insert) insertedVnodeQueue.push(vnode);
            }
        } else {
            vnode.elm = api.createTextNode(vnode.text);
        }
        return vnode.elm;
    }
    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
            var ch = vnodes[startIdx];
            if (ch != null) {
                api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
            }
        }
    }
    function invokeDestroyHook(vnode) {
        var i,
            j,
            data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);
            for (i = 0; i < cbs.destroy.length; ++i) {
                cbs.destroy[i](vnode);
            }if (vnode.children !== undefined) {
                for (j = 0; j < vnode.children.length; ++j) {
                    i = vnode.children[j];
                    if (i != null && typeof i !== "string") {
                        invokeDestroyHook(i);
                    }
                }
            }
        }
    }
    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            var i_1 = void 0,
                listeners = void 0,
                rm = void 0,
                ch = vnodes[startIdx];
            if (ch != null) {
                if (isDef(ch.sel)) {
                    invokeDestroyHook(ch);
                    listeners = cbs.remove.length + 1;
                    rm = createRmCb(ch.elm, listeners);
                    for (i_1 = 0; i_1 < cbs.remove.length; ++i_1) {
                        cbs.remove[i_1](ch, rm);
                    }if (isDef(i_1 = ch.data) && isDef(i_1 = i_1.hook) && isDef(i_1 = i_1.remove)) {
                        i_1(ch, rm);
                    } else {
                        rm();
                    }
                } else {
                    api.removeChild(parentElm, ch.elm);
                }
            }
        }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
        var oldStartIdx = 0,
            newStartIdx = 0;
        var oldEndIdx = oldCh.length - 1;
        var oldStartVnode = oldCh[0];
        var oldEndVnode = oldCh[oldEndIdx];
        var newEndIdx = newCh.length - 1;
        var newStartVnode = newCh[0];
        var newEndVnode = newCh[newEndIdx];
        var oldKeyToIdx;
        var idxInOld;
        var elmToMove;
        var before;
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
            } else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx];
            } else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx];
            } else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            } else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldStartVnode, newEndVnode)) {
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldEndVnode, newStartVnode)) {
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            } else {
                if (oldKeyToIdx === undefined) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                }
                idxInOld = oldKeyToIdx[newStartVnode.key];
                if (isUndef(idxInOld)) {
                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    newStartVnode = newCh[++newStartIdx];
                } else {
                    elmToMove = oldCh[idxInOld];
                    if (elmToMove.sel !== newStartVnode.sel) {
                        api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    } else {
                        patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                        oldCh[idxInOld] = undefined;
                        api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                    }
                    newStartVnode = newCh[++newStartIdx];
                }
            }
        }
        if (oldStartIdx > oldEndIdx) {
            before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
        } else if (newStartIdx > newEndIdx) {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
        }
    }
    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
        var i, hook;
        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
            i(oldVnode, vnode);
        }
        var elm = vnode.elm = oldVnode.elm;
        var oldCh = oldVnode.children;
        var ch = vnode.children;
        if (oldVnode === vnode) return;
        if (vnode.data !== undefined) {
            for (i = 0; i < cbs.update.length; ++i) {
                cbs.update[i](oldVnode, vnode);
            }i = vnode.data.hook;
            if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
        }
        if (isUndef(vnode.text)) {
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
            } else if (isDef(ch)) {
                if (isDef(oldVnode.text)) api.setTextContent(elm, '');
                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            } else if (isDef(oldCh)) {
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            } else if (isDef(oldVnode.text)) {
                api.setTextContent(elm, '');
            }
        } else if (oldVnode.text !== vnode.text) {
            api.setTextContent(elm, vnode.text);
        }
        if (isDef(hook) && isDef(i = hook.postpatch)) {
            i(oldVnode, vnode);
        }
    }
    return function patch(oldVnode, vnode) {
        var i, elm, parent;
        var insertedVnodeQueue = [];
        for (i = 0; i < cbs.pre.length; ++i) {
            cbs.pre[i]();
        }if (!isVnode(oldVnode)) {
            oldVnode = emptyNodeAt(oldVnode);
        }
        if (sameVnode(oldVnode, vnode)) {
            patchVnode(oldVnode, vnode, insertedVnodeQueue);
        } else {
            elm = oldVnode.elm;
            parent = api.parentNode(elm);
            createElm(vnode, insertedVnodeQueue);
            if (parent !== null) {
                api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
                removeVnodes(parent, [oldVnode], 0, 0);
            }
        }
        for (i = 0; i < insertedVnodeQueue.length; ++i) {
            insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
        }
        for (i = 0; i < cbs.post.length; ++i) {
            cbs.post[i]();
        }return vnode;
    };
}
exports.init = init;
//# sourceMappingURL=snabbdom.js.map
});

var _class = createCommonjsModule(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function updateClass(oldVnode, vnode) {
    var cur,
        name,
        elm = vnode.elm,
        oldClass = oldVnode.data.class,
        klass = vnode.data.class;
    if (!oldClass && !klass) return;
    if (oldClass === klass) return;
    oldClass = oldClass || {};
    klass = klass || {};
    for (name in oldClass) {
        if (!klass[name]) {
            elm.classList.remove(name);
        }
    }
    for (name in klass) {
        cur = klass[name];
        if (cur !== oldClass[name]) {
            elm.classList[cur ? 'add' : 'remove'](name);
        }
    }
}
exports.classModule = { create: updateClass, update: updateClass };
exports.default = exports.classModule;
//# sourceMappingURL=class.js.map
});

var dataset = createCommonjsModule(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CAPS_REGEX = /[A-Z]/g;
function updateDataset(oldVnode, vnode) {
    var elm = vnode.elm,
        oldDataset = oldVnode.data.dataset,
        dataset = vnode.data.dataset,
        key;
    if (!oldDataset && !dataset) return;
    if (oldDataset === dataset) return;
    oldDataset = oldDataset || {};
    dataset = dataset || {};
    var d = elm.dataset;
    for (key in oldDataset) {
        if (!dataset[key]) {
            if (d) {
                delete d[key];
            } else {
                elm.removeAttribute('data-' + key.replace(CAPS_REGEX, '-$&').toLowerCase());
            }
        }
    }
    for (key in dataset) {
        if (oldDataset[key] !== dataset[key]) {
            if (d) {
                d[key] = dataset[key];
            } else {
                elm.setAttribute('data-' + key.replace(CAPS_REGEX, '-$&').toLowerCase(), dataset[key]);
            }
        }
    }
}
exports.datasetModule = { create: updateDataset, update: updateDataset };
exports.default = exports.datasetModule;
//# sourceMappingURL=dataset.js.map
});

var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare", "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable", "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple", "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly", "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate", "truespeed", "typemustmatch", "visible"];

var booleanAttrsDict = Object.create(null);

for (var i$1 = 0, len = booleanAttrs.length; i$1 < len; i$1++) {
    booleanAttrsDict[booleanAttrs[i$1]] = true;
}

var hero = createCommonjsModule(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var raf = typeof window !== 'undefined' && window.requestAnimationFrame || setTimeout;
var nextFrame = function nextFrame(fn) {
    raf(function () {
        raf(fn);
    });
};
function setNextFrame(obj, prop, val) {
    nextFrame(function () {
        obj[prop] = val;
    });
}
function getTextNodeRect(textNode) {
    var rect;
    if (document.createRange) {
        var range = document.createRange();
        range.selectNodeContents(textNode);
        if (range.getBoundingClientRect) {
            rect = range.getBoundingClientRect();
        }
    }
    return rect;
}
function calcTransformOrigin(isTextNode, textRect, boundingRect) {
    if (isTextNode) {
        if (textRect) {
            //calculate pixels to center of text from left edge of bounding box
            var relativeCenterX = textRect.left + textRect.width / 2 - boundingRect.left;
            var relativeCenterY = textRect.top + textRect.height / 2 - boundingRect.top;
            return relativeCenterX + 'px ' + relativeCenterY + 'px';
        }
    }
    return '0 0'; //top left
}
function getTextDx(oldTextRect, newTextRect) {
    if (oldTextRect && newTextRect) {
        return oldTextRect.left + oldTextRect.width / 2 - (newTextRect.left + newTextRect.width / 2);
    }
    return 0;
}
function getTextDy(oldTextRect, newTextRect) {
    if (oldTextRect && newTextRect) {
        return oldTextRect.top + oldTextRect.height / 2 - (newTextRect.top + newTextRect.height / 2);
    }
    return 0;
}
function isTextElement(elm) {
    return elm.childNodes.length === 1 && elm.childNodes[0].nodeType === 3;
}
var removed, created;
function pre() {
    removed = {};
    created = [];
}
function create(oldVnode, vnode) {
    var hero = vnode.data.hero;
    if (hero && hero.id) {
        created.push(hero.id);
        created.push(vnode);
    }
}
function destroy(vnode) {
    var hero = vnode.data.hero;
    if (hero && hero.id) {
        var elm = vnode.elm;
        vnode.isTextNode = isTextElement(elm); //is this a text node?
        vnode.boundingRect = elm.getBoundingClientRect(); //save the bounding rectangle to a new property on the vnode
        vnode.textRect = vnode.isTextNode ? getTextNodeRect(elm.childNodes[0]) : null; //save bounding rect of inner text node
        var computedStyle = window.getComputedStyle(elm, void 0); //get current styles (includes inherited properties)
        vnode.savedStyle = JSON.parse(JSON.stringify(computedStyle)); //save a copy of computed style values
        removed[hero.id] = vnode;
    }
}
function post() {
    var i, id, newElm, oldVnode, oldElm, hRatio, wRatio, oldRect, newRect, dx, dy, origTransform, origTransition, newStyle, oldStyle, newComputedStyle, isTextNode, newTextRect, oldTextRect;
    for (i = 0; i < created.length; i += 2) {
        id = created[i];
        newElm = created[i + 1].elm;
        oldVnode = removed[id];
        if (oldVnode) {
            isTextNode = oldVnode.isTextNode && isTextElement(newElm); //Are old & new both text?
            newStyle = newElm.style;
            newComputedStyle = window.getComputedStyle(newElm, void 0); //get full computed style for new element
            oldElm = oldVnode.elm;
            oldStyle = oldElm.style;
            //Overall element bounding boxes
            newRect = newElm.getBoundingClientRect();
            oldRect = oldVnode.boundingRect; //previously saved bounding rect
            //Text node bounding boxes & distances
            if (isTextNode) {
                newTextRect = getTextNodeRect(newElm.childNodes[0]);
                oldTextRect = oldVnode.textRect;
                dx = getTextDx(oldTextRect, newTextRect);
                dy = getTextDy(oldTextRect, newTextRect);
            } else {
                //Calculate distances between old & new positions
                dx = oldRect.left - newRect.left;
                dy = oldRect.top - newRect.top;
            }
            hRatio = newRect.height / Math.max(oldRect.height, 1);
            wRatio = isTextNode ? hRatio : newRect.width / Math.max(oldRect.width, 1); //text scales based on hRatio
            // Animate new element
            origTransform = newStyle.transform;
            origTransition = newStyle.transition;
            if (newComputedStyle.display === 'inline') newStyle.display = 'inline-block'; //this does not appear to have any negative side effects
            newStyle.transition = origTransition + 'transform 0s';
            newStyle.transformOrigin = calcTransformOrigin(isTextNode, newTextRect, newRect);
            newStyle.opacity = '0';
            newStyle.transform = origTransform + 'translate(' + dx + 'px, ' + dy + 'px) ' + 'scale(' + 1 / wRatio + ', ' + 1 / hRatio + ')';
            setNextFrame(newStyle, 'transition', origTransition);
            setNextFrame(newStyle, 'transform', origTransform);
            setNextFrame(newStyle, 'opacity', '1');
            // Animate old element
            for (var key in oldVnode.savedStyle) {
                if (parseInt(key) != key) {
                    var ms = key.substring(0, 2) === 'ms';
                    var moz = key.substring(0, 3) === 'moz';
                    var webkit = key.substring(0, 6) === 'webkit';
                    if (!ms && !moz && !webkit) oldStyle[key] = oldVnode.savedStyle[key];
                }
            }
            oldStyle.position = 'absolute';
            oldStyle.top = oldRect.top + 'px'; //start at existing position
            oldStyle.left = oldRect.left + 'px';
            oldStyle.width = oldRect.width + 'px'; //Needed for elements who were sized relative to their parents
            oldStyle.height = oldRect.height + 'px'; //Needed for elements who were sized relative to their parents
            oldStyle.margin = '0'; //Margin on hero element leads to incorrect positioning
            oldStyle.transformOrigin = calcTransformOrigin(isTextNode, oldTextRect, oldRect);
            oldStyle.transform = '';
            oldStyle.opacity = '1';
            document.body.appendChild(oldElm);
            setNextFrame(oldStyle, 'transform', 'translate(' + -dx + 'px, ' + -dy + 'px) scale(' + wRatio + ', ' + hRatio + ')'); //scale must be on far right for translate to be correct
            setNextFrame(oldStyle, 'opacity', '0');
            oldElm.addEventListener('transitionend', function (ev) {
                if (ev.propertyName === 'transform') document.body.removeChild(ev.target);
            });
        }
    }
    removed = created = undefined;
}
exports.heroModule = { pre: pre, create: create, destroy: destroy, post: post };
exports.default = exports.heroModule;
//# sourceMappingURL=hero.js.map
});

var style$1 = createCommonjsModule(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var raf = typeof window !== 'undefined' && window.requestAnimationFrame || setTimeout;
var nextFrame = function nextFrame(fn) {
    raf(function () {
        raf(fn);
    });
};
function setNextFrame(obj, prop, val) {
    nextFrame(function () {
        obj[prop] = val;
    });
}
function updateStyle(oldVnode, vnode) {
    var cur,
        name,
        elm = vnode.elm,
        oldStyle = oldVnode.data.style,
        style = vnode.data.style;
    if (!oldStyle && !style) return;
    if (oldStyle === style) return;
    oldStyle = oldStyle || {};
    style = style || {};
    var oldHasDel = 'delayed' in oldStyle;
    for (name in oldStyle) {
        if (!style[name]) {
            if (name[0] === '-' && name[1] === '-') {
                elm.style.removeProperty(name);
            } else {
                elm.style[name] = '';
            }
        }
    }
    for (name in style) {
        cur = style[name];
        if (name === 'delayed' && style.delayed) {
            for (var name2 in style.delayed) {
                cur = style.delayed[name2];
                if (!oldHasDel || cur !== oldStyle.delayed[name2]) {
                    setNextFrame(elm.style, name2, cur);
                }
            }
        } else if (name !== 'remove' && cur !== oldStyle[name]) {
            if (name[0] === '-' && name[1] === '-') {
                elm.style.setProperty(name, cur);
            } else {
                elm.style[name] = cur;
            }
        }
    }
}
function applyDestroyStyle(vnode) {
    var style,
        name,
        elm = vnode.elm,
        s = vnode.data.style;
    if (!s || !(style = s.destroy)) return;
    for (name in style) {
        elm.style[name] = style[name];
    }
}
function applyRemoveStyle(vnode, rm) {
    var s = vnode.data.style;
    if (!s || !s.remove) {
        rm();
        return;
    }
    var name,
        elm = vnode.elm,
        i = 0,
        compStyle,
        style = s.remove,
        amount = 0,
        applied = [];
    for (name in style) {
        applied.push(name);
        elm.style[name] = style[name];
    }
    compStyle = getComputedStyle(elm);
    var props = compStyle['transition-property'].split(', ');
    for (; i < props.length; ++i) {
        if (applied.indexOf(props[i]) !== -1) amount++;
    }
    elm.addEventListener('transitionend', function (ev) {
        if (ev.target === elm) --amount;
        if (amount === 0) rm();
    });
}
exports.styleModule = {
    create: updateStyle,
    update: updateStyle,
    destroy: applyDestroyStyle,
    remove: applyRemoveStyle
};
exports.default = exports.styleModule;
//# sourceMappingURL=style.js.map
});

var isString = function isString(value) {
    return typeof value === 'string';
};
var isPrimitive = function isPrimitive(value) {
    return isString(value) || typeof value === 'number';
};
/** 
 * @param {string} t - Text 
 * @param {Number} id - Identity (Not an attribute)
 * @param {Number} ix - Index 
 * @param {Object|string} at - Attributes | Primative
 * @param {Array} ch - Children 
 */
var node = function node(t, id, at, ch) {
    switch (t) {
        case 'primitive':
            return { t: 'TEXT', id: id, val: at };
        case 'comment':
            return { t: 'COM', id: id, val: at };
        default:
            return {
                t: t,
                id: id,
                at: at,
                chx: ch.length,
                ch: ch
            };
    }
};

var count = 0;
var currentTree = void 0;

var assembly = function assembly(tagName) {

    return function inner() {
        var tagNameStr = '' + tagName;
        var selectorName = tagName;
        var attributes$$1 = void 0;
        var item = void 0;
        var textNode = void 0;
        var childNodes = [];
        var i = void 0;
        var children = void 0;
        var text = void 0;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        for (i = 0; i < args.length; i++) {
            item = args[i] || {};
            var isItemObject = isPlainObject(item);
            var isItemVnode = item.hasOwnProperty('t');

            // Check if item is a plane object = attribute.
            if (isItemObject && !isItemVnode) {
                // let isSelector = false;
                attributes$$1 = item;
                // const attrKeys = Object.keys(item);

                // Create virtual id selector.
                // if (item.hasOwnProperty('id') || item.hasOwnProperty('#')) {
                //     selectorName += '#' + item.id;
                //     isSelector = true;
                // }
                // Create virtual class selectors.
                // if (item.hasOwnProperty('class') || item.hasOwnProperty('.')) {
                //     selectorName += '.' + item.class;
                //     isSelector = true;
                // }
                // console.log('attrKeys', attrKeys)
                // attrKeys.forEach((key) => {
                //     // If not selector
                //     if (['id', '#', 'class', '.'].indexOf(key) < 0) {
                //         switch (key) {
                //             case 'e':
                //             case 'event':
                //                 attributes.on = item[key];
                //                 break;
                //             case 'p':
                //             case 'props':
                //                 attributes.props = item[key];
                //             case 'h':
                //             case 'hook':
                //                 attributes.hook = item[key];
                //                 break;
                //             case '$':
                //             case 'style':
                //                 attributes.style = item[key];
                //                 break;
                //             case 'd':
                //             case 'dataset':
                //                 attributes.dataset = item[key];
                //                 break;
                //             default:
                //                 attributes.attrs[key] = item[key];
                //         }
                //     }
                // });
                continue;
            }

            // Check if item is an array = group of child elements.
            if (Array.isArray(item)) {
                childNodes = [].concat(toConsumableArray(childNodes), toConsumableArray(item));
                continue;
            }

            // check if item is not an object, array or function = child element.
            if (isItemObject && isItemVnode || isPrimitive) {
                childNodes.push(item);
                continue;
            }
        }

        for (i = 0; i < childNodes.length; ++i) {
            if (isPrimitive(childNodes[i])) {
                count++;
                currentTree = node('primitive', count, childNodes[i]);
                // console.log('currentTree', currentTree)
                childNodes[i] = currentTree;
            }
        }

        count++;
        // Update child nodes with parentId
        for (i = 0; i < childNodes.length; ++i) {
            childNodes[i].pid = count;
            childNodes[i].ix = i;
        }

        // if (selectorName[0] === 's' && selectorName[1] === 'v' && selectorName[2] === 'g' &&
        //     (selectorName.length === 3 || selectorName[3] === '.' || selectorName[3] === '#')) {
        //     addNS(attributes, childNodes, selectorName);
        // }

        // console.log('currentTree',currentTree)
        // console.log('attributes', attributes)
        return node(tagNameStr, count, attributes$$1, childNodes);
    };
};

// HTML Elements.
var a = assembly('a');
var abbr = assembly('abbr');
var address = assembly('address');
var area = assembly('area');
var article = assembly('article');
var aside = assembly('aside');
var audio = assembly('audio');
var childNodes = assembly('childNodes');
var base = assembly('base');
var bdi = assembly('bdi');
var bdo = assembly('bdo');
var blockquote = assembly('blockquote');
var body = assembly('body');
var br = assembly('br');
var button = assembly('button');
var canvas = assembly('canvas');
var caption = assembly('caption');
var cite = assembly('cite');
var code = assembly('code');
var col = assembly('col');
var colgroup = assembly('colgroup');
var command = assembly('command');
var dd = assembly('dd');
var del = assembly('del');
var dfn = assembly('dfn');
var div = assembly('DIV');
var dl = assembly('dl');
var doctype = assembly('doctype');
var dt = assembly('dt');
var em = assembly('em');
var embed = assembly('embed');
var fieldset = assembly('fieldset');
var figcaption = assembly('figcaption');
var figure = assembly('figure');
var footer = assembly('footer');
var form = assembly('form');
var h1 = assembly('h1');
var h2 = assembly('h2');
var h3 = assembly('h3');
var h4 = assembly('h4');
var h5 = assembly('h5');
var h6 = assembly('h6');
var header = assembly('header');
var hgroup = assembly('hgroup');
var hr = assembly('hr');
var html = assembly('html');
var i = assembly('i');
var iframe = assembly('iframe');
var img = assembly('img');
var input = assembly('input');
var ins = assembly('ins');
var kbd = assembly('kbd');
var keygen = assembly('keygen');
var label = assembly('label');
var legend = assembly('legend');
var li = assembly('li');
var link = assembly('link');
var map = assembly('map');
var mark = assembly('mark');
var menu = assembly('menu');
var meta = assembly('meta');
var nav = assembly('nav');
var noscript = assembly('noscript');
var object = assembly('object');
var ol = assembly('ol');
var optgroup = assembly('optgroup');
var option = assembly('option');
var p = assembly('p');
var param = assembly('param');
var pre = assembly('pre');
var progress = assembly('progress');
var q = assembly('q');
var rp = assembly('rp');
var rt = assembly('rt');
var ruby = assembly('ruby');
var s = assembly('s');
var samp = assembly('samp');
var script = assembly('script');
var section = assembly('section');
var select = assembly('select');
var small = assembly('small');
var source = assembly('source');
var span = assembly('span');
var strong = assembly('strong');
var style = assembly('style');
var sub = assembly('sub');
var sup = assembly('sup');
var table = assembly('table');
var tbody = assembly('tbody');
var td = assembly('td');
var textarea = assembly('textarea');
var tfoot = assembly('tfoot');
var th = assembly('th');
var thead = assembly('thead');
var title = assembly('title');
var tr = assembly('tr');
var ul = assembly('ul');
var Var = assembly('var'); // First capital
var video = assembly('video');

// SVG Elements.
var altGlyph = assembly('altGlyph');
var altGlyphDef = assembly('altGlyphDef');
var altGlyphItem = assembly('altGlyphItem');
var animate = assembly('animate');
var animateColor = assembly('animateColor');
var animateMotion = assembly('animateMotion');
var animateTransform = assembly('animateTransform');
var animation = assembly('animation');
var circle = assembly('circle');
var clipPath = assembly('clipPath');
var colorProfile = assembly('color-profile'); // color-profile
var cursor = assembly('cursor');
var defs = assembly('defs');
var desc = assembly('desc');
var discard = assembly('discard');
var ellipse = assembly('ellipse');
var feBlend = assembly('feBlend');
var feColorMatrix = assembly('feComposite');
var feComponentTransfer = assembly('feComponentTransfer');
var feComposite = assembly('feComposite');
var feConvolveMatrix = assembly('feConvolveMatrix');
var feDiffuseLighting = assembly('feDiffuseLighting');
var feDisplacementMap = assembly('feDistantLight');
var feDistantLight = assembly('feDistantLight');
var feDropShadow = assembly('feDropShadow');
var feFlood = assembly('feFlood');
var feFuncA = assembly('feFuncA');
var feFuncB = assembly('feFuncB');
var feFuncG = assembly('feFuncG');
var feFuncR = assembly('feFuncR');
var feGaussianBlur = assembly('feGaussianBlur');
var feImage = assembly('feImage');
var feMerge = assembly('feMerge');
var feMergeNode = assembly('feMergeNode');
var feMorphology = assembly('feMorphology');
var feOffset = assembly('feOffset');
var fePointLight = assembly('fePointLight');
var feSpecularLighting = assembly('feSpecularLighting');
var feSpotLight = assembly('feSpotLight');
var feTile = assembly('feTile');
var feTurbulence = assembly('feTurbulence');
var filter = assembly('filter');
var font = assembly('font');
var fontFace = assembly('font-face'); // fontFace
var fontFaceFormat = assembly('font-face-format'); // fontFaceFormat
var fontFaceName = assembly('font-face-name'); // fontFaceName
var fontFaceSrc = assembly('font-face-src'); // fontFaceSrc
var fontFaceUri = assembly('font-face-uri'); // fontFaceUri
var foreignObject = assembly('foreignObject');
var g = assembly('g');
var glyph = assembly('glyph');
var glyphRef = assembly('glyphRef');
var handler = assembly('handler');
var hatch = assembly('hatch');
var hatchpath = assembly('hatchpath');
var hkern = assembly('hkern');
var image = assembly('image');
var line = assembly('line');
var linearGradient = assembly('linearGradient');
var listener = assembly('listener');
var marker = assembly('marker');
var mask = assembly('mask');
var mesh = assembly('mesh');
var meshgradient = assembly('meshgradient');
var meshpatch = assembly('meshpatch');
var meshrow = assembly('meshrow');
var metadata = assembly('metadata');
var missingGlyph = assembly('missing-glyph'); // missing-glyph
var mpath = assembly('mpath');
var path = assembly('path');
var pattern = assembly('pattern');
var polygon = assembly('polygon');
var polyline = assembly('polyline');
var prefetch = assembly('prefetch');
var radialGradient = assembly('radialGradient');
var rect = assembly('rect');
var set$$1 = assembly('set');
var solidColor = assembly('solidColor');
var solidcolor = assembly('solidcolor');
var stop = assembly('stop');
var Switch = assembly('switch'); // First capital
var symbol = assembly('symbol');
var tbreak = assembly('tbreak');
var text = assembly('text');
var textArea = assembly('textArea');
var textPath = assembly('textPath');
var tref = assembly('tref');
var tspan = assembly('tspan');
var unknown = assembly('unknown');
var use = assembly('use');
var view = assembly('view');
var vkern = assembly('vkern');

// Render API
// export const patch = init([
//     classModule,
//     props,
//     attributes,
//     heroModule,
//     styleModule,
//     datasetModule,
//     eventListenersModule
// ]);

// const renderPartial = () => {
//     let previousVNode;
//     let DOMContainer;
//     let selectorString;
//     let documentRef = document;
//     /**
//      * @param {string | HTMLElement} selector - Root HTML element 
//      * @param {Object} newVNode - New virtual node
//      * @param {Boolean} cache - Cache element, defaults to true.
//      */
//     return (selector, newVNode, cache) => {
//         // Set HTML element.
//         if (isString(selector)) {
//             if (selector !== selectorString && !cache) {
//                 DOMContainer = documentRef.querySelector(selector);
//                 selectorString = selector;
//             }
//         } else if (isElement(selector) && !cache) {
//             if (selector !== selectorString) {
//                 DOMContainer = selector;
//             }
//         }


//         // Diff and patch the DOM. 
//         if (!previousVNode) {
//             patch(DOMContainer, newVNode);
//         }
//         if (previousVNode && previousVNode !== newVNode) {
//             patch(previousVNode, newVNode);
//         }
//         previousVNode = newVNode;
//     }
// }

// export const render = renderPartial();


// const someUI = div({ class: 'side-bar', id: 'someId' }, [
//     span({ class: 'wpefow', id: 'red' }, [
//         'Dig vbar wefwef'
//     ]),
//     a({ class: 'wpefow', id: 'yellow' }, [
//         23984729
//     ]),
// ])
var twitterHref = 'http://google.com';
var facebookHref = 'http://facebook.com';
var someUI = [div({ id: 'block-social-responsive', class: 'footer__social' }, ul({ class: 'menu' }, li({ class: 'menu-item' }, a({ href: twitterHref, class: 'icon-twitter', target: '_blank' }, 'TWITTER')), li({ class: 'menu-item' }, a({
    href: facebookHref,
    class: 'icon-fb',
    target: '_blank',
    event: ['mouseover', function (e) {
        console.log('THIS ELEMENT', e.target);
    }, false],
    $: { backgroundColor: 'red', color: 'yellow' },
    'd-foijfwoeifjw': 2000000000,
    name: 'jack'
}, 'FACEBOOK')),
// Without variables...
li({ class: 'menu-item' }, a({ href: 'https://www.linkedin.com/company/208777', class: 'icon-in', target: '_blank' }, 'Linkedin')), li({ class: 'menu-item' }, a({ href: 'https://www.youtube.com/user/TheLinuxFoundation', class: 'icon-youtube', target: '_blank' }, 'Youtube')))), section({ id: 'blah', class: 'wefw' }, 'TEST SECTION')];

var createAndAppendNode = function createAndAppendNode(fragment, node) {

    // If Text
    if (node.t === 'TEXT') {
        var textNode = document.createTextNode(node.val);
        fragment.appendChild(textNode);
        return;
    }

    // If Element

    var element = document.createElement(node.t);

    // Add attributes
    if (node.at) {
        var _attributes = node.at;
        var attributeKeys = Object.keys(_attributes);
        var attributesLength = attributeKeys.length;

        for (var _i = 0; _i < attributesLength; _i++) {

            var attributeKey = attributeKeys[_i];

            // Standard dataset syntax.
            if (attributeKey.indexOf('data-') === 0) {
                var dataKey = attributeKey.replace('data-', '');
                element.dataset[dataKey] = _attributes[attributeKey];
                continue;
            }
            // Shorthand dataset syntax.
            if (attributeKey.indexOf('d-') === 0) {
                var _dataKey = attributeKey.replace('d-', '');
                element.dataset[_dataKey] = _attributes[attributeKey];
                continue;
            }

            switch (attributeKey) {
                case 'e':
                    element.addEventListener.apply(element, toConsumableArray(_attributes.e));
                    break;
                case 'event':
                    element.addEventListener.apply(element, toConsumableArray(_attributes.event));
                    break;
                case '$':
                    Object.assign(element.style, _attributes.$);
                    break;
                case 'style':
                    Object.assign(element.style, _attributes.style);
                    break;
                case 'class':
                    element.className = _attributes.class;
                    break;
                default:
                    element[attributeKey] = _attributes[attributeKey];
                    break;
            }
        }
    }

    // Add children
    fragment.appendChild(element);

    if (Array.isArray(node.ch)) {
        node.ch.forEach(function (childNode) {
            createAndAppendNode(element, childNode);
        });
    }
};

var renderPartial = function renderPartial(selector) {
    var container = document.querySelector(selector);
    var fragment = document.createDocumentFragment();
    return function (newNode, cache) {

        // 1st render.
        // container
        if (cache === undefined) {
            if (Array.isArray(newNode)) {
                // Group of elements 
                for (var _i2 = 0; _i2 < newNode.length; _i2++) {
                    var currentNewNode = newNode[_i2];
                    console.log(currentNewNode);

                    createAndAppendNode(fragment, currentNewNode);
                }

                console.log('FINISHED', fragment);
            } else {
                // Wrapped element
            }
            requestAnimationFrame(function () {
                container.appendChild(fragment);
            });
        }
    };
};

var render = renderPartial('#root');

render(someUI);

// console.log(someUI)
// render(
//     document.getElementById('root'),
//     someUI
//     )


// /**
//  * A simple plugin integration system.
//  * {
//  *      dependencies:[api, api, api],
//  *      waveModules: [wModule, wModule, wModule]
//  * }
//  *
//  */

// export const registerModules = (plugins) => {
//     // Register dependencies 
//     $$$store.dependencies = plugins.dependencies
//         // Register waveModules
//     $$$store.waveModules = plugins.waveModules
//         // Check dependenicies exist for waveModules
//     $$$store.waveModules.forEach((waveObject, i) =>
//         $$$store.modules[$$$store.waveModules[i].name] = (...args) =>
//         waveObject(...args).plugin($$$store, waveObject().dependencies)
//     );
//     // return $$$store.modules;
// }

// export const modules = $$$store.modules;


/*******
 @ Issue with Array.isArray polyfill, when using event prop.

**/

exports.a = a;
exports.abbr = abbr;
exports.address = address;
exports.area = area;
exports.article = article;
exports.aside = aside;
exports.audio = audio;
exports.childNodes = childNodes;
exports.base = base;
exports.bdi = bdi;
exports.bdo = bdo;
exports.blockquote = blockquote;
exports.body = body;
exports.br = br;
exports.button = button;
exports.canvas = canvas;
exports.caption = caption;
exports.cite = cite;
exports.code = code;
exports.col = col;
exports.colgroup = colgroup;
exports.command = command;
exports.dd = dd;
exports.del = del;
exports.dfn = dfn;
exports.div = div;
exports.dl = dl;
exports.doctype = doctype;
exports.dt = dt;
exports.em = em;
exports.embed = embed;
exports.fieldset = fieldset;
exports.figcaption = figcaption;
exports.figure = figure;
exports.footer = footer;
exports.form = form;
exports.h1 = h1;
exports.h2 = h2;
exports.h3 = h3;
exports.h4 = h4;
exports.h5 = h5;
exports.h6 = h6;
exports.header = header;
exports.hgroup = hgroup;
exports.hr = hr;
exports.html = html;
exports.i = i;
exports.iframe = iframe;
exports.img = img;
exports.input = input;
exports.ins = ins;
exports.kbd = kbd;
exports.keygen = keygen;
exports.label = label;
exports.legend = legend;
exports.li = li;
exports.link = link;
exports.map = map;
exports.mark = mark;
exports.menu = menu;
exports.meta = meta;
exports.nav = nav;
exports.noscript = noscript;
exports.object = object;
exports.ol = ol;
exports.optgroup = optgroup;
exports.option = option;
exports.p = p;
exports.param = param;
exports.pre = pre;
exports.progress = progress;
exports.q = q;
exports.rp = rp;
exports.rt = rt;
exports.ruby = ruby;
exports.s = s;
exports.samp = samp;
exports.script = script;
exports.section = section;
exports.select = select;
exports.small = small;
exports.source = source;
exports.span = span;
exports.strong = strong;
exports.style = style;
exports.sub = sub;
exports.sup = sup;
exports.table = table;
exports.tbody = tbody;
exports.td = td;
exports.textarea = textarea;
exports.tfoot = tfoot;
exports.th = th;
exports.thead = thead;
exports.title = title;
exports.tr = tr;
exports.ul = ul;
exports.Var = Var;
exports.video = video;
exports.altGlyph = altGlyph;
exports.altGlyphDef = altGlyphDef;
exports.altGlyphItem = altGlyphItem;
exports.animate = animate;
exports.animateColor = animateColor;
exports.animateMotion = animateMotion;
exports.animateTransform = animateTransform;
exports.animation = animation;
exports.circle = circle;
exports.clipPath = clipPath;
exports.colorProfile = colorProfile;
exports.cursor = cursor;
exports.defs = defs;
exports.desc = desc;
exports.discard = discard;
exports.ellipse = ellipse;
exports.feBlend = feBlend;
exports.feColorMatrix = feColorMatrix;
exports.feComponentTransfer = feComponentTransfer;
exports.feComposite = feComposite;
exports.feConvolveMatrix = feConvolveMatrix;
exports.feDiffuseLighting = feDiffuseLighting;
exports.feDisplacementMap = feDisplacementMap;
exports.feDistantLight = feDistantLight;
exports.feDropShadow = feDropShadow;
exports.feFlood = feFlood;
exports.feFuncA = feFuncA;
exports.feFuncB = feFuncB;
exports.feFuncG = feFuncG;
exports.feFuncR = feFuncR;
exports.feGaussianBlur = feGaussianBlur;
exports.feImage = feImage;
exports.feMerge = feMerge;
exports.feMergeNode = feMergeNode;
exports.feMorphology = feMorphology;
exports.feOffset = feOffset;
exports.fePointLight = fePointLight;
exports.feSpecularLighting = feSpecularLighting;
exports.feSpotLight = feSpotLight;
exports.feTile = feTile;
exports.feTurbulence = feTurbulence;
exports.filter = filter;
exports.font = font;
exports.fontFace = fontFace;
exports.fontFaceFormat = fontFaceFormat;
exports.fontFaceName = fontFaceName;
exports.fontFaceSrc = fontFaceSrc;
exports.fontFaceUri = fontFaceUri;
exports.foreignObject = foreignObject;
exports.g = g;
exports.glyph = glyph;
exports.glyphRef = glyphRef;
exports.handler = handler;
exports.hatch = hatch;
exports.hatchpath = hatchpath;
exports.hkern = hkern;
exports.image = image;
exports.line = line;
exports.linearGradient = linearGradient;
exports.listener = listener;
exports.marker = marker;
exports.mask = mask;
exports.mesh = mesh;
exports.meshgradient = meshgradient;
exports.meshpatch = meshpatch;
exports.meshrow = meshrow;
exports.metadata = metadata;
exports.missingGlyph = missingGlyph;
exports.mpath = mpath;
exports.path = path;
exports.pattern = pattern;
exports.polygon = polygon;
exports.polyline = polyline;
exports.prefetch = prefetch;
exports.radialGradient = radialGradient;
exports.rect = rect;
exports.set = set$$1;
exports.solidColor = solidColor;
exports.solidcolor = solidcolor;
exports.stop = stop;
exports.Switch = Switch;
exports.symbol = symbol;
exports.tbreak = tbreak;
exports.text = text;
exports.textArea = textArea;
exports.textPath = textPath;
exports.tref = tref;
exports.tspan = tspan;
exports.unknown = unknown;
exports.use = use;
exports.view = view;
exports.vkern = vkern;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=wavefront.js.map
