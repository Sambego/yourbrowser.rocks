/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 45);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

!function(global, factory) {
     true ? factory(exports) : 'function' == typeof define && define.amd ? define([ 'exports' ], factory) : factory(global.preact = global.preact || {});
}(this, function(exports) {
    function VNode(nodeName, attributes, children) {
        this.nodeName = nodeName;
        this.attributes = attributes;
        this.children = children;
        this.key = attributes && attributes.key;
    }
    function h(nodeName, attributes) {
        var children, lastSimple, child, simple, i;
        for (i = arguments.length; i-- > 2; ) stack.push(arguments[i]);
        if (attributes && attributes.children) {
            if (!stack.length) stack.push(attributes.children);
            delete attributes.children;
        }
        while (stack.length) if ((child = stack.pop()) instanceof Array) for (i = child.length; i--; ) stack.push(child[i]); else if (null != child && child !== !0 && child !== !1) {
            if ('number' == typeof child) child = String(child);
            simple = 'string' == typeof child;
            if (simple && lastSimple) children[children.length - 1] += child; else {
                (children || (children = [])).push(child);
                lastSimple = simple;
            }
        }
        var p = new VNode(nodeName, attributes || void 0, children || EMPTY_CHILDREN);
        if (options.vnode) options.vnode(p);
        return p;
    }
    function extend(obj, props) {
        if (props) for (var i in props) obj[i] = props[i];
        return obj;
    }
    function clone(obj) {
        return extend({}, obj);
    }
    function delve(obj, key) {
        for (var p = key.split('.'), i = 0; i < p.length && obj; i++) obj = obj[p[i]];
        return obj;
    }
    function isFunction(obj) {
        return 'function' == typeof obj;
    }
    function isString(obj) {
        return 'string' == typeof obj;
    }
    function hashToClassName(c) {
        var str = '';
        for (var prop in c) if (c[prop]) {
            if (str) str += ' ';
            str += prop;
        }
        return str;
    }
    function cloneElement(vnode, props) {
        return h(vnode.nodeName, extend(clone(vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
    }
    function createLinkedState(component, key, eventPath) {
        var path = key.split('.');
        return function(e) {
            var t = e && e.target || this, state = {}, obj = state, v = isString(eventPath) ? delve(e, eventPath) : t.nodeName ? t.type.match(/^che|rad/) ? t.checked : t.value : e, i = 0;
            for (;i < path.length - 1; i++) obj = obj[path[i]] || (obj[path[i]] = !i && component.state[path[i]] || {});
            obj[path[i]] = v;
            component.setState(state);
        };
    }
    function enqueueRender(component) {
        if (!component._dirty && (component._dirty = !0) && 1 == items.push(component)) (options.debounceRendering || defer)(rerender);
    }
    function rerender() {
        var p, list = items;
        items = [];
        while (p = list.pop()) if (p._dirty) renderComponent(p);
    }
    function isFunctionalComponent(vnode) {
        var nodeName = vnode && vnode.nodeName;
        return nodeName && isFunction(nodeName) && !(nodeName.prototype && nodeName.prototype.render);
    }
    function buildFunctionalComponent(vnode, context) {
        return vnode.nodeName(getNodeProps(vnode), context || EMPTY);
    }
    function isSameNodeType(node, vnode) {
        if (isString(vnode)) return node instanceof Text;
        if (isString(vnode.nodeName)) return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
        if (isFunction(vnode.nodeName)) return (node._componentConstructor ? node._componentConstructor === vnode.nodeName : !0) || isFunctionalComponent(vnode); else ;
    }
    function isNamedNode(node, nodeName) {
        return node.normalizedNodeName === nodeName || toLowerCase(node.nodeName) === toLowerCase(nodeName);
    }
    function getNodeProps(vnode) {
        var props = clone(vnode.attributes);
        props.children = vnode.children;
        var defaultProps = vnode.nodeName.defaultProps;
        if (defaultProps) for (var i in defaultProps) if (void 0 === props[i]) props[i] = defaultProps[i];
        return props;
    }
    function removeNode(node) {
        var p = node.parentNode;
        if (p) p.removeChild(node);
    }
    function setAccessor(node, name, old, value, isSvg) {
        if ('className' === name) name = 'class';
        if ('class' === name && value && 'object' == typeof value) value = hashToClassName(value);
        if ('key' === name) ; else if ('class' === name && !isSvg) node.className = value || ''; else if ('style' === name) {
            if (!value || isString(value) || isString(old)) node.style.cssText = value || '';
            if (value && 'object' == typeof value) {
                if (!isString(old)) for (var i in old) if (!(i in value)) node.style[i] = '';
                for (var i in value) node.style[i] = 'number' == typeof value[i] && !NON_DIMENSION_PROPS[i] ? value[i] + 'px' : value[i];
            }
        } else if ('dangerouslySetInnerHTML' === name) {
            if (value) node.innerHTML = value.__html || '';
        } else if ('o' == name[0] && 'n' == name[1]) {
            var l = node._listeners || (node._listeners = {});
            name = toLowerCase(name.substring(2));
            if (value) {
                if (!l[name]) node.addEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
            } else if (l[name]) node.removeEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
            l[name] = value;
        } else if ('list' !== name && 'type' !== name && !isSvg && name in node) {
            setProperty(node, name, null == value ? '' : value);
            if (null == value || value === !1) node.removeAttribute(name);
        } else {
            var ns = isSvg && name.match(/^xlink\:?(.+)/);
            if (null == value || value === !1) if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1])); else node.removeAttribute(name); else if ('object' != typeof value && !isFunction(value)) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1]), value); else node.setAttribute(name, value);
        }
    }
    function setProperty(node, name, value) {
        try {
            node[name] = value;
        } catch (e) {}
    }
    function eventProxy(e) {
        return this._listeners[e.type](options.event && options.event(e) || e);
    }
    function collectNode(node) {
        removeNode(node);
        if (node instanceof Element) {
            node._component = node._componentConstructor = null;
            var _name = node.normalizedNodeName || toLowerCase(node.nodeName);
            (nodes[_name] || (nodes[_name] = [])).push(node);
        }
    }
    function createNode(nodeName, isSvg) {
        var name = toLowerCase(nodeName), node = nodes[name] && nodes[name].pop() || (isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName));
        node.normalizedNodeName = name;
        return node;
    }
    function flushMounts() {
        var c;
        while (c = mounts.pop()) {
            if (options.afterMount) options.afterMount(c);
            if (c.componentDidMount) c.componentDidMount();
        }
    }
    function diff(dom, vnode, context, mountAll, parent, componentRoot) {
        if (!diffLevel++) {
            isSvgMode = parent && 'undefined' != typeof parent.ownerSVGElement;
            hydrating = dom && !(ATTR_KEY in dom);
        }
        var ret = idiff(dom, vnode, context, mountAll);
        if (parent && ret.parentNode !== parent) parent.appendChild(ret);
        if (!--diffLevel) {
            hydrating = !1;
            if (!componentRoot) flushMounts();
        }
        return ret;
    }
    function idiff(dom, vnode, context, mountAll) {
        var ref = vnode && vnode.attributes && vnode.attributes.ref;
        while (isFunctionalComponent(vnode)) vnode = buildFunctionalComponent(vnode, context);
        if (null == vnode) vnode = '';
        if (isString(vnode)) {
            if (dom && dom instanceof Text && dom.parentNode) {
                if (dom.nodeValue != vnode) dom.nodeValue = vnode;
            } else {
                if (dom) recollectNodeTree(dom);
                dom = document.createTextNode(vnode);
            }
            return dom;
        }
        if (isFunction(vnode.nodeName)) return buildComponentFromVNode(dom, vnode, context, mountAll);
        var out = dom, nodeName = String(vnode.nodeName), prevSvgMode = isSvgMode, vchildren = vnode.children;
        isSvgMode = 'svg' === nodeName ? !0 : 'foreignObject' === nodeName ? !1 : isSvgMode;
        if (!dom) out = createNode(nodeName, isSvgMode); else if (!isNamedNode(dom, nodeName)) {
            out = createNode(nodeName, isSvgMode);
            while (dom.firstChild) out.appendChild(dom.firstChild);
            if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
            recollectNodeTree(dom);
        }
        var fc = out.firstChild, props = out[ATTR_KEY];
        if (!props) {
            out[ATTR_KEY] = props = {};
            for (var a = out.attributes, i = a.length; i--; ) props[a[i].name] = a[i].value;
        }
        if (!hydrating && vchildren && 1 === vchildren.length && 'string' == typeof vchildren[0] && fc && fc instanceof Text && !fc.nextSibling) {
            if (fc.nodeValue != vchildren[0]) fc.nodeValue = vchildren[0];
        } else if (vchildren && vchildren.length || fc) innerDiffNode(out, vchildren, context, mountAll, !!props.dangerouslySetInnerHTML);
        diffAttributes(out, vnode.attributes, props);
        if (ref) (props.ref = ref)(out);
        isSvgMode = prevSvgMode;
        return out;
    }
    function innerDiffNode(dom, vchildren, context, mountAll, absorb) {
        var j, c, vchild, child, originalChildren = dom.childNodes, children = [], keyed = {}, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0, vlen = vchildren && vchildren.length;
        if (len) for (var i = 0; i < len; i++) {
            var _child = originalChildren[i], props = _child[ATTR_KEY], key = vlen ? (c = _child._component) ? c.__key : props ? props.key : null : null;
            if (null != key) {
                keyedLen++;
                keyed[key] = _child;
            } else if (hydrating || absorb || props || _child instanceof Text) children[childrenLen++] = _child;
        }
        if (vlen) for (var i = 0; i < vlen; i++) {
            vchild = vchildren[i];
            child = null;
            var key = vchild.key;
            if (null != key) {
                if (keyedLen && key in keyed) {
                    child = keyed[key];
                    keyed[key] = void 0;
                    keyedLen--;
                }
            } else if (!child && min < childrenLen) for (j = min; j < childrenLen; j++) {
                c = children[j];
                if (c && isSameNodeType(c, vchild)) {
                    child = c;
                    children[j] = void 0;
                    if (j === childrenLen - 1) childrenLen--;
                    if (j === min) min++;
                    break;
                }
            }
            child = idiff(child, vchild, context, mountAll);
            if (child && child !== dom) if (i >= len) dom.appendChild(child); else if (child !== originalChildren[i]) {
                if (child === originalChildren[i + 1]) removeNode(originalChildren[i]);
                dom.insertBefore(child, originalChildren[i] || null);
            }
        }
        if (keyedLen) for (var i in keyed) if (keyed[i]) recollectNodeTree(keyed[i]);
        while (min <= childrenLen) {
            child = children[childrenLen--];
            if (child) recollectNodeTree(child);
        }
    }
    function recollectNodeTree(node, unmountOnly) {
        var component = node._component;
        if (component) unmountComponent(component, !unmountOnly); else {
            if (node[ATTR_KEY] && node[ATTR_KEY].ref) node[ATTR_KEY].ref(null);
            if (!unmountOnly) collectNode(node);
            var c;
            while (c = node.lastChild) recollectNodeTree(c, unmountOnly);
        }
    }
    function diffAttributes(dom, attrs, old) {
        var name;
        for (name in old) if (!(attrs && name in attrs) && null != old[name]) setAccessor(dom, name, old[name], old[name] = void 0, isSvgMode);
        if (attrs) for (name in attrs) if (!('children' === name || 'innerHTML' === name || name in old && attrs[name] === ('value' === name || 'checked' === name ? dom[name] : old[name]))) setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
    }
    function collectComponent(component) {
        var name = component.constructor.name, list = components[name];
        if (list) list.push(component); else components[name] = [ component ];
    }
    function createComponent(Ctor, props, context) {
        var inst = new Ctor(props, context), list = components[Ctor.name];
        Component.call(inst, props, context);
        if (list) for (var i = list.length; i--; ) if (list[i].constructor === Ctor) {
            inst.nextBase = list[i].nextBase;
            list.splice(i, 1);
            break;
        }
        return inst;
    }
    function setComponentProps(component, props, opts, context, mountAll) {
        if (!component._disable) {
            component._disable = !0;
            if (component.__ref = props.ref) delete props.ref;
            if (component.__key = props.key) delete props.key;
            if (!component.base || mountAll) {
                if (component.componentWillMount) component.componentWillMount();
            } else if (component.componentWillReceiveProps) component.componentWillReceiveProps(props, context);
            if (context && context !== component.context) {
                if (!component.prevContext) component.prevContext = component.context;
                component.context = context;
            }
            if (!component.prevProps) component.prevProps = component.props;
            component.props = props;
            component._disable = !1;
            if (0 !== opts) if (1 === opts || options.syncComponentUpdates !== !1 || !component.base) renderComponent(component, 1, mountAll); else enqueueRender(component);
            if (component.__ref) component.__ref(component);
        }
    }
    function renderComponent(component, opts, mountAll, isChild) {
        if (!component._disable) {
            var skip, rendered, inst, cbase, props = component.props, state = component.state, context = component.context, previousProps = component.prevProps || props, previousState = component.prevState || state, previousContext = component.prevContext || context, isUpdate = component.base, nextBase = component.nextBase, initialBase = isUpdate || nextBase, initialChildComponent = component._component;
            if (isUpdate) {
                component.props = previousProps;
                component.state = previousState;
                component.context = previousContext;
                if (2 !== opts && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === !1) skip = !0; else if (component.componentWillUpdate) component.componentWillUpdate(props, state, context);
                component.props = props;
                component.state = state;
                component.context = context;
            }
            component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
            component._dirty = !1;
            if (!skip) {
                if (component.render) rendered = component.render(props, state, context);
                if (component.getChildContext) context = extend(clone(context), component.getChildContext());
                while (isFunctionalComponent(rendered)) rendered = buildFunctionalComponent(rendered, context);
                var toUnmount, base, childComponent = rendered && rendered.nodeName;
                if (isFunction(childComponent)) {
                    var childProps = getNodeProps(rendered);
                    inst = initialChildComponent;
                    if (inst && inst.constructor === childComponent && childProps.key == inst.__key) setComponentProps(inst, childProps, 1, context); else {
                        toUnmount = inst;
                        inst = createComponent(childComponent, childProps, context);
                        inst.nextBase = inst.nextBase || nextBase;
                        inst._parentComponent = component;
                        component._component = inst;
                        setComponentProps(inst, childProps, 0, context);
                        renderComponent(inst, 1, mountAll, !0);
                    }
                    base = inst.base;
                } else {
                    cbase = initialBase;
                    toUnmount = initialChildComponent;
                    if (toUnmount) cbase = component._component = null;
                    if (initialBase || 1 === opts) {
                        if (cbase) cbase._component = null;
                        base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, !0);
                    }
                }
                if (initialBase && base !== initialBase && inst !== initialChildComponent) {
                    var baseParent = initialBase.parentNode;
                    if (baseParent && base !== baseParent) {
                        baseParent.replaceChild(base, initialBase);
                        if (!toUnmount) {
                            initialBase._component = null;
                            recollectNodeTree(initialBase);
                        }
                    }
                }
                if (toUnmount) unmountComponent(toUnmount, base !== initialBase);
                component.base = base;
                if (base && !isChild) {
                    var componentRef = component, t = component;
                    while (t = t._parentComponent) (componentRef = t).base = base;
                    base._component = componentRef;
                    base._componentConstructor = componentRef.constructor;
                }
            }
            if (!isUpdate || mountAll) mounts.unshift(component); else if (!skip) {
                if (component.componentDidUpdate) component.componentDidUpdate(previousProps, previousState, previousContext);
                if (options.afterUpdate) options.afterUpdate(component);
            }
            var fn, cb = component._renderCallbacks;
            if (cb) while (fn = cb.pop()) fn.call(component);
            if (!diffLevel && !isChild) flushMounts();
        }
    }
    function buildComponentFromVNode(dom, vnode, context, mountAll) {
        var c = dom && dom._component, originalComponent = c, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner, props = getNodeProps(vnode);
        while (c && !isOwner && (c = c._parentComponent)) isOwner = c.constructor === vnode.nodeName;
        if (c && isOwner && (!mountAll || c._component)) {
            setComponentProps(c, props, 3, context, mountAll);
            dom = c.base;
        } else {
            if (originalComponent && !isDirectOwner) {
                unmountComponent(originalComponent, !0);
                dom = oldDom = null;
            }
            c = createComponent(vnode.nodeName, props, context);
            if (dom && !c.nextBase) {
                c.nextBase = dom;
                oldDom = null;
            }
            setComponentProps(c, props, 1, context, mountAll);
            dom = c.base;
            if (oldDom && dom !== oldDom) {
                oldDom._component = null;
                recollectNodeTree(oldDom);
            }
        }
        return dom;
    }
    function unmountComponent(component, remove) {
        if (options.beforeUnmount) options.beforeUnmount(component);
        var base = component.base;
        component._disable = !0;
        if (component.componentWillUnmount) component.componentWillUnmount();
        component.base = null;
        var inner = component._component;
        if (inner) unmountComponent(inner, remove); else if (base) {
            if (base[ATTR_KEY] && base[ATTR_KEY].ref) base[ATTR_KEY].ref(null);
            component.nextBase = base;
            if (remove) {
                removeNode(base);
                collectComponent(component);
            }
            var c;
            while (c = base.lastChild) recollectNodeTree(c, !remove);
        }
        if (component.__ref) component.__ref(null);
        if (component.componentDidUnmount) component.componentDidUnmount();
    }
    function Component(props, context) {
        this._dirty = !0;
        this.context = context;
        this.props = props;
        if (!this.state) this.state = {};
    }
    function render(vnode, parent, merge) {
        return diff(merge, vnode, {}, !1, parent);
    }
    var options = {};
    var stack = [];
    var EMPTY_CHILDREN = [];
    var lcCache = {};
    var toLowerCase = function(s) {
        return lcCache[s] || (lcCache[s] = s.toLowerCase());
    };
    var resolved = 'undefined' != typeof Promise && Promise.resolve();
    var defer = resolved ? function(f) {
        resolved.then(f);
    } : setTimeout;
    var EMPTY = {};
    var ATTR_KEY = 'undefined' != typeof Symbol ? Symbol.for('preactattr') : '__preactattr_';
    var NON_DIMENSION_PROPS = {
        boxFlex: 1,
        boxFlexGroup: 1,
        columnCount: 1,
        fillOpacity: 1,
        flex: 1,
        flexGrow: 1,
        flexPositive: 1,
        flexShrink: 1,
        flexNegative: 1,
        fontWeight: 1,
        lineClamp: 1,
        lineHeight: 1,
        opacity: 1,
        order: 1,
        orphans: 1,
        strokeOpacity: 1,
        widows: 1,
        zIndex: 1,
        zoom: 1
    };
    var NON_BUBBLING_EVENTS = {
        blur: 1,
        error: 1,
        focus: 1,
        load: 1,
        resize: 1,
        scroll: 1
    };
    var items = [];
    var nodes = {};
    var mounts = [];
    var diffLevel = 0;
    var isSvgMode = !1;
    var hydrating = !1;
    var components = {};
    extend(Component.prototype, {
        linkState: function(key, eventPath) {
            var c = this._linkedStates || (this._linkedStates = {});
            return c[key + eventPath] || (c[key + eventPath] = createLinkedState(this, key, eventPath));
        },
        setState: function(state, callback) {
            var s = this.state;
            if (!this.prevState) this.prevState = clone(s);
            extend(s, isFunction(state) ? state(s, this.props) : state);
            if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
            enqueueRender(this);
        },
        forceUpdate: function() {
            renderComponent(this, 2);
        },
        render: function() {}
    });
    exports.h = h;
    exports.cloneElement = cloneElement;
    exports.Component = Component;
    exports.render = render;
    exports.rerender = rerender;
    exports.options = options;
});
//# sourceMappingURL=preact.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = exports.Icon = exports.SlideNav = exports.Slide = exports.Header = exports.Container = undefined;

