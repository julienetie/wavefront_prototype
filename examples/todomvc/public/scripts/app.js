(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





















var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children,
        text: text, elm: elm, key: key };
}

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
/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/*--------------------------------------------------------------------------*/

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
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

// No operation performed.


/*------------------------------------------------------------------------*/

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
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
});

var is = createCommonjsModule(function (module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", { value: true });
    exports.array = Array.isArray;
    function primitive(s) {
        return typeof s === 'string' || typeof s === 'number';
    }
    exports.primitive = primitive;
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
});

var snabbdom$1 = createCommonjsModule(function (module, exports) {
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
});

var snabbdom_3 = snabbdom$1.init;

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
});

var _class_1 = _class.classModule;

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
});

var dataset_1 = dataset.datasetModule;

var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare", "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable", "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple", "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly", "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate", "truespeed", "typemustmatch", "visible"];

var xlinkNS = 'http://www.w3.org/1999/xlink';
var xmlNS = 'http://www.w3.org/XML/1998/namespace';
var colonChar = 58;
var xChar = 120;
var booleanAttrsDict = Object.create(null);

for (var _i = 0, len = booleanAttrs.length; _i < len; _i++) {
    booleanAttrsDict[booleanAttrs[_i]] = true;
}

function updateAttrs(oldVnode, vnode) {
    var key = void 0;
    var elm = vnode.elm;
    var oldAttrs = oldVnode.data.attrs;
    var attrs = vnode.data.attrs;
    if (!oldAttrs && !attrs || oldAttrs === attrs) {
        return;
    }

    oldAttrs = oldAttrs || {};

    attrs = attrs || {};

    // update modified attributes, add new attributes
    for (key in attrs) {
        var cur = attrs[key];
        var old = oldAttrs[key];

        if (old !== cur) {
            if (booleanAttrsDict[key]) {
                if (cur) {
                    elm.setAttribute(key, '');
                } else {
                    elm.removeAttribute(key);
                }
            } else {
                if (key.charCodeAt(0) !== xChar) {
                    elm.setAttribute(key, cur);
                } else if (key.charCodeAt(3) === colonChar) {
                    // Assume xml namespace
                    elm.setAttributeNS(xmlNS, key, cur);
                } else if (key.charCodeAt(5) === colonChar) {
                    // Assume xlink namespace
                    elm.setAttributeNS(xlinkNS, key, cur);
                } else {
                    elm.setAttribute(key, cur);
                }
            }
        }
    }
    // remove removed attributes
    // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
    // the other option is to remove all attributes with value == undefined
    for (key in oldAttrs) {
        if (!(key in attrs)) {
            elm.removeAttribute(key);
        }
    }
}
var attributes = { create: updateAttrs, update: updateAttrs };

function updateProps(oldVnode, vnode) {
    var key,
        cur,
        old,
        elm = vnode.elm,
        oldProps = oldVnode.data.props,
        props = vnode.data.props;
    if (!oldProps && !props) return;
    if (oldProps === props) return;
    oldProps = oldProps || {};
    props = props || {};
    for (key in oldProps) {
        if (!props[key]) {
            delete elm[key];
        }
    }
    for (key in props) {
        cur = props[key];
        old = oldProps[key];
        if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
            elm[key] = cur;
        }
    }
}
var props = { create: updateProps, update: updateProps };

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
});

var hero_1 = hero.heroModule;

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
});

var style_1 = style$1.styleModule;

