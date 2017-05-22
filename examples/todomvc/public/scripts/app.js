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

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
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

console.log('vnode', vnode);

function isPrimitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}

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
        var attributes = {};
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
                console.log('attributes', item);
                if (item.hasOwnProperty('id')) {
                    selectorName += '#' + item.id;
                }
                if (item.hasOwnProperty('class') || item.hasOwnProperty('_')) {
                    selectorName += '.' + item.class;
                }

                for (var property in item) {
                    if (property !== 'class' && property !== 'id' && property !== '_') {
                        if (property === 'event') {
                            attributes.on = item.event;
                        } else {
                            attributes[property] = item[property];
                        }
                    }
                }
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
            addNS(attributes, childNodes, selectorName);
        }

        return vnode(selectorName, attributes, childNodes, text, undefined);
    };
};

var a = assembly('a');
var button = assembly('button');
var div = assembly('DIV');
var footer = assembly('footer');
var h1 = assembly('h1');
var header = assembly('header');
var input = assembly('input');
var li = assembly('li');
var section = assembly('section');
var span = assembly('span');
var strong = assembly('strong');
var ul = assembly('ul');

var vnode$1 = function (sel, data, children, text, elm) {
  var key = data === undefined ? undefined : data.key;
  return { sel: sel, data: data, children: children,
    text: text, elm: elm, key: key };
};

var is$1 = {
  array: Array.isArray,
  primitive: function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
  }
};

var VNode = vnode$1;
var is = is$1;

function addNS$1(data, children, sel) {
  data.ns = 'http://www.w3.org/2000/svg';

  if (sel !== 'foreignObject' && children !== undefined) {
    for (var i = 0; i < children.length; ++i) {
      addNS$1(children[i].data, children[i].children, children[i].sel);
    }
  }
}

var h = function h(sel, b, c) {
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
    }
  } else if (b !== undefined) {
    if (is.array(b)) {
      children = b;
    } else if (is.primitive(b)) {
      text = b;
    } else {
      data = b;
    }
  }
  if (is.array(children)) {
    for (i = 0; i < children.length; ++i) {
      if (is.primitive(children[i])) children[i] = VNode(undefined, undefined, undefined, children[i]);
    }
  }
  if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g') {
    addNS$1(data, children, sel);
  }
  return VNode(sel, data, children, text, undefined);
};

/** 
 * Footer.
 * @param ...
 */
var footer$2 = (function (_ref) {
    var itemsLeft = _ref.itemsLeft,
        all = _ref.all,
        active = _ref.active,
        completed = _ref.completed;
    return footer({ class: 'footer' }, span({ class: 'todo-count' }, strong(itemsLeft), ' items left'), ul({ class: 'filters' }, li(a({ class: 'selected', props: { href: '#/' }, on: all }, 'All')), li(a({ props: { href: '#/active' }, on: active }, 'Active')), li(a({ props: { href: '#/completed' }, on: completed }, 'Completed'))), button({ class: 'clear-completed' }, 'Clear completed'));
});

function createElement(tagName) {
  return document.createElement(tagName);
}

function createElementNS(namespaceURI, qualifiedName) {
  return document.createElementNS(namespaceURI, qualifiedName);
}

function createTextNode(text) {
  return document.createTextNode(text);
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
  return node.parentElement;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

var htmldomapi = {
  createElement: createElement,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  appendChild: appendChild,
  removeChild: removeChild,
  insertBefore: insertBefore,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent
};

var VNode$1 = vnode$1;
var is$3 = is$1;
var domApi = htmldomapi;

function isUndef(s) {
  return s === undefined;
}
function isDef(s) {
  return s !== undefined;
}

var emptyNode = VNode$1('', {}, [], undefined, undefined);

function sameVnode(vnode1, vnode2) {
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i,
      map = {},
      key;
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }
  return map;
}

var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];