var _Container2 = __webpack_require__(11);

var _Container3 = _interopRequireDefault(_Container2);

var _Header2 = __webpack_require__(12);

var _Header3 = _interopRequireDefault(_Header2);

var _Slide2 = __webpack_require__(14);

var _Slide3 = _interopRequireDefault(_Slide2);

var _SlideNav2 = __webpack_require__(15);

var _SlideNav3 = _interopRequireDefault(_SlideNav2);

var _Icon2 = __webpack_require__(13);

var _Icon3 = _interopRequireDefault(_Icon2);

var _Button2 = __webpack_require__(10);

var _Button3 = _interopRequireDefault(_Button2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Container = _Container3.default;
exports.Header = _Header3.default;
exports.Slide = _Slide3.default;
exports.SlideNav = _SlideNav3.default;
exports.Icon = _Icon3.default;
exports.Button = _Button3.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.PropTypes = mod.exports;
  }
})(this, function (exports, module) {

  'use strict';

  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

  var ReactElement = {};

  ReactElement.isValidElement = function (object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  };

  var ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };

  var emptyFunction = {
    thatReturns: function thatReturns(what) {
      return function () {
        return what;
      };
    }
  };

  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  var ANONYMOUS = '<<anonymous>>';

  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName, location, propFullName) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;
      if (props[propName] == null) {
        var locationName = ReactPropTypeLocationNames[location];
        if (isRequired) {
          return new Error('Required ' + locationName + ' `' + propFullName + '` was not specified in ' + ('`' + componentName + '`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        var locationName = ReactPropTypeLocationNames[location];

        var preciseType = getPreciseType(propValue);

        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturns(null));
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var locationName = ReactPropTypeLocationNames[location];
        var propType = getPropType(propValue);
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']');
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!ReactElement.isValidElement(props[propName])) {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var locationName = ReactPropTypeLocationNames[location];
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      return createChainableTypeChecker(function () {
        return new Error('Invalid argument supplied to oneOf, expected an instance of array.');
      });
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (propValue === expectedValues[i]) {
          return null;
        }
      }

      var locationName = ReactPropTypeLocationNames[location];
      var valuesString = JSON.stringify(expectedValues);
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      return createChainableTypeChecker(function () {
        return new Error('Invalid argument supplied to oneOfType, expected an instance of array.');
      });
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName) == null) {
          return null;
        }
      }

      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || ReactElement.isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    if (propType === 'symbol') {
      return true;
    }

    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  module.exports = ReactPropTypes;
});