function invokeHandler(handler, vnode, event) {
    if (typeof handler === "function") {
        // call function handler
        handler.call(vnode, event, vnode);
    } else if ((typeof handler === 'undefined' ? 'undefined' : _typeof(handler)) === "object") {
        // call handler with arguments
        if (typeof handler[0] === "function") {
            // special case for single argument for performance
            if (handler.length === 2) {
                handler[0].call(vnode, handler[1], event, vnode);
            } else {
                var args = handler.slice(1);
                args.push(event);
                args.push(vnode);
                handler[0].apply(vnode, args);
            }
        } else {
            // call multiple handlers
            for (var i = 0; i < handler.length; i++) {
                invokeHandler(handler[i]);
            }
        }
    }
}
function handleEvent(event, vnode) {
    var name = event.type,
        on = vnode.data.on;
    // call event handler(s) if exists
    if (on && on[name]) {
        invokeHandler(on[name], vnode, event);
    }
}
function createListener() {
    return function handler(event) {
        handleEvent(event, handler.vnode);
    };
}
function updateEventListeners(oldVnode, vnode) {
    var oldOn = oldVnode.data.on,
        oldListener = oldVnode.listener,
        oldElm = oldVnode.elm,
        on = vnode && vnode.data.on,
        elm = vnode && vnode.elm,
        name;
    // optimization for reused immutable handlers
    if (oldOn === on) {
        return;
    }
    // remove existing listeners which no longer used
    if (oldOn && oldListener) {
        // if element changed or deleted we remove all existing listeners unconditionally
        if (!on) {
            for (name in oldOn) {
                // remove listener if element was changed or existing listeners removed
                oldElm.removeEventListener(name, oldListener, false);
            }
        } else {
            for (name in oldOn) {
                // remove listener if existing listener removed
                if (!on[name]) {
                    oldElm.removeEventListener(name, oldListener, false);
                }
            }
        }
    }
    // add new listeners which has not already attached
    if (on) {
        // reuse existing listener or create new
        var listener = vnode.listener = oldVnode.listener || createListener();
        // update vnode for listener
        listener.vnode = vnode;
        // if element changed or added we add all needed listeners unconditionally
        if (!oldOn) {
            for (name in on) {
                // add listener if element was changed or new listeners added
                elm.addEventListener(name, listener, false);
            }
        } else {
            for (name in on) {
                // add listener if new listener added
                if (!oldOn[name]) {
                    elm.addEventListener(name, listener, false);
                }
            }
        }
    }
}
var eventListenersModule = {
    create: updateEventListeners,
    update: updateEventListeners,
    destroy: updateEventListeners
};

var isString = function isString(value) {
    return typeof value === 'string';
};
var isPrimitive = function isPrimitive(value) {
    return isString(value) || typeof value === 'number';
};
var isElement = function isElement(value) {
    return value instanceof Element;
};

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
var assembly = function assembly(tagName) {
    return function inner() {
        var sel = '' + tagName;
        var selectorName = tagName;
        var attributes$$1 = { attrs: {}, props: {} };
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
            var isItemVnode = item.hasOwnProperty('sel');

            // Check if item is a plane object = attribute.
            if (isItemObject && !isItemVnode) {
                var isSelector = false;
                var attrKeys = Object.keys(item);

                // Create virtual id selector.
                if (item.hasOwnProperty('id') || item.hasOwnProperty('#')) {
                    selectorName += '#' + item.id;
                    isSelector = true;
                }
                // Create virtual class selectors.
                if (item.hasOwnProperty('class') || item.hasOwnProperty('.')) {
                    selectorName += '.' + item.class;
                    isSelector = true;
                }

                attrKeys.forEach(function (key) {
                    // If not selector
                    if (['id', '#', 'class', '.'].indexOf(key) < 0) {
                        switch (key) {
                            case 'e':
                            case 'event':
                                attributes$$1.on = item[key];
                                break;
                            case 'p':
                            case 'props':
                                attributes$$1.props = item[key];
                                break;
                            case '$':
                            case 'style':
                                attributes$$1.style = item[key];
                                break;
                            case 'd':
                            case 'dataset':
                                attributes$$1.dataset = item[key];
                                break;
                            default:
                                attributes$$1.attrs[key] = item[key];
                        }
                    }
                });
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
                childNodes[i] = vnode(undefined, undefined, undefined, childNodes[i]);
            }
        }

        if (selectorName[0] === 's' && selectorName[1] === 'v' && selectorName[2] === 'g' && (selectorName.length === 3 || selectorName[3] === '.' || selectorName[3] === '#')) {
            addNS(attributes$$1, childNodes, selectorName);
        }

        return vnode(selectorName, attributes$$1, childNodes, text, undefined);
    };
};

