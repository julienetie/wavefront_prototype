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
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

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
  return value != null && typeof value == 'object';
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


/*--------------------------------------------------------------------------*/

//   // Some AMD build optimizers, like r.js, check for condition patterns like:
//   if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
//     // Expose Lodash on the global object to prevent errors when Lodash is
//     // loaded by a script tag in the presence of an AMD loader.
//     // See http://requirejs.org/docs/errors.html#mismatch for more details.
//     // Use `_.noConflict` to remove Lodash from the global object.
//     root._ = lodash;

//     // Define as an anonymous module so, through path mapping, it can be
//     // referenced as the "underscore" module.
//     define(function() {
//       return lodash;
//     });
//   }
//   // Check for `exports` after `define` in case a build optimizer adds it.
//   else if (freeModule) {
//     // Export for Node.js.
//     (freeModule.exports = lodash)._ = lodash;
//     // Export for CommonJS support.
//     freeExports._ = lodash;
//   }
//   else {
//     // Export to the global object.
//     root._ = lodash;
//   }
// }.call(this));

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
    isComment: isComment,
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
    var data = {}, children, text, i;
    if (c !== undefined) {
        data = b;
        if (is.array(c)) {
            children = c;
        }
        else if (is.primitive(c)) {
            text = c;
        }
        else if (c && c.sel) {
            children = [c];
        }
    }
    else if (b !== undefined) {
        if (is.array(b)) {
            children = b;
        }
        else if (is.primitive(b)) {
            text = b;
        }
        else if (b && b.sel) {
            children = [b];
        }
        else {
            data = b;
        }
    }
    if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
            if (is.primitive(children[i]))
                children[i] = vnode_1.vnode(undefined, undefined, undefined, children[i]);
        }
    }
    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
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
    var i, old = oldVnode.data, cur = thunk.data;
    var oldArgs = old.args, args = cur.args;
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



function isUndef(s) { return s === undefined; }
function isDef(s) { return s !== undefined; }
var emptyNode = vnode_1.default('', {}, [], undefined, undefined);
function sameVnode(vnode1, vnode2) {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}
function isVnode(vnode) {
    return vnode.sel !== undefined;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i, map = {}, key, ch;
    for (i = beginIdx; i <= endIdx; ++i) {
        ch = children[i];
        if (ch != null) {
            key = ch.key;
            if (key !== undefined)
                map[key] = i;
        }
    }
    return map;
}
var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];

exports.h = h_1.h;