//# sourceMappingURL=index.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(26);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/lib/loader.js!./styles.scss", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/lib/loader.js!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocationPage = exports.BatteryPage = exports.HomePage = undefined;

var _Home = __webpack_require__(17);

var _Home2 = _interopRequireDefault(_Home);

var _Battery = __webpack_require__(16);

var _Battery2 = _interopRequireDefault(_Battery);

var _Location = __webpack_require__(18);

var _Location2 = _interopRequireDefault(_Location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.HomePage = _Home2.default;
exports.BatteryPage = _Battery2.default;
exports.LocationPage = _Location2.default;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(0)) :
  typeof define === 'function' && define.amd ? define(['preact'], factory) :
  (global.PreactCSSTransitionGroup = factory(global.preact));
}(this, (function (preact) { 'use strict';

function getKey(vnode) {
	return vnode.attributes && vnode.attributes.key;
}

function getComponentBase(component) {
	return component.base;
}

function onlyChild(children) {
	return children && children[0];
}

function find(arr, iter) {
	for (var i = arr.length; i--;) {
		if (iter(arr[i])) return true;
	}
	return false;
}

function inChildrenByKey(children, key) {
	return find(children, function (c) {
		return getKey(c) === key;
	});
}

function inChildren(children, child) {
	return inChildrenByKey(children, getKey(child));
}

function isShownInChildrenByKey(children, key, showProp) {
	return find(children, function (c) {
		return getKey(c) === key && c.props[showProp];
	});
}

function isShownInChildren(children, child, showProp) {
	return isShownInChildrenByKey(children, getKey(child), showProp);
}

function mergeChildMappings(prev, next) {
	var ret = [];

	var nextChildrenPending = {},
	    pendingChildren = [];
	prev.forEach(function (c) {
		var key = getKey(c);
		if (inChildrenByKey(next, key)) {
			if (pendingChildren.length) {
				nextChildrenPending[key] = pendingChildren;
				pendingChildren = [];
			}
		} else {
			pendingChildren.push(c);
		}
	});

	next.forEach(function (c) {
		var key = getKey(c);
		if (nextChildrenPending.hasOwnProperty(key)) {
			ret = ret.concat(nextChildrenPending[key]);
		}
		ret.push(c);
	});

	return ret.concat(pendingChildren);
}

var SPACE = ' ';
var RE_CLASS = /[\n\t\r]+/g;

var norm = function (elemClass) {
	return (SPACE + elemClass + SPACE).replace(RE_CLASS, SPACE);
};

function addClass(elem, className) {
	if (elem.classList) {
		var _elem$classList;

		(_elem$classList = elem.classList).add.apply(_elem$classList, className.split(' '));
	} else {
		elem.className += ' ' + className;
	}
}

function removeClass(elem, needle) {
	needle = needle.trim();
	if (elem.classList) {
		var _elem$classList2;

		(_elem$classList2 = elem.classList).remove.apply(_elem$classList2, needle.split(' '));
	} else {
		var elemClass = elem.className.trim();
		var className = norm(elemClass);
		needle = SPACE + needle + SPACE;
		while (className.indexOf(needle) >= 0) {
			className = className.replace(needle, SPACE);
		}
		elem.className = className.trim();
	}
}

var EVENT_NAME_MAP = {
	transitionend: {
		transition: 'transitionend',
		WebkitTransition: 'webkitTransitionEnd',
		MozTransition: 'mozTransitionEnd',
		OTransition: 'oTransitionEnd',
		msTransition: 'MSTransitionEnd'
	},

	animationend: {
		animation: 'animationend',
		WebkitAnimation: 'webkitAnimationEnd',
		MozAnimation: 'mozAnimationEnd',
		OAnimation: 'oAnimationEnd',
		msAnimation: 'MSAnimationEnd'
	}
};

var endEvents = [];

function detectEvents() {
	var testEl = document.createElement('div'),
	    style = testEl.style;

	if (!('AnimationEvent' in window)) {
		delete EVENT_NAME_MAP.animationend.animation;
	}

	if (!('TransitionEvent' in window)) {
		delete EVENT_NAME_MAP.transitionend.transition;
	}

	for (var baseEventName in EVENT_NAME_MAP) {
		var baseEvents = EVENT_NAME_MAP[baseEventName];
		for (var styleName in baseEvents) {
			if (styleName in style) {
				endEvents.push(baseEvents[styleName]);
				break;
			}
		}
	}
}

if (typeof window !== 'undefined') {
	detectEvents();
}

function addEndEventListener(node, eventListener) {
	if (!endEvents.length) {
		return window.setTimeout(eventListener, 0);
	}
	endEvents.forEach(function (endEvent) {
		node.addEventListener(endEvent, eventListener, false);
	});
}

function removeEndEventListener(node, eventListener) {
	if (!endEvents.length) return;
	endEvents.forEach(function (endEvent) {
		node.removeEventListener(endEvent, eventListener, false);
	});
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var TICK = 17;

var CSSTransitionGroupChild = function (_Component) {
	inherits(CSSTransitionGroupChild, _Component);

	function CSSTransitionGroupChild() {
		var _temp, _this, _ret;

		classCallCheck(this, CSSTransitionGroupChild);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.flushClassNameQueue = function () {
			if (getComponentBase(_this)) {
				addClass(getComponentBase(_this), _this.classNameQueue.join(' '));
			}
			_this.classNameQueue.length = 0;
			_this.timeout = null;
		}, _temp), possibleConstructorReturn(_this, _ret);
	}

	CSSTransitionGroupChild.prototype.transition = function transition(animationType, finishCallback) {
		var _this2 = this;

		var node = getComponentBase(this),
		    className = this.props.name + '-' + animationType,
		    activeClassName = className + '-active';

		if (this.endListener) {
			this.endListener();
		}

		this.endListener = function (e) {
			if (e && e.target !== node) return;

			removeClass(node, className);
			removeClass(node, activeClassName);

			removeEndEventListener(node, _this2.endListener);
			_this2.endListener = null;

			if (finishCallback) {
				finishCallback();
			}
		};

		addEndEventListener(node, this.endListener);

		addClass(node, className);

		this.queueClass(activeClassName);
	};

	CSSTransitionGroupChild.prototype.queueClass = function queueClass(className) {
		this.classNameQueue.push(className);

		if (!this.timeout) {
			this.timeout = setTimeout(this.flushClassNameQueue, TICK);
		}
	};

	CSSTransitionGroupChild.prototype.stop = function stop() {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.classNameQueue.length = 0;
			this.timeout = null;
		}
		if (this.endListener) {
			this.endListener();
		}
	};

	CSSTransitionGroupChild.prototype.componentWillMount = function componentWillMount() {
		this.classNameQueue = [];
	};

	CSSTransitionGroupChild.prototype.componentWillUnmount = function componentWillUnmount() {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
	};

	CSSTransitionGroupChild.prototype.componentWillEnter = function componentWillEnter(done) {
		if (this.props.enter) {
			this.transition('enter', done);
		} else {
			done();
		}
	};

	CSSTransitionGroupChild.prototype.componentWillLeave = function componentWillLeave(done) {
		if (this.props.leave) {
			this.transition('leave', done);
		} else {
			done();
		}
	};

	CSSTransitionGroupChild.prototype.render = function render() {
		return onlyChild(this.props.children);
	};

	return CSSTransitionGroupChild;
}(preact.Component);

var CSSTransitionGroup = function (_Component) {
	inherits(CSSTransitionGroup, _Component);

	function CSSTransitionGroup(props) {
		classCallCheck(this, CSSTransitionGroup);

		var _this = possibleConstructorReturn(this, _Component.call(this));

		_this.renderChild = function (child) {
			var _this$props = _this.props;
			var transitionName = _this$props.transitionName;
			var transitionEnter = _this$props.transitionEnter;
			var transitionLeave = _this$props.transitionLeave;
			var key = getKey(child);
			return preact.h(
				CSSTransitionGroupChild,
				{
					key: key,
					ref: function (c) {
						if (!(_this.refs[key] = c)) child = null;
					},
					name: transitionName,
					enter: transitionEnter,
					leave: transitionLeave },
				child
			);
		};

		_this.refs = {};
		_this.state = {
			children: (props.children || []).slice()
		};
		return _this;
	}

	CSSTransitionGroup.prototype.shouldComponentUpdate = function shouldComponentUpdate(_, _ref) {
		var children = _ref.children;

		return children !== this.state.children;
	};

	CSSTransitionGroup.prototype.componentWillMount = function componentWillMount() {
		this.currentlyTransitioningKeys = {};
		this.keysToEnter = [];
		this.keysToLeave = [];
	};

	CSSTransitionGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref2) {
		var _this2 = this;

		var children = _ref2.children;
		var exclusive = _ref2.exclusive;
		var showProp = _ref2.showProp;

		var nextChildMapping = (children || []).slice();

		var prevChildMapping = exclusive ? this.props.children : this.state.children;

		var newChildren = mergeChildMappings(prevChildMapping, nextChildMapping);

		if (showProp) {
			newChildren = newChildren.map(function (c) {
				if (!c.props[showProp] && isShownInChildren(prevChildMapping, c, showProp)) {
					var _cloneElement;

					c = preact.cloneElement(c, (_cloneElement = {}, _cloneElement[showProp] = true, _cloneElement));
				}
				return c;
			});
		}

		if (exclusive) {
			newChildren.forEach(function (c) {
				return _this2.stop(getKey(c));
			});
		}

		this.setState({ children: newChildren });
		this.forceUpdate();

		nextChildMapping.forEach(function (c) {
			var key = c.key;
			var hasPrev = prevChildMapping && inChildren(prevChildMapping, c);
			if (showProp) {
				if (hasPrev) {
					var showInPrev = isShownInChildren(prevChildMapping, c, showProp),
					    showInNow = c.props[showProp];
					if (!showInPrev && showInNow && !_this2.currentlyTransitioningKeys[key]) {
						_this2.keysToEnter.push(key);
					}
				}
			} else if (!hasPrev && !_this2.currentlyTransitioningKeys[key]) {
				_this2.keysToEnter.push(key);
			}
		});

		prevChildMapping.forEach(function (c) {
			var key = c.key;
			var hasNext = nextChildMapping && inChildren(nextChildMapping, c);
			if (showProp) {
				if (hasNext) {
					var showInNext = isShownInChildren(nextChildMapping, c, showProp);
					var showInNow = c.props[showProp];
					if (!showInNext && showInNow && !_this2.currentlyTransitioningKeys[key]) {
						_this2.keysToLeave.push(key);
					}
				}
			} else if (!hasNext && !_this2.currentlyTransitioningKeys[key]) {
				_this2.keysToLeave.push(key);
			}
		});
	};

	CSSTransitionGroup.prototype.performEnter = function performEnter(key) {
		var _this3 = this;

		this.currentlyTransitioningKeys[key] = true;
		var component = this.refs[key];
		if (component.componentWillEnter) {
			component.componentWillEnter(function () {
				return _this3._handleDoneEntering(key);
			});
		} else {
			this._handleDoneEntering(key);
		}
	};

	CSSTransitionGroup.prototype._handleDoneEntering = function _handleDoneEntering(key) {
		delete this.currentlyTransitioningKeys[key];
		var currentChildMapping = this.props.children,
		    showProp = this.props.showProp;
		if (!currentChildMapping || !showProp && !inChildrenByKey(currentChildMapping, key) || showProp && !isShownInChildrenByKey(currentChildMapping, key, showProp)) {
			this.performLeave(key);
		} else {
			this.setState({ children: currentChildMapping });
		}
	};

	CSSTransitionGroup.prototype.stop = function stop(key) {
		delete this.currentlyTransitioningKeys[key];
		var component = this.refs[key];
		if (component) component.stop();
	};

	CSSTransitionGroup.prototype.performLeave = function performLeave(key) {
		var _this4 = this;

		this.currentlyTransitioningKeys[key] = true;
		var component = this.refs[key];
		if (component && component.componentWillLeave) {
			component.componentWillLeave(function () {
				return _this4._handleDoneLeaving(key);
			});
		} else {
			this._handleDoneLeaving(key);
		}
	};

	CSSTransitionGroup.prototype._handleDoneLeaving = function _handleDoneLeaving(key) {
		delete this.currentlyTransitioningKeys[key];
		var showProp = this.props.showProp,
		    currentChildMapping = this.props.children;
		if (showProp && currentChildMapping && isShownInChildrenByKey(currentChildMapping, key, showProp)) {
			this.performEnter(key);
		} else if (!showProp && currentChildMapping && inChildrenByKey(currentChildMapping, key)) {
			this.performEnter(key);
		} else {
			this.setState({ children: currentChildMapping });
		}
	};

	CSSTransitionGroup.prototype.componentDidUpdate = function componentDidUpdate() {
		var _this5 = this;

		var keysToEnter = this.keysToEnter;
		var keysToLeave = this.keysToLeave;

		this.keysToEnter = [];
		keysToEnter.forEach(function (k) {
			return _this5.performEnter(k);
		});
		this.keysToLeave = [];
		keysToLeave.forEach(function (k) {
			return _this5.performLeave(k);
		});
	};

	CSSTransitionGroup.prototype.render = function render(_ref3, _ref4) {
		var Component = _ref3.component;
		var transitionName = _ref3.transitionName;
		var transitionEnter = _ref3.transitionEnter;
		var transitionLeave = _ref3.transitionLeave;
		var c = _ref3.children;
		var props = objectWithoutProperties(_ref3, ['component', 'transitionName', 'transitionEnter', 'transitionLeave', 'children']);
		var children = _ref4.children;

		return preact.h(
			Component,
			props,
			children.map(this.renderChild)
		);
	};

	return CSSTransitionGroup;
}(preact.Component);
CSSTransitionGroup.defaultProps = {
	component: 'span',
	transitionEnter: true,
	transitionLeave: true
};

return CSSTransitionGroup;

})));
//# sourceMappingURL=preact-css-transition-group.js.map


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? module.exports = factory(__webpack_require__(0)) :
	typeof define === 'function' && define.amd ? define(['preact'], factory) :
	(global.preactRouter = factory(global.preact));
}(this, (function (preact) { 'use strict';

var EMPTY$1 = {};

function exec(url, route) {
	var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY$1;

	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret = void 0;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var _i = 0; _i < max; _i++) {
		if (route[_i] && route[_i].charAt(0) === ':') {
			var param = route[_i].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[_i].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[_i] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(_i).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[_i] !== url[_i]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) return false;
	return matches;
}

function pathRankSort(a, b) {
	var aAttr = a.attributes || EMPTY$1,
	    bAttr = b.attributes || EMPTY$1;
	if (aAttr.default) return 1;
	if (bAttr.default) return -1;
	var diff = rank(aAttr.path) - rank(bAttr.path);
	return diff || aAttr.path.length - bAttr.path.length;
}

function segmentize(url) {
	return strip(url).split('/');
}

function rank(url) {
	return (strip(url).match(/\/+/g) || '').length;
}

function strip(url) {
	return url.replace(/(^\/+|\/+$)/g, '');
}

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var customHistory = null;

var ROUTERS = [];

var EMPTY = {};

// hangs off all elements created by preact
var ATTR_KEY = typeof Symbol !== 'undefined' ? Symbol.for('preactattr') : '__preactattr_';

function isPreactElement(node) {
	return ATTR_KEY in node;
}

function setUrl(url) {
	var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url = void 0;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return '' + (url.pathname || '') + (url.search || '');
}

function route(url) {
	var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) return true;
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) return;

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) return;

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button !== 0) return;
	routeFromLink(e.currentTarget || e.target || this);
	return prevent(e);
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) e.stopImmediatePropagation();
		if (e.stopPropagation) e.stopPropagation();
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (e.button !== 0) return;
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				return routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Link = function Link(props) {
	return preact.h('a', _extends({}, props, { onClick: handleLinkClick }));
};