// HTML Elements.
var a = assembly('a');
var button = assembly('button');
var div = assembly('DIV');
var footer = assembly('footer');
var h1 = assembly('h1');
var header = assembly('header');
var input = assembly('input');
var label = assembly('label');
var li = assembly('li');
var p = assembly('p');
var section = assembly('section');
var span = assembly('span');
var strong = assembly('strong');
var ul = assembly('ul');
var handler = assembly('handler');
// a in HTML
// audio in HTML
// canvas in HTML
// iframe in HTML
// video in HTML
// script in HTML
// style in HTML
// svg in HTML
// title in HTML

// Render API
var patch = snabbdom_3([_class_1, props, attributes, hero_1, style_1, dataset_1, eventListenersModule]);

var renderPartial = function renderPartial() {
    var previousVNode = void 0;
    var DOMContainer = void 0;
    var selectorString = void 0;
    var documentRef = document;
    /**
     * @param {string | HTMLElement} selector - Root HTML element 
     * @param {Object} newVNode - New virtual node
     * @param {Boolean} cache - Cache element, defaults to true.
     */
    return function (selector, newVNode, cache) {
        // Set HTML element.
        if (isString(selector)) {
            if (selector !== selectorString && !cache) {
                DOMContainer = documentRef.querySelector(selector);
                selectorString = selector;
            }
        } else if (isElement(selector) && !cache) {
            if (selector !== selectorString) {
                DOMContainer = selector;
            }
        }

        // Diff and patch the DOM. 
        if (!previousVNode) {
            patch(DOMContainer, newVNode);
        }
        if (previousVNode && previousVNode !== newVNode) {
            patch(previousVNode, newVNode);
        }
        previousVNode = newVNode;
    };
};

var render = renderPartial();

var vnode$1 = function (sel, data, children, text, elm) {
  var key = data === undefined ? undefined : data.key;
  return { sel: sel, data: data, children: children,
    text: text, elm: elm, key: key };
};

var is$2 = {
  array: Array.isArray,
  primitive: function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
  }
};

var VNode = vnode$1;
var is$1 = is$2;

function addNS$1(data, children, sel) {
  data.ns = 'http://www.w3.org/2000/svg';

  if (sel !== 'foreignObject' && children !== undefined) {
    for (var i = 0; i < children.length; ++i) {
      addNS$1(children[i].data, children[i].children, children[i].sel);
    }
  }
}

/** 
 * Footer.
 * @param ...
 */
var footer$2 = (function (_ref) {
    var itemsLeft = _ref.itemsLeft,
        all = _ref.all,
        active = _ref.active,
        completed = _ref.completed;
    return footer({ class: 'footer' }, span({ class: 'todo-count', style: { background: 'blue' } }, strong(itemsLeft), ' items left'), ul({ class: 'filters' }, li(a({ class: 'selected', href: '#/', event: all }, 'All')), li(a({ href: '#/active', event: active }, 'Active')), li(a({ href: '#/completed', event: completed }, 'Completed'))), button({ class: 'clear-completed' }, 'Clear completed'));
});

// style 
// href

// const render = (container, vNode, oldVnode) => {
//     if (!oldVnode) {
//         patch(container, vNode);
//     }
//     if (oldVnode && oldVnode !== vNode) {
//         patch(oldVnode, vNode);
//     }
// }

// Data Skeleton