exports.thunk = thunk.thunk;
function init(modules, domApi) {
    var i, j, cbs = {};
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
        var i, data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.init)) {
                i(vnode);
                data = vnode.data;
            }
        }
        var children = vnode.children, sel = vnode.sel;
        if (sel === '!') {
            if (isUndef(vnode.text)) {
                vnode.text = '';
            }
            vnode.elm = api.createComment(vnode.text);
        }
        else if (sel !== undefined) {
            // Parse selector
            var hashIdx = sel.indexOf('#');
            var dotIdx = sel.indexOf('.', hashIdx);
            var hash = hashIdx > 0 ? hashIdx : sel.length;
            var dot = dotIdx > 0 ? dotIdx : sel.length;
            var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
            var elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
                : api.createElement(tag);
            if (hash < dot)
                elm.setAttribute('id', sel.slice(hash + 1, dot));
            if (dotIdx > 0)
                elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '));
            for (i = 0; i < cbs.create.length; ++i)
                cbs.create[i](emptyNode, vnode);
            if (is.array(children)) {
                for (i = 0; i < children.length; ++i) {
                    var ch = children[i];
                    if (ch != null) {
                        api.appendChild(elm, createElm(ch, insertedVnodeQueue));
                    }
                }
            }
            else if (is.primitive(vnode.text)) {
                api.appendChild(elm, api.createTextNode(vnode.text));
            }
            i = vnode.data.hook; // Reuse variable
            if (isDef(i)) {
                if (i.create)
                    i.create(emptyNode, vnode);
                if (i.insert)
                    insertedVnodeQueue.push(vnode);
            }
        }
        else {
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
        var i, j, data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.destroy))
                i(vnode);
            for (i = 0; i < cbs.destroy.length; ++i)
                cbs.destroy[i](vnode);
            if (vnode.children !== undefined) {
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
            var i_1 = void 0, listeners = void 0, rm = void 0, ch = vnodes[startIdx];
            if (ch != null) {
                if (isDef(ch.sel)) {
                    invokeDestroyHook(ch);
                    listeners = cbs.remove.length + 1;
                    rm = createRmCb(ch.elm, listeners);
                    for (i_1 = 0; i_1 < cbs.remove.length; ++i_1)
                        cbs.remove[i_1](ch, rm);
                    if (isDef(i_1 = ch.data) && isDef(i_1 = i_1.hook) && isDef(i_1 = i_1.remove)) {
                        i_1(ch, rm);
                    }
                    else {
                        rm();
                    }
                }
                else {
                    api.removeChild(parentElm, ch.elm);
                }
            }
        }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
        var oldStartIdx = 0, newStartIdx = 0;
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
            }
            else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx];
            }
            else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx];
            }
            else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newEndVnode)) {
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldEndVnode, newStartVnode)) {
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                if (oldKeyToIdx === undefined) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                }
                idxInOld = oldKeyToIdx[newStartVnode.key];
                if (isUndef(idxInOld)) {
                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    newStartVnode = newCh[++newStartIdx];
                }
                else {
                    elmToMove = oldCh[idxInOld];
                    if (elmToMove.sel !== newStartVnode.sel) {
                        api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    }
                    else {
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
        }
        else if (newStartIdx > newEndIdx) {
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
        if (oldVnode === vnode)
            return;
        if (vnode.data !== undefined) {
            for (i = 0; i < cbs.update.length; ++i)
                cbs.update[i](oldVnode, vnode);
            i = vnode.data.hook;
            if (isDef(i) && isDef(i = i.update))
                i(oldVnode, vnode);
        }
        if (isUndef(vnode.text)) {
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch)
                    updateChildren(elm, oldCh, ch, insertedVnodeQueue);
            }
            else if (isDef(ch)) {
                if (isDef(oldVnode.text))
                    api.setTextContent(elm, '');
                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            }
            else if (isDef(oldCh)) {
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            }
            else if (isDef(oldVnode.text)) {
                api.setTextContent(elm, '');
            }
        }
        else if (oldVnode.text !== vnode.text) {
            api.setTextContent(elm, vnode.text);
        }
        if (isDef(hook) && isDef(i = hook.postpatch)) {
            i(oldVnode, vnode);
        }
    }
    return function patch(oldVnode, vnode) {
        var i, elm, parent;
        var insertedVnodeQueue = [];
        for (i = 0; i < cbs.pre.length; ++i)
            cbs.pre[i]();
        if (!isVnode(oldVnode)) {
            oldVnode = emptyNodeAt(oldVnode);
        }
        if (sameVnode(oldVnode, vnode)) {
            patchVnode(oldVnode, vnode, insertedVnodeQueue);
        }
        else {
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
        for (i = 0; i < cbs.post.length; ++i)
            cbs.post[i]();
        return vnode;
    };
}
exports.init = init;
//# sourceMappingURL=snabbdom.js.map
});

var _class = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function updateClass(oldVnode, vnode) {
    var cur, name, elm = vnode.elm, oldClass = oldVnode.data.class, klass = vnode.data.class;
    if (!oldClass && !klass)
        return;
    if (oldClass === klass)
        return;
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
    var elm = vnode.elm, oldDataset = oldVnode.data.dataset, dataset = vnode.data.dataset, key;
    if (!oldDataset && !dataset)
        return;
    if (oldDataset === dataset)
        return;
    oldDataset = oldDataset || {};
    dataset = dataset || {};
    var d = elm.dataset;
    for (key in oldDataset) {
        if (!dataset[key]) {
            if (d) {
                delete d[key];
            }
            else {
                elm.removeAttribute('data-' + key.replace(CAPS_REGEX, '-$&').toLowerCase());
            }
        }
    }
    for (key in dataset) {
        if (oldDataset[key] !== dataset[key]) {
            if (d) {
                d[key] = dataset[key];
            }
            else {
                elm.setAttribute('data-' + key.replace(CAPS_REGEX, '-$&').toLowerCase(), dataset[key]);
            }
        }
    }
}
exports.datasetModule = { create: updateDataset, update: updateDataset };
exports.default = exports.datasetModule;
//# sourceMappingURL=dataset.js.map
});

const booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare", "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable", "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple", "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly", "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate", "truespeed", "typemustmatch", "visible"];

const booleanAttrsDict = Object.create(null);

for (let i = 0, len = booleanAttrs.length; i < len; i++) {
    booleanAttrsDict[booleanAttrs[i]] = true;
}