var Router = function (_Component) {
	_inherits(Router, _Component);

	function Router(props) {
		_classCallCheck(this, Router);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		if (props.history) {
			customHistory = props.history;
		}

		_this.state = {
			url: _this.props.url || getCurrentUrl()
		};

		initEventListeners();
		return _this;
	}

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) return true;
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */


	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */


	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) return this.canRoute(url);

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var _this2 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				_this2.routeTo('' + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') this.unlisten();
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.slice().sort(pathRankSort).filter(function (_ref) {
			var attributes = _ref.attributes;

			var path = attributes.path,
			    matches = exec(url, path, attributes);
			if (matches) {
				if (invoke !== false) {
					attributes.url = url;
					attributes.matches = matches;
					// copy matches onto props
					for (var i in matches) {
						if (matches.hasOwnProperty(i)) {
							attributes[i] = matches[i];
						}
					}
				}
				return true;
			}
		});
	};

	Router.prototype.render = function render(_ref2, _ref3) {
		var children = _ref2.children,
		    onChange = _ref2.onChange;
		var url = _ref3.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(preact.Component);

var Route = function Route(_ref4) {
	var component = _ref4.component,
	    url = _ref4.url,
	    matches = _ref4.matches;

	return preact.h(component, { url: url, matches: matches });
};

Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

return Router;

})));
//# sourceMappingURL=preact-router.js.map


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _preact = __webpack_require__(0);