function o$1(address$$1, write) {
    var addressArr = address$$1.split(' ');
    var addressLength = addressArr.length;
    var path$$1 = o$1.prototype.skeleton;

    for (var i$$1 = 0; i$$1 < addressLength; i$$1++) {
        path$$1 = path$$1[addressArr[i$$1]];

        if (write) {
            if (i$$1 === addressLength - 2) {
                path$$1[addressArr[i$$1 + 1]] = write;
            }
        }
    }

    return path$$1;
}

o$1.create = function (skeleton) {
    o$1.prototype.skeleton = skeleton;
};

var skeleton = {};

skeleton.todos = []; // [Completed, value, reference]


skeleton.view = 'all';

skeleton.hasCompleted = []; // Boolean


skeleton.itemsLeft = []; // Number


o$1.create(skeleton);

var props$1 = {};
var itemsLeft = o$1('itemsLeft');

var toggleView = function toggleView(viewName) {
    return {
        click: function click() {
            interfaces('TOGGLE_VIEW', { viewName: viewName });
        }
    };
};

var controller = function controller() {
    props$1.itemsLeft = itemsLeft[0];
    props$1.all = toggleView('all');
    props$1.active = toggleView('active');
    props$1.completed = toggleView('completed');
    return footer$2(props$1);
};

var info$1 = (function () {
    return footer({ class: 'info' }, p('Double-click to edit a todo'), p('Created by ', a({ href: 'https://github.com/julienetie' }, 'Julien Etienne')), p('Part of', a({ href: 'http://todomvc.com' })));
});

var controller$1 = function controller$1(cmd, data) {
	var props = '';
	return info$1(props);
};

/**
 * Header.
 * @param...
 */
var header$2 = (function (_ref) {
    var returnKey = _ref.returnKey;
    return header({ class: 'header' }, [h1('todos'), input({
        class: 'new-todo',
        placeholder: 'What needs to be done?',
        autofocus: 'autofocus',
        event: returnKey
    })]);
});

var returnKey = {
    keypress: function keypress(e) {
        var value = e.target.value.trim();
        if (e.keyCode === 13 && value) {
            interfaces('ADD_TODO', { value: value });
            e.target.value = '';
        }
    }
};

var props$2 = {
    returnKey: returnKey
};

var controller$2 = function controller$2(cmd, data) {
    return header$2(props$2);
};

var mainSection$1 = (function (_ref) {
    var todoList = _ref.todoList,
        toggleAllAsCompleted = _ref.toggleAllAsCompleted;
    return section({ class: 'main' }, input({ class: 'toggle-all', type: 'checkbox', event: toggleAllAsCompleted }), label({ for: 'toggle-all' }, 'Mark all as complete'), ul({ class: 'todo-list' }, todoList));
});

var todoItem$1 = (function (_ref) {
    var value = _ref.value,
        toggleComplete = _ref.toggleComplete,
        editing = _ref.editing,
        completed = _ref.completed,
        removeTodo = _ref.removeTodo,
        editTodo = _ref.editTodo,
        saveTodo = _ref.saveTodo;
    return li({ class: '' + completed + editing, event: editTodo }, div({ class: 'view' }, input({ class: 'toggle', type: 'checkbox', checked: !!completed, event: toggleComplete }), label(value), button({ class: 'destroy', event: removeTodo })), input({ class: 'edit', value: value, event: saveTodo }));
});

var props$4 = {};

var toggleComplete = function toggleComplete(index) {
    return {
        click: function click() {
            interfaces('TOGGLE_COMPLETED_TODO', { index: index });
        }
    };
};

var editTodo = function editTodo(index) {
    return {
        dblclick: function dblclick(e) {
            interfaces('EDIT_TODO', { index: index });
        }
    };
};

var saveTodo = function saveTodo(index, editedValue) {
    var saveTodoEdit = function saveTodoEdit(e, index) {
        interfaces('SAVE_TODO_EDIT', { index: index, editiedValue: e.target.value.trim() });
    };
    return {
        blur: function blur(e) {
            var value = e.target.value.trim();
            if (value) {
                saveTodoEdit(e, index);
            } else {
                interfaces('REMOVE_TODO', { index: index });
            }
        },
        keypress: function keypress(e) {
            var value = e.target.value.trim();
            if (e.keyCode === 13 && value) {
                saveTodoEdit(e, index);
            }
        }
    };
};