function init(modules, api) {
  var i,
      j,
      cbs = {};

  if (isUndef(api)) api = domApi;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]]);
    }
  }

  function emptyNodeAt(elm) {
    var id = elm.id ? '#' + elm.id : '';
    var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
    return VNode$1(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    return function () {
      if (--listeners === 0) {
        var parent = api.parentNode(childElm);
        api.removeChild(parent, childElm);
      }
    };
  }

  function createElm(vnode, insertedVnodeQueue) {
    var i,
        data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode);
        data = vnode.data;
      }
    }
    var elm,
        children = vnode.children,
        sel = vnode.sel;
    if (isDef(sel)) {
      // Parse selector
      var hashIdx = sel.indexOf('#');
      var dotIdx = sel.indexOf('.', hashIdx);
      var hash = hashIdx > 0 ? hashIdx : sel.length;
      var dot = dotIdx > 0 ? dotIdx : sel.length;
      var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
      elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag) : api.createElement(tag);
      if (hash < dot) elm.id = sel.slice(hash + 1, dot);
      if (dotIdx > 0) elm.className = sel.slice(dot + 1).replace(/\./g, ' ');
      if (is$3.array(children)) {
        for (i = 0; i < children.length; ++i) {
          api.appendChild(elm, createElm(children[i], insertedVnodeQueue));
        }
      } else if (is$3.primitive(vnode.text)) {
        api.appendChild(elm, api.createTextNode(vnode.text));
      }
      for (i = 0; i < cbs.create.length; ++i) {
        cbs.create[i](emptyNode, vnode);
      }i = vnode.data.hook; // Reuse variable
      if (isDef(i)) {
        if (i.create) i.create(emptyNode, vnode);
        if (i.insert) insertedVnodeQueue.push(vnode);
      }
    } else {
      elm = vnode.elm = api.createTextNode(vnode.text);
    }
    return vnode.elm;
  }

  function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      api.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
    }
  }

  function invokeDestroyHook(vnode) {
    var i,
        j,
        data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);
      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }if (isDef(i = vnode.children)) {
        for (j = 0; j < vnode.children.length; ++j) {
          invokeDestroyHook(vnode.children[j]);
        }
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var i,
          listeners,
          rm,
          ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.sel)) {
          invokeDestroyHook(ch);
          listeners = cbs.remove.length + 1;
          rm = createRmCb(ch.elm, listeners);
          for (i = 0; i < cbs.remove.length; ++i) {
            cbs.remove[i](ch, rm);
          }if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
            i(ch, rm);
          } else {
            rm();
          }
        } else {
          // Text node
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
    var oldKeyToIdx, idxInOld, elmToMove, before;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        idxInOld = oldKeyToIdx[newStartVnode.key];
        if (isUndef(idxInOld)) {
          // New element
          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
          oldCh[idxInOld] = undefined;
          api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      before = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
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
    var elm = vnode.elm = oldVnode.elm,
        oldCh = oldVnode.children,
        ch = vnode.children;
    if (oldVnode === vnode) return;
    if (!sameVnode(oldVnode, vnode)) {
      var parentElm = api.parentNode(oldVnode.elm);
      elm = createElm(vnode, insertedVnodeQueue);
      api.insertBefore(parentElm, elm, oldVnode.elm);
      removeVnodes(parentElm, [oldVnode], 0, 0);
      return;
    }
    if (isDef(vnode.data)) {
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

  return function (oldVnode, vnode) {
    var i, elm, parent;
    var insertedVnodeQueue = [];
    for (i = 0; i < cbs.pre.length; ++i) {
      cbs.pre[i]();
    }if (isUndef(oldVnode.sel)) {
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

var snabbdom = { init: init };

function updateClass(oldVnode, vnode) {
  var cur,
      name,
      elm = vnode.elm,
      oldClass = oldVnode.data.class,
      klass = vnode.data.class;

  if (!oldClass && !klass) return;
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

var _class = { create: updateClass, update: updateClass };

function updateProps(oldVnode, vnode) {
  var key,
      cur,
      old,
      elm = vnode.elm,
      oldProps = oldVnode.data.props,
      props = vnode.data.props;

  if (!oldProps && !props) return;
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

var props$1 = { create: updateProps, update: updateProps };

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
  oldStyle = oldStyle || {};
  style = style || {};
  var oldHasDel = 'delayed' in oldStyle;

  for (name in oldStyle) {
    if (!style[name]) {
      elm.style[name] = '';
    }
  }
  for (name in style) {
    cur = style[name];
    if (name === 'delayed') {
      for (name in style.delayed) {
        cur = style.delayed[name];
        if (!oldHasDel || cur !== oldStyle.delayed[name]) {
          setNextFrame(elm.style, name, cur);
        }
      }
    } else if (name !== 'remove' && cur !== oldStyle[name]) {
      elm.style[name] = cur;
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
      idx,
      i = 0,
      maxDur = 0,
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

var style$1 = { create: updateStyle, update: updateStyle, destroy: applyDestroyStyle, remove: applyRemoveStyle };

function invokeHandler(handler, vnode, event) {
  if (typeof handler === "function") {
    // call function handler
    handler.call(vnode, event, vnode);
  } else if ((typeof handler === "undefined" ? "undefined" : _typeof(handler)) === "object") {
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

var eventlisteners = {
  create: updateEventListeners,
  update: updateEventListeners,
  destroy: updateEventListeners
};

// Render 

var patch = snabbdom.init([_class, props$1, style$1, eventlisteners]);

var render = function render(container, vNode, oldVnode) {
    if (!oldVnode) {
        patch(container, vNode);
    }
    if (oldVnode && oldVnode !== vNode) {
        patch(oldVnode, vNode);
    }
};

// Data Skeleton

function o$1(address, write) {
    var addressArr = address.split(' ');
    var addressLength = addressArr.length;
    var path = o$1.prototype.skeleton;

    for (var i = 0; i < addressLength; i++) {
        path = path[addressArr[i]];

        if (write) {
            if (i === addressLength - 2) {
                path[addressArr[i + 1]] = write;
            }
        }
    }

    return path;
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

var props = {};
var itemsLeft = o$1('itemsLeft');

var toggleView = function toggleView(viewName) {
    return {
        click: function click() {
            interfaces('TOGGLE_VIEW', { viewName: viewName });
        }
    };
};

var controller = function controller() {
    props.itemsLeft = itemsLeft[0];
    props.all = toggleView('all');
    props.active = toggleView('active');
    props.completed = toggleView('completed');
    return footer$2(props);
};

var info$1 = function info$1() {
    return h('footer.info', [h('p', ['Double-click to edit a todo']), h('p', ['Created by ', h('a', { param: { href: 'https://github.com/julienetie' } }, ['Julien Etienne'])]), h('p', ['Part of', h('a', { param: { href: 'http://todomvc.com' } })])]);
};

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
    return header({ class: 'header' }, [h1({}, ['todos']), input({
        class: 'new-todo',
        props: { placeholder: 'What needs to be done?', autofocus: 'autofocus' },
        on: returnKey
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

var props$3 = {
    returnKey: returnKey
};

var controller$2 = function controller$2(cmd, data) {
    return header$2(props$3);
};

var todoItem = function todoItem(_ref) {
    var value = _ref.value,
        toggleComplete = _ref.toggleComplete,
        editing = _ref.editing,
        completed = _ref.completed,
        removeTodo = _ref.removeTodo,
        editTodo = _ref.editTodo,
        saveTodo = _ref.saveTodo;

    return h('li' + completed + editing, { on: editTodo }, [h('div.view', [h('input.toggle', { props: { type: 'checkbox', checked: !!completed }, on: toggleComplete }), h('label', value), h('button.destroy', { on: removeTodo })]), h('input.edit', { props: { value: value }, on: saveTodo })]);
};

var mainSection$1 = function mainSection$1(_ref) {
    var todoList = _ref.todoList,
        toggleAllAsCompleted = _ref.toggleAllAsCompleted;

    return h('section.main', [h('input.toggle-all', { props: { type: 'checkbox' }, on: toggleAllAsCompleted }), h('label', { props: { htmlFor: 'toggle-all' } }, 'Mark all as complete'), h('ul.todo-list', todoList)]);
};

var props$5 = {};

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
    props$5.value = value;
    props$5.toggleComplete = toggleComplete(index);
    props$5.removeTodo = removeTodo(index);
    props$5.completed = completed;
    props$5.editing = editing;
    props$5.editTodo = editTodo(index);
    props$5.saveTodo = saveTodo(index, value);
    return todoItem(props$5);
};

var todoItems = o$1('todos');
var itemsLeft$1 = o$1('itemsLeft');
var view = 'all'; //o('view');

var completed = '';
var allDone = true;
var ref = 0;

var props$4 = {};

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
                view = data.viewName || 'all';
                break;
        }

        // if (data.hasOwnProperty('viewName')) {

        //     view = data.viewName;
        // }

    })();

    var todoList = todoItems.filter(function (todoData, i) {
        if (view === 'all') {
            return todoData;
        } else if (view === 'active') {
            if (!todoData[0]) {
                return todoData;
            }
        } else if (view === 'completed') {
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

    props$4.todoList = todoList;
    props$4.toggleAllAsCompleted = toggleAllAsCompleted();
    return mainSection$1(props$4);
};

// import document from './document/controller';
var oldVnode = void 0;

var todoApp = document.getElementById('root');
console.log(document);

var interfaces = function interfaces(cmd, data) {

    /**
     * 
     */
    // document();

    var newVNode = div({}, [section({ class: 'todoapp' }, [controller$2(), controller$3(cmd, data), controller()]), controller$1(cmd, data)]);

    // const newVNode = h('div', [

    //     h('section.todoapp', [
    //         header(),
    //         mainSection(cmd, data),
    //         footer()
    //     ]),
    //     info(cmd, data)
    // ]);

    render(todoApp, newVNode, oldVnode);

    oldVnode = newVNode;
};

var act = function act(cmd, data) {
    interfaces(cmd, data);
};

/**
 * This is the main controller.
 * A call without parameters is expected to 
 * initialse the app.
 */
act();

})));