var _proptypes = __webpack_require__(4);

var _classnames = __webpack_require__(5);

var _classnames2 = _interopRequireDefault(_classnames);

var _ = __webpack_require__(3);

var _button = __webpack_require__(27);

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var aliases = {};

var Button = function Button(_ref) {
    var children = _ref.children,
        type = _ref.type,
        onClick = _ref.onClick,
        href = _ref.href,
        icon = _ref.icon,
        className = _ref.className;

    if (aliases.hasOwnProperty(name)) {
        name = aliases[name];
    }

    var props = {
        className: (0, _classnames2.default)(_button2.default.button, _button2.default['button--' + type], _button2.default[className]),
        onClick: onClick
    };

    if (href) {
        props.href = href;
    }

    if (href) {
        return (0, _preact.h)(
            'a',
            props,
            icon && (0, _preact.h)(_.Icon, { name: icon, className: _button2.default['button__icon'] }),
            (0, _preact.h)(
                'span',
                { className: _button2.default['button__inner'] },
                children
            )
        );
    }

    return (0, _preact.h)(
        'button',
        props,
        icon && (0, _preact.h)(_.Icon, { name: icon, className: _button2.default['button__icon'] }),
        (0, _preact.h)(
            'span',
            { className: _button2.default['button__inner'] },
            children
        )
    );
};