var removeTodo = function removeTodo(index) {
    return {
        click: function click() {
            interfaces('REMOVE_TODO', { index: index });
        }
    };
};

var controller$4 = function controller$4(completed, value, ignore, editing, index) {
    props$4.value = value;
    props$4.toggleComplete = toggleComplete(index);
    props$4.removeTodo = removeTodo(index);
    props$4.completed = completed;
    props$4.editing = editing;
    props$4.editTodo = editTodo(index);
    props$4.saveTodo = saveTodo(index, value);
    return todoItem$1(props$4);
};

var todoItems = o$1('todos');
var itemsLeft$1 = o$1('itemsLeft');
var view$1 = 'all'; //o('view');

var completed = '';
var allDone = true;
var ref = 0;

var props$3 = {};

var toggleCompleted = function toggleCompleted(currentToggle) {
    return completed = currentToggle ? '' : '.completed';
};

var toggleAll = function toggleAll() {
    if (allDone) {
        allDone = false;
        return '.completed';
    } else {
        allDone = true;
        return '';
    }
};

var toggleAllAsCompleted = function toggleAllAsCompleted() {
    return {
        click: function click(e) {
            interfaces('TOGGLE_ALL_AS_COMPLETED');
        }
    };
};

var controller$3 = function controller$3(cmd, data) {
    var todoItemsLength = todoItems.length;

    (function () {
        switch (cmd) {
            case 'ADD_TODO':
                ref++;
                todoItems.push(['', data.value, ref, '']);
                break;
            case 'TOGGLE_COMPLETED_TODO':
                todoItems[data.index][0] = toggleCompleted(todoItems[data.index][0]);
                break;
            case 'REMOVE_TODO':
                todoItems.splice(data.index, 1);
                break;
            case 'TOGGLE_ALL_AS_COMPLETED':
                var completedStatus = toggleAll();
                todoItems.forEach(function (item, i) {
                    todoItems[i][0] = completedStatus;
                });
                break;
            case 'EDIT_TODO':
                todoItems[data.index][3] = '.editing';
                break;
            case 'SAVE_TODO_EDIT':
                todoItems[data.index][3] = '';
                todoItems[data.index][1] = data.editiedValue;
                break;
            case 'TOGGLE_VIEW':
                view$1 = data.viewName || 'all';
                break;
        }

        // if (data.hasOwnProperty('viewName')) {

        //     view = data.viewName;
        // }

    })();

    var todoList = todoItems.filter(function (todoData, i) {
        if (view$1 === 'all') {
            return todoData;
        } else if (view$1 === 'active') {
            if (!todoData[0]) {
                return todoData;
            }
        } else if (view$1 === 'completed') {
            if (todoData[0]) {
                return todoData;
            }
        }
    }).map(function (todoData, i) {
        return controller$4.apply(undefined, toConsumableArray(todoData).concat([i]));
    });
    console.log('todoList', todoList);

    itemsLeft$1[0] = todoItems.filter(function (item) {
        return item[0] === '';
    }).length;

    props$3.todoList = todoList;
    props$3.toggleAllAsCompleted = toggleAllAsCompleted();
    return mainSection$1(props$3);
};

// const todoApp = document.getElementById();

var interfaces = function interfaces(cmd, data) {
    var vNode = div(section({ class: 'todoapp' }, controller$2(), controller$3(cmd, data), controller()), controller$1(cmd, data));
    render('#root', vNode);
};

var act = function act(cmd, data) {
    interfaces(cmd, data);
};

// *
//  * This is the main controller.
//  * A call without parameters is expected to 
//  * initialse the app.

act();

})));