var hero = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
var nextFrame = function (fn) { raf(function () { raf(fn); }); };
function setNextFrame(obj, prop, val) {
    nextFrame(function () { obj[prop] = val; });
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
        return ((oldTextRect.left + oldTextRect.width / 2) - (newTextRect.left + newTextRect.width / 2));
    }
    return 0;
}
function getTextDy(oldTextRect, newTextRect) {
    if (oldTextRect && newTextRect) {
        return ((oldTextRect.top + oldTextRect.height / 2) - (newTextRect.top + newTextRect.height / 2));
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
            }
            else {
                //Calculate distances between old & new positions
                dx = oldRect.left - newRect.left;
                dy = oldRect.top - newRect.top;
            }
            hRatio = newRect.height / (Math.max(oldRect.height, 1));
            wRatio = isTextNode ? hRatio : newRect.width / (Math.max(oldRect.width, 1)); //text scales based on hRatio
            // Animate new element
            origTransform = newStyle.transform;
            origTransition = newStyle.transition;
            if (newComputedStyle.display === 'inline')
                newStyle.display = 'inline-block'; //this does not appear to have any negative side effects
            newStyle.transition = origTransition + 'transform 0s';
            newStyle.transformOrigin = calcTransformOrigin(isTextNode, newTextRect, newRect);
            newStyle.opacity = '0';
            newStyle.transform = origTransform + 'translate(' + dx + 'px, ' + dy + 'px) ' +
                'scale(' + 1 / wRatio + ', ' + 1 / hRatio + ')';
            setNextFrame(newStyle, 'transition', origTransition);
            setNextFrame(newStyle, 'transform', origTransform);
            setNextFrame(newStyle, 'opacity', '1');
            // Animate old element
            for (var key in oldVnode.savedStyle) {
                if (parseInt(key) != key) {
                    var ms = key.substring(0, 2) === 'ms';
                    var moz = key.substring(0, 3) === 'moz';
                    var webkit = key.substring(0, 6) === 'webkit';
                    if (!ms && !moz && !webkit)
                        oldStyle[key] = oldVnode.savedStyle[key];
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
                if (ev.propertyName === 'transform')
                    document.body.removeChild(ev.target);
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
var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
var nextFrame = function (fn) { raf(function () { raf(fn); }); };
function setNextFrame(obj, prop, val) {
    nextFrame(function () { obj[prop] = val; });
}
function updateStyle(oldVnode, vnode) {
    var cur, name, elm = vnode.elm, oldStyle = oldVnode.data.style, style = vnode.data.style;
    if (!oldStyle && !style)
        return;
    if (oldStyle === style)
        return;
    oldStyle = oldStyle || {};
    style = style || {};
    var oldHasDel = 'delayed' in oldStyle;
    for (name in oldStyle) {
        if (!style[name]) {
            if (name[0] === '-' && name[1] === '-') {
                elm.style.removeProperty(name);
            }
            else {
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
        }
        else if (name !== 'remove' && cur !== oldStyle[name]) {
            if (name[0] === '-' && name[1] === '-') {
                elm.style.setProperty(name, cur);
            }
            else {
                elm.style[name] = cur;
            }
        }
    }
}
function applyDestroyStyle(vnode) {
    var style, name, elm = vnode.elm, s = vnode.data.style;
    if (!s || !(style = s.destroy))
        return;
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
    var name, elm = vnode.elm, i = 0, compStyle, style = s.remove, amount = 0, applied = [];
    for (name in style) {
        applied.push(name);
        elm.style[name] = style[name];
    }
    compStyle = getComputedStyle(elm);
    var props = compStyle['transition-property'].split(', ');
    for (; i < props.length; ++i) {
        if (applied.indexOf(props[i]) !== -1)
            amount++;
    }
    elm.addEventListener('transitionend', function (ev) {
        if (ev.target === elm)
            --amount;
        if (amount === 0)
            rm();
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

var startTime;
var lastMeasure;
var startMeasure = function (name) {
    startTime = performance.now();
    lastMeasure = name;
};
var stopMeasure = function () {
    var last = lastMeasure;
    if (lastMeasure) {
        window.setTimeout(function () {
            lastMeasure = null;
            var stop = performance.now();
            var duration = 0;
            console.log(last + " took " + (stop - startTime));
        }, 0);
    }
};

function _random(max) {
    return Math.round(Math.random() * 1000) % max;
}

const buildData = (count = 1000) => {
    let id = 0;
    var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
    var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
    var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
    var data = [];
    for (var i = 0; i < count; i++) data.push({ id, label: adjectives[_random(adjectives.length)] + " " + colours[_random(colours.length)] + " " + nouns[_random(nouns.length)] });
    return data;
};

const isString = value => typeof value === 'string';
const isPrimitive = value => isString(value) || typeof value === 'number';
/** 
 * @param {string} t - Text 
 * @param {Number} id - Identity (Not an attribute)
 * @param {Number} ix - Index 
 * @param {Object|string} at - Attributes | Primative
 * @param {Array} ch - Children 
 */
const node = (t, id, at, ch, isSVG) => {
    switch (t) {
        case 'primitive':
            return { t: 'TEXT', id, val: at };
        case 'comment':
            return { t: 'COM', id, val: at };
        default:
            return isSVG ? {
                t,
                id,
                at,
                chx: ch.length,
                ch,
                svg: true
            } : {
                t,
                id,
                at,
                chx: ch.length,
                ch
            };
    }
};

let count = 0;
/** 
 Assembly is the mechanics of the tag functions. 
 A Wavefront template is a set of nested functions
 which act similar to recursion. 

 The deepest nested tag of the youngest index is
 the first executed tag function.


**/
const assembly = (tagName, isSVG) => {

    return function inner(...args) {
        let tagNameStr = `${tagName}`;
        let selectorName = tagName;
        let attributes$$1;
        let item;
        let textNode;
        let childNodes = [];
        let i;
        let children;
        let text;

        for (i = 0; i < args.length; i++) {
            item = args[i] || {};
            let isItemObject = isPlainObject(item);
            let isItemVnode = item.hasOwnProperty('t');

            // Check if item is a plane object = attribute.
            if (isItemObject && !isItemVnode) {
                // let isSelector = false;
                attributes$$1 = item;
                continue;
            }

            // Check if item is an array = group of child elements.
            if (Array.isArray(item)) {
                childNodes = [...childNodes, ...item];
                continue;
            }

            // check if item is not an object, array or function = child element.
            if (isItemObject && isItemVnode || isPrimitive) {
                childNodes.push(item);
                continue;
            }
        }

        for (i = 0; i < childNodes.length; ++i) {
            const childNode = childNodes[i];
            if (isPrimitive(childNode)) {
                let type;
                let value;
                if (childNode[0] === '@') {
                    type = 'comment';
                    value = childNode.slice(1);
                } else {
                    type = 'primitive';
                    value = childNode;
                }
                count++;
                childNodes[i] = node(type, count, value, null, isSVG);
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
        return node(tagNameStr, count, attributes$$1, childNodes, isSVG);
    };
};

// HTML Elements.
const a = assembly('a');
const abbr = assembly('abbr');
const address = assembly('address');
const area = assembly('area');
const article = assembly('article');
const aside = assembly('aside');
const audio = assembly('audio');
const childNodes = assembly('childNodes');
const base = assembly('base');
const bdi = assembly('bdi');
const bdo = assembly('bdo');
const blockquote = assembly('blockquote');
const body = assembly('body');
const br = assembly('br');
const button = assembly('button');
const canvas = assembly('canvas');
const caption = assembly('caption');
const cite = assembly('cite');
const code = assembly('code');
const col = assembly('col');
const colgroup = assembly('colgroup');
const command = assembly('command');
const dd = assembly('dd');
const del = assembly('del');
const dfn = assembly('dfn');
const div = assembly('DIV');
const dl = assembly('dl');
const doctype = assembly('doctype');
const dt = assembly('dt');
const em = assembly('em');
const embed = assembly('embed');
const fieldset = assembly('fieldset');
const figcaption = assembly('figcaption');
const figure = assembly('figure');
const footer = assembly('footer');
const form = assembly('form');
const h1 = assembly('h1');
const h2 = assembly('h2');
const h3 = assembly('h3');
const h4 = assembly('h4');
const h5 = assembly('h5');
const h6 = assembly('h6');
const header = assembly('header');
const hgroup = assembly('hgroup');
const hr = assembly('hr');
const html = assembly('html');
const i = assembly('i');
const iframe = assembly('iframe');
const img = assembly('img');
const input = assembly('input');
const ins = assembly('ins');
const kbd = assembly('kbd');
const keygen = assembly('keygen');
const label = assembly('label');
const legend = assembly('legend');
const li = assembly('li');
const link = assembly('link');
const map = assembly('map');
const mark = assembly('mark');
const menu = assembly('menu');
const meta = assembly('meta');
const nav = assembly('nav');
const noscript = assembly('noscript');
const object = assembly('object');
const ol = assembly('ol');
const optgroup = assembly('optgroup');
const option = assembly('option');
const p = assembly('p');
const param = assembly('param');
const pre = assembly('pre');
const progress = assembly('progress');
const q = assembly('q');
const rp = assembly('rp');
const rt = assembly('rt');
const ruby = assembly('ruby');
const s = assembly('s');
const samp = assembly('samp');
const script = assembly('script');
const section = assembly('section');
const select = assembly('select');
const small = assembly('small');
const source = assembly('source');
const span = assembly('span');
const strong = assembly('strong');
const style = assembly('style');
const sub = assembly('sub');
const sup = assembly('sup');
const table = assembly('table');
const tbody = assembly('tbody');
const td = assembly('td');
const textarea = assembly('textarea');
const tfoot = assembly('tfoot');
const th = assembly('th');
const thead = assembly('thead');
const title = assembly('title');
const tr = assembly('tr');
const ul = assembly('ul');
const Var = assembly('var'); // First capital
const video = assembly('video');

// SVG Elements.
const svg = assembly('svg', true);
const altGlyph = assembly('altGlyph', true);
const altGlyphDef = assembly('altGlyphDef', true);
const altGlyphItem = assembly('altGlyphItem', true);
const animate = assembly('animate');
const animateColor = assembly('animateColor', true);
const animateMotion = assembly('animateMotion', true);
const animateTransform = assembly('animateTransform', true);
const animation = assembly('animation', true);
const circle = assembly('circle', true);
const clipPath = assembly('clipPath', true);
const colorProfile = assembly('color-profile', true); // color-profile
const cursor = assembly('cursor', true);
const defs = assembly('defs', true);
const desc = assembly('desc', true);
const discard = assembly('discard', true);
const ellipse = assembly('ellipse', true);
const feBlend = assembly('feBlend', true);
const feColorMatrix = assembly('feComposite', true);
const feComponentTransfer = assembly('feComponentTransfer', true);
const feComposite = assembly('feComposite', true);
const feConvolveMatrix = assembly('feConvolveMatrix', true);
const feDiffuseLighting = assembly('feDiffuseLighting', true);
const feDisplacementMap = assembly('feDistantLight', true);
const feDistantLight = assembly('feDistantLight', true);
const feDropShadow = assembly('feDropShadow', true);
const feFlood = assembly('feFlood', true);
const feFuncA = assembly('feFuncA', true);
const feFuncB = assembly('feFuncB', true);
const feFuncG = assembly('feFuncG', true);
const feFuncR = assembly('feFuncR', true);
const feGaussianBlur = assembly('feGaussianBlur', true);
const feImage = assembly('feImage', true);
const feMerge = assembly('feMerge', true);
const feMergeNode = assembly('feMergeNode', true);
const feMorphology = assembly('feMorphology', true);
const feOffset = assembly('feOffset', true);
const fePointLight = assembly('fePointLight', true);
const feSpecularLighting = assembly('feSpecularLighting', true);
const feSpotLight = assembly('feSpotLight', true);
const feTile = assembly('feTile', true);
const feTurbulence = assembly('feTurbulence', true);
const filter = assembly('filter', true);
const font = assembly('font', true);
const fontFace = assembly('font-face', true); // fontFace
const fontFaceFormat = assembly('font-face-format', true); // fontFaceFormat
const fontFaceName = assembly('font-face-name', true); // fontFaceName
const fontFaceSrc = assembly('font-face-src', true); // fontFaceSrc
const fontFaceUri = assembly('font-face-uri', true); // fontFaceUri
const foreignObject = assembly('foreignObject', true);
const g = assembly('g', true);
const glyph = assembly('glyph', true);
const glyphRef = assembly('glyphRef', true);
const handler = assembly('handler', true);
const hatch = assembly('hatch', true);
const hatchpath = assembly('hatchpath', true);
const hkern = assembly('hkern', true);
const image = assembly('image', true);
const line = assembly('line', true);
const linearGradient = assembly('linearGradient', true);
const listener = assembly('listener');
const marker = assembly('marker', true);
const mask = assembly('mask', true);
const mesh = assembly('mesh', true);
const meshgradient = assembly('meshgradient', true);
const meshpatch = assembly('meshpatch', true);
const meshrow = assembly('meshrow', true);
const metadata = assembly('metadata', true);
const missingGlyph = assembly('missing-glyph', true); // missing-glyph
const mpath = assembly('mpath', true);
const path = assembly('path', true);
const pattern = assembly('pattern', true);
const polygon = assembly('polygon', true);
const polyline = assembly('polyline', true);
const prefetch = assembly('prefetch', true);
const radialGradient = assembly('radialGradient', true);
const rect = assembly('rect', true);
const set = assembly('set', true);
const solidColor = assembly('solidColor', true);
const solidcolor = assembly('solidcolor', true);
const Stop = assembly('stop', true); // First capital
const Switch = assembly('switch', true); // First capital
const symbol = assembly('symbol', true);
const tbreak = assembly('tbreak', true);
const text = assembly('text', true);
const textArea = assembly('textArea', true);
const textPath = assembly('textPath', true);
const tref = assembly('tref', true);
const tspan = assembly('tspan', true);
const unknown = assembly('unknown', true);
const use = assembly('use', true);
const view = assembly('view', true);
const vkern = assembly('vkern', true);

/** 
 * or is used when you explicitly want the to inidicate
 * a condition is being made in the template. 
 * @param {Array} vNodes - An array of vNodes 
 * @param {Number|Array} switch - A number or series of inidcators (as an array) of what elements to display.
 * @exclude {Boolean} exclude - 
 * 
 */
const or = (vNodes, $witch, exclude) => {
    const includeVNodes = [];
    const includeIndexes = [];

    // Return the vNode of a given index.
    if (typeof $witch === 'number') {
        return vNodes[$witch];
    }

    // Treat toggle as an array. 
    const toggle = typeof $witch === 'string' ? [$witch] : $witch;

    // If toggle is not an array or empty do nothing.
    if (!Array.isArray(toggle) || toggle.length === 0) {
        return vNodes;
    }

    const classes = toggle.filter(e => e.indexOf('.') > -1);
    const ids = toggle.filter(e => e.indexOf('#') === 0);
    const tags = toggle.filter(e => /^[a-z0-9]+$/i.test(e));
    const numberOfChildren = toggle.filter(e => e.indexOf('~') === 0);
    const indexes = toggle.filter(e => typeof e === 'number');

    for (let i = 0; i < vNodes.length; i++) {

        const vNode = vNodes[i];
        const attribute = vNode.at;

        // Check class
        if (classes.length > 0) {
            classes.forEach(c => {
                if (attribute.class.includes(c.slice(1))) {
                    includeIndexes.push(i);
                }
            });
        }

        // Check ids
        if (ids.length > 0) {
            ids.forEach(c => {
                if (attribute.id === c.slice(1)) {
                    includeIndexes.push(i);
                }
            });
        }

        // Check tags
        if (tags.length > 0) {
            tags.forEach(c => {
                if (vNode.t.toUpperCase() === c.toUpperCase()) {
                    includeIndexes.push(i);
                }
            });
        }

        // Check numberOfChildren
        if (numberOfChildren.length > 0) {
            numberOfChildren.forEach(x => {
                const childrenLength = vNode.ch.filter(c => c.t !== 'TEXT' && c.t !== 'COM').length;
                console.log('childrenLength', childrenLength);
                if (childrenLength == x.slice(1)) {
                    includeIndexes.push(i);
                }
            });
        }
    }
    console.log('includeIndexes', includeIndexes);
    // Remove duplicates
    const indexList = [...new Set(includeIndexes)];

    console.log('indexList', indexList);
    if (exclude === true) {
        return vNodes.filter(function (item, i) {
            return indexList.indexOf(i) === -1;
        });
    } else {
        indexList.forEach(index => {
            includeVNodes.push(vNodes[index]);
        });
        return includeVNodes;
    }
};

/** 
 * or is used when you explicitly want the to inidicate
 * that an item is being looped by n times or via data
 * 
 * @param {Object|Array} vNodes 
 * @param {*} Data 
 */
const loop = (vNodes, data) => {
    const singleVnode = isPlainObject(vNodes);
    const groupVnodes = Array.isArray(vNodes);
    const hasNumber = typeof data === 'number';

    let loopedVnodes = [];

    if (hasNumber) {
        // Single vnode looped by an integer.
        if (singleVnode) {
            for (let i = 0; i < data; i++) {
                loopedVnodes.push(vNodes);
            }
        }

        // Grouped vnode looped by an integer.
        if (groupVnodes) {
            for (let i = 0; i < data; i++) {
                loopedVnodes.push(...vNodes);
            }
        }
    } else {
        if (typeof vNodes === 'function') {
            loopedVnodes = vNodes(data);

            if (!Array.isArray(loopedVnodes)) {
                throw new Error('loop() should return an Array of vnodes');
            }
        }
    }

    console.log('loop', loopedVnodes);
    return loopedVnodes;
};

const lotsData = buildData(10000);

// console.log(lotsData[0])
// for (let i = 0; i < lotsData.length; i++) {
//     // console.log(i)
//     const dat = lotsData[i];
//     thing.push(
//         tr({ class: 'menu-item' }, [
//             td({ class: 'col-md-1' },
//                 dat.id
//             ),
//             td({ class: 'col-md-4' },
//                 a({ class: 'lbl' }, dat.label)
//             ),
//             td({ class: 'col-md-1' },
//                 a({ class: 'remove' },
//                     span({
//                         class: 'glyphicon glyphicon-remove remove'
//                     })
//                 )
//             ),
//             td({ class: 'col-md-6' })
//         ]))
// }
// console.log('thing',thing)


const responseData = ['I\'m fine how are you?', 'Not bad thanks', 'La La La', 'I am well thank you', 'Excusemoi'];
const responseList = data => {
    return data.map((response, i) => span({
        style: {
            'color': `rgb(${parseInt(i * 50, 10)},${255},${parseInt(500 / i, 10)})`,
            display: 'block'
        }
    }, response));
};

const twitterHref = 'http://google.com';
const facebookHref = 'http://facebook.com';
const someUI = [div({ id: 'block-social-responsive', class: 'footer__social' }, ul({ class: 'menu' }, li({ class: 'menu-item' }, a({ href: twitterHref, class: 'icon-twitter', target: '_blank' }, 'TWITTER')), li({ class: 'menu-item' }, a({
    href: facebookHref,
    class: 'icon-fb',
    target: '_blank',
    _innerHTML: 'HELOOOOOOO',
    // event: ['mouseover', (e) => { console.log('THIS ELEMENT', e.target) }, false],
    $: { backgroundColor: 'red', color: 'yellow' },
    'd-foijfwoeifjw': 2000000000,
    name: 'jack'
}, 'FACEBOOK')), or([div({ class: 'hello', id: 'yeaa' }, 'HELLO'), div({ class: 'foo' }, 'FOO'), a({ class: 'bar', id: 'yeaa' }, h1('This is H TAG 1'), h2('This is H TAG 2'), 'BAR'), div({ class: 'baz' }, 'BAZ'), section({ class: 'hello' }, h1('This is H TAG 1'), h2('This is H TAG 2')), section({ class: 'world' }, 'WORLD')], ['~2', '.world'], true),
// Without variables...
li({ class: 'menu-item' }, a({ href: 'https://www.linkedin.com/company/208777', class: 'icon-in', target: '_blank' }, 'Linkedin'), `@This is a single line comment`), loop(li({ style: { backgroundColor: 'pink', fontSize: 20 } }, 'HELLO WORLD'), 5), loop(responseList, responseData))), section({ id: 'blah', class: 'wefw' }, 'TEST SECTION'), svg({ height: 150, width: 400 }, defs(linearGradient({ id: 'grad1', x1: '0%', y1: '0%', x2: '0%', y2: '100%' }, Stop({ offset: '0%', style: { 'stop-color': 'rgb(255,0,0)', 'stop-opacity': 1 } }), Stop({ offset: '100%', style: { 'stop-color': 'rgb(255,255,0)', 'stop-opacity': 1 } }))), ellipse({ cx: 200, cy: 70, rx: 85, ry: 55, fill: 'url(#grad1)' }), 'Sorry, your browser does not support inline SVG.'), `@This is a single line comment`];

const createAndAppendNode = (fragment, node) => {
    console.log('node', node);
    // TEXT_NODE        3
    if (node.t === 'TEXT') {
        const textNode = document.createTextNode(node.val);
        fragment.appendChild(textNode);
        return;
    }
    // COMMENT_NODE     8
    if (node.t === 'COM') {
        const commentNode = document.createComment(node.val);
        fragment.appendChild(commentNode);
        return;
    }

    // ELEMENT_NODE     1
    const element = node.svg ? document.createElementNS('http://www.w3.org/2000/svg', node.t) : document.createElement(node.t);

    // Add attributes
    if (node.at) {
        const attributes$$1 = node.at;
        const attributeKeys = Object.keys(attributes$$1);
        const attributesLength = attributeKeys.length;

        for (let i = 0; i < attributesLength; i++) {

            const attributeKey = attributeKeys[i];

            // Standard dataset syntax.
            if (attributeKey.indexOf('data-') === 0) {
                const dataKey = attributeKey.replace('data-', '');
                element.dataset[dataKey] = attributes$$1[attributeKey];
                continue;
            }
            // Shorthand dataset syntax.
            if (attributeKey.indexOf('d-') === 0) {
                const dataKey = attributeKey.replace('d-', '');
                element.dataset[dataKey] = attributes$$1[attributeKey];
                continue;
            }
            // Props: _
            if (attributeKey[0] === '_') {
                const cleanKey = attributeKey.replace('_', '');
                element[cleanKey] = attributes$$1[attributeKey];
                continue;
            }

            switch (attributeKey) {
                case 'e':
                case 'event':
                    element.addEventListener(...attributes$$1[attributeKey]);
                    break;
                case '$':
                case 'style':
                    Object.assign(element.style, attributes$$1[attributeKey]);
                    break;
                case 'c':
                case 'class':
                    element.className = attributes$$1.class;
                    break;
                default:
                    element.setAttribute(attributeKey, attributes$$1[attributeKey]);
                    break;
            }
        }
    }

    // Add children
    fragment.appendChild(element);

    if (Array.isArray(node.ch)) {
        node.ch.forEach(childNode => {
            createAndAppendNode(element, childNode);
        });
    }
};

const renderPartial = selector => {
    const container = document.querySelector(selector);
    const fragment = document.createDocumentFragment();
    return (newNode, cache) => {
        count = 0; // reset counter used for node ids.
        // 1st render.
        // container
        if (cache === undefined) {
            if (Array.isArray(newNode)) {
                // Group of elements 
                for (let i = 0; i < newNode.length; i++) {
                    const currentNewNode = newNode[i];
                    // console.log('currentNewNode', currentNewNode)
                    /*
                        We are not handeling string and comment nodes in 
                        an group. This needs to be handeled.
                     */

                    createAndAppendNode(fragment, currentNewNode);
                }

                console.log('FINISHED', fragment);
            } else {
                // Wrapped element
            }
            requestAnimationFrame(() => {
                container.appendChild(fragment);

                /** 
                   Static Rendering:
                   This will generate the inital state
                   of the HTML as a string. headers 
                   and other content can be generated 
                   from the front side or modified on the
                   back end...
                **/
                // const staticRender = container.outerHTML;
                // console.log(staticRender)
            });
        }
    };
};

document.addEventListener('click', () => {
    startMeasure('Wavefront');
    const render = renderPartial('#root');
    render(someUI);
    stopMeasure();
}, false);

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

export { a, abbr, address, area, article, aside, audio, childNodes, base, bdi, bdo, blockquote, body, br, button, canvas, caption, cite, code, col, colgroup, command, dd, del, dfn, div, dl, doctype, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, hr, html, i, iframe, img, input, ins, kbd, keygen, label, legend, li, link, map, mark, menu, meta, nav, noscript, object, ol, optgroup, option, p, param, pre, progress, q, rp, rt, ruby, s, samp, script, section, select, small, source, span, strong, style, sub, sup, table, tbody, td, textarea, tfoot, th, thead, title, tr, ul, Var, video, svg, altGlyph, altGlyphDef, altGlyphItem, animate, animateColor, animateMotion, animateTransform, animation, circle, clipPath, colorProfile, cursor, defs, desc, discard, ellipse, feBlend, feColorMatrix, feComponentTransfer, feComposite, feConvolveMatrix, feDiffuseLighting, feDisplacementMap, feDistantLight, feDropShadow, feFlood, feFuncA, feFuncB, feFuncG, feFuncR, feGaussianBlur, feImage, feMerge, feMergeNode, feMorphology, feOffset, fePointLight, feSpecularLighting, feSpotLight, feTile, feTurbulence, filter, font, fontFace, fontFaceFormat, fontFaceName, fontFaceSrc, fontFaceUri, foreignObject, g, glyph, glyphRef, handler, hatch, hatchpath, hkern, image, line, linearGradient, listener, marker, mask, mesh, meshgradient, meshpatch, meshrow, metadata, missingGlyph, mpath, path, pattern, polygon, polyline, prefetch, radialGradient, rect, set, solidColor, solidcolor, Stop, Switch, symbol, tbreak, text, textArea, textPath, tref, tspan, unknown, use, view, vkern, or, loop };
//# sourceMappingURL=wavefront.es.js.map