Button.propTypes = {
    children: _proptypes.element.isRequired,
    className: _proptypes.string,
    icon: _proptypes.string,
    onClick: _proptypes.func,
    href: _proptypes.string,
    style: _proptypes.object,
    type: _proptypes.string
};

Button.defaultProps = {
    type: 'primary'
};

exports.default = Button;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _preact = __webpack_require__(0);

var _proptypes = __webpack_require__(4);

var _container = __webpack_require__(28);

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Container = function Container(_ref) {
    var children = _ref.children;

    return (0, _preact.h)(
        'div',
        { className: _container2.default.container },
        children
    );
};

Container.propTypes = {
    children: _proptypes.element.isRequired
};

exports.default = Container;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _preact = __webpack_require__(0);

var _header = __webpack_require__(29);

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HEADER = function HEADER() {
    return (0, _preact.h)(
        'header',
        { className: _header2.default.header },
        (0, _preact.h)(
            'h1',
            { className: _header2.default.header__title },
            'Your browser rocks!'
        )
    );
};

HEADER.propTypes = {};

exports.default = HEADER;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _preact = __webpack_require__(0);

var _proptypes = __webpack_require__(4);

var _classnames = __webpack_require__(5);

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = __webpack_require__(30);

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var aliases = {};

var Icon = function Icon(_ref) {
    var name = _ref.name,
        color = _ref.color,
        className = _ref.className,
        size = _ref.size,
        style = _ref.style;

    if (aliases.hasOwnProperty(name)) {
        name = aliases[name];
    }

    var src = __webpack_require__(44)("./" + name + '.svg');
    var props = {
        className: (0, _classnames2.default)(_icon2.default.icon, _icon2.default['icon--' + name], className, _icon2.default['icon--' + size]),
        style: style
    };

    if (color && color !== 'transparent') {
        props.style = {
            color: color
        };
    }

    return (0, _preact.h)('span', _extends({ dangerouslySetInnerHTML: { __html: src } }, props));
};

Icon.propTypes = {
    className: _proptypes.string,
    color: _proptypes.string,
    name: _proptypes.string,
    size: (0, _proptypes.oneOf)(['tiny', 'small', 'medium']),
    style: _proptypes.object
};

Icon.defaultProps = {
    size: 'medium'
};

exports.default = Icon;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _preact = __webpack_require__(0);

var _proptypes = __webpack_require__(4);

var _ = __webpack_require__(3);

var _slide = __webpack_require__(31);

var _slide2 = _interopRequireDefault(_slide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Slide = function Slide(_ref) {
    var children = _ref.children,
        previous = _ref.previous,
        next = _ref.next;

    return (0, _preact.h)(
        'section',
        { className: _slide2.default.slide },
        previous && (0, _preact.h)(_.SlideNav, { direction: 'left', to: previous }),
        next && (0, _preact.h)(_.SlideNav, { direction: 'right', to: next }),
        children
    );
};

Slide.propTypes = {
    children: _proptypes.element.isRequired,
    previous: _proptypes.string,
    next: _proptypes.string
};

exports.default = Slide;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _preact = __webpack_require__(0);

var _proptypes = __webpack_require__(4);

var _classnames2 = __webpack_require__(5);

var _classnames3 = _interopRequireDefault(_classnames2);

var _ = __webpack_require__(3);

var _slideNav = __webpack_require__(32);

var _slideNav2 = _interopRequireDefault(_slideNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SlideNav = function SlideNav(_ref) {
    var _classnames;

    var direction = _ref.direction,
        to = _ref.to;

    var classes = (0, _classnames3.default)(_slideNav2.default['slide-nav'], (_classnames = {}, _defineProperty(_classnames, _slideNav2.default['slide-nav--left'], direction === 'left'), _defineProperty(_classnames, _slideNav2.default['slide-nav--right'], direction === 'right'), _classnames));

    return (0, _preact.h)(
        'a',
        { className: classes, href: to },
        (0, _preact.h)(_.Icon, { icon: direction })
    );
};

SlideNav.propTypes = {
    direction: _proptypes.string,
    to: _proptypes.string
};

exports.default = SlideNav;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _preact = __webpack_require__(0);

var _Components = __webpack_require__(3);

var BatteryPage = function BatteryPage(_ref) {
    var children = _ref.children;

    return (0, _preact.h)(
        _Components.Slide,
        { next: '/location' },
        (0, _preact.h)(
            'h1',
            null,
            'Battery!'
        )
    );
};

BatteryPage.propTypes = {};

exports.default = BatteryPage;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _preact = __webpack_require__(0);

var _Components = __webpack_require__(3);

var _home = __webpack_require__(33);

var _home2 = _interopRequireDefault(_home);

var _styles = __webpack_require__(6);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HomePage = function HomePage(_ref) {
    var children = _ref.children;

    return (0, _preact.h)(
        'section',
        { className: _home2.default.home },
        (0, _preact.h)(
            'div',
            { className: _home2.default.container },
            (0, _preact.h)(_Components.Icon, { name: 'browser', size: 'huge', style: { 'margin-bottom': '4rem' } }),
            (0, _preact.h)(
                'p',
                { className: _styles2.default.intro },
                'This is collection of code examples illustrating browser API\'s. Some of these might be wildly used, while others are a bit lesser know.'
            ),
            (0, _preact.h)(
                _Components.Button,
                { href: '/battery' },
                'View examples'
            ),
            (0, _preact.h)(
                _Components.Button,
                { href: 'https://github.com/sambego/yourbrowser.rocks', icon: 'github', type: 'secondary' },
                'Visit on Github'
            )
        )
    );
};

HomePage.propTypes = {};

exports.default = HomePage;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _preact = __webpack_require__(0);

var _Components = __webpack_require__(3);

var LocationPage = function LocationPage(_ref) {
    var children = _ref.children;

    return (0, _preact.h)(
        _Components.Slide,
        { previous: '/battery' },
        (0, _preact.h)(
            'h1',
            null,
            'Location!'
        )
    );
};

LocationPage.propTypes = {};

exports.default = LocationPage;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".button__button___1EbNH{-webkit-transition:all .4s ease-in-out;transition:all .4s ease-in-out;display:inline-block;padding:1rem 1.5rem;margin:0 1rem 0 0;border:1px solid #59c6d6;border-radius:.3rem;color:#59c6d6;text-decoration:none;line-height:2.4rem}.button__button___1EbNH:hover{background:#59c6d6;border-color:#59c6d6;color:#fff}.button__button__icon___sLLuj,.button__button__inner___1hiP6{vertical-align:bottom}.button__button__icon___sLLuj{margin:0 1rem 0 0}.button__button--secondary___wUlJz{color:#fff;border-color:#fff}.button__button--secondary___wUlJz:hover{background:#fff;border-color:#fff;color:#59c6d6}", ""]);

// exports
exports.locals = {
	"button": "button__button___1EbNH",
	"button__inner": "button__button__inner___1hiP6",
	"button__icon": "button__button__icon___sLLuj",
	"button--secondary": "button__button--secondary___wUlJz"
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".container__container___2d73f{position:relative;width:100%;height:100%}", ""]);

// exports
exports.locals = {
	"container": "container__container___2d73f"
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".header__header___1wzW0{position:fixed;z-index:1;top:0;left:0;width:100%;padding:1rem 2rem;background:#253e55}.header__header__title___2aBiL{margin:0;color:#fff;font-family:Roboto,Helvetica,sans-serif;font-weight:100}", ""]);

// exports
exports.locals = {
	"header": "header__header___1wzW0",
	"header__title": "header__header__title___2aBiL"
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".icon__icon___-HLTi{height:2.4rem;width:2.4rem;display:inline-block}.icon__icon___-HLTi circle,.icon__icon___-HLTi line,.icon__icon___-HLTi path,.icon__icon___-HLTi polygon,.icon__icon___-HLTi rect{fill:currentColor}.icon__icon___-HLTi svg{width:2.4rem;height:auto}.icon__icon-exposed-folder___1Gl_2 .icon__exposed___14Jj7 path{fill:rgba(0,0,0,.3)}.icon__icon--huge___8BJO4{width:20rem;height:20rem;line-height:20rem}.icon__icon--huge___8BJO4 svg{width:20rem;height:20rem}.icon__icon--small___6mxIJ{width:1.2rem;height:1.2rem;line-height:1.2rem}.icon__icon--small___6mxIJ svg{width:1.2rem;height:1.2rem}.icon__icon--tiny___1VJA1{width:.8rem;height:.8rem;line-height:.8rem}.icon__icon--tiny___1VJA1 svg{width:.8rem;height:.8rem}", ""]);

// exports
exports.locals = {
	"icon": "icon__icon___-HLTi",
	"icon-exposed-folder": "icon__icon-exposed-folder___1Gl_2",
	"exposed": "icon__exposed___14Jj7",
	"icon--huge": "icon__icon--huge___8BJO4",
	"icon--small": "icon__icon--small___6mxIJ",
	"icon--tiny": "icon__icon--tiny___1VJA1"
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".slide__slide___89aR2{position:absolute;top:0;left:0;width:100%;height:100%;padding:8rem 2rem 2rem}.slide__slide-transition-enter___3MKRc{opacity:.01}.slide__slide-transition-enter___3MKRc.slide__slide-transition-enter-active___1ojvf{opacity:1;-webkit-transition:opacity .5s ease-in;transition:opacity .5s ease-in}.slide__slide-transition-leave___2Yp-M{opacity:1}.slide__slide-transition-leave___2Yp-M.slide__slide-transition-leave-active___1rGVd{opacity:.01;-webkit-transition:opacity .3s ease-in;transition:opacity .3s ease-in}", ""]);

// exports
exports.locals = {
	"slide": "slide__slide___89aR2",
	"slide-transition-enter": "slide__slide-transition-enter___3MKRc",
	"slide-transition-enter-active": "slide__slide-transition-enter-active___1ojvf",
	"slide-transition-leave": "slide__slide-transition-leave___2Yp-M",
	"slide-transition-leave-active": "slide__slide-transition-leave-active___1rGVd"
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".slide-nav__slide-nav___3Uj6_{position:fixed;top:50%;left:2rem;width:2rem;height:2rem;background:red;border-radius:50%}.slide-nav__slide-nav--right___2h8eQ{left:auto;right:2rem}", ""]);

// exports
exports.locals = {
	"slide-nav": "slide-nav__slide-nav___3Uj6_",
	"slide-nav--right": "slide-nav__slide-nav--right___2h8eQ"
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".home__home___3Bg1X{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;width:100%;min-height:100%;padding:8rem 2rem 2rem;background:#345879}.home__container___2ede7{width:100%;max-width:40rem;text-align:center;color:#fff}", ""]);

// exports
exports.locals = {
	"home": "home__home___3Bg1X",
	"container": "home__container___2ede7"
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@font-face{font-family:Roboto;font-style:normal;font-weight:100;src:local(\"Roboto Thin\"),local(\"Roboto-Thin\"),url(" + __webpack_require__(35) + ") format(\"woff2\"),url(" + __webpack_require__(34) + ") format(\"woff\")}@font-face{font-family:Roboto;font-style:normal;font-weight:300;src:local(\"Roboto Light\"),local(\"Roboto-Light\"),url(" + __webpack_require__(37) + ") format(\"woff2\"),url(" + __webpack_require__(36) + ") format(\"woff\")}@font-face{font-family:Roboto;font-style:normal;font-weight:400;src:local(\"Roboto\"),local(\"Roboto-Regular\"),url(" + __webpack_require__(41) + ") format(\"woff2\"),url(" + __webpack_require__(40) + ") format(\"woff\")}@font-face{font-family:Roboto;font-style:normal;font-weight:700;src:local(\"Roboto Bold\"),local(\"Roboto-Bold\"),url(" + __webpack_require__(39) + ") format(\"woff2\"),url(" + __webpack_require__(38) + ") format(\"woff\")}*{box-sizing:border-box}html{font-size:10px}body{padding:0;margin:0;font-size:1.6rem;font-family:Roboto,Helvetica,sans-serif}h1,h2,h3,p{margin:0 0 1.5rem}.styles__intro___3au1G{margin:0 0 4rem;font-size:2rem}", ""]);

// exports
exports.locals = {
	"intro": "styles__intro___3au1G"
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(19);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./button.scss", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./button.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./container.scss", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./container.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./header.scss", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./header.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(22);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./icon.scss", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./icon.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(23);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./slide.scss", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./slide.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(24);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./slide-nav.scss", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./slide-nav.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./home.scss", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../../../node_modules/postcss-loader/index.js!./../../../../node_modules/sass-loader/lib/loader.js!./home.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "roboto-v15-latin-100.woff";

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "roboto-v15-latin-100.woff2";

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "roboto-v15-latin-300.woff";

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "roboto-v15-latin-300.woff2";

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "roboto-v15-latin-700.woff";

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "roboto-v15-latin-700.woff2";

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "roboto-v15-latin-regular.woff";

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "roboto-v15-latin-regular.woff2";

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 376 300\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><title>browser</title><desc>Created with Sketch.</desc><defs></defs><g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><g id=\"_x32_1\"><path d=\"M20.4959684,299.046 C9.45250001,299.046 0.5,290.084435 0.5,279.05421 L0.5,20.95579 C0.5,9.91462926 9.44569468,0.964 20.4959684,0.964 L355.504032,0.964 C366.5475,0.964 375.5,9.92556502 375.5,20.95579 L375.5,279.05421 C375.5,290.095371 366.554305,299.046 355.504032,299.046 L20.4959684,299.046 Z M328.508,32.897 C328.508,38.639 333.137,43.297 338.894,43.297 C344.672,43.297 349.338,38.639 349.338,32.897 C349.338,27.17 344.672,22.467 338.894,22.467 C333.137,22.468 328.508,27.171 328.508,32.897 L328.508,32.897 Z M256.071,32.897 C256.071,37.454 259.785,41.159 264.362,41.159 L307.707,41.159 C312.285,41.159 315.983,37.454 315.983,32.897 C315.983,28.297 312.285,24.606 307.707,24.606 L264.362,24.606 C259.785,24.606 256.071,28.298 256.071,32.897 L256.071,32.897 Z M358.684,60.143 L22.146,60.143 L22.146,263.815 C22.171,272.59 29.416,279.856 38.161,279.856 L342.643,279.856 C351.403,279.856 358.668,272.59 358.683,263.815 L358.683,60.143 L358.684,60.143 Z\" id=\"Shape\" fill=\"#000000\"></path><path d=\"M70.827,171.237 L137.031,138.147 L137.031,154.157 L91.427,175.296 L137.031,194.03 L137.031,209.968 L70.827,180.759 L70.827,171.237 L70.827,171.237 Z M170.008,223.518 L188.465,223.518 L224.812,126.032 L206.355,126.032 L170.008,223.518 L170.008,223.518 Z M231.345,138.147 L231.345,154.157 L276.96,175.296 L231.345,194.03 L231.345,209.968 L297.571,180.759 L297.571,171.237 L231.345,138.147 L231.345,138.147 Z\" id=\"Shape\" fill=\"#000000\"></path><g id=\"Group\" transform=\"translate(123.000000, 73.000000)\" fill=\"#FFFFFF\"><path d=\"M39.845,48.185 C42.522,45.49 44.338,40.581 44.852,38.384 C45.265,40.597 46.884,45.577 49.433,48.39 C52.623,51.876 56.245,54.015 58.497,53.941 C56.073,54.425 52.491,57.062 49.302,60.914 C46.251,64.605 44.395,67.974 44.2,70.406 C44.101,67.961 42.376,64.504 39.505,60.724 C36.485,56.753 33.028,53.956 30.644,53.341 C32.895,53.458 36.557,51.495 39.845,48.185 L39.845,48.185 Z\" id=\"Shape\"></path><path d=\"M67.775,24.337 C69.453,22.651 70.592,19.575 70.918,18.198 C71.179,19.591 72.178,22.71 73.781,24.483 C75.781,26.665 78.037,28.012 79.458,27.924 C77.935,28.262 75.701,29.916 73.701,32.319 C71.785,34.604 70.625,36.729 70.5,38.266 C70.435,36.729 69.354,34.575 67.557,32.188 C65.666,29.698 63.502,27.954 62.004,27.573 C63.414,27.647 65.707,26.417 67.775,24.337 L67.775,24.337 Z\" id=\"Shape\"></path><path d=\"M10.449,11.944 C13.203,8.735 14.829,3.139 15.22,0.62 C15.861,3.081 18.051,8.487 21.142,11.372 C24.921,14.962 29.071,17.042 31.568,16.837 C28.931,17.583 25.181,20.821 21.966,25.347 C18.882,29.669 17.073,33.579 17.066,36.349 C16.758,33.595 14.543,29.904 11.046,25.904 C7.333,21.744 3.264,18.931 0.547,18.433 C3.062,18.462 7.025,15.942 10.449,11.944 L10.449,11.944 Z\" id=\"Shape\"></path></g></g></g></svg>"

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 33 33\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><title>github</title><desc>Created with Sketch.</desc><defs></defs><g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><path d=\"M16.608,0.455 C7.614,0.455 0.32,7.748 0.32,16.745 C0.32,23.942 4.987,30.047 11.46,32.201 C12.275,32.351 12.572,31.848 12.572,31.416 C12.572,31.03 12.558,30.005 12.55,28.646 C8.019,29.63 7.063,26.462 7.063,26.462 C6.322,24.58 5.254,24.079 5.254,24.079 C3.775,23.069 5.366,23.089 5.366,23.089 C7.001,23.204 7.861,24.768 7.861,24.768 C9.314,27.257 11.674,26.538 12.602,26.121 C12.75,25.069 13.171,24.351 13.636,23.944 C10.019,23.533 6.216,22.135 6.216,15.893 C6.216,14.115 6.851,12.66 7.893,11.522 C7.725,11.11 7.166,9.453 8.053,7.211 C8.053,7.211 9.42,6.773 12.532,8.881 C13.831,8.519 15.225,8.339 16.61,8.332 C17.994,8.339 19.387,8.519 20.688,8.881 C23.798,6.773 25.163,7.211 25.163,7.211 C26.052,9.453 25.493,11.11 25.326,11.522 C26.37,12.66 27,14.115 27,15.893 C27,22.151 23.191,23.528 19.563,23.931 C20.147,24.434 20.668,25.428 20.668,26.948 C20.668,29.125 20.648,30.882 20.648,31.416 C20.648,31.852 20.942,32.359 21.768,32.2 C28.236,30.041 32.899,23.94 32.899,16.745 C32.899,7.748 25.605,0.455 16.608,0.455\" id=\"Fill-3\" fill=\"#151513\"></path></g></svg>"

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./browser.svg": 42,
	"./github.svg": 43
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 44;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(6);

var _preact = __webpack_require__(0);

var _preactRouter = __webpack_require__(9);

var _preactRouter2 = _interopRequireDefault(_preactRouter);

var _preactCssTransitionGroup = __webpack_require__(8);

var _preactCssTransitionGroup2 = _interopRequireDefault(_preactCssTransitionGroup);

var _Components = __webpack_require__(3);

var _Pages = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _preact.render)((0, _preact.h)(
    'div',
    null,
    (0, _preact.h)(_Components.Header, null),
    (0, _preact.h)(
        _Components.Container,
        null,
        (0, _preact.h)(
            _preactCssTransitionGroup2.default,
            {
                transitionName: 'slide-transition',
                transitionEnterTimeout: 4000,
                transitionLeaveTimeout: 4000,
                transitionEnter: true,
                transitionLeave: true
            },
            (0, _preact.h)(
                _preactRouter2.default,
                null,
                (0, _preact.h)(_Pages.HomePage, { path: '/' }),
                (0, _preact.h)(_Pages.BatteryPage, { path: '/battery' }),
                (0, _preact.h)(_Pages.LocationPage, { path: '/location' })
            )
        )
    )
), document.body);

/***/ })
/******/ ]);
//# sourceMappingURL=script.a29fe907e9cde36f4c06.js.map