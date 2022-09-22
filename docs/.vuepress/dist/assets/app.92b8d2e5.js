var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const import_meta = {};
function makeMap(str, expectsLowerCase) {
  const map = Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString$1(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$1(value)) {
    return value;
  } else if (isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$1(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject(val) && !isArray(val) && !isPlainObject$1(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString$1(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
const cacheStringFunction = (fn) => {
  const cache = Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
let activeEffectScope;
const effectScopeStack = [];
class EffectScope {
  constructor(detached = false) {
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope;
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  run(fn) {
    if (this.active) {
      try {
        this.on();
        return fn();
      } finally {
        this.off();
      }
    }
  }
  on() {
    if (this.active) {
      effectScopeStack.push(this);
      activeEffectScope = this;
    }
  }
  off() {
    if (this.active) {
      effectScopeStack.pop();
      activeEffectScope = effectScopeStack[effectScopeStack.length - 1];
    }
  }
  stop(fromParent) {
    if (this.active) {
      this.effects.forEach((e) => e.stop());
      this.cleanups.forEach((cleanup) => cleanup());
      if (this.scopes) {
        this.scopes.forEach((e) => e.stop(true));
      }
      if (this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.active = false;
    }
  }
}
function recordEffectScope(effect, scope) {
  scope = scope || activeEffectScope;
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
const effectStack = [];
let activeEffect;
const ITERATE_KEY = Symbol("");
const MAP_KEY_ITERATE_KEY = Symbol("");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    if (!effectStack.includes(this)) {
      try {
        effectStack.push(activeEffect = this);
        enableTracking();
        trackOpBit = 1 << ++effectTrackDepth;
        if (effectTrackDepth <= maxMarkerBits) {
          initDepMarkers(this);
        } else {
          cleanupEffect(this);
        }
        return this.fn();
      } finally {
        if (effectTrackDepth <= maxMarkerBits) {
          finalizeDepMarkers(this);
        }
        trackOpBit = 1 << --effectTrackDepth;
        resetTracking();
        effectStack.pop();
        const n = effectStack.length;
        activeEffect = n > 0 ? effectStack[n - 1] : void 0;
      }
    }
  }
  stop() {
    if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function enableTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (!isTracking()) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, depsMap = new Map());
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, dep = createDep());
  }
  trackEffects(dep);
}
function isTracking() {
  return shouldTrack && activeEffect !== void 0;
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects));
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  for (const effect of isArray(dep) ? dep : [...dep]) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if (effect.scheduler) {
        effect.scheduler();
      } else {
        effect.run();
      }
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
const get = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2 && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
      return shouldUnwrap ? res.value : res;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (!shallow && !isReadonly(value)) {
      value = toRaw(value);
      oldValue = toRaw(oldValue);
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    return true;
  },
  deleteProperty(target, key) {
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly2 = false, isShallow = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "get", key);
  }
  !isReadonly2 && track(rawTarget, "get", rawKey);
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "has", key);
  }
  !isReadonly2 && track(rawTarget, "has", rawKey);
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0);
  }
  return result;
}
function createForEach(isReadonly2, isShallow) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const reactiveMap = new WeakMap();
const shallowReactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
const shallowReadonlyMap = new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (target && target["__v_isReadonly"]) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (isTracking()) {
    ref2 = toRaw(ref2);
    if (!ref2.dep) {
      ref2.dep = createDep();
    }
    {
      trackEffects(ref2.dep);
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  if (ref2.dep) {
    {
      triggerEffects(ref2.dep);
    }
  }
}
function isRef(r2) {
  return Boolean(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, _shallow) {
    this._shallow = _shallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = _shallow ? value : toRaw(value);
    this._value = _shallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    newVal = this._shallow ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = this._shallow ? newVal : toReactive(newVal);
      triggerRefValue(this);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
function toRefs(object) {
  const ret = isArray(object) ? new Array(object.length) : {};
  for (const key in object) {
    ret[key] = toRef(object, key);
  }
  return ret;
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
}
function toRef(object, key, defaultValue) {
  const val = object[key];
  return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue);
}
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2) {
    this._setter = _setter;
    this.dep = void 0;
    this._dirty = true;
    this.__v_isRef = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed(getterOrOptions, debugOptions) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter);
  return cRef;
}
Promise.resolve();
function emit$1(instance, event, ...rawArgs) {
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => a.trim());
    } else if (number) {
      args = rawArgs.map(toNumber);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, null);
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  cache.set(comp, normalized);
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    const res = fn(...args);
    setCurrentRenderingInstance(prevInstance);
    if (renderFnWithContext._d) {
      setBlockTracking(1);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit, render, renderCache, data, setupState, ctx, inheritAttrs } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false)
        ;
      result = normalizeVNode(render2.length > 1 ? render2(props, false ? {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },
        slots,
        emit
      } : { attrs, slots, emit }) : render2(props, null));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
        }
        root = cloneVNode(root, fallthroughAttrs);
      }
    }
  }
  if (vnode.dirs) {
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    root.transition = vnode.transition;
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function provide(key, value) {
  if (!currentInstance)
    ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else
      ;
  }
}
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      const rawProps = toRaw(props);
      const { mode } = rawProps;
      const child = children[0];
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            instance.update();
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance) {
  const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(hook, instance, 9, args);
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el._leaveCb) {
        el._leaveCb(true);
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        leavingVNode.el._leaveCb();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el._enterCb = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el._enterCb = void 0;
      };
      if (hook) {
        hook(el, done);
        if (hook.length <= 1) {
          done();
        }
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el._enterCb) {
        el._enterCb(true);
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done = el._leaveCb = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el._leaveCb = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        onLeave(el, done);
        if (onLeave.length <= 1) {
          done();
        }
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment));
    } else if (keepComment || child.type !== Comment) {
      ret.push(child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
function defineComponent(options) {
  return isFunction(options) ? { setup: options, name: options.name } : options;
}
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
function defineAsyncComponent(source) {
  if (isFunction(source)) {
    source = { loader: source };
  }
  const {
    loader,
    loadingComponent,
    errorComponent,
    delay: delay2 = 200,
    timeout,
    suspensible = true,
    onError: userOnError
  } = source;
  let pendingRequest = null;
  let resolvedComp;
  let retries = 0;
  const retry = () => {
    retries++;
    pendingRequest = null;
    return load();
  };
  const load = () => {
    let thisRequest;
    return pendingRequest || (thisRequest = pendingRequest = loader().catch((err) => {
      err = err instanceof Error ? err : new Error(String(err));
      if (userOnError) {
        return new Promise((resolve2, reject) => {
          const userRetry = () => resolve2(retry());
          const userFail = () => reject(err);
          userOnError(err, userRetry, userFail, retries + 1);
        });
      } else {
        throw err;
      }
    }).then((comp) => {
      if (thisRequest !== pendingRequest && pendingRequest) {
        return pendingRequest;
      }
      if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
        comp = comp.default;
      }
      resolvedComp = comp;
      return comp;
    }));
  };
  return defineComponent({
    name: "AsyncComponentWrapper",
    __asyncLoader: load,
    get __asyncResolved() {
      return resolvedComp;
    },
    setup() {
      const instance = currentInstance;
      if (resolvedComp) {
        return () => createInnerComp(resolvedComp, instance);
      }
      const onError = (err) => {
        pendingRequest = null;
        handleError(err, instance, 13, !errorComponent);
      };
      if (suspensible && instance.suspense || isInSSRComponentSetup) {
        return load().then((comp) => {
          return () => createInnerComp(comp, instance);
        }).catch((err) => {
          onError(err);
          return () => errorComponent ? createVNode(errorComponent, {
            error: err
          }) : null;
        });
      }
      const loaded = ref(false);
      const error = ref();
      const delayed = ref(!!delay2);
      if (delay2) {
        setTimeout(() => {
          delayed.value = false;
        }, delay2);
      }
      if (timeout != null) {
        setTimeout(() => {
          if (!loaded.value && !error.value) {
            const err = new Error(`Async component timed out after ${timeout}ms.`);
            onError(err);
            error.value = err;
          }
        }, timeout);
      }
      load().then(() => {
        loaded.value = true;
        if (instance.parent && isKeepAlive(instance.parent.vnode)) {
          queueJob(instance.parent.update);
        }
      }).catch((err) => {
        onError(err);
        error.value = err;
      });
      return () => {
        if (loaded.value && resolvedComp) {
          return createInnerComp(resolvedComp, instance);
        } else if (error.value && errorComponent) {
          return createVNode(errorComponent, {
            error: error.value
          });
        } else if (loadingComponent && !delayed.value) {
          return createVNode(loadingComponent);
        }
      };
    }
  });
}
function createInnerComp(comp, { vnode: { ref: ref2, props, children } }) {
  const vnode = createVNode(comp, props, children);
  vnode.ref = ref2;
  return vnode;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(type, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, hook, target);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject(data))
      ;
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(opt.from || key, opt.default, true);
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString$1(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else
    ;
}
function resolveMergedOptions(instance) {
  const base2 = instance.type;
  const { mixins, extends: extendsOptions } = base2;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base2);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base2;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions$1(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions$1(resolved, base2, optionMergeStrategies);
  }
  cache.set(base2, resolved);
  return resolved;
}
function mergeOptions$1(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions$1(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions$1(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose")
      ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if ((optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key)) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, EMPTY_ARR);
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : opt;
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  cache.set(comp, res);
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot$1 = (key, rawSlot, ctx) => {
  const normalized = withCtx((...args) => {
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot$1(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(children, instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function withDirectives(vnode, directives) {
  const internalInstance = currentRenderingInstance;
  if (internalInstance === null) {
    return vnode;
  }
  const instance = internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (isFunction(dir)) {
      dir = {
        mounted: dir,
        updated: dir
      };
    }
    if (dir.deep) {
      traverse(value);
    }
    bindings.push({
      dir,
      instance,
      value,
      oldValue: void 0,
      arg,
      modifiers
    });
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  };
}
let uid = 0;
function createAppAPI(render, hydrate) {
  return function createApp(rootComponent, rootProps = null) {
    if (rootProps != null && !isObject(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = new Set();
    let isMounted = false;
    const app = context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin))
          ;
        else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else
          ;
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app._container);
          delete app._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray(rawRef)) {
    rawRef.forEach((r2, i) => setRef(r2, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString$1(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString$1(ref2);
    const _isRef = isRef(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray(existing) && remove(existing, refValue);
          } else {
            if (!isArray(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (hasOwn(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (isRef(ref2)) {
          ref2.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else
          ;
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    }
  }
}
let hasMismatch = false;
const isSVGContainer = (container) => /svg/.test(container.namespaceURI) && container.tagName !== "foreignObject";
const isComment = (node) => node.nodeType === 8;
function createHydrationFunctions(rendererInternals) {
  const { mt: mountComponent, p: patch, o: { patchProp: patchProp2, nextSibling, parentNode, remove: remove2, insert, createComment } } = rendererInternals;
  const hydrate = (vnode, container) => {
    if (!container.hasChildNodes()) {
      patch(null, vnode, container);
      flushPostFlushCbs();
      return;
    }
    hasMismatch = false;
    hydrateNode(container.firstChild, vnode, null, null, null);
    flushPostFlushCbs();
    if (hasMismatch && true) {
      console.error(`Hydration completed but contains mismatches.`);
    }
  };
  const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false) => {
    const isFragmentStart = isComment(node) && node.data === "[";
    const onMismatch = () => handleMismatch(node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragmentStart);
    const { type, ref: ref2, shapeFlag } = vnode;
    const domType = node.nodeType;
    vnode.el = node;
    let nextNode = null;
    switch (type) {
      case Text:
        if (domType !== 3) {
          nextNode = onMismatch();
        } else {
          if (node.data !== vnode.children) {
            hasMismatch = true;
            node.data = vnode.children;
          }
          nextNode = nextSibling(node);
        }
        break;
      case Comment:
        if (domType !== 8 || isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = nextSibling(node);
        }
        break;
      case Static:
        if (domType !== 1) {
          nextNode = onMismatch();
        } else {
          nextNode = node;
          const needToAdoptContent = !vnode.children.length;
          for (let i = 0; i < vnode.staticCount; i++) {
            if (needToAdoptContent)
              vnode.children += nextNode.outerHTML;
            if (i === vnode.staticCount - 1) {
              vnode.anchor = nextNode;
            }
            nextNode = nextSibling(nextNode);
          }
          return nextNode;
        }
        break;
      case Fragment:
        if (!isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = hydrateFragment(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
        }
        break;
      default:
        if (shapeFlag & 1) {
          if (domType !== 1 || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) {
            nextNode = onMismatch();
          } else {
            nextNode = hydrateElement(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
          }
        } else if (shapeFlag & 6) {
          vnode.slotScopeIds = slotScopeIds;
          const container = parentNode(node);
          mountComponent(vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container), optimized);
          nextNode = isFragmentStart ? locateClosingAsyncAnchor(node) : nextSibling(node);
          if (isAsyncWrapper(vnode)) {
            let subTree;
            if (isFragmentStart) {
              subTree = createVNode(Fragment);
              subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
            } else {
              subTree = node.nodeType === 3 ? createTextVNode("") : createVNode("div");
            }
            subTree.el = node;
            vnode.component.subTree = subTree;
          }
        } else if (shapeFlag & 64) {
          if (domType !== 8) {
            nextNode = onMismatch();
          } else {
            nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, rendererInternals, hydrateChildren);
          }
        } else if (shapeFlag & 128) {
          nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, isSVGContainer(parentNode(node)), slotScopeIds, optimized, rendererInternals, hydrateNode);
        } else
          ;
    }
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode);
    }
    return nextNode;
  };
  const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!vnode.dynamicChildren;
    const { type, props, patchFlag, shapeFlag, dirs } = vnode;
    const forcePatchValue = type === "input" && dirs || type === "option";
    if (forcePatchValue || patchFlag !== -1) {
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      if (props) {
        if (forcePatchValue || !optimized || patchFlag & (16 | 32)) {
          for (const key in props) {
            if (forcePatchValue && key.endsWith("value") || isOn(key) && !isReservedProp(key)) {
              patchProp2(el, key, null, props[key], false, void 0, parentComponent);
            }
          }
        } else if (props.onClick) {
          patchProp2(el, "onClick", null, props.onClick, false, void 0, parentComponent);
        }
      }
      let vnodeHooks;
      if (vnodeHooks = props && props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHooks, parentComponent, vnode);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      if ((vnodeHooks = props && props.onVnodeMounted) || dirs) {
        queueEffectWithSuspense(() => {
          vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
      if (shapeFlag & 16 && !(props && (props.innerHTML || props.textContent))) {
        let next = hydrateChildren(el.firstChild, vnode, el, parentComponent, parentSuspense, slotScopeIds, optimized);
        while (next) {
          hasMismatch = true;
          const cur = next;
          next = next.nextSibling;
          remove2(cur);
        }
      } else if (shapeFlag & 8) {
        if (el.textContent !== vnode.children) {
          hasMismatch = true;
          el.textContent = vnode.children;
        }
      }
    }
    return el.nextSibling;
  };
  const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!parentVNode.dynamicChildren;
    const children = parentVNode.children;
    const l = children.length;
    for (let i = 0; i < l; i++) {
      const vnode = optimized ? children[i] : children[i] = normalizeVNode(children[i]);
      if (node) {
        node = hydrateNode(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
      } else if (vnode.type === Text && !vnode.children) {
        continue;
      } else {
        hasMismatch = true;
        patch(null, vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container), slotScopeIds);
      }
    }
    return node;
  };
  const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    const { slotScopeIds: fragmentSlotScopeIds } = vnode;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    const container = parentNode(node);
    const next = hydrateChildren(nextSibling(node), vnode, container, parentComponent, parentSuspense, slotScopeIds, optimized);
    if (next && isComment(next) && next.data === "]") {
      return nextSibling(vnode.anchor = next);
    } else {
      hasMismatch = true;
      insert(vnode.anchor = createComment(`]`), container, next);
      return next;
    }
  };
  const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
    hasMismatch = true;
    vnode.el = null;
    if (isFragment) {
      const end = locateClosingAsyncAnchor(node);
      while (true) {
        const next2 = nextSibling(node);
        if (next2 && next2 !== end) {
          remove2(next2);
        } else {
          break;
        }
      }
    }
    const next = nextSibling(node);
    const container = parentNode(node);
    remove2(node);
    patch(null, vnode, container, next, parentComponent, parentSuspense, isSVGContainer(container), slotScopeIds);
    return next;
  };
  const locateClosingAsyncAnchor = (node) => {
    let match = 0;
    while (node) {
      node = nextSibling(node);
      if (node && isComment(node)) {
        if (node.data === "[")
          match++;
        if (node.data === "]") {
          if (match === 0) {
            return nextSibling(node);
          } else {
            match--;
          }
        }
      }
    }
    return node;
  };
  return [hydrate, hydrateNode];
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createHydrationRenderer(options) {
  return baseCreateRenderer(options, createHydrationFunctions);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, cloneNode: hostCloneNode, insertStaticContent: hostInsertStaticContent } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        }
        break;
      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        break;
      default:
        if (shapeFlag & 1) {
          processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 6) {
          processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 64) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (shapeFlag & 128) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else
          ;
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, patchFlag, dirs } = vnode;
    if (vnode.el && hostCloneNode !== void 0 && patchFlag === -1) {
      el = vnode.el = hostCloneNode(vnode.el);
    } else {
      el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
      if (shapeFlag & 8) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      if (props) {
        for (const key in props) {
          if (key !== "value" && !isReservedProp(key)) {
            hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        if ("value" in props) {
          hostPatchProp(el, "value", null, props.value);
        }
        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
    } else if (!optimized) {
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : fallbackContainer;
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
        if (n2.key != null || parentComponent && n2 === parentComponent.subTree) {
          traverseStaticChildren(n1, n2, true);
        }
      } else {
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
      } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.component = n1.component;
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            instance.subTree = renderComponentRoot(instance);
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(() => !instance.isUnmounted && hydrateSubTree());
          } else {
            hydrateSubTree();
          }
        } else {
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
        }
        if (initialVNode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, isSVG);
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
        }
      }
    };
    const effect = instance.effect = new ReactiveEffect(componentUpdateFn, () => queueJob(instance.update), instance.scope);
    const update = instance.update = effect.run.bind(effect);
    update.id = instance.uid;
    toggleRecurse(instance, true);
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(void 0, instance.update);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove3 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove3();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove3, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const { type, props, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
      } else if (dynamicChildren && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      removeFragment(el, anchor);
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(internals);
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
const isTeleport = (type) => type.__isTeleport;
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol();
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(Component);
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = resolve(instance[type] || Component[type], name) || resolve(instance.appContext[type], name);
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const Fragment = Symbol(void 0);
const Text = Symbol(void 0);
const Comment = Symbol(void 0);
const Static = Symbol(void 0);
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({ ref: ref2, ref_key, ref_for }) => {
  return ref2 != null ? isString$1(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString$1(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(type, props, true);
    if (children) {
      normalizeChildren(cloned, children);
    }
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString$1(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString$1(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor
  };
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray(child)) {
    return createVNode(Fragment, null, child.slice());
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
function renderList(source, renderItem, cache, index2) {
  let ret;
  const cached = cache && cache[index2];
  if (isArray(source) || isString$1(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index2] = ret;
  }
  return ret;
}
function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.isCE) {
    return createVNode("slot", name === "default" ? null : { name }, fallback && fallback());
  }
  let slot = slots[name];
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const rendered = createBlock(Fragment, { key: props.key || `_${name}` }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1 ? 64 : -2);
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child))
      return true;
    if (child.type === Comment)
      return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = extend(Object.create(null), {
  $: (i) => i,
  $el: (i) => i.vnode.el,
  $data: (i) => i.data,
  $props: (i) => i.props,
  $attrs: (i) => i.attrs,
  $slots: (i) => i.slots,
  $refs: (i) => i.refs,
  $parent: (i) => getPublicInstance(i.parent),
  $root: (i) => getPublicInstance(i.root),
  $emit: (i) => i.emit,
  $options: (i) => resolveMergedOptions(i),
  $forceUpdate: (i) => () => queueJob(i.update),
  $nextTick: (i) => nextTick.bind(i.proxy),
  $watch: (i) => instanceWatch.bind(i)
});
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else
      ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
      setupState[key] = value;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || setupState !== EMPTY_OBJ && hasOwn(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  }
};
const emptyAppContext = createAppContext();
let uid$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(true),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else
    ;
  finishComponentSetup(instance, isSSR);
}
let compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template;
      if (template) {
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(extend({
          isCustomElement,
          delimiters
        }, compilerOptions), componentCompilerOptions);
        Component.render = compile(template, finalCompilerOptions);
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
}
function createAttrsProxy(instance) {
  return new Proxy(instance.attrs, {
    get(target, key) {
      track(instance, "get", "$attrs");
      return target[key];
    }
  });
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return {
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      }
    }));
  }
}
function getComponentName(Component) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    console.error(err);
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if ((!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queueCb(cb, activeQueue, pendingQueue, index2) {
  if (!isArray(cb)) {
    if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index2 + 1 : index2)) {
      pendingQueue.push(cb);
    }
  } else {
    pendingQueue.push(...cb);
  }
  queueFlush();
}
function queuePreFlushCb(cb) {
  queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}
function queuePostFlushCb(cb) {
  queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}
function flushPreFlushCbs(seen2, parentJob = null) {
  if (pendingPreFlushCbs.length) {
    currentPreFlushParentJob = parentJob;
    activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
    pendingPreFlushCbs.length = 0;
    for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
      activePreFlushCbs[preFlushIndex]();
    }
    activePreFlushCbs = null;
    preFlushIndex = 0;
    currentPreFlushParentJob = null;
    flushPreFlushCbs(seen2, parentJob);
  }
}
function flushPostFlushCbs(seen2) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
function flushJobs(seen2) {
  isFlushPending = false;
  isFlushing = true;
  flushPreFlushCbs(seen2);
  queue.sort((a, b) => getId(a) - getId(b));
  const check = NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (false)
          ;
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs();
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
      flushJobs(seen2);
    }
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = !!source._shallow;
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some(isReactive);
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else
        ;
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onInvalidate]);
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onInvalidate = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  if (isInSSRComponentSetup) {
    onInvalidate = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onInvalidate
      ]);
    }
    return NOOP;
  }
  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
          onInvalidate
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    scheduler = () => {
      if (!instance || instance.isMounted) {
        queuePreFlushCb(job);
      } else {
        job();
      }
    };
  }
  const effect = new ReactiveEffect(getter, scheduler);
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  return () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString$1(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen2) {
  if (!isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen2 = seen2 || new Set();
  if (seen2.has(value)) {
    return value;
  }
  seen2.add(value);
  if (isRef(value)) {
    traverse(value.value, seen2);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen2);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen2);
    });
  } else if (isPlainObject$1(value)) {
    for (const key in value) {
      traverse(value[key], seen2);
    }
  }
  return value;
}
function h(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
const version = "3.2.26";
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const staticTemplateCache = new Map();
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector2) => doc.querySelector(selector2),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  cloneNode(el) {
    const cloned = el.cloneNode(true);
    if (`_value` in el) {
      cloned._value = el._value;
    }
    return cloned;
  },
  insertStaticContent(content, parent, anchor, isSVG) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    let template = staticTemplateCache.get(content);
    if (!template) {
      const t = doc.createElement("template");
      t.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      template = t.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      staticTemplateCache.set(content, template);
    }
    parent.insertBefore(template.cloneNode(true), anchor);
    return [
      before ? before.nextSibling : parent.firstChild,
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass(el, value, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString$1(next);
  if (next && !isCssString) {
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
    if (prev && !isString$1(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style.display = currentDisplay;
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean = isSpecialBooleanAttr(key);
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  if (key === "value" && el.tagName !== "PROGRESS" && !el.tagName.includes("-")) {
    el._value = value;
    const newValue = value == null ? "" : value;
    if (el.value !== newValue || el.tagName === "OPTION") {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      el[key] = includeBooleanAttr(value);
      return;
    } else if (value == null && type === "string") {
      el[key] = "";
      el.removeAttribute(key);
      return;
    } else if (type === "number") {
      try {
        el[key] = 0;
      } catch (_a2) {
      }
      el.removeAttribute(key);
      return;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
  }
}
let _getNow = Date.now;
let skipTimestampCheck = false;
if (typeof window !== "undefined") {
  if (_getNow() > document.createEvent("Event").timeStamp) {
    _getNow = () => performance.now();
  }
  const ffMatch = navigator.userAgent.match(/firefox\/(\d+)/i);
  skipTimestampCheck = !!(ffMatch && Number(ffMatch[1]) <= 53);
}
let cachedNow = 0;
const p = Promise.resolve();
const reset = () => {
  cachedNow = 0;
};
const getNow = () => cachedNow || (p.then(reset), cachedNow = _getNow());
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  return [hyphenate(name.slice(2)), options];
}
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    const timeStamp = e.timeStamp || _getNow();
    if (skipTimestampCheck || timeStamp >= invoker.attached - 1) {
      callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
    }
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn) => (e2) => !e2._stopped && fn(e2));
  } else {
    return value;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString$1(value)) {
    return false;
  }
  return key in el;
}
const TRANSITION = "transition";
const ANIMATION = "animation";
const Transition = (props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots);
Transition.displayName = "Transition";
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
Transition.props = /* @__PURE__ */ extend({}, BaseTransition.props, DOMTransitionPropsValidators);
const callHook = (hook, args = []) => {
  if (isArray(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? isArray(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const { name = "v", type, duration, enterFromClass = `${name}-enter-from`, enterActiveClass = `${name}-enter-active`, enterToClass = `${name}-enter-to`, appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = `${name}-leave-from`, leaveActiveClass = `${name}-leave-active`, leaveToClass = `${name}-leave-to` } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve2 = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve2]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve2);
        }
      });
    };
  };
  return extend(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      const resolve2 = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve2);
        }
      });
      callHook(onLeave, [el, resolve2]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
}
function NumberOf(val) {
  const res = toNumber(val);
  return res;
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (el._vtc || (el._vtc = new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const { _vtc } = el;
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el._vtc = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve2();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve2();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(TRANSITION + "Delay");
  const transitionDurations = getStyleProperties(TRANSITION + "Duration");
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(ANIMATION + "Delay");
  const animationDurations = getStyleProperties(ANIMATION + "Duration");
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(styles[TRANSITION + "Property"]);
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}
const vShow = {
  beforeMount(el, { value }, { transition }) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue)
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el._vod : "none";
}
const rendererOptions = extend({ patchProp }, nodeOps);
let renderer;
let enabledHydration = false;
function ensureHydrationRenderer() {
  renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions);
  enabledHydration = true;
  return renderer;
}
const createSSRApp = (...args) => {
  const app = ensureHydrationRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (container) {
      return mount(container, true, container instanceof SVGElement);
    }
  };
  return app;
};
function normalizeContainer(container) {
  if (isString$1(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
/*!
  * vue-router v4.0.12
  * (c) 2021 Eduardo San Martin Morote
  * @license MIT
  */
const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
const PolySymbol = (name) => hasSymbol ? Symbol(name) : "_vr_" + name;
const matchedRouteKey = /* @__PURE__ */ PolySymbol("rvlm");
const viewDepthKey = /* @__PURE__ */ PolySymbol("rvd");
const routerKey = /* @__PURE__ */ PolySymbol("r");
const routeLocationKey = /* @__PURE__ */ PolySymbol("rl");
const routerViewLocationKey = /* @__PURE__ */ PolySymbol("rvl");
const isBrowser = typeof window !== "undefined";
function isESModule(obj) {
  return obj.__esModule || hasSymbol && obj[Symbol.toStringTag] === "Module";
}
const assign = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = Array.isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop$1 = () => {
};
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery2, location2, currentLocation = "/") {
  let path, query = {}, searchString = "", hash = "";
  const searchPos = location2.indexOf("?");
  const hashPos = location2.indexOf("#", searchPos > -1 ? searchPos : 0);
  if (searchPos > -1) {
    path = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
    query = parseQuery2(searchString);
  }
  if (hashPos > -1) {
    path = path || location2.slice(0, hashPos);
    hash = location2.slice(hashPos, location2.length);
  }
  path = resolveRelativePath(path != null ? path : location2, currentLocation);
  return {
    fullPath: path + (searchString && "?") + searchString + hash,
    path,
    query,
    hash
  };
}
function stringifyURL(stringifyQuery2, location2) {
  const query = location2.query ? stringifyQuery2(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
function stripBase(pathname, base2) {
  if (!base2 || !pathname.toLowerCase().startsWith(base2.toLowerCase()))
    return pathname;
  return pathname.slice(base2.length) || "/";
}
function isSameRouteLocation(stringifyQuery2, a, b) {
  const aLastIndex = a.matched.length - 1;
  const bLastIndex = b.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery2(a.query) === stringifyQuery2(b.query) && a.hash === b.hash;
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length)
    return false;
  for (const key in a) {
    if (!isSameRouteLocationParamsValue(a[key], b[key]))
      return false;
  }
  return true;
}
function isSameRouteLocationParamsValue(a, b) {
  return Array.isArray(a) ? isEquivalentArray(a, b) : Array.isArray(b) ? isEquivalentArray(b, a) : a === b;
}
function isEquivalentArray(a, b) {
  return Array.isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/"))
    return to;
  if (!to)
    return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (position === 1 || segment === ".")
      continue;
    if (segment === "..")
      position--;
    else
      break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition - (toPosition === toSegments.length ? 1 : 0)).join("/");
}
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
function normalizeBase(base2) {
  if (!base2) {
    if (isBrowser) {
      const baseEl = document.querySelector("base");
      base2 = baseEl && baseEl.getAttribute("href") || "/";
      base2 = base2.replace(/^\w+:\/\/[^\/]+/, "");
    } else {
      base2 = "/";
    }
  }
  if (base2[0] !== "/" && base2[0] !== "#")
    base2 = "/" + base2;
  return removeTrailingSlash(base2);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base2, location2) {
  return base2.replace(BEFORE_HASH_RE, "#") + location2;
}
function getElementPosition(el, offset2) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset2.behavior,
    left: elRect.left - docRect.left - (offset2.left || 0),
    top: elRect.top - docRect.top - (offset2.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else {
    scrollToOptions = position;
  }
  if ("scrollBehavior" in document.documentElement.style)
    window.scrollTo(scrollToOptions);
  else {
    window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.pageXOffset, scrollToOptions.top != null ? scrollToOptions.top : window.pageYOffset);
  }
}
function getScrollKey(path, delta) {
  const position = history.state ? history.state.position - delta : -1;
  return position + path;
}
const scrollPositions = new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
let createBaseLocation = () => location.protocol + "//" + location.host;
function createCurrentLocation(base2, location2) {
  const { pathname, search: search2, hash } = location2;
  const hashPos = base2.indexOf("#");
  if (hashPos > -1) {
    let slicePos = hash.includes(base2.slice(hashPos)) ? base2.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    if (pathFromHash[0] !== "/")
      pathFromHash = "/" + pathFromHash;
    return stripBase(pathFromHash, "");
  }
  const path = stripBase(pathname, base2);
  return path + search2 + hash;
}
function useHistoryListeners(base2, historyState, currentLocation, replace) {
  let listeners = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation(base2, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else {
      replace(to);
    }
    listeners.forEach((listener) => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    listeners.push(callback);
    const teardown = () => {
      const index2 = listeners.indexOf(callback);
      if (index2 > -1)
        listeners.splice(index2, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    const { history: history2 } = window;
    if (!history2.state)
      return;
    history2.replaceState(assign({}, history2.state, { scroll: computeScrollPosition() }), "");
  }
  function destroy() {
    for (const teardown of teardowns)
      teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("beforeunload", beforeUnloadListener);
  }
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("beforeunload", beforeUnloadListener);
  return {
    pauseListeners,
    listen,
    destroy
  };
}
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(base2) {
  const { history: history2, location: location2 } = window;
  const currentLocation = {
    value: createCurrentLocation(base2, location2)
  };
  const historyState = { value: history2.state };
  if (!historyState.value) {
    changeLocation(currentLocation.value, {
      back: null,
      current: currentLocation.value,
      forward: null,
      position: history2.length - 1,
      replaced: true,
      scroll: null
    }, true);
  }
  function changeLocation(to, state, replace2) {
    const hashIndex = base2.indexOf("#");
    const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base2 : base2.slice(hashIndex)) + to : createBaseLocation() + base2 + to;
    try {
      history2[replace2 ? "replaceState" : "pushState"](state, "", url);
      historyState.value = state;
    } catch (err) {
      {
        console.error(err);
      }
      location2[replace2 ? "replace" : "assign"](url);
    }
  }
  function replace(to, data) {
    const state = assign({}, history2.state, buildState(historyState.value.back, to, historyState.value.forward, true), data, { position: historyState.value.position });
    changeLocation(to, state, true);
    currentLocation.value = to;
  }
  function push(to, data) {
    const currentState = assign({}, historyState.value, history2.state, {
      forward: to,
      scroll: computeScrollPosition()
    });
    changeLocation(currentState.current, currentState, true);
    const state = assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
    changeLocation(to, state, false);
    currentLocation.value = to;
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  };
}
function createWebHistory(base2) {
  base2 = normalizeBase(base2);
  const historyNavigation = useHistoryStateNavigation(base2);
  const historyListeners = useHistoryListeners(base2, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta, triggerListeners = true) {
    if (!triggerListeners)
      historyListeners.pauseListeners();
    history.go(delta);
  }
  const routerHistory = assign({
    location: "",
    base: base2,
    go,
    createHref: createHref.bind(null, base2)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => historyNavigation.location.value
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => historyNavigation.state.value
  });
  return routerHistory;
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
const NavigationFailureSymbol = /* @__PURE__ */ PolySymbol("nf");
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
function createRouterError(type, params) {
  {
    return assign(new Error(), {
      type,
      [NavigationFailureSymbol]: true
    }, params);
  }
}
function isNavigationFailure(error, type) {
  return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [90];
    if (options.strict && !segment.length)
      pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
      if (token.type === 0) {
        if (!tokenIndex)
          pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += 40;
      } else if (token.type === 1) {
        const { value, repeatable, optional, regexp } = token;
        keys.push({
          name: value,
          repeatable,
          optional
        });
        const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re2 !== BASE_PARAM_PATTERN) {
          subSegmentScore += 10;
          try {
            new RegExp(`(${re2})`);
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
        if (!tokenIndex)
          subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional)
          subPattern += "?";
        pattern += subPattern;
        subSegmentScore += 20;
        if (optional)
          subSegmentScore += -8;
        if (repeatable)
          subSegmentScore += -20;
        if (re2 === ".*")
          subSegmentScore += -50;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i = score.length - 1;
    score[i][score[i].length - 1] += 0.7000000000000001;
  }
  if (!options.strict)
    pattern += "/?";
  if (options.end)
    pattern += "$";
  else if (options.strict)
    pattern += "(?:/|$)";
  const re = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse(path) {
    const match = path.match(re);
    const params = {};
    if (!match)
      return null;
    for (let i = 1; i < match.length; i++) {
      const value = match[i] || "";
      const key = keys[i - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/"))
        path += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) {
        if (token.type === 0) {
          path += token.value;
        } else if (token.type === 1) {
          const { value, repeatable, optional } = token;
          const param = value in params ? params[value] : "";
          if (Array.isArray(param) && !repeatable)
            throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
          const text = Array.isArray(param) ? param.join("/") : param;
          if (!text) {
            if (optional) {
              if (segment.length < 2) {
                if (path.endsWith("/"))
                  path = path.slice(0, -1);
                else
                  avoidDuplicatedSlash = true;
              }
            } else
              throw new Error(`Missing required param "${value}"`);
          }
          path += text;
        }
      }
    }
    return path;
  }
  return {
    re,
    score,
    keys,
    parse,
    stringify
  };
}
function compareScoreArray(a, b) {
  let i = 0;
  while (i < a.length && i < b.length) {
    const diff = b[i] - a[i];
    if (diff)
      return diff;
    i++;
  }
  if (a.length < b.length) {
    return a.length === 1 && a[0] === 40 + 40 ? -1 : 1;
  } else if (a.length > b.length) {
    return b.length === 1 && b[0] === 40 + 40 ? 1 : -1;
  }
  return 0;
}
function comparePathParserScore(a, b) {
  let i = 0;
  const aScore = a.score;
  const bScore = b.score;
  while (i < aScore.length && i < bScore.length) {
    const comp = compareScoreArray(aScore[i], bScore[i]);
    if (comp)
      return comp;
    i++;
  }
  return bScore.length - aScore.length;
}
const ROOT_TOKEN = {
  type: 0,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path)
    return [[]];
  if (path === "/")
    return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) {
    throw new Error(`Invalid path "${path}"`);
  }
  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer}": ${message}`);
  }
  let state = 0;
  let previousState = state;
  const tokens = [];
  let segment;
  function finalizeSegment() {
    if (segment)
      tokens.push(segment);
    segment = [];
  }
  let i = 0;
  let char;
  let buffer = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer)
      return;
    if (state === 0) {
      segment.push({
        type: 0,
        value: buffer
      });
    } else if (state === 1 || state === 2 || state === 3) {
      if (segment.length > 1 && (char === "*" || char === "+"))
        crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: 1,
        value: buffer,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else {
      crash("Invalid state to consume buffer");
    }
    buffer = "";
  }
  function addCharToBuffer() {
    buffer += char;
  }
  while (i < path.length) {
    char = path[i++];
    if (char === "\\" && state !== 2) {
      previousState = state;
      state = 4;
      continue;
    }
    switch (state) {
      case 0:
        if (char === "/") {
          if (buffer) {
            consumeBuffer();
          }
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = 1;
        } else {
          addCharToBuffer();
        }
        break;
      case 4:
        addCharToBuffer();
        state = previousState;
        break;
      case 1:
        if (char === "(") {
          state = 2;
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer();
        } else {
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i--;
        }
        break;
      case 2:
        if (char === ")") {
          if (customRe[customRe.length - 1] == "\\")
            customRe = customRe.slice(0, -1) + char;
          else
            state = 3;
        } else {
          customRe += char;
        }
        break;
      case 3:
        consumeBuffer();
        state = 0;
        if (char !== "*" && char !== "?" && char !== "+")
          i--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === 2)
    crash(`Unfinished custom RegExp for param "${buffer}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  const matcher = assign(parser, {
    record,
    parent,
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf)
      parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes, globalOptions) {
  const matchers = [];
  const matcherMap = new Map();
  globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [
      mainNormalizedRecord
    ];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) {
        normalizedRecords.push(assign({}, mainNormalizedRecord, {
          components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
          path: alias,
          aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
        }));
      }
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher)
          originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher))
          removeRoute(record.name);
      }
      if ("children" in mainNormalizedRecord) {
        const children = mainNormalizedRecord.children;
        for (let i = 0; i < children.length; i++) {
          addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
        }
      }
      originalRecord = originalRecord || matcher;
      insertMatcher(matcher);
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop$1;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index2 = matchers.indexOf(matcherRef);
      if (index2 > -1) {
        matchers.splice(index2, 1);
        if (matcherRef.record.name)
          matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    let i = 0;
    while (i < matchers.length && comparePathParserScore(matcher, matchers[i]) >= 0)
      i++;
    matchers.splice(i, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher))
      matcherMap.set(matcher.record.name, matcher);
  }
  function resolve2(location2, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location2 && location2.name) {
      matcher = matcherMap.get(location2.name);
      if (!matcher)
        throw createRouterError(1, {
          location: location2
        });
      name = matcher.record.name;
      params = assign(paramsFromLocation(currentLocation.params, matcher.keys.filter((k) => !k.optional).map((k) => k.name)), location2.params);
      path = matcher.stringify(params);
    } else if ("path" in location2) {
      path = location2.path;
      matcher = matchers.find((m) => m.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
      if (!matcher)
        throw createRouterError(1, {
          location: location2,
          currentLocation
        });
      name = matcher.record.name;
      params = assign({}, currentLocation.params, location2.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes.forEach((route) => addRoute(route));
  return { addRoute, resolve: resolve2, removeRoute, getRoutes, getRecordMatcher };
}
function paramsFromLocation(params, keys) {
  const newParams = {};
  for (const key of keys) {
    if (key in params)
      newParams[key] = params[key];
  }
  return newParams;
}
function normalizeRouteRecord(record) {
  return {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: void 0,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components: "components" in record ? record.components || {} : { default: record.component }
  };
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props = record.props || false;
  if ("component" in record) {
    propsObject.default = props;
  } else {
    for (const name in record.components)
      propsObject[name] = typeof props === "boolean" ? props : props[name];
  }
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf)
      return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function mergeOptions(defaults, partialOptions) {
  const options = {};
  for (const key in defaults) {
    options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
  }
  return options;
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text) {
  return text == null ? "" : encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
  try {
    return decodeURIComponent("" + text);
  } catch (err) {
  }
  return "" + text;
}
function parseQuery(search2) {
  const query = {};
  if (search2 === "" || search2 === "?")
    return query;
  const hasLeadingIM = search2[0] === "?";
  const searchParams = (hasLeadingIM ? search2.slice(1) : search2).split("&");
  for (let i = 0; i < searchParams.length; ++i) {
    const searchParam = searchParams[i].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!Array.isArray(currentValue)) {
        currentValue = query[key] = [currentValue];
      }
      currentValue.push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}
function stringifyQuery(query) {
  let search2 = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) {
        search2 += (search2.length ? "&" : "") + key;
      }
      continue;
    }
    const values = Array.isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)];
    values.forEach((value2) => {
      if (value2 !== void 0) {
        search2 += (search2.length ? "&" : "") + key;
        if (value2 != null)
          search2 += "=" + value2;
      }
    });
  }
  return search2;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) {
      normalizedQuery[key] = Array.isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
    }
  }
  return normalizedQuery;
}
function useCallbacks() {
  let handlers = [];
  function add2(handler) {
    handlers.push(handler);
    return () => {
      const i = handlers.indexOf(handler);
      if (i > -1)
        handlers.splice(i, 1);
    };
  }
  function reset2() {
    handlers = [];
  }
  return {
    add: add2,
    list: () => handlers,
    reset: reset2
  };
}
function guardToPromiseFn(guard, to, from, record, name) {
  const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve2, reject) => {
    const next = (valid) => {
      if (valid === false)
        reject(createRouterError(4, {
          from,
          to
        }));
      else if (valid instanceof Error) {
        reject(valid);
      } else if (isRouteLocation(valid)) {
        reject(createRouterError(2, {
          from: to,
          to: valid
        }));
      } else {
        if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function")
          enterCallbackArray.push(valid);
        resolve2();
      }
    };
    const guardReturn = guard.call(record && record.instances[name], to, from, next);
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3)
      guardCall = guardCall.then(next);
    guardCall.catch((err) => reject(err));
  });
}
function extractComponentsGuards(matched, guardType, to, from) {
  const guards = [];
  for (const record of matched) {
    for (const name in record.components) {
      let rawComponent = record.components[name];
      if (guardType !== "beforeRouteEnter" && !record.instances[name])
        continue;
      if (isRouteComponent(rawComponent)) {
        const options = rawComponent.__vccOpts || rawComponent;
        const guard = options[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name));
      } else {
        let componentPromise = rawComponent();
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved)
            return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}"`));
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.components[name] = resolvedComponent;
          const options = resolvedComponent.__vccOpts || resolvedComponent;
          const guard = options[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name)();
        }));
      }
    }
  }
  return guards;
}
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function useLink(props) {
  const router = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  const route = computed(() => router.resolve(unref(props.to)));
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length)
      return -1;
    const index2 = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index2 > -1)
      return index2;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index2;
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e = {}) {
    if (guardEvent(e)) {
      return router[unref(props.replace) ? "replace" : "push"](unref(props.to)).catch(noop$1);
    }
    return Promise.resolve();
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive(useLink(props));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && slots.default(link);
      return props.custom ? children : h("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
    return;
  if (e.defaultPrevented)
    return;
  if (e.button !== void 0 && e.button !== 0)
    return;
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target))
      return;
  }
  if (e.preventDefault)
    e.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue)
        return false;
    } else {
      if (!Array.isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i]))
        return false;
    }
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  setup(props, { attrs, slots }) {
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const depth = inject(viewDepthKey, 0);
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth]);
    provide(viewDepthKey, depth + 1);
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) {
            to.leaveGuards = from.leaveGuards;
          }
          if (!to.updateGuards.size) {
            to.updateGuards = from.updateGuards;
          }
        }
      }
      if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
        (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
      }
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[props.name];
      const currentName = props.name;
      if (!ViewComponent) {
        return normalizeSlot(slots.default, { Component: ViewComponent, route });
      }
      const routePropsOption = matchedRoute.props[props.name];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) {
          matchedRoute.instances[currentName] = null;
        }
      };
      const component = h(ViewComponent, assign({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      return normalizeSlot(slots.default, { Component: component, route }) || component;
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot)
    return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = applyToParams.bind(null, decode);
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      record = route;
    } else {
      record = parentOrRoute;
    }
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) {
      matcher.removeRoute(recordMatcher);
    }
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve2(rawLocation, currentLocation) {
    currentLocation = assign({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href2 = routerHistory.createHref(locationNormalized.fullPath);
      return assign(locationNormalized, matchedRoute2, {
        params: decodeParams(matchedRoute2.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href2
      });
    }
    let matcherLocation;
    if ("path" in rawLocation) {
      matcherLocation = assign({}, rawLocation, {
        path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
      });
    } else {
      const targetParams = assign({}, rawLocation.params);
      for (const key in targetParams) {
        if (targetParams[key] == null) {
          delete targetParams[key];
        }
      }
      matcherLocation = assign({}, rawLocation, {
        params: encodeParams(rawLocation.params)
      });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    return assign({
      fullPath,
      hash,
      query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) {
      return createRouterError(8, {
        from,
        to
      });
    }
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(assign(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
        newTargetLocation.params = {};
      }
      return assign({
        query: to.query,
        hash: to.hash,
        params: to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve2(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    const replace2 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation);
    if (shouldRedirect)
      return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
        state: data,
        force,
        replace: replace2
      }), redirectedFrom || targetLocation);
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(16, { to: toLocation, from });
      handleScroll(from, from, true, false);
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? error : triggerError(error, toLocation, from)).then((failure2) => {
      if (failure2) {
        if (isNavigationFailure(failure2, 2)) {
          return pushWithRedirect(assign(locationAsObject(failure2.to), {
            state: data,
            force,
            replace: replace2
          }), redirectedFrom || toLocation);
        }
      } else {
        failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
      }
      triggerAfterEach(toLocation, from, failure2);
      return failure2;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) {
      record.leaveGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
    }
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) {
        record.updateGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of to.matched) {
        if (record.beforeEnter && !from.matched.includes(record)) {
          if (Array.isArray(record.beforeEnter)) {
            for (const beforeEnter of record.beforeEnter)
              guards.push(guardToPromiseFn(beforeEnter, to, from));
          } else {
            guards.push(guardToPromiseFn(record.beforeEnter, to, from));
          }
        }
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(err, 8) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    for (const guard of afterGuards.list())
      guard(to, from, failure);
  }
  function finalizeNavigation(toLocation, from, isPush, replace2, data) {
    const error = checkCanceledNavigation(toLocation, from);
    if (error)
      return error;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    if (isPush) {
      if (replace2 || isFirstNavigation)
        routerHistory.replace(toLocation.fullPath, assign({
          scroll: isFirstNavigation && state && state.scroll
        }, data));
      else
        routerHistory.push(toLocation.fullPath, data);
    }
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      const toLocation = resolve2(to);
      const shouldRedirect = handleRedirectRecord(toLocation);
      if (shouldRedirect) {
        pushWithRedirect(assign(shouldRedirect, { replace: true }), toLocation).catch(noop$1);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser) {
        saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      }
      navigate(toLocation, from).catch((error) => {
        if (isNavigationFailure(error, 4 | 8)) {
          return error;
        }
        if (isNavigationFailure(error, 2)) {
          pushWithRedirect(error.to, toLocation).then((failure) => {
            if (isNavigationFailure(failure, 4 | 16) && !info.delta && info.type === NavigationType.pop) {
              routerHistory.go(-1, false);
            }
          }).catch(noop$1);
          return Promise.reject();
        }
        if (info.delta)
          routerHistory.go(-info.delta, false);
        return triggerError(error, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(toLocation, from, false);
        if (failure) {
          if (info.delta) {
            routerHistory.go(-info.delta, false);
          } else if (info.type === NavigationType.pop && isNavigationFailure(failure, 4 | 16)) {
            routerHistory.go(-1, false);
          }
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop$1);
    });
  }
  let readyHandlers = useCallbacks();
  let errorHandlers = useCallbacks();
  let ready;
  function triggerError(error, to, from) {
    markAsReady(error);
    const list = errorHandlers.list();
    if (list.length) {
      list.forEach((handler) => handler(error, to, from));
    } else {
      console.error(error);
    }
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
      return Promise.resolve();
    return new Promise((resolve3, reject) => {
      readyHandlers.add([resolve3, reject]);
    });
  }
  function markAsReady(err) {
    if (ready)
      return;
    ready = true;
    setupListeners();
    readyHandlers.list().forEach(([resolve3, reject]) => err ? reject(err) : resolve3());
    readyHandlers.reset();
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser || !scrollBehavior)
      return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
  }
  const go = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = new Set();
  const router = {
    currentRoute,
    addRoute,
    removeRoute,
    hasRoute,
    getRoutes,
    resolve: resolve2,
    options,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorHandlers.add,
    isReady,
    install(app) {
      const router2 = this;
      app.component("RouterLink", RouterLink);
      app.component("RouterView", RouterView);
      app.config.globalProperties.$router = router2;
      Object.defineProperty(app.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      if (isBrowser && !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err) => {
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) {
        reactiveRoute[key] = computed(() => currentRoute.value[key]);
      }
      app.provide(routerKey, router2);
      app.provide(routeLocationKey, reactive(reactiveRoute));
      app.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app.unmount;
      installedApps.add(app);
      app.unmount = function() {
        installedApps.delete(app);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
    }
  };
  return router;
}
function runGuardQueue(guards) {
  return guards.reduce((promise2, guard) => promise2.then(() => guard()), Promise.resolve());
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i = 0; i < len; i++) {
    const recordFrom = from.matched[i];
    if (recordFrom) {
      if (to.matched.find((record) => isSameRouteRecord(record, recordFrom)))
        updatingRecords.push(recordFrom);
      else
        leavingRecords.push(recordFrom);
    }
    const recordTo = to.matched[i];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
        enteringRecords.push(recordTo);
      }
    }
  }
  return [leavingRecords, updatingRecords, enteringRecords];
}
function useRouter() {
  return inject(routerKey);
}
function useRoute() {
  return inject(routeLocationKey);
}
const ClientOnly = defineComponent({
  setup(_, ctx) {
    const isMounted = ref(false);
    onMounted(() => {
      isMounted.value = true;
    });
    return () => {
      var _a2, _b2;
      return isMounted.value ? (_b2 = (_a2 = ctx.slots).default) === null || _b2 === void 0 ? void 0 : _b2.call(_a2) : null;
    };
  }
});
const scriptRel = "modulepreload";
const seen = {};
const base = "/";
const __vitePreload = function preload(baseModule, deps) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  return Promise.all(deps.map((dep) => {
    dep = `${base}${dep}`;
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", rej);
      });
    }
  })).then(() => baseModule());
};
const pagesComponents = {
  "v-8daa1a0e": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-8daa1a0e" */
    "./index.html.6d8fbee4.js"
  ), true ? ["assets/index.html.6d8fbee4.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-67b7fbf4": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-67b7fbf4" */
    "./index.html.fac0db3c.js"
  ), true ? ["assets/index.html.fac0db3c.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-6886cbbd": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-6886cbbd" */
    "./elementui\u5728\u8868\u683C\u4E2D\u63D2\u5165\u56FE\u7247.html.cbcc9288.js"
  ), true ? ["assets/elementui在表格中插入图片.html.cbcc9288.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-b9c2d34a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-b9c2d34a" */
    "./index.html.06fbf831.js"
  ), true ? ["assets/index.html.06fbf831.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-4b48928e": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-4b48928e" */
    "./spring\u6CE8\u89E3.html.5fa3bd40.js"
  ), true ? ["assets/spring注解.html.5fa3bd40.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-9148d7c4": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-9148d7c4" */
    "./stripe\u652F\u4ED8.html.00bc0f20.js"
  ), true ? ["assets/stripe支付.html.00bc0f20.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-4bac9763": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-4bac9763" */
    "./utils.html.427981d2.js"
  ), true ? ["assets/utils.html.427981d2.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-66ff7ae2": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-66ff7ae2" */
    "./vscode\u5E38\u7528\u63D2\u4EF6.html.76715aba.js"
  ), true ? ["assets/vscode常用插件.html.76715aba.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-c8744e90": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-c8744e90" */
    "./01.\u8D77\u6B65.html.fec0c3ca.js"
  ), true ? ["assets/01.起步.html.fec0c3ca.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-3509cb32": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-3509cb32" */
    "./interview.html.336d0461.js"
  ), true ? ["assets/interview.html.336d0461.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-5d3f7a3b": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-5d3f7a3b" */
    "./JSinterview.html.3f55006d.js"
  ), true ? ["assets/JSinterview.html.3f55006d.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-2d570564": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-2d570564" */
    "./VUEinterview.html.f10ed3b4.js"
  ), true ? ["assets/VUEinterview.html.f10ed3b4.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-71958ec2": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-71958ec2" */
    "./story.html.ee3b0f88.js"
  ), true ? ["assets/story.html.ee3b0f88.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-3803ce0e": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-3803ce0e" */
    "./text.html.3745fc09.js"
  ), true ? ["assets/text.html.3745fc09.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-6c145c9c": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-6c145c9c" */
    "./reflection.html.6273b727.js"
  ), true ? ["assets/reflection.html.6273b727.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-88893a3e": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-88893a3e" */
    "./01.git\u7248\u672C\u63A7\u5236.html.dcd9911e.js"
  ), true ? ["assets/01.git版本控制.html.dcd9911e.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-061c80c6": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-061c80c6" */
    "./01.Linux\u5165\u95E8.html.cf54bc70.js"
  ), true ? ["assets/01.Linux入门.html.cf54bc70.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-6785e53a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-6785e53a" */
    "./01.mysql.html.17b255d0.js"
  ), true ? ["assets/01.mysql.html.17b255d0.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-4f12841a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-4f12841a" */
    "./02.mysql\u6578\u64DA\u7BA1\u7406.html.e4becf9d.js"
  ), true ? ["assets/02.mysql數據管理.html.e4becf9d.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-363b4215": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-363b4215" */
    "./03.mysql\u4E8B\u52D9.html.0a2ce64b.js"
  ), true ? ["assets/03.mysql事務.html.0a2ce64b.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-39d72d95": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-39d72d95" */
    "./04.JDBC.html.3f163700.js"
  ), true ? ["assets/04.JDBC.html.3f163700.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-23b022e9": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-23b022e9" */
    "./01.springboot.html.ff0afe20.js"
  ), true ? ["assets/01.springboot.html.ff0afe20.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-1f229241": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-1f229241" */
    "./02.springboot\u542F\u52A8\u539F\u7406.html.1cc7104e.js"
  ), true ? ["assets/02.springboot启动原理.html.1cc7104e.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-21d7a310": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-21d7a310" */
    "./03.springboot\u81EA\u52A8\u914D\u7F6E.html.67a8cd3b.js"
  ), true ? ["assets/03.springboot自动配置.html.67a8cd3b.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-64dc3831": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-64dc3831" */
    "./01.\u57FA\u7840\u4ECB\u7ECD.html.1a385654.js"
  ), true ? ["assets/01.基础介绍.html.1a385654.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-ff7fbc46": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-ff7fbc46" */
    "./02.\u6578\u64DA\u985E\u578B.html.aa910d81.js"
  ), true ? ["assets/02.數據類型.html.aa910d81.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-f1c2e4d6": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-f1c2e4d6" */
    "./01.\u6982\u8FF0.html.3a959204.js"
  ), true ? ["assets/01.概述.html.3a959204.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-72cc4ebc": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-72cc4ebc" */
    "./01-css.html.cb2f8632.js"
  ), true ? ["assets/01-css.html.cb2f8632.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-1b13d411": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-1b13d411" */
    "./01.html.2b9dd16f.js"
  ), true ? ["assets/01.html.2b9dd16f.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-4d4398ea": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-4d4398ea" */
    "./02.Dart\u8BED\u6CD5.html.9e76a94b.js"
  ), true ? ["assets/02.Dart语法.html.9e76a94b.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-8cbd5a1e": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-8cbd5a1e" */
    "./03.widget.html.e8a53b52.js"
  ), true ? ["assets/03.widget.html.e8a53b52.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-48456869": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-48456869" */
    "./04.\u57FA\u7840\u7EC4\u4EF6.html.b618b692.js"
  ), true ? ["assets/04.基础组件.html.b618b692.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-cce3d85c": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-cce3d85c" */
    "./01-html.html.bd7a2313.js"
  ), true ? ["assets/01-html.html.bd7a2313.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-72bd4e03": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-72bd4e03" */
    "./\u5165\u95E8\u5BFC\u8BBA.html.5febcf11.js"
  ), true ? ["assets/入门导论.html.5febcf11.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-783b80d4": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-783b80d4" */
    "./\u5185\u7F6E\u5BF9\u8C61.html.3a7510bd.js"
  ), true ? ["assets/内置对象.html.3a7510bd.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-5debe7e1": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-5debe7e1" */
    "./\u6570\u636E\u7C7B\u578B\u4E0E\u8FD0\u7B97\u7B26.html.c519f5d8.js"
  ), true ? ["assets/数据类型与运算符.html.c519f5d8.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-24f06668": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-24f06668" */
    "./\u8BED\u6CD5\u57FA\u7840.html.15014e61.js"
  ), true ? ["assets/语法基础.html.15014e61.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-4fa2b6ab": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-4fa2b6ab" */
    "./01.html.5c82e79d.js"
  ), true ? ["assets/01.html.5c82e79d.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-3689f102": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-3689f102" */
    "./01.html.c44062e2.js"
  ), true ? ["assets/01.html.c44062e2.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-998cc5e4": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-998cc5e4" */
    "./02.\u53D8\u91CF\u58F0\u660E.html.7bb10475.js"
  ), true ? ["assets/02.变量声明.html.7bb10475.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-3859e3e8": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-3859e3e8" */
    "./03.\u63A5\u53E3.html.8da389d4.js"
  ), true ? ["assets/03.接口.html.8da389d4.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-1e578a45": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-1e578a45" */
    "./04.\u7C7B.html.be0dc29e.js"
  ), true ? ["assets/04.类.html.be0dc29e.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-e9674cca": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-e9674cca" */
    "./01.html.4d6ad7b2.js"
  ), true ? ["assets/01.html.4d6ad7b2.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-306f3916": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-306f3916" */
    "./02vue\u6307\u4EE4.html.30f68506.js"
  ), true ? ["assets/02vue指令.html.30f68506.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-2ca8e124": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-2ca8e124" */
    "./03\u5168\u5C40API.html.059f1dfb.js"
  ), true ? ["assets/03全局API.html.059f1dfb.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-d71deaac": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-d71deaac" */
    "./01.html.b05de3bf.js"
  ), true ? ["assets/01.html.b05de3bf.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-58f4867c": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-58f4867c" */
    "./webpack.html.712d74a7.js"
  ), true ? ["assets/webpack.html.712d74a7.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)),
  "v-3706649a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-3706649a" */
    "./404.html.bee13de6.js"
  ), true ? ["assets/404.html.bee13de6.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0))
};
const pagesData$1 = {
  "v-8daa1a0e": () => __vitePreload(() => import(
    /* webpackChunkName: "v-8daa1a0e" */
    "./index.html.dd4ab3c3.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-67b7fbf4": () => __vitePreload(() => import(
    /* webpackChunkName: "v-67b7fbf4" */
    "./index.html.6356b102.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-6886cbbd": () => __vitePreload(() => import(
    /* webpackChunkName: "v-6886cbbd" */
    "./elementui\u5728\u8868\u683C\u4E2D\u63D2\u5165\u56FE\u7247.html.3a9494f7.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-b9c2d34a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-b9c2d34a" */
    "./index.html.a9a9ce58.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-4b48928e": () => __vitePreload(() => import(
    /* webpackChunkName: "v-4b48928e" */
    "./spring\u6CE8\u89E3.html.53a1baf3.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-9148d7c4": () => __vitePreload(() => import(
    /* webpackChunkName: "v-9148d7c4" */
    "./stripe\u652F\u4ED8.html.037d1ce4.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-4bac9763": () => __vitePreload(() => import(
    /* webpackChunkName: "v-4bac9763" */
    "./utils.html.0e084998.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-66ff7ae2": () => __vitePreload(() => import(
    /* webpackChunkName: "v-66ff7ae2" */
    "./vscode\u5E38\u7528\u63D2\u4EF6.html.3402bdca.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-c8744e90": () => __vitePreload(() => import(
    /* webpackChunkName: "v-c8744e90" */
    "./01.\u8D77\u6B65.html.1d714f4f.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-3509cb32": () => __vitePreload(() => import(
    /* webpackChunkName: "v-3509cb32" */
    "./interview.html.e2d5145e.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-5d3f7a3b": () => __vitePreload(() => import(
    /* webpackChunkName: "v-5d3f7a3b" */
    "./JSinterview.html.652a3078.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-2d570564": () => __vitePreload(() => import(
    /* webpackChunkName: "v-2d570564" */
    "./VUEinterview.html.75a474dd.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-71958ec2": () => __vitePreload(() => import(
    /* webpackChunkName: "v-71958ec2" */
    "./story.html.623d9e09.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-3803ce0e": () => __vitePreload(() => import(
    /* webpackChunkName: "v-3803ce0e" */
    "./text.html.3fb43bbc.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-6c145c9c": () => __vitePreload(() => import(
    /* webpackChunkName: "v-6c145c9c" */
    "./reflection.html.2842cd5b.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-88893a3e": () => __vitePreload(() => import(
    /* webpackChunkName: "v-88893a3e" */
    "./01.git\u7248\u672C\u63A7\u5236.html.2585219b.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-061c80c6": () => __vitePreload(() => import(
    /* webpackChunkName: "v-061c80c6" */
    "./01.Linux\u5165\u95E8.html.1f5f863d.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-6785e53a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-6785e53a" */
    "./01.mysql.html.ab3b3fe8.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-4f12841a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-4f12841a" */
    "./02.mysql\u6578\u64DA\u7BA1\u7406.html.de168193.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-363b4215": () => __vitePreload(() => import(
    /* webpackChunkName: "v-363b4215" */
    "./03.mysql\u4E8B\u52D9.html.c33bf7a3.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-39d72d95": () => __vitePreload(() => import(
    /* webpackChunkName: "v-39d72d95" */
    "./04.JDBC.html.345bc04f.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-23b022e9": () => __vitePreload(() => import(
    /* webpackChunkName: "v-23b022e9" */
    "./01.springboot.html.acdd6ab4.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-1f229241": () => __vitePreload(() => import(
    /* webpackChunkName: "v-1f229241" */
    "./02.springboot\u542F\u52A8\u539F\u7406.html.165930af.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-21d7a310": () => __vitePreload(() => import(
    /* webpackChunkName: "v-21d7a310" */
    "./03.springboot\u81EA\u52A8\u914D\u7F6E.html.c4828ef2.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-64dc3831": () => __vitePreload(() => import(
    /* webpackChunkName: "v-64dc3831" */
    "./01.\u57FA\u7840\u4ECB\u7ECD.html.46ecb719.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-ff7fbc46": () => __vitePreload(() => import(
    /* webpackChunkName: "v-ff7fbc46" */
    "./02.\u6578\u64DA\u985E\u578B.html.bd9cc395.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-f1c2e4d6": () => __vitePreload(() => import(
    /* webpackChunkName: "v-f1c2e4d6" */
    "./01.\u6982\u8FF0.html.033b6938.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-72cc4ebc": () => __vitePreload(() => import(
    /* webpackChunkName: "v-72cc4ebc" */
    "./01-css.html.60c9370c.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-1b13d411": () => __vitePreload(() => import(
    /* webpackChunkName: "v-1b13d411" */
    "./01.html.adcde796.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-4d4398ea": () => __vitePreload(() => import(
    /* webpackChunkName: "v-4d4398ea" */
    "./02.Dart\u8BED\u6CD5.html.8bfbd685.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-8cbd5a1e": () => __vitePreload(() => import(
    /* webpackChunkName: "v-8cbd5a1e" */
    "./03.widget.html.59fa97a1.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-48456869": () => __vitePreload(() => import(
    /* webpackChunkName: "v-48456869" */
    "./04.\u57FA\u7840\u7EC4\u4EF6.html.c22938f3.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-cce3d85c": () => __vitePreload(() => import(
    /* webpackChunkName: "v-cce3d85c" */
    "./01-html.html.5195ba95.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-72bd4e03": () => __vitePreload(() => import(
    /* webpackChunkName: "v-72bd4e03" */
    "./\u5165\u95E8\u5BFC\u8BBA.html.9514205c.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-783b80d4": () => __vitePreload(() => import(
    /* webpackChunkName: "v-783b80d4" */
    "./\u5185\u7F6E\u5BF9\u8C61.html.f68576b3.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-5debe7e1": () => __vitePreload(() => import(
    /* webpackChunkName: "v-5debe7e1" */
    "./\u6570\u636E\u7C7B\u578B\u4E0E\u8FD0\u7B97\u7B26.html.9640661a.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-24f06668": () => __vitePreload(() => import(
    /* webpackChunkName: "v-24f06668" */
    "./\u8BED\u6CD5\u57FA\u7840.html.5d2c791f.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-4fa2b6ab": () => __vitePreload(() => import(
    /* webpackChunkName: "v-4fa2b6ab" */
    "./01.html.12beec96.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-3689f102": () => __vitePreload(() => import(
    /* webpackChunkName: "v-3689f102" */
    "./01.html.de949bdc.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-998cc5e4": () => __vitePreload(() => import(
    /* webpackChunkName: "v-998cc5e4" */
    "./02.\u53D8\u91CF\u58F0\u660E.html.79b10f6d.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-3859e3e8": () => __vitePreload(() => import(
    /* webpackChunkName: "v-3859e3e8" */
    "./03.\u63A5\u53E3.html.884f1a92.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-1e578a45": () => __vitePreload(() => import(
    /* webpackChunkName: "v-1e578a45" */
    "./04.\u7C7B.html.ca535a25.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-e9674cca": () => __vitePreload(() => import(
    /* webpackChunkName: "v-e9674cca" */
    "./01.html.963b74ec.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-306f3916": () => __vitePreload(() => import(
    /* webpackChunkName: "v-306f3916" */
    "./02vue\u6307\u4EE4.html.19e29b43.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-2ca8e124": () => __vitePreload(() => import(
    /* webpackChunkName: "v-2ca8e124" */
    "./03\u5168\u5C40API.html.c9e81e12.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-d71deaac": () => __vitePreload(() => import(
    /* webpackChunkName: "v-d71deaac" */
    "./01.html.adb4f7f2.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-58f4867c": () => __vitePreload(() => import(
    /* webpackChunkName: "v-58f4867c" */
    "./webpack.html.9b1a8ea0.js"
  ), true ? [] : void 0).then(({ data }) => data),
  "v-3706649a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-3706649a" */
    "./404.html.1b2ff6f8.js"
  ), true ? [] : void 0).then(({ data }) => data)
};
const pagesData = ref(pagesData$1);
const pageDataEmpty = readonly({
  key: "",
  path: "",
  title: "",
  lang: "",
  frontmatter: {},
  excerpt: "",
  headers: []
});
const pageData = ref(pageDataEmpty);
const usePageData = () => pageData;
const resolvePageData = async (pageKey) => {
  const pageDataResolver = pagesData.value[pageKey];
  if (!pageDataResolver) {
    return pageDataEmpty;
  }
  const pageData2 = await pageDataResolver();
  return pageData2 !== null && pageData2 !== void 0 ? pageData2 : pageDataEmpty;
};
if (import_meta.webpackHot || false) {
  __VUE_HMR_RUNTIME__.updatePageData = (data) => {
    pagesData.value[data.key] = () => Promise.resolve(data);
    if (data.key === pageData.value.key) {
      pageData.value = data;
    }
  };
}
const pageFrontmatterSymbol = Symbol("");
const usePageFrontmatter = () => {
  const pageFrontmatter = inject(pageFrontmatterSymbol);
  if (!pageFrontmatter) {
    throw new Error("usePageFrontmatter() is called without provider.");
  }
  return pageFrontmatter;
};
const resolvePageFrontmatter = (pageData2) => pageData2.frontmatter;
const resolveHeadIdentifier = ([tag, attrs, content]) => {
  if (tag === "meta" && attrs.name) {
    return `${tag}.${attrs.name}`;
  }
  if (["title", "base"].includes(tag)) {
    return tag;
  }
  if (tag === "template" && attrs.id) {
    return `${tag}.${attrs.id}`;
  }
  return JSON.stringify([tag, attrs, content]);
};
const dedupeHead = (head) => {
  const identifierSet = new Set();
  const result = [];
  head.forEach((item) => {
    const identifier = resolveHeadIdentifier(item);
    if (!identifierSet.has(identifier)) {
      identifierSet.add(identifier);
      result.push(item);
    }
  });
  return result;
};
const isLinkHttp = (link) => /^(https?:)?\/\//.test(link);
const isLinkMailto = (link) => /^mailto:/.test(link);
const isLinkTel = (link) => /^tel:/.test(link);
const isPlainObject = (val) => Object.prototype.toString.call(val) === "[object Object]";
const removeEndingSlash = (str) => str.replace(/\/$/, "");
const removeLeadingSlash = (str) => str.replace(/^\//, "");
const resolveLocalePath = (locales2, routePath) => {
  const localePaths = Object.keys(locales2).sort((a, b) => {
    const levelDelta = b.split("/").length - a.split("/").length;
    if (levelDelta !== 0) {
      return levelDelta;
    }
    return b.length - a.length;
  });
  for (const localePath of localePaths) {
    if (routePath.startsWith(localePath)) {
      return localePath;
    }
  }
  return "/";
};
const pageHeadSymbol = Symbol("");
const usePageHead = () => {
  const pageHead = inject(pageHeadSymbol);
  if (!pageHead) {
    throw new Error("usePageHead() is called without provider.");
  }
  return pageHead;
};
const resolvePageHead = (headTitle, frontmatter, siteLocale) => {
  const description = isString$1(frontmatter.description) ? frontmatter.description : siteLocale.description;
  const head = [
    ...isArray(frontmatter.head) ? frontmatter.head : [],
    ...siteLocale.head,
    ["title", {}, headTitle],
    ["meta", { name: "description", content: description }]
  ];
  return dedupeHead(head);
};
const pageHeadTitleSymbol = Symbol("");
const resolvePageHeadTitle = (page, siteLocale) => `${page.title ? `${page.title} | ` : ``}${siteLocale.title}`;
const pageLangSymbol = Symbol("");
const usePageLang = () => {
  const pageLang = inject(pageLangSymbol);
  if (!pageLang) {
    throw new Error("usePageLang() is called without provider.");
  }
  return pageLang;
};
const resolvePageLang = (pageData2) => pageData2.lang || "en";
const routeLocaleSymbol = Symbol("");
const useRouteLocale = () => {
  const routeLocale = inject(routeLocaleSymbol);
  if (!routeLocale) {
    throw new Error("useRouteLocale() is called without provider.");
  }
  return routeLocale;
};
const resolveRouteLocale = (locales2, routePath) => resolveLocalePath(locales2, routePath);
const siteData$1 = {
  "base": "/",
  "lang": "zh-CN",
  "title": "IUUI",
  "description": "IUUI",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/images/favicon.ico"
      }
    ]
  ],
  "locales": {}
};
const siteData = ref(siteData$1);
const useSiteData = () => siteData;
if (import_meta.webpackHot || false) {
  __VUE_HMR_RUNTIME__.updateSiteData = (data) => {
    siteData.value = data;
  };
}
const siteLocaleDataSymbol = Symbol("");
const useSiteLocaleData = () => {
  const siteLocaleData = inject(siteLocaleDataSymbol);
  if (!siteLocaleData) {
    throw new Error("useSiteLocaleData() is called without provider.");
  }
  return siteLocaleData;
};
const resolveSiteLocaleData = (site, routeLocale) => __spreadValues(__spreadValues({}, site), site.locales[routeLocale]);
const updateHeadSymbol = Symbol("");
const setupUpdateHead = () => {
  const route = useRoute();
  const head = usePageHead();
  const lang = usePageLang();
  const headTags = ref([]);
  const loadHead = () => {
    head.value.forEach((item) => {
      const tag = queryHeadTag(item);
      if (tag) {
        headTags.value.push(tag);
      }
    });
  };
  const updateHead = () => {
    document.documentElement.lang = lang.value;
    headTags.value.forEach((item) => {
      if (item.parentNode === document.head) {
        document.head.removeChild(item);
      }
    });
    headTags.value.splice(0, headTags.value.length);
    head.value.forEach((item) => {
      const tag = createHeadTag(item);
      if (tag !== null) {
        document.head.appendChild(tag);
        headTags.value.push(tag);
      }
    });
  };
  provide(updateHeadSymbol, updateHead);
  onMounted(() => {
    loadHead();
    updateHead();
    watch(() => route.path, () => updateHead());
  });
};
const queryHeadTag = ([tagName, attrs, content = ""]) => {
  const attrsSelector = Object.entries(attrs).map(([key, value]) => {
    if (isString$1(value)) {
      return `[${key}="${value}"]`;
    }
    if (value === true) {
      return `[${key}]`;
    }
    return "";
  }).join("");
  const selector2 = `head > ${tagName}${attrsSelector}`;
  const tags = Array.from(document.querySelectorAll(selector2));
  const matchedTag = tags.find((item) => item.innerText === content);
  return matchedTag || null;
};
const createHeadTag = ([tagName, attrs, content]) => {
  if (!isString$1(tagName)) {
    return null;
  }
  const tag = document.createElement(tagName);
  if (isPlainObject(attrs)) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (isString$1(value)) {
        tag.setAttribute(key, value);
      } else if (value === true) {
        tag.setAttribute(key, "");
      }
    });
  }
  if (isString$1(content)) {
    tag.appendChild(document.createTextNode(content));
  }
  return tag;
};
const Content = (props) => {
  let key;
  if (props.pageKey) {
    key = props.pageKey;
  } else {
    const page = usePageData();
    key = page.value.key;
  }
  const component = pagesComponents[key];
  if (component) {
    return h(component);
  }
  return h("div", "404 Not Found");
};
Content.displayName = "Content";
Content.props = {
  pageKey: {
    type: String,
    required: false
  }
};
const layoutComponents = {
  "404": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "layout-404" */
    "./404.a4995e7a.js"
  ), true ? [] : void 0)),
  "Layout": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "layout-Layout" */
    "./Layout.15de7d82.js"
  ), true ? [] : void 0))
};
const Vuepress = defineComponent({
  name: "Vuepress",
  setup() {
    const page = usePageData();
    const layoutComponent = computed(() => {
      let layoutName;
      if (page.value.path) {
        const frontmatterLayout = page.value.frontmatter.layout;
        if (isString$1(frontmatterLayout)) {
          layoutName = frontmatterLayout;
        } else {
          layoutName = "Layout";
        }
      } else {
        layoutName = "404";
      }
      return layoutComponents[layoutName] || resolveComponent(layoutName, false);
    });
    return () => h(layoutComponent.value);
  }
});
const defineClientAppEnhance = (clientAppEnhance) => clientAppEnhance;
const defineClientAppSetup = (clientAppSetup) => clientAppSetup;
const withBase = (url) => {
  if (isLinkHttp(url))
    return url;
  const base2 = useSiteData().value.base;
  return `${base2}${removeLeadingSlash(url)}`;
};
var vars$4 = "";
var externalLinkIcon = "";
const svg = h("svg", {
  "class": "external-link-icon",
  "xmlns": "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  "focusable": "false",
  "x": "0px",
  "y": "0px",
  "viewBox": "0 0 100 100",
  "width": "15",
  "height": "15"
}, [
  h("path", {
    fill: "currentColor",
    d: "M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
  }),
  h("polygon", {
    fill: "currentColor",
    points: "45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
  })
]);
const ExternalLinkIcon = (_, { slots }) => {
  var _a2;
  return h("span", [svg, (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)]);
};
ExternalLinkIcon.displayName = "ExternalLinkIcon";
var clientAppEnhance0 = defineClientAppEnhance(({ app }) => {
  app.component("ExternalLinkIcon", ExternalLinkIcon);
});
/*! medium-zoom 1.0.6 | MIT License | https://github.com/francoischalifour/medium-zoom */
var _extends = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var isSupported = function isSupported2(node) {
  return node.tagName === "IMG";
};
var isNodeList = function isNodeList2(selector2) {
  return NodeList.prototype.isPrototypeOf(selector2);
};
var isNode = function isNode2(selector2) {
  return selector2 && selector2.nodeType === 1;
};
var isSvg = function isSvg2(image) {
  var source = image.currentSrc || image.src;
  return source.substr(-4).toLowerCase() === ".svg";
};
var getImagesFromSelector = function getImagesFromSelector2(selector2) {
  try {
    if (Array.isArray(selector2)) {
      return selector2.filter(isSupported);
    }
    if (isNodeList(selector2)) {
      return [].slice.call(selector2).filter(isSupported);
    }
    if (isNode(selector2)) {
      return [selector2].filter(isSupported);
    }
    if (typeof selector2 === "string") {
      return [].slice.call(document.querySelectorAll(selector2)).filter(isSupported);
    }
    return [];
  } catch (err) {
    throw new TypeError("The provided selector is invalid.\nExpects a CSS selector, a Node element, a NodeList or an array.\nSee: https://github.com/francoischalifour/medium-zoom");
  }
};
var createOverlay = function createOverlay2(background) {
  var overlay = document.createElement("div");
  overlay.classList.add("medium-zoom-overlay");
  overlay.style.background = background;
  return overlay;
};
var cloneTarget = function cloneTarget2(template) {
  var _template$getBounding = template.getBoundingClientRect(), top = _template$getBounding.top, left = _template$getBounding.left, width = _template$getBounding.width, height = _template$getBounding.height;
  var clone = template.cloneNode();
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
  clone.removeAttribute("id");
  clone.style.position = "absolute";
  clone.style.top = top + scrollTop + "px";
  clone.style.left = left + scrollLeft + "px";
  clone.style.width = width + "px";
  clone.style.height = height + "px";
  clone.style.transform = "";
  return clone;
};
var createCustomEvent = function createCustomEvent2(type, params) {
  var eventParams = _extends({
    bubbles: false,
    cancelable: false,
    detail: void 0
  }, params);
  if (typeof window.CustomEvent === "function") {
    return new CustomEvent(type, eventParams);
  }
  var customEvent = document.createEvent("CustomEvent");
  customEvent.initCustomEvent(type, eventParams.bubbles, eventParams.cancelable, eventParams.detail);
  return customEvent;
};
var mediumZoom$1 = function mediumZoom(selector2) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var Promise2 = window.Promise || function Promise3(fn) {
    function noop2() {
    }
    fn(noop2, noop2);
  };
  var _handleClick = function _handleClick2(event) {
    var target = event.target;
    if (target === overlay) {
      close();
      return;
    }
    if (images.indexOf(target) === -1) {
      return;
    }
    toggle({ target });
  };
  var _handleScroll = function _handleScroll2() {
    if (isAnimating || !active.original) {
      return;
    }
    var currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (Math.abs(scrollTop - currentScroll) > zoomOptions2.scrollOffset) {
      setTimeout(close, 150);
    }
  };
  var _handleKeyUp = function _handleKeyUp2(event) {
    var key = event.key || event.keyCode;
    if (key === "Escape" || key === "Esc" || key === 27) {
      close();
    }
  };
  var update = function update2() {
    var options2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var newOptions = options2;
    if (options2.background) {
      overlay.style.background = options2.background;
    }
    if (options2.container && options2.container instanceof Object) {
      newOptions.container = _extends({}, zoomOptions2.container, options2.container);
    }
    if (options2.template) {
      var template = isNode(options2.template) ? options2.template : document.querySelector(options2.template);
      newOptions.template = template;
    }
    zoomOptions2 = _extends({}, zoomOptions2, newOptions);
    images.forEach(function(image) {
      image.dispatchEvent(createCustomEvent("medium-zoom:update", {
        detail: { zoom }
      }));
    });
    return zoom;
  };
  var clone = function clone2() {
    var options2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return mediumZoom(_extends({}, zoomOptions2, options2));
  };
  var attach = function attach2() {
    for (var _len = arguments.length, selectors = Array(_len), _key = 0; _key < _len; _key++) {
      selectors[_key] = arguments[_key];
    }
    var newImages = selectors.reduce(function(imagesAccumulator, currentSelector) {
      return [].concat(imagesAccumulator, getImagesFromSelector(currentSelector));
    }, []);
    newImages.filter(function(newImage) {
      return images.indexOf(newImage) === -1;
    }).forEach(function(newImage) {
      images.push(newImage);
      newImage.classList.add("medium-zoom-image");
    });
    eventListeners.forEach(function(_ref) {
      var type = _ref.type, listener = _ref.listener, options2 = _ref.options;
      newImages.forEach(function(image) {
        image.addEventListener(type, listener, options2);
      });
    });
    return zoom;
  };
  var detach = function detach2() {
    for (var _len2 = arguments.length, selectors = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      selectors[_key2] = arguments[_key2];
    }
    if (active.zoomed) {
      close();
    }
    var imagesToDetach = selectors.length > 0 ? selectors.reduce(function(imagesAccumulator, currentSelector) {
      return [].concat(imagesAccumulator, getImagesFromSelector(currentSelector));
    }, []) : images;
    imagesToDetach.forEach(function(image) {
      image.classList.remove("medium-zoom-image");
      image.dispatchEvent(createCustomEvent("medium-zoom:detach", {
        detail: { zoom }
      }));
    });
    images = images.filter(function(image) {
      return imagesToDetach.indexOf(image) === -1;
    });
    return zoom;
  };
  var on = function on2(type, listener) {
    var options2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    images.forEach(function(image) {
      image.addEventListener("medium-zoom:" + type, listener, options2);
    });
    eventListeners.push({ type: "medium-zoom:" + type, listener, options: options2 });
    return zoom;
  };
  var off = function off2(type, listener) {
    var options2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    images.forEach(function(image) {
      image.removeEventListener("medium-zoom:" + type, listener, options2);
    });
    eventListeners = eventListeners.filter(function(eventListener) {
      return !(eventListener.type === "medium-zoom:" + type && eventListener.listener.toString() === listener.toString());
    });
    return zoom;
  };
  var open = function open2() {
    var _ref2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, target = _ref2.target;
    var _animate = function _animate2() {
      var container = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
      var viewportWidth = void 0;
      var viewportHeight = void 0;
      if (zoomOptions2.container) {
        if (zoomOptions2.container instanceof Object) {
          container = _extends({}, container, zoomOptions2.container);
          viewportWidth = container.width - container.left - container.right - zoomOptions2.margin * 2;
          viewportHeight = container.height - container.top - container.bottom - zoomOptions2.margin * 2;
        } else {
          var zoomContainer = isNode(zoomOptions2.container) ? zoomOptions2.container : document.querySelector(zoomOptions2.container);
          var _zoomContainer$getBou = zoomContainer.getBoundingClientRect(), _width = _zoomContainer$getBou.width, _height = _zoomContainer$getBou.height, _left = _zoomContainer$getBou.left, _top = _zoomContainer$getBou.top;
          container = _extends({}, container, {
            width: _width,
            height: _height,
            left: _left,
            top: _top
          });
        }
      }
      viewportWidth = viewportWidth || container.width - zoomOptions2.margin * 2;
      viewportHeight = viewportHeight || container.height - zoomOptions2.margin * 2;
      var zoomTarget = active.zoomedHd || active.original;
      var naturalWidth = isSvg(zoomTarget) ? viewportWidth : zoomTarget.naturalWidth || viewportWidth;
      var naturalHeight = isSvg(zoomTarget) ? viewportHeight : zoomTarget.naturalHeight || viewportHeight;
      var _zoomTarget$getBoundi = zoomTarget.getBoundingClientRect(), top = _zoomTarget$getBoundi.top, left = _zoomTarget$getBoundi.left, width = _zoomTarget$getBoundi.width, height = _zoomTarget$getBoundi.height;
      var scaleX = Math.min(naturalWidth, viewportWidth) / width;
      var scaleY = Math.min(naturalHeight, viewportHeight) / height;
      var scale = Math.min(scaleX, scaleY);
      var translateX = (-left + (viewportWidth - width) / 2 + zoomOptions2.margin + container.left) / scale;
      var translateY = (-top + (viewportHeight - height) / 2 + zoomOptions2.margin + container.top) / scale;
      var transform = "scale(" + scale + ") translate3d(" + translateX + "px, " + translateY + "px, 0)";
      active.zoomed.style.transform = transform;
      if (active.zoomedHd) {
        active.zoomedHd.style.transform = transform;
      }
    };
    return new Promise2(function(resolve2) {
      if (target && images.indexOf(target) === -1) {
        resolve2(zoom);
        return;
      }
      var _handleOpenEnd = function _handleOpenEnd2() {
        isAnimating = false;
        active.zoomed.removeEventListener("transitionend", _handleOpenEnd2);
        active.original.dispatchEvent(createCustomEvent("medium-zoom:opened", {
          detail: { zoom }
        }));
        resolve2(zoom);
      };
      if (active.zoomed) {
        resolve2(zoom);
        return;
      }
      if (target) {
        active.original = target;
      } else if (images.length > 0) {
        var _images = images;
        active.original = _images[0];
      } else {
        resolve2(zoom);
        return;
      }
      active.original.dispatchEvent(createCustomEvent("medium-zoom:open", {
        detail: { zoom }
      }));
      scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      isAnimating = true;
      active.zoomed = cloneTarget(active.original);
      document.body.appendChild(overlay);
      if (zoomOptions2.template) {
        var template = isNode(zoomOptions2.template) ? zoomOptions2.template : document.querySelector(zoomOptions2.template);
        active.template = document.createElement("div");
        active.template.appendChild(template.content.cloneNode(true));
        document.body.appendChild(active.template);
      }
      document.body.appendChild(active.zoomed);
      window.requestAnimationFrame(function() {
        document.body.classList.add("medium-zoom--opened");
      });
      active.original.classList.add("medium-zoom-image--hidden");
      active.zoomed.classList.add("medium-zoom-image--opened");
      active.zoomed.addEventListener("click", close);
      active.zoomed.addEventListener("transitionend", _handleOpenEnd);
      if (active.original.getAttribute("data-zoom-src")) {
        active.zoomedHd = active.zoomed.cloneNode();
        active.zoomedHd.removeAttribute("srcset");
        active.zoomedHd.removeAttribute("sizes");
        active.zoomedHd.src = active.zoomed.getAttribute("data-zoom-src");
        active.zoomedHd.onerror = function() {
          clearInterval(getZoomTargetSize);
          console.warn("Unable to reach the zoom image target " + active.zoomedHd.src);
          active.zoomedHd = null;
          _animate();
        };
        var getZoomTargetSize = setInterval(function() {
          if (active.zoomedHd.complete) {
            clearInterval(getZoomTargetSize);
            active.zoomedHd.classList.add("medium-zoom-image--opened");
            active.zoomedHd.addEventListener("click", close);
            document.body.appendChild(active.zoomedHd);
            _animate();
          }
        }, 10);
      } else if (active.original.hasAttribute("srcset")) {
        active.zoomedHd = active.zoomed.cloneNode();
        active.zoomedHd.removeAttribute("sizes");
        active.zoomedHd.removeAttribute("loading");
        var loadEventListener = active.zoomedHd.addEventListener("load", function() {
          active.zoomedHd.removeEventListener("load", loadEventListener);
          active.zoomedHd.classList.add("medium-zoom-image--opened");
          active.zoomedHd.addEventListener("click", close);
          document.body.appendChild(active.zoomedHd);
          _animate();
        });
      } else {
        _animate();
      }
    });
  };
  var close = function close2() {
    return new Promise2(function(resolve2) {
      if (isAnimating || !active.original) {
        resolve2(zoom);
        return;
      }
      var _handleCloseEnd = function _handleCloseEnd2() {
        active.original.classList.remove("medium-zoom-image--hidden");
        document.body.removeChild(active.zoomed);
        if (active.zoomedHd) {
          document.body.removeChild(active.zoomedHd);
        }
        document.body.removeChild(overlay);
        active.zoomed.classList.remove("medium-zoom-image--opened");
        if (active.template) {
          document.body.removeChild(active.template);
        }
        isAnimating = false;
        active.zoomed.removeEventListener("transitionend", _handleCloseEnd2);
        active.original.dispatchEvent(createCustomEvent("medium-zoom:closed", {
          detail: { zoom }
        }));
        active.original = null;
        active.zoomed = null;
        active.zoomedHd = null;
        active.template = null;
        resolve2(zoom);
      };
      isAnimating = true;
      document.body.classList.remove("medium-zoom--opened");
      active.zoomed.style.transform = "";
      if (active.zoomedHd) {
        active.zoomedHd.style.transform = "";
      }
      if (active.template) {
        active.template.style.transition = "opacity 150ms";
        active.template.style.opacity = 0;
      }
      active.original.dispatchEvent(createCustomEvent("medium-zoom:close", {
        detail: { zoom }
      }));
      active.zoomed.addEventListener("transitionend", _handleCloseEnd);
    });
  };
  var toggle = function toggle2() {
    var _ref3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, target = _ref3.target;
    if (active.original) {
      return close();
    }
    return open({ target });
  };
  var getOptions = function getOptions2() {
    return zoomOptions2;
  };
  var getImages = function getImages2() {
    return images;
  };
  var getZoomedImage = function getZoomedImage2() {
    return active.original;
  };
  var images = [];
  var eventListeners = [];
  var isAnimating = false;
  var scrollTop = 0;
  var zoomOptions2 = options;
  var active = {
    original: null,
    zoomed: null,
    zoomedHd: null,
    template: null
  };
  if (Object.prototype.toString.call(selector2) === "[object Object]") {
    zoomOptions2 = selector2;
  } else if (selector2 || typeof selector2 === "string") {
    attach(selector2);
  }
  zoomOptions2 = _extends({
    margin: 0,
    background: "#fff",
    scrollOffset: 40,
    container: null,
    template: null
  }, zoomOptions2);
  var overlay = createOverlay(zoomOptions2.background);
  document.addEventListener("click", _handleClick);
  document.addEventListener("keyup", _handleKeyUp);
  document.addEventListener("scroll", _handleScroll);
  window.addEventListener("resize", close);
  var zoom = {
    open,
    close,
    toggle,
    update,
    clone,
    attach,
    detach,
    on,
    off,
    getOptions,
    getImages,
    getZoomedImage
  };
  return zoom;
};
function styleInject(css2, ref2) {
  if (ref2 === void 0)
    ref2 = {};
  var insertAt = ref2.insertAt;
  if (!css2 || typeof document === "undefined") {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css2;
  } else {
    style.appendChild(document.createTextNode(css2));
  }
}
var css = ".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}";
styleInject(css);
var mediumZoom$2 = mediumZoom$1;
const mediumZoomSymbol = Symbol("mediumZoom");
var vars$3 = "";
var mediumZoom2 = "";
const selector = ".theme-default-content > img, .theme-default-content :not(a) > img";
const zoomOptions = {};
const delay$1 = 400;
var clientAppEnhance1 = defineClientAppEnhance(({ app, router }) => {
  const zoom = mediumZoom$2(zoomOptions);
  zoom.refresh = (sel = selector) => {
    zoom.detach();
    zoom.attach(sel);
  };
  app.provide(mediumZoomSymbol, zoom);
  router.afterEach(() => {
    setTimeout(() => zoom.refresh(), delay$1);
  });
});
const themeData$1 = {
  "nextLinks": true,
  "prevLinks": true,
  "search": true,
  "editLink": false,
  "logo": "/images/favicon.ico",
  "navbar": [
    {
      "text": "\u9996\u9875",
      "link": "/"
    },
    {
      "text": "\u540E\u7AEF",
      "children": [
        {
          "text": "\u300AJavaSE\u300B",
          "link": "/java/\u300Ajava\u5165\u95E8\u300B/01.\u57FA\u7840\u4ECB\u7ECD.md"
        }
      ]
    },
    {
      "text": "\u524D\u7AEF",
      "children": [
        {
          "text": "\u300Ahtml\u300B",
          "link": "/web/html/01-html.md"
        },
        {
          "text": "\u300AJavaScript\u300B",
          "link": "/web/JavaScript/\u5165\u95E8\u5BFC\u8BBA.md"
        },
        {
          "text": "\u300ACSS\u300B",
          "link": "/web/css/01-css.md"
        },
        {
          "text": "\u300ATypeScript\u300B",
          "link": "/web/TypeScript/01.md"
        }
      ]
    },
    {
      "text": "\u7B14\u8BB0",
      "children": [
        {
          "text": "\u524D\u7AEF",
          "children": [
            {
              "text": "Vue2",
              "link": "/web/vue/01.md"
            },
            {
              "text": "Vue3",
              "link": "/web/vue3/01.md"
            },
            {
              "text": "WebPack",
              "link": "/web/webpack/webpack.md"
            },
            {
              "text": "Git",
              "link": "/java/git/01.git\u7248\u672C\u63A7\u5236.md"
            },
            {
              "text": "Flutter",
              "link": "/web/Flutter/01.md"
            }
          ]
        },
        {
          "text": "\u540E\u7AEF",
          "children": [
            {
              "text": "MySQL",
              "link": "/java/mysql/01.mysql.md"
            },
            {
              "text": "Jenkins",
              "link": "/web/Jenkins/01.md"
            },
            {
              "text": "SpringBoot",
              "link": "/java/springboot/01.springboot.md"
            }
          ]
        },
        {
          "text": "Linux\u8FD0\u7EF4",
          "children": [
            {
              "text": "Linux",
              "link": "/java/Linux/01.Linux\u5165\u95E8.md"
            }
          ]
        }
      ]
    },
    {
      "text": "\u5176\u5B83",
      "children": [
        {
          "text": "\u6559\u7A0B",
          "link": "/guide/\u6559\u7A0B/text.md"
        },
        {
          "text": "\u9762\u8BD5",
          "link": "/guide/interview/interview.md"
        },
        {
          "text": "\u968F\u7B14",
          "link": "/guide/\u968F\u7B14/reflection.md"
        },
        {
          "text": "\u6545\u4E8B",
          "link": "/guide/\u6545\u4E8B/story.md"
        }
      ]
    },
    {
      "text": "\u9879\u76EE\u5B9E\u6218",
      "link": "/actualCombat/README.md"
    }
  ],
  "sidebarDepth": 2,
  "sidebar": {
    "/java/git/": [
      {
        "text": "git",
        "children": [
          "01.git\u7248\u672C\u63A7\u5236.md"
        ]
      }
    ],
    "/java/mysql/": [
      {
        "text": "MySql",
        "children": [
          "01.mysql.md",
          "02.mysql\u6578\u64DA\u7BA1\u7406.md",
          "03.mysql\u4E8B\u52D9.md",
          "04.JDBC.md"
        ]
      }
    ],
    "/java/springboot/": [
      {
        "text": "springboot",
        "children": [
          "01.springboot.md",
          "02.springboot\u542F\u52A8\u539F\u7406.md",
          "03.springboot\u81EA\u52A8\u914D\u7F6E.md"
        ]
      }
    ],
    "/web/vue/": [
      {
        "text": "VUE2.x",
        "children": [
          "01.md",
          "02vue\u6307\u4EE4.md",
          "03\u5168\u5C40API.md"
        ]
      }
    ],
    "/web/Flutter/": [
      {
        "text": "Flutter",
        "children": [
          "01.md",
          "02.Dart\u8BED\u6CD5.md",
          "03.widget.md",
          "04.\u57FA\u7840\u7EC4\u4EF6.md"
        ]
      }
    ],
    "/web/html/": [
      {
        "text": "HTML",
        "children": [
          "/web/html/01-html.md"
        ]
      }
    ],
    "/web/TypeScript/": [
      {
        "text": "TypeScript\u5B66\u4E60",
        "children": [
          "01.md",
          "02.\u53D8\u91CF\u58F0\u660E.md",
          "03.\u63A5\u53E3.md",
          "04.\u7C7B.md"
        ]
      }
    ],
    "/web/JavaScript/": [
      {
        "text": "\u300AJavaScript\u6559\u7A0B\u300B",
        "children": [
          "\u5165\u95E8\u5BFC\u8BBA.md",
          "\u6570\u636E\u7C7B\u578B\u4E0E\u8FD0\u7B97\u7B26.md",
          "\u8BED\u6CD5\u57FA\u7840.md",
          "\u5185\u7F6E\u5BF9\u8C61.md"
        ]
      }
    ],
    "/course/": [
      {
        "text": "\u6559\u7A0B",
        "children": [
          "README.md",
          "elementui\u5728\u8868\u683C\u4E2D\u63D2\u5165\u56FE\u7247.md",
          "vscode\u5E38\u7528\u63D2\u4EF6.md",
          "utils.md",
          "spring\u6CE8\u89E3.md"
        ]
      }
    ],
    "/guide/interview/": [
      {
        "text": "\u9762\u8BD5",
        "children": [
          "interview.md",
          "JSinterview.md",
          "VUEinterview.md"
        ]
      }
    ],
    "/actualCombat/Flutter\u5DE5\u7A0B\u5B9E\u6218/01.\u8D77\u6B65.md/": [
      {
        "text": "\u300AFlutter\u5DE5\u7A0B\u5B9E\u6218\u300B",
        "children": [
          "01.\u8D77\u6B65.md"
        ]
      }
    ],
    "/": [
      ""
    ]
  },
  "locales": {
    "/": {
      "selectLanguageName": "English"
    }
  },
  "darkMode": true,
  "repo": null,
  "selectLanguageText": "Languages",
  "selectLanguageAriaLabel": "Select language",
  "editLinkText": "Edit this page",
  "lastUpdated": true,
  "lastUpdatedText": "Last Updated",
  "contributors": true,
  "contributorsText": "Contributors",
  "notFound": [
    "There's nothing here.",
    "How did we get here?",
    "That's a Four-Oh-Four.",
    "Looks like we've got some broken links."
  ],
  "backToHome": "Take me home",
  "openInNewWindow": "open in new window",
  "toggleDarkMode": "toggle dark mode",
  "toggleSidebar": "toggle sidebar"
};
const themeData = ref(themeData$1);
const useThemeData = () => themeData;
if (import_meta.webpackHot || false) {
  __VUE_HMR_RUNTIME__.updateThemeData = (data) => {
    themeData.value = data;
  };
}
const themeLocaleDataSymbol = Symbol("");
const useThemeLocaleData$1 = () => {
  const themeLocaleData = inject(themeLocaleDataSymbol);
  if (!themeLocaleData) {
    throw new Error("useThemeLocaleData() is called without provider.");
  }
  return themeLocaleData;
};
const resolveThemeLocaleData = (theme, routeLocale) => {
  var _a2;
  return __spreadValues(__spreadValues({}, theme), (_a2 = theme.locales) === null || _a2 === void 0 ? void 0 : _a2[routeLocale]);
};
var clientAppEnhance2 = defineClientAppEnhance(({ app }) => {
  const themeData2 = useThemeData();
  const routeLocale = app._context.provides[routeLocaleSymbol];
  const themeLocaleData = computed(() => resolveThemeLocaleData(themeData2.value, routeLocale.value));
  app.provide(themeLocaleDataSymbol, themeLocaleData);
  Object.defineProperties(app.config.globalProperties, {
    $theme: {
      get() {
        return themeData2.value;
      }
    },
    $themeLocale: {
      get() {
        return themeLocaleData.value;
      }
    }
  });
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  props: {
    type: {
      type: String,
      required: false,
      default: "tip"
    },
    text: {
      type: String,
      required: false,
      default: ""
    },
    vertical: {
      type: String,
      required: false,
      default: void 0
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", {
        class: normalizeClass(["badge", __props.type]),
        style: normalizeStyle({
          verticalAlign: __props.vertical
        })
      }, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          createTextVNode(toDisplayString(__props.text), 1)
        ])
      ], 6);
    };
  }
});
var CodeGroup = defineComponent({
  name: "CodeGroup",
  setup(_, { slots }) {
    const activeIndex = ref(-1);
    const tabRefs = ref([]);
    const activateNext = (i = activeIndex.value) => {
      if (i < tabRefs.value.length - 1) {
        activeIndex.value = i + 1;
      } else {
        activeIndex.value = 0;
      }
      tabRefs.value[activeIndex.value].focus();
    };
    const activatePrev = (i = activeIndex.value) => {
      if (i > 0) {
        activeIndex.value = i - 1;
      } else {
        activeIndex.value = tabRefs.value.length - 1;
      }
      tabRefs.value[activeIndex.value].focus();
    };
    const keyboardHandler = (event, i) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        activeIndex.value = i;
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        activateNext(i);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        activatePrev(i);
      }
    };
    return () => {
      var _a2;
      const items = (((_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots)) || []).filter((vnode) => vnode.type.name === "CodeGroupItem").map((vnode) => {
        if (vnode.props === null) {
          vnode.props = {};
        }
        return vnode;
      });
      if (items.length === 0) {
        return null;
      }
      if (activeIndex.value < 0 || activeIndex.value > items.length - 1) {
        activeIndex.value = items.findIndex((vnode) => vnode.props.active === "" || vnode.props.active === true);
        if (activeIndex.value === -1) {
          activeIndex.value = 0;
        }
      } else {
        items.forEach((vnode, i) => {
          vnode.props.active = i === activeIndex.value;
        });
      }
      return h("div", { class: "code-group" }, [
        h("div", { class: "code-group__nav" }, h("ul", { class: "code-group__ul" }, items.map((vnode, i) => {
          const isActive = i === activeIndex.value;
          return h("li", { class: "code-group__li" }, h("button", {
            ref: (element) => {
              if (element) {
                tabRefs.value[i] = element;
              }
            },
            class: {
              "code-group__nav-tab": true,
              "code-group__nav-tab-active": isActive
            },
            ariaPressed: isActive,
            ariaExpanded: isActive,
            onClick: () => activeIndex.value = i,
            onKeydown: (e) => keyboardHandler(e, i)
          }, vnode.props.title));
        }))),
        items
      ]);
    };
  }
});
const _hoisted_1$1 = ["aria-selected"];
const __default__ = defineComponent({
  name: "CodeGroupItem"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__), {
  props: {
    title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["code-group-item", { "code-group-item__active": __props.active }]),
        "aria-selected": __props.active
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_1$1);
    };
  }
}));
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
const isClient = typeof window !== "undefined";
const isString = (val) => typeof val === "string";
const noop = () => {
};
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    filter(() => fn.apply(this, args), { fn, thisArg: this, args });
  }
  return wrapper;
}
const bypassFilter = (invoke) => {
  return invoke();
};
var __getOwnPropSymbols$9 = Object.getOwnPropertySymbols;
var __hasOwnProp$9 = Object.prototype.hasOwnProperty;
var __propIsEnum$9 = Object.prototype.propertyIsEnumerable;
var __objRest$5 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$9.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$9)
    for (var prop of __getOwnPropSymbols$9(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$9.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function watchWithFilter(source, cb, options = {}) {
  const _a2 = options, {
    eventFilter = bypassFilter
  } = _a2, watchOptions = __objRest$5(_a2, [
    "eventFilter"
  ]);
  return watch(source, createFilterWrapper(eventFilter, cb), watchOptions);
}
function tryOnMounted(fn, sync = true) {
  if (getCurrentInstance())
    onMounted(fn);
  else if (sync)
    fn();
  else
    nextTick(fn);
}
const defaultWindow = isClient ? window : void 0;
isClient ? window.document : void 0;
isClient ? window.navigator : void 0;
isClient ? window.location : void 0;
function useEventListener(...args) {
  let target;
  let event;
  let listener;
  let options;
  if (isString(args[0])) {
    [event, listener, options] = args;
    target = defaultWindow;
  } else {
    [target, event, listener, options] = args;
  }
  if (!target)
    return noop;
  let cleanup = noop;
  const stopWatch = watch(() => unref(target), (el) => {
    cleanup();
    if (!el)
      return;
    el.addEventListener(event, listener, options);
    cleanup = () => {
      el.removeEventListener(event, listener, options);
      cleanup = noop;
    };
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function useMediaQuery(query, options = {}) {
  const { window: window2 = defaultWindow } = options;
  let mediaQuery;
  const matches = ref(false);
  const update = () => {
    if (!window2)
      return;
    if (!mediaQuery)
      mediaQuery = window2.matchMedia(query);
    matches.value = mediaQuery.matches;
  };
  tryOnMounted(() => {
    update();
    if (!mediaQuery)
      return;
    if ("addEventListener" in mediaQuery)
      mediaQuery.addEventListener("change", update);
    else
      mediaQuery.addListener(update);
    tryOnScopeDispose(() => {
      if ("removeEventListener" in update)
        mediaQuery.removeEventListener("change", update);
      else
        mediaQuery.removeListener(update);
    });
  });
  return matches;
}
function guessSerializerType(rawInit) {
  return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : Array.isArray(rawInit) ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}
const StorageSerializers = {
  boolean: {
    read: (v) => v === "true",
    write: (v) => String(v)
  },
  object: {
    read: (v) => JSON.parse(v),
    write: (v) => JSON.stringify(v)
  },
  number: {
    read: (v) => Number.parseFloat(v),
    write: (v) => String(v)
  },
  any: {
    read: (v) => v,
    write: (v) => String(v)
  },
  string: {
    read: (v) => v,
    write: (v) => String(v)
  },
  map: {
    read: (v) => new Map(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  },
  set: {
    read: (v) => new Set(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  }
};
function useStorage(key, initialValue, storage = ((_a2) => (_a2 = defaultWindow) == null ? void 0 : _a2.localStorage)(), options = {}) {
  var _a2;
  const {
    flush = "pre",
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    shallow,
    window: window2 = defaultWindow,
    eventFilter,
    onError = (e) => {
      console.error(e);
    }
  } = options;
  const rawInit = unref(initialValue);
  const type = guessSerializerType(rawInit);
  const data = (shallow ? shallowRef : ref)(initialValue);
  const serializer = (_a2 = options.serializer) != null ? _a2 : StorageSerializers[type];
  function read(event) {
    if (!storage || event && event.key !== key)
      return;
    try {
      const rawValue = event ? event.newValue : storage.getItem(key);
      if (rawValue == null) {
        data.value = rawInit;
        if (writeDefaults && rawInit !== null)
          storage.setItem(key, serializer.write(rawInit));
      } else {
        data.value = serializer.read(rawValue);
      }
    } catch (e) {
      onError(e);
    }
  }
  read();
  if (window2 && listenToStorageChanges)
    useEventListener(window2, "storage", (e) => setTimeout(() => read(e), 0));
  if (storage) {
    watchWithFilter(data, () => {
      try {
        if (data.value == null)
          storage.removeItem(key);
        else
          storage.setItem(key, serializer.write(data.value));
      } catch (e) {
        onError(e);
      }
    }, {
      flush,
      deep,
      eventFilter
    });
  }
  return data;
}
function usePreferredDark(options) {
  return useMediaQuery("(prefers-color-scheme: dark)", options);
}
var _a, _b;
isClient && (window == null ? void 0 : window.navigator) && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.platform) && /iP(ad|hone|od)/.test((_b = window == null ? void 0 : window.navigator) == null ? void 0 : _b.platform);
var __defProp$3 = Object.defineProperty;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$3(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    }
  return a;
};
const initialRect = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  height: 0,
  width: 0
};
__spreadValues$3({
  text: ""
}, initialRect);
const darkModeSymbol = Symbol("");
const useDarkMode = () => {
  const isDarkMode = inject(darkModeSymbol);
  if (!isDarkMode) {
    throw new Error("useDarkMode() is called without provider.");
  }
  return isDarkMode;
};
const setupDarkMode = () => {
  const themeLocale = useThemeLocaleData();
  const isDarkPreferred = usePreferredDark();
  const darkStorage = useStorage("vuepress-color-scheme", "auto");
  const isDarkMode = computed({
    get() {
      if (!themeLocale.value.darkMode) {
        return false;
      }
      if (darkStorage.value === "auto") {
        return isDarkPreferred.value;
      }
      return darkStorage.value === "dark";
    },
    set(val) {
      if (val === isDarkPreferred.value) {
        darkStorage.value = "auto";
      } else {
        darkStorage.value = val ? "dark" : "light";
      }
    }
  });
  provide(darkModeSymbol, isDarkMode);
  updateHtmlDarkClass(isDarkMode);
};
const updateHtmlDarkClass = (isDarkMode) => {
  const update = (value = isDarkMode.value) => {
    const htmlEl = window === null || window === void 0 ? void 0 : window.document.querySelector("html");
    htmlEl === null || htmlEl === void 0 ? void 0 : htmlEl.classList.toggle("dark", value);
  };
  onMounted(() => {
    watch(isDarkMode, update, { immediate: true });
  });
  onUnmounted(() => update());
};
const useResolveRouteWithRedirect = (...args) => {
  const router = useRouter();
  const route = router.resolve(...args);
  const lastMatched = route.matched[route.matched.length - 1];
  if (!(lastMatched === null || lastMatched === void 0 ? void 0 : lastMatched.redirect)) {
    return route;
  }
  const { redirect } = lastMatched;
  const resolvedRedirect = isFunction(redirect) ? redirect(route) : redirect;
  const resolvedRedirectObj = isString$1(resolvedRedirect) ? { path: resolvedRedirect } : resolvedRedirect;
  return useResolveRouteWithRedirect(__spreadValues({
    hash: route.hash,
    query: route.query,
    params: route.params
  }, resolvedRedirectObj));
};
const useNavLink = (item) => {
  const resolved = useResolveRouteWithRedirect(item);
  return {
    text: resolved.meta.title || item,
    link: resolved.name === "404" ? item : resolved.fullPath
  };
};
let promise = null;
let promiseResolve = null;
const scrollPromise = {
  wait: () => promise,
  pending: () => {
    promise = new Promise((resolve2) => promiseResolve = resolve2);
  },
  resolve: () => {
    promiseResolve === null || promiseResolve === void 0 ? void 0 : promiseResolve();
    promise = null;
    promiseResolve = null;
  }
};
const useScrollPromise = () => scrollPromise;
const sidebarItemsSymbol = Symbol("sidebarItems");
const useSidebarItems = () => {
  const sidebarItems = inject(sidebarItemsSymbol);
  if (!sidebarItems) {
    throw new Error("useSidebarItems() is called without provider.");
  }
  return sidebarItems;
};
const setupSidebarItems = () => {
  const themeLocale = useThemeLocaleData();
  const frontmatter = usePageFrontmatter();
  const sidebarItems = computed(() => resolveSidebarItems(frontmatter.value, themeLocale.value));
  provide(sidebarItemsSymbol, sidebarItems);
};
const resolveSidebarItems = (frontmatter, themeLocale) => {
  var _a2, _b2, _c, _d;
  const sidebarConfig = (_b2 = (_a2 = frontmatter.sidebar) !== null && _a2 !== void 0 ? _a2 : themeLocale.sidebar) !== null && _b2 !== void 0 ? _b2 : "auto";
  const sidebarDepth = (_d = (_c = frontmatter.sidebarDepth) !== null && _c !== void 0 ? _c : themeLocale.sidebarDepth) !== null && _d !== void 0 ? _d : 2;
  if (frontmatter.home || sidebarConfig === false) {
    return [];
  }
  if (sidebarConfig === "auto") {
    return resolveAutoSidebarItems(sidebarDepth);
  }
  if (isArray(sidebarConfig)) {
    return resolveArraySidebarItems(sidebarConfig, sidebarDepth);
  }
  if (isPlainObject(sidebarConfig)) {
    return resolveMultiSidebarItems(sidebarConfig, sidebarDepth);
  }
  return [];
};
const headerToSidebarItem = (header, sidebarDepth) => ({
  text: header.title,
  link: `#${header.slug}`,
  children: headersToSidebarItemChildren(header.children, sidebarDepth)
});
const headersToSidebarItemChildren = (headers, sidebarDepth) => sidebarDepth > 0 ? headers.map((header) => headerToSidebarItem(header, sidebarDepth - 1)) : [];
const resolveAutoSidebarItems = (sidebarDepth) => {
  const page = usePageData();
  return [
    {
      text: page.value.title,
      children: headersToSidebarItemChildren(page.value.headers, sidebarDepth)
    }
  ];
};
const resolveArraySidebarItems = (sidebarConfig, sidebarDepth) => {
  const route = useRoute();
  const page = usePageData();
  const handleChildItem = (item) => {
    var _a2;
    let childItem;
    if (isString$1(item)) {
      childItem = useNavLink(item);
    } else {
      childItem = item;
    }
    if (childItem.children) {
      return __spreadProps(__spreadValues({}, childItem), {
        children: childItem.children.map((item2) => handleChildItem(item2))
      });
    }
    if (childItem.link === route.path) {
      const headers = ((_a2 = page.value.headers[0]) === null || _a2 === void 0 ? void 0 : _a2.level) === 1 ? page.value.headers[0].children : page.value.headers;
      return __spreadProps(__spreadValues({}, childItem), {
        children: headersToSidebarItemChildren(headers, sidebarDepth)
      });
    }
    return childItem;
  };
  return sidebarConfig.map((item) => handleChildItem(item));
};
const resolveMultiSidebarItems = (sidebarConfig, sidebarDepth) => {
  var _a2;
  const route = useRoute();
  const sidebarPath = resolveLocalePath(sidebarConfig, route.path);
  const matchedSidebarConfig = (_a2 = sidebarConfig[sidebarPath]) !== null && _a2 !== void 0 ? _a2 : [];
  return resolveArraySidebarItems(matchedSidebarConfig, sidebarDepth);
};
const useThemeLocaleData = () => useThemeLocaleData$1();
const _hoisted_1 = { class: "sr-only" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const themeLocale = useThemeLocaleData();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ExternalLinkIcon), null, {
        default: withCtx(() => [
          createBaseVNode("span", _hoisted_1, toDisplayString(unref(themeLocale).openInNewWindow), 1)
        ]),
        _: 1
      });
    };
  }
});
var index = "";
var clientAppEnhance3 = defineClientAppEnhance(({ app, router }) => {
  app.component("Badge", _sfc_main$2);
  app.component("CodeGroup", CodeGroup);
  app.component("CodeGroupItem", _sfc_main$1);
  delete app._context.components.ExternalLinkIcon;
  app.component("ExternalLinkIcon", _sfc_main);
  app.component("NavbarSearch", () => {
    const SearchComponent = app.component("Docsearch") || app.component("SearchBox");
    if (SearchComponent) {
      return h(SearchComponent);
    }
    return null;
  });
  const scrollBehavior = router.options.scrollBehavior;
  router.options.scrollBehavior = async (...args) => {
    await useScrollPromise().wait();
    return scrollBehavior(...args);
  };
});
var clientAppEnhance4 = ({ app }) => {
  app.component("MyTemplate", defineAsyncComponent(() => __vitePreload(() => import("./MyTemplate.9cc801b2.js"), true ? ["assets/MyTemplate.9cc801b2.js","assets/plugin-vue_export-helper.21dcd24c.js"] : void 0)));
};
const useHotKeys = ({ input, hotKeys: hotKeys2 }) => {
  const onKeydown = (event) => {
    if (!input.value || hotKeys2.value.length === 0)
      return;
    if (event.target === document.body && hotKeys2.value.includes(event.key)) {
      input.value.focus();
      event.preventDefault();
    }
  };
  onMounted(() => {
    document.addEventListener("keydown", onKeydown);
  });
  onBeforeUnmount(() => {
    document.removeEventListener("keydown", onKeydown);
  });
};
const searchIndex$1 = [
  {
    "title": "",
    "headers": [],
    "path": "/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "",
    "headers": [],
    "path": "/actualCombat/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "elementui\u5728\u8868\u683C\u4E2D\u63D2\u5165\u56FE\u7247",
    "headers": [
      {
        "level": 2,
        "title": "\u63D2\u5165\u5355\u5F20\uFF0C\u60AC\u6D6E\u9884\u89C8",
        "slug": "\u63D2\u5165\u5355\u5F20-\u60AC\u6D6E\u9884\u89C8",
        "children": []
      },
      {
        "level": 2,
        "title": "\u63D2\u5165\u5355\u5F20\uFF0C\u5168\u5C4F\u9884\u89C8",
        "slug": "\u63D2\u5165\u5355\u5F20-\u5168\u5C4F\u9884\u89C8",
        "children": []
      },
      {
        "level": 2,
        "title": "\u63D2\u5165\u591A\u5F20\u56FE\u7247",
        "slug": "\u63D2\u5165\u591A\u5F20\u56FE\u7247",
        "children": []
      }
    ],
    "path": "/course/elementui%E5%9C%A8%E8%A1%A8%E6%A0%BC%E4%B8%AD%E6%8F%92%E5%85%A5%E5%9B%BE%E7%89%87.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "\u65E5\u5E38\u8BB0\u5F55",
    "headers": [
      {
        "level": 2,
        "title": "ClientOnly\u4F7F\u7528\u7EC4\u4EF6",
        "slug": "clientonly\u4F7F\u7528\u7EC4\u4EF6",
        "children": []
      }
    ],
    "path": "/course/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "spring",
    "headers": [
      {
        "level": 2,
        "title": "models",
        "slug": "models",
        "children": []
      },
      {
        "level": 2,
        "title": "VO\u5C42",
        "slug": "vo\u5C42",
        "children": []
      },
      {
        "level": 2,
        "title": "DTO\u5C42",
        "slug": "dto\u5C42",
        "children": []
      },
      {
        "level": 2,
        "title": "Controller",
        "slug": "controller",
        "children": []
      },
      {
        "level": 2,
        "title": "Service",
        "slug": "service",
        "children": []
      }
    ],
    "path": "/course/spring%E6%B3%A8%E8%A7%A3.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "stripe\u652F\u4ED8",
    "headers": [
      {
        "level": 2,
        "title": "\u524D\u7AEF\u51FA\u767C\u652F\u4ED8",
        "slug": "\u524D\u7AEF\u51FA\u767C\u652F\u4ED8",
        "children": []
      },
      {
        "level": 2,
        "title": "\u62C6\u5206\u4FE1\u7528\u5361\u652F\u4ED8",
        "slug": "\u62C6\u5206\u4FE1\u7528\u5361\u652F\u4ED8",
        "children": []
      }
    ],
    "path": "/course/stripe%E6%94%AF%E4%BB%98.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "\u8D44\u6E90\u5DE5\u5177",
    "headers": [
      {
        "level": 2,
        "title": "1. \u529E\u516C\u88C5\u673A",
        "slug": "_1-\u529E\u516C\u88C5\u673A",
        "children": []
      },
      {
        "level": 2,
        "title": "2. \u5F00\u53D1\u8F6F\u4EF6",
        "slug": "_2-\u5F00\u53D1\u8F6F\u4EF6",
        "children": []
      }
    ],
    "path": "/course/utils.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "vscode\u5E38\u7528\u63D2\u4EF6",
    "headers": [
      {
        "level": 2,
        "title": "\u51E0\u4E4E\u5FC5\u5907\u7684",
        "slug": "\u51E0\u4E4E\u5FC5\u5907\u7684",
        "children": []
      }
    ],
    "path": "/course/vscode%E5%B8%B8%E7%94%A8%E6%8F%92%E4%BB%B6.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "Flutter\u5B9E\u6218",
    "headers": [
      {
        "level": 2,
        "title": "\u9002\u5408\u4EBA\u7FA4",
        "slug": "\u9002\u5408\u4EBA\u7FA4",
        "children": []
      },
      {
        "level": 2,
        "title": "1.\u9879\u76EE\u7ED3\u6784",
        "slug": "_1-\u9879\u76EE\u7ED3\u6784",
        "children": []
      },
      {
        "level": 2,
        "title": "2.\u8D77\u6B65",
        "slug": "_2-\u8D77\u6B65",
        "children": []
      },
      {
        "level": 2,
        "title": "3.\u9519\u8BEF\u6355\u83B7\u548C\u4E0A\u62A5",
        "slug": "_3-\u9519\u8BEF\u6355\u83B7\u548C\u4E0A\u62A5",
        "children": []
      },
      {
        "level": 2,
        "title": "4.\u62BD\u5C49\u9875",
        "slug": "_4-\u62BD\u5C49\u9875",
        "children": []
      },
      {
        "level": 2,
        "title": "5.\u8DEF\u7531\u7BA1\u7406\uFF08getX\uFF09",
        "slug": "_5-\u8DEF\u7531\u7BA1\u7406-getx",
        "children": []
      },
      {
        "level": 2,
        "title": "6.\u56FD\u9645\u5316\uFF08getX\uFF09",
        "slug": "_6-\u56FD\u9645\u5316-getx",
        "children": []
      }
    ],
    "path": "/actualCombat/Flutter%E5%B7%A5%E7%A8%8B%E5%AE%9E%E6%88%98/01.%E8%B5%B7%E6%AD%A5.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "\u95EE\u9898\u96C6\u9526",
    "headers": [
      {
        "level": 2,
        "title": "\u8BF7\u505A\u4E00\u4E0B\u81EA\u6211\u4ECB\u7ECD",
        "slug": "\u8BF7\u505A\u4E00\u4E0B\u81EA\u6211\u4ECB\u7ECD",
        "children": []
      },
      {
        "level": 2,
        "title": "\u4F60\u6700\u5927\u7684\u4F18\u70B9\u662F\u4EC0\u4E48\uFF1F",
        "slug": "\u4F60\u6700\u5927\u7684\u4F18\u70B9\u662F\u4EC0\u4E48",
        "children": []
      },
      {
        "level": 2,
        "title": "\u8BF4\u8BF4\u4F60\u6700\u5927\u7684\u7F3A\u70B9\uFF1F",
        "slug": "\u8BF4\u8BF4\u4F60\u6700\u5927\u7684\u7F3A\u70B9",
        "children": []
      },
      {
        "level": 2,
        "title": "\u4F60\u5BF9\u52A0\u73ED\u6709\u4EC0\u4E48\u770B\u6CD5\uFF1F",
        "slug": "\u4F60\u5BF9\u52A0\u73ED\u6709\u4EC0\u4E48\u770B\u6CD5",
        "children": []
      },
      {
        "level": 2,
        "title": "\u8BF4\u8BF4\u4F60\u5BF9\u85AA\u8D44\u7684\u8981\u6C42\uFF1F",
        "slug": "\u8BF4\u8BF4\u4F60\u5BF9\u85AA\u8D44\u7684\u8981\u6C42",
        "children": []
      },
      {
        "level": 2,
        "title": "\u5728\u4E94\u5E74\u5185\uFF0C\u4F60\u7684\u804C\u4E1A\u89C4\u5212\uFF1F",
        "slug": "\u5728\u4E94\u5E74\u5185-\u4F60\u7684\u804C\u4E1A\u89C4\u5212",
        "children": []
      },
      {
        "level": 2,
        "title": "\u4F60\u8FD8\u6709\u4EC0\u4E48\u95EE\u9898\u8981\u95EE\u5417?",
        "slug": "\u4F60\u8FD8\u6709\u4EC0\u4E48\u95EE\u9898\u8981\u95EE\u5417",
        "children": []
      },
      {
        "level": 2,
        "title": "\u8C08\u8C08\u4F60\u5BF9\u8DF3\u69FD\u7684\u770B\u6CD5?",
        "slug": "\u8C08\u8C08\u4F60\u5BF9\u8DF3\u69FD\u7684\u770B\u6CD5",
        "children": []
      },
      {
        "level": 2,
        "title": "\u4F60\u5BF9\u4E8E\u6211\u4EEC\u516C\u53F8\u4E86\u89E3\u591A\u5C11?",
        "slug": "\u4F60\u5BF9\u4E8E\u6211\u4EEC\u516C\u53F8\u4E86\u89E3\u591A\u5C11",
        "children": []
      }
    ],
    "path": "/guide/interview/interview.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "JS\u9762\u8BD5",
    "headers": [
      {
        "level": 2,
        "title": "1.\u5EF6\u8FDF\u52A0\u8F7DJS\u7684\u65B9\u5F0F\u6709\u54EA\u4E9B",
        "slug": "_1-\u5EF6\u8FDF\u52A0\u8F7Djs\u7684\u65B9\u5F0F\u6709\u54EA\u4E9B",
        "children": []
      },
      {
        "level": 2,
        "title": "2.js\u7684\u6570\u636E\u7C7B\u578B\u548CNaN",
        "slug": "_2-js\u7684\u6570\u636E\u7C7B\u578B\u548Cnan",
        "children": []
      },
      {
        "level": 2,
        "title": "3.null \u548C undefined",
        "slug": "_3-null-\u548C-undefined",
        "children": []
      },
      {
        "level": 2,
        "title": "4.==\u548C===\u6709\u4EC0\u4E48\u4E0D\u540C\uFF1F",
        "slug": "_4-\u548C-\u6709\u4EC0\u4E48\u4E0D\u540C",
        "children": []
      },
      {
        "level": 2,
        "title": "5.\u5B8F\u4EFB\u52A1\u548C\u5FAE\u4EFB\u52A1\uFF08Event Loop/\u4E8B\u4EF6\u5FAA\u73AF \uFF09",
        "slug": "_5-\u5B8F\u4EFB\u52A1\u548C\u5FAE\u4EFB\u52A1-event-loop-\u4E8B\u4EF6\u5FAA\u73AF",
        "children": []
      },
      {
        "level": 2,
        "title": "6.\u4F5C\u7528\u57DF",
        "slug": "_6-\u4F5C\u7528\u57DF",
        "children": []
      },
      {
        "level": 2,
        "title": "7.JS\u5BF9\u8C61\uFF08new\u53D1\u751F\u4E86\u4E0A\u9762\uFF1F\uFF09",
        "slug": "_7-js\u5BF9\u8C61-new\u53D1\u751F\u4E86\u4E0A\u9762",
        "children": []
      },
      {
        "level": 2,
        "title": "8.\u7ED9\u5B9A\u4E00\u4E2A\u6570\u7EC4\uFF0C\u53BB\u9664\u91CD\u590D\u5143\u7D20",
        "slug": "_8-\u7ED9\u5B9A\u4E00\u4E2A\u6570\u7EC4-\u53BB\u9664\u91CD\u590D\u5143\u7D20",
        "children": []
      },
      {
        "level": 2,
        "title": "9.\u4E8B\u4EF6\u5192\u6CE1\u548C\u4E8B\u4EF6\u59D4\u6258",
        "slug": "_9-\u4E8B\u4EF6\u5192\u6CE1\u548C\u4E8B\u4EF6\u59D4\u6258",
        "children": []
      },
      {
        "level": 2,
        "title": "10.\u624B\u5199Promise",
        "slug": "_10-\u624B\u5199promise",
        "children": []
      },
      {
        "level": 2,
        "title": "11.this\u6307\u5411",
        "slug": "_11-this\u6307\u5411",
        "children": []
      },
      {
        "level": 2,
        "title": "12.call,apply,bind",
        "slug": "_12-call-apply-bind",
        "children": []
      },
      {
        "level": 2,
        "title": "13. \u95ED\u5305",
        "slug": "_13-\u95ED\u5305",
        "children": []
      },
      {
        "level": 2,
        "title": "14.\u5BF9\u8C61\u62F7\u8D1D\uFF08\u6DF1\u6D45\u62F7\u8D1D\uFF09",
        "slug": "_14-\u5BF9\u8C61\u62F7\u8D1D-\u6DF1\u6D45\u62F7\u8D1D",
        "children": []
      },
      {
        "level": 2,
        "title": "15. \u9632\u6296\u548C\u8282\u6D41",
        "slug": "_15-\u9632\u6296\u548C\u8282\u6D41",
        "children": []
      },
      {
        "level": 2,
        "title": "16. \u539F\u578B",
        "slug": "_16-\u539F\u578B",
        "children": []
      },
      {
        "level": 2,
        "title": "17.\u7C7B\u4E0E\u7EE7\u627F",
        "slug": "_17-\u7C7B\u4E0E\u7EE7\u627F",
        "children": []
      },
      {
        "level": 2,
        "title": "18. \u72B6\u6001\u7801\uFF08200\u3001400\u7B49\uFF09",
        "slug": "_18-\u72B6\u6001\u7801-200\u3001400\u7B49",
        "children": []
      },
      {
        "level": 2,
        "title": "19. \u8F93\u5165URL\u5230\u9875\u9762\u663E\u793A\u7684\u8FC7\u7A0B\uFF1F",
        "slug": "_19-\u8F93\u5165url\u5230\u9875\u9762\u663E\u793A\u7684\u8FC7\u7A0B",
        "children": []
      },
      {
        "level": 2,
        "title": "20. ES6\u65B0\u7279\u6027",
        "slug": "_20-es6\u65B0\u7279\u6027",
        "children": []
      }
    ],
    "path": "/guide/interview/JSinterview.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "VUE\u9762\u8BD5",
    "headers": [
      {
        "level": 2,
        "title": "1.vue\u7684\u751F\u547D\u5468\u671F",
        "slug": "_1-vue\u7684\u751F\u547D\u5468\u671F",
        "children": []
      },
      {
        "level": 2,
        "title": "2.v-if\u548Cv-show\u7684\u533A\u522B",
        "slug": "_2-v-if\u548Cv-show\u7684\u533A\u522B",
        "children": []
      },
      {
        "level": 2,
        "title": "2.v-if\u548Cv-for\u7684\u4F18\u5148\u7EA7",
        "slug": "_2-v-if\u548Cv-for\u7684\u4F18\u5148\u7EA7",
        "children": []
      },
      {
        "level": 2,
        "title": "3.ref\u662F\u4EC0\u4E48\uFF1F",
        "slug": "_3-ref\u662F\u4EC0\u4E48",
        "children": []
      },
      {
        "level": 2,
        "title": "4.nextTick\u662F\u4EC0\u4E48\uFF1F",
        "slug": "_4-nexttick\u662F\u4EC0\u4E48",
        "children": []
      },
      {
        "level": 2,
        "title": "5.scoped\u539F\u7406",
        "slug": "_5-scoped\u539F\u7406",
        "children": []
      },
      {
        "level": 2,
        "title": "6.Vue\u4E2D\u5982\u4F55\u505A\u6837\u5F0F\u7A7F\u900F",
        "slug": "_6-vue\u4E2D\u5982\u4F55\u505A\u6837\u5F0F\u7A7F\u900F",
        "children": []
      },
      {
        "level": 2,
        "title": "7.\u7EC4\u4EF6\u4E4B\u95F4\u7684\u901A\u4FE1",
        "slug": "_7-\u7EC4\u4EF6\u4E4B\u95F4\u7684\u901A\u4FE1",
        "children": []
      },
      {
        "level": 2,
        "title": "8.computed\u3001methods\u3001watch",
        "slug": "_8-computed\u3001methods\u3001watch",
        "children": []
      },
      {
        "level": 2,
        "title": "9.props\u548Cdata\u4F18\u5148\u7EA7\u8C01\u9AD8",
        "slug": "_9-props\u548Cdata\u4F18\u5148\u7EA7\u8C01\u9AD8",
        "children": []
      },
      {
        "level": 2,
        "title": "10.VueX",
        "slug": "_10-vuex",
        "children": []
      },
      {
        "level": 2,
        "title": "11. Vue\u8BBE\u7F6E\u4EE3\u7406\uFF08vue.config.js\uFF09",
        "slug": "_11-vue\u8BBE\u7F6E\u4EE3\u7406-vue-config-js",
        "children": []
      },
      {
        "level": 2,
        "title": "12. Vue\u8DEF\u7531",
        "slug": "_12-vue\u8DEF\u7531",
        "children": []
      },
      {
        "level": 2,
        "title": "13. \u4ECB\u7ECD\u4E00\u4E0BSPA\u4EE5\u53CA\u5176\u4F18\u7F3A\u70B9\u3002",
        "slug": "_13-\u4ECB\u7ECD\u4E00\u4E0Bspa\u4EE5\u53CA\u5176\u4F18\u7F3A\u70B9\u3002",
        "children": []
      },
      {
        "level": 2,
        "title": "14. v-model\u539F\u7406",
        "slug": "_14-v-model\u539F\u7406",
        "children": []
      },
      {
        "level": 2,
        "title": "15. data\u52AB\u6301",
        "slug": "_15-data\u52AB\u6301",
        "children": []
      },
      {
        "level": 2,
        "title": "16. diff\u7B97\u6CD5",
        "slug": "_16-diff\u7B97\u6CD5",
        "children": []
      }
    ],
    "path": "/guide/interview/VUEinterview.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "\u65E5\u5E38\u6545\u4E8B",
    "headers": [
      {
        "level": 2,
        "title": "\u5154\u5B50\u4E0E\u661F\u661F",
        "slug": "\u5154\u5B50\u4E0E\u661F\u661F",
        "children": []
      },
      {
        "level": 2,
        "title": "\u5929\u4E0A\u7684\u661F\u661F",
        "slug": "\u5929\u4E0A\u7684\u661F\u661F",
        "children": []
      },
      {
        "level": 2,
        "title": "\u82F9\u679C=\u667A\u6167\u679C",
        "slug": "\u82F9\u679C-\u667A\u6167\u679C",
        "children": []
      },
      {
        "level": 2,
        "title": "\u7B28\u7B28\u718A",
        "slug": "\u7B28\u7B28\u718A",
        "children": []
      },
      {
        "level": 2,
        "title": "\u5C0F\u80A5\u732A",
        "slug": "\u5C0F\u80A5\u732A",
        "children": []
      },
      {
        "level": 2,
        "title": "\u68A6\u91CC\u6709\u4F60\uFF0C\u5341\u5206\u751C",
        "slug": "\u68A6\u91CC\u6709\u4F60-\u5341\u5206\u751C",
        "children": []
      },
      {
        "level": 2,
        "title": "\u665A\u5B89\uFF01",
        "slug": "\u665A\u5B89",
        "children": []
      },
      {
        "level": 2,
        "title": "\u7231\uFF08\u957F\u7BC7\uFF09",
        "slug": "\u7231-\u957F\u7BC7",
        "children": []
      },
      {
        "level": 2,
        "title": "\u5154\u5B50\u548C\u72D0\u72F8",
        "slug": "\u5154\u5B50\u548C\u72D0\u72F8",
        "children": []
      },
      {
        "level": 2,
        "title": "\u62B1\u62B1",
        "slug": "\u62B1\u62B1",
        "children": []
      }
    ],
    "path": "/guide/%E6%95%85%E4%BA%8B/story.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "\u6559\u7A0B",
    "headers": [
      {
        "level": 2,
        "title": "\u6559\u7A0B",
        "slug": "\u6559\u7A0B",
        "children": []
      },
      {
        "level": 2,
        "title": "\u6559\u7A0B",
        "slug": "\u6559\u7A0B-1",
        "children": []
      }
    ],
    "path": "/guide/%E6%95%99%E7%A8%8B/text.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "\u67D2",
    "headers": [
      {
        "level": 2,
        "title": "007",
        "slug": "_007",
        "children": []
      }
    ],
    "path": "/guide/%E9%9A%8F%E7%AC%94/reflection.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "git\u7248\u672C\u63A7\u5236",
    "headers": [
      {
        "level": 2,
        "title": "\u8BA4\u8BC6git",
        "slug": "\u8BA4\u8BC6git",
        "children": []
      },
      {
        "level": 2,
        "title": "\u5B89\u88C5Git",
        "slug": "\u5B89\u88C5git",
        "children": []
      },
      {
        "level": 2,
        "title": "\u57FA\u672C\u547D\u4EE4\u4ECB\u7ECD",
        "slug": "\u57FA\u672C\u547D\u4EE4\u4ECB\u7ECD",
        "children": []
      },
      {
        "level": 2,
        "title": "\u6DFB\u52A0\u548C\u63D0\u4EA4",
        "slug": "\u6DFB\u52A0\u548C\u63D0\u4EA4",
        "children": []
      },
      {
        "level": 2,
        "title": "\u5206\u652F",
        "slug": "\u5206\u652F",
        "children": []
      },
      {
        "level": 2,
        "title": "\u5408\u5E76\u5206\u652F",
        "slug": "\u5408\u5E76\u5206\u652F",
        "children": []
      },
      {
        "level": 2,
        "title": "\u53D8\u57FA\u5206\u652F",
        "slug": "\u53D8\u57FA\u5206\u652F",
        "children": []
      },
      {
        "level": 2,
        "title": "\u4F18\u9009",
        "slug": "\u4F18\u9009",
        "children": []
      },
      {
        "level": 2,
        "title": "\u4F7F\u7528IDEA\u7248\u672C\u63A7\u5236",
        "slug": "\u4F7F\u7528idea\u7248\u672C\u63A7\u5236",
        "children": []
      },
      {
        "level": 2,
        "title": "\u8FDC\u7A0B\u4ED3\u5E93",
        "slug": "\u8FDC\u7A0B\u4ED3\u5E93",
        "children": []
      }
    ],
    "path": "/java/git/01.git%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "Linux\u5165\u95E8",
    "headers": [
      {
        "level": 2,
        "title": "\u5B66\u524D\u5FC5\u770B",
        "slug": "\u5B66\u524D\u5FC5\u770B",
        "children": []
      },
      {
        "level": 2,
        "title": "\u5165\u95E8\u6982\u8FF0",
        "slug": "\u5165\u95E8\u6982\u8FF0",
        "children": []
      },
      {
        "level": 2,
        "title": "\u73AF\u5883\u642D\u5EFA\uFF08VMware \u865A\u62DF\u673A\u5B89\u88C5\uFF09",
        "slug": "\u73AF\u5883\u642D\u5EFA-vmware-\u865A\u62DF\u673A\u5B89\u88C5",
        "children": []
      },
      {
        "level": 2,
        "title": "CentOS 7",
        "slug": "centos-7",
        "children": []
      },
      {
        "level": 2,
        "title": "\u5E38\u7528\u547D\u4EE4\uFF08\u91CD\u8981\uFF09",
        "slug": "\u5E38\u7528\u547D\u4EE4-\u91CD\u8981",
        "children": [
          {
            "level": 3,
            "title": "\u5173\u673A",
            "slug": "\u5173\u673A",
            "children": []
          },
          {
            "level": 3,
            "title": "ls",
            "slug": "ls",
            "children": []
          },
          {
            "level": 3,
            "title": "cd",
            "slug": "cd",
            "children": []
          },
          {
            "level": 3,
            "title": "pwd",
            "slug": "pwd",
            "children": []
          },
          {
            "level": 3,
            "title": "mkdir",
            "slug": "mkdir",
            "children": []
          },
          {
            "level": 3,
            "title": "find",
            "slug": "find",
            "children": []
          },
          {
            "level": 3,
            "title": "rmdir",
            "slug": "rmdir",
            "children": []
          },
          {
            "level": 3,
            "title": "cp",
            "slug": "cp",
            "children": []
          },
          {
            "level": 3,
            "title": "mv",
            "slug": "mv",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "\u57FA\u672C\u5C5E\u6027\u89E3\u91CA",
        "slug": "\u57FA\u672C\u5C5E\u6027\u89E3\u91CA",
        "children": [
          {
            "level": 3,
            "title": "chgrp",
            "slug": "chgrp",
            "children": []
          },
          {
            "level": 3,
            "title": "chown",
            "slug": "chown",
            "children": []
          },
          {
            "level": 3,
            "title": "chmod",
            "slug": "chmod",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "\u6587\u4EF6\u5185\u5BB9\u547D\u4EE4",
        "slug": "\u6587\u4EF6\u5185\u5BB9\u547D\u4EE4",
        "children": [
          {
            "level": 3,
            "title": "echo",
            "slug": "echo",
            "children": []
          },
          {
            "level": 3,
            "title": "cat",
            "slug": "cat",
            "children": []
          },
          {
            "level": 3,
            "title": "tac",
            "slug": "tac",
            "children": []
          },
          {
            "level": 3,
            "title": "nl",
            "slug": "nl",
            "children": []
          },
          {
            "level": 3,
            "title": "more",
            "slug": "more",
            "children": []
          },
          {
            "level": 3,
            "title": "less",
            "slug": "less",
            "children": []
          },
          {
            "level": 3,
            "title": "head",
            "slug": "head",
            "children": []
          },
          {
            "level": 3,
            "title": "tail",
            "slug": "tail",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "\u786C\u94FE\u63A5\u548C\u8F6F\u8FDE\u63A5",
        "slug": "\u786C\u94FE\u63A5\u548C\u8F6F\u8FDE\u63A5",
        "children": []
      },
      {
        "level": 2,
        "title": "Vim \u7F16\u8F91\u5668",
        "slug": "vim-\u7F16\u8F91\u5668",
        "children": [
          {
            "level": 3,
            "title": "\u547D\u4EE4\u6A21\u5F0F",
            "slug": "\u547D\u4EE4\u6A21\u5F0F",
            "children": []
          },
          {
            "level": 3,
            "title": "\u8F93\u5165\u6A21\u5F0F",
            "slug": "\u8F93\u5165\u6A21\u5F0F",
            "children": []
          },
          {
            "level": 3,
            "title": "\u5E95\u7EBF\u547D\u4EE4\u6A21\u5F0F",
            "slug": "\u5E95\u7EBF\u547D\u4EE4\u6A21\u5F0F",
            "children": []
          },
          {
            "level": 3,
            "title": "Vim \u6309\u952E\u8BF4\u660E",
            "slug": "vim-\u6309\u952E\u8BF4\u660E",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "\u8D26\u53F7\u7BA1\u7406",
        "slug": "\u8D26\u53F7\u7BA1\u7406",
        "children": [
          {
            "level": 3,
            "title": "\u6DFB\u52A0\u8D26\u53F7",
            "slug": "\u6DFB\u52A0\u8D26\u53F7",
            "children": []
          },
          {
            "level": 3,
            "title": "\u5207\u6362\u7528\u6237",
            "slug": "\u5207\u6362\u7528\u6237",
            "children": []
          },
          {
            "level": 3,
            "title": "\u5220\u9664\u5E10\u53F7",
            "slug": "\u5220\u9664\u5E10\u53F7",
            "children": []
          },
          {
            "level": 3,
            "title": "\u4FEE\u6539\u5E10\u53F7",
            "slug": "\u4FEE\u6539\u5E10\u53F7",
            "children": []
          },
          {
            "level": 3,
            "title": "\u7528\u6237\u53E3\u4EE4\u7684\u7BA1\u7406",
            "slug": "\u7528\u6237\u53E3\u4EE4\u7684\u7BA1\u7406",
            "children": []
          },
          {
            "level": 3,
            "title": "\u7528\u6237\u7EC4\u7BA1\u7406",
            "slug": "\u7528\u6237\u7EC4\u7BA1\u7406",
            "children": []
          },
          {
            "level": 3,
            "title": "\u5220\u9664\u7EC4",
            "slug": "\u5220\u9664\u7EC4",
            "children": []
          },
          {
            "level": 3,
            "title": "\u4FEE\u6539\u7528\u6237\u7EC4\u7684\u5C5E\u6027",
            "slug": "\u4FEE\u6539\u7528\u6237\u7EC4\u7684\u5C5E\u6027",
            "children": []
          },
          {
            "level": 3,
            "title": "\u5207\u6362\u7EC4",
            "slug": "\u5207\u6362\u7EC4",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "\u78C1\u76D8\u7BA1\u7406",
        "slug": "\u78C1\u76D8\u7BA1\u7406",
        "children": [
          {
            "level": 3,
            "title": "df",
            "slug": "df",
            "children": []
          },
          {
            "level": 3,
            "title": "du",
            "slug": "du",
            "children": []
          },
          {
            "level": 3,
            "title": "\u78C1\u76D8\u6302\u8F7D\u4E0E\u5378\u9664",
            "slug": "\u78C1\u76D8\u6302\u8F7D\u4E0E\u5378\u9664",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "\u8FDB\u7A0B\u7BA1\u7406",
        "slug": "\u8FDB\u7A0B\u7BA1\u7406",
        "children": [
          {
            "level": 3,
            "title": "ps",
            "slug": "ps",
            "children": []
          },
          {
            "level": 3,
            "title": "kill-9",
            "slug": "kill-9",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "\u5B89\u88C5JDK",
        "slug": "\u5B89\u88C5jdk",
        "children": []
      }
    ],
    "path": "/java/Linux/01.Linux%E5%85%A5%E9%97%A8.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "MySql\u57FA\u790E",
    "headers": [
      {
        "level": 2,
        "title": "MySql\u5B89\u88C5",
        "slug": "mysql\u5B89\u88C5",
        "children": []
      },
      {
        "level": 2,
        "title": "\u5B89\u88C5 navicat",
        "slug": "\u5B89\u88C5-navicat",
        "children": []
      },
      {
        "level": 2,
        "title": "\u57FA\u672C\u547D\u4EE4\u884C",
        "slug": "\u57FA\u672C\u547D\u4EE4\u884C",
        "children": []
      },
      {
        "level": 2,
        "title": "\u64CD\u4F5C\u6570\u636E\u5E93",
        "slug": "\u64CD\u4F5C\u6570\u636E\u5E93",
        "children": []
      },
      {
        "level": 2,
        "title": "\u64CD\u4F5C\u8868",
        "slug": "\u64CD\u4F5C\u8868",
        "children": [
          {
            "level": 3,
            "title": "1.\u6570\u636E\u7C7B\u578B",
            "slug": "_1-\u6570\u636E\u7C7B\u578B",
            "children": []
          },
          {
            "level": 3,
            "title": "2.\u5B57\u6BB5\u5C5E\u6027\uFF08\u91CD\u8981\uFF09",
            "slug": "_2-\u5B57\u6BB5\u5C5E\u6027-\u91CD\u8981",
            "children": []
          },
          {
            "level": 3,
            "title": "3.\u6570\u636E\u5E93\u5F15\u64CE\u548C\u7F16\u7801",
            "slug": "_3-\u6570\u636E\u5E93\u5F15\u64CE\u548C\u7F16\u7801",
            "children": []
          },
          {
            "level": 3,
            "title": "4.\u5B57\u6BB5\u5220\u9664\u548C\u4FEE\u6539",
            "slug": "_4-\u5B57\u6BB5\u5220\u9664\u548C\u4FEE\u6539",
            "children": []
          }
        ]
      }
    ],
    "path": "/java/mysql/01.mysql.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "\u6578\u64DA\u7BA1\u7406",
    "headers": [
      {
        "level": 2,
        "title": "\u5916\u9375",
        "slug": "\u5916\u9375",
        "children": []
      },
      {
        "level": 2,
        "title": "DML \u8A9E\u8A00",
        "slug": "dml-\u8A9E\u8A00",
        "children": [
          {
            "level": 3,
            "title": "\u63D2\u5165",
            "slug": "\u63D2\u5165",
            "children": []
          },
          {
            "level": 3,
            "title": "\u4FEE\u6539",
            "slug": "\u4FEE\u6539",
            "children": []
          },
          {
            "level": 3,
            "title": "\u522A\u9664",
            "slug": "\u522A\u9664",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "DQL \u67E5\u8A62\u6578\u64DA",
        "slug": "dql-\u67E5\u8A62\u6578\u64DA",
        "children": [
          {
            "level": 3,
            "title": "\u67E5\u8A62",
            "slug": "\u67E5\u8A62",
            "children": []
          },
          {
            "level": 3,
            "title": "\u53BB\u91CD",
            "slug": "\u53BB\u91CD",
            "children": []
          },
          {
            "level": 3,
            "title": "where \u689D\u4EF6\u5B57\u53E5",
            "slug": "where-\u689D\u4EF6\u5B57\u53E5",
            "children": []
          },
          {
            "level": 3,
            "title": "\u6A21\u7CCA\u67E5\u8A62",
            "slug": "\u6A21\u7CCA\u67E5\u8A62",
            "children": []
          },
          {
            "level": 3,
            "title": "\u806F\u8868\u67E5\u8A62",
            "slug": "\u806F\u8868\u67E5\u8A62",
            "children": []
          },
          {
            "level": 3,
            "title": "\u81EA\u9023\u63A5\u53CA\u9023\u8868\u67E5\u8A62",
            "slug": "\u81EA\u9023\u63A5\u53CA\u9023\u8868\u67E5\u8A62",
            "children": []
          },
          {
            "level": 3,
            "title": "\u5206\u9801\uFF08limit\uFF09\u548C\u6392\u5E8F\uFF08order by\uFF09",
            "slug": "\u5206\u9801-limit-\u548C\u6392\u5E8F-order-by",
            "children": []
          },
          {
            "level": 3,
            "title": "\u81EA\u67E5\u8A62\u548C\u5D4C\u5957\u67E5\u8A62",
            "slug": "\u81EA\u67E5\u8A62\u548C\u5D4C\u5957\u67E5\u8A62",
            "children": []
          },
          {
            "level": 3,
            "title": "MySQL \u51FD\u6578",
            "slug": "mysql-\u51FD\u6578",
            "children": []
          },
          {
            "level": 3,
            "title": "\u805A\u5408\u51FD\u6578",
            "slug": "\u805A\u5408\u51FD\u6578",
            "children": []
          }
        ]
      }
    ],
    "path": "/java/mysql/02.mysql%E6%95%B8%E6%93%9A%E7%AE%A1%E7%90%86.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "MySql\u4E8B\u52D9",
    "headers": [
      {
        "level": 2,
        "title": "\u4E8B\u52D9\uFF08ACID\uFF09\u539F\u5247",
        "slug": "\u4E8B\u52D9-acid-\u539F\u5247",
        "children": []
      },
      {
        "level": 2,
        "title": "\u4E8B\u52D9\u7DF4\u7FD2",
        "slug": "\u4E8B\u52D9\u7DF4\u7FD2",
        "children": []
      },
      {
        "level": 2,
        "title": "\u6743\u9650\u7BA1\u7406\u548C\u7528\u6237\u7BA1\u7406",
        "slug": "\u6743\u9650\u7BA1\u7406\u548C\u7528\u6237\u7BA1\u7406",
        "children": []
      },
      {
        "level": 2,
        "title": "mysql\u5907\u4EFD",
        "slug": "mysql\u5907\u4EFD",
        "children": []
      },
      {
        "level": 2,
        "title": "\u6570\u636E\u5E93\u4E09\u5927\u8303\u5F0F",
        "slug": "\u6570\u636E\u5E93\u4E09\u5927\u8303\u5F0F",
        "children": []
      }
    ],
    "path": "/java/mysql/03.mysql%E4%BA%8B%E5%8B%99.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "JDBC",
    "headers": [],
    "path": "/java/mysql/04.JDBC.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "springboot",
    "headers": [
      {
        "level": 2,
        "title": "IDEA\uFF082021.3\u4EE5\u4E0A\u7248\u672C\u5B89\u88DD\uFF09",
        "slug": "idea-2021-3\u4EE5\u4E0A\u7248\u672C\u5B89\u88DD",
        "children": []
      },
      {
        "level": 2,
        "title": "\u521D\u59CB\u5316\u9805\u76EE",
        "slug": "\u521D\u59CB\u5316\u9805\u76EE",
        "children": []
      },
      {
        "level": 2,
        "title": "\u5FEB\u901F\u4E0A\u624B",
        "slug": "\u5FEB\u901F\u4E0A\u624B",
        "children": []
      }
    ],
    "path": "/java/springboot/01.springboot.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "springboot\u542F\u52A8\u539F\u7406",
    "headers": [
      {
        "level": 2,
        "title": "\u4E3B\u7C7B\u4EE3\u7801\u5F00\u59CB\uFF08\u6CE8\u89E3\u4E5F\u4F9D\u8D56\u4E8E\u4EE3\u7801\uFF09",
        "slug": "\u4E3B\u7C7B\u4EE3\u7801\u5F00\u59CB-\u6CE8\u89E3\u4E5F\u4F9D\u8D56\u4E8E\u4EE3\u7801",
        "children": []
      },
      {
        "level": 2,
        "title": "\u76F4\u63A5new\u4E86\u4E00\u4E2Aspring boot\u5BF9\u8C61",
        "slug": "\u76F4\u63A5new\u4E86\u4E00\u4E2Aspring-boot\u5BF9\u8C61",
        "children": []
      },
      {
        "level": 2,
        "title": "getSpringFactoriesInstances",
        "slug": "getspringfactoriesinstances",
        "children": []
      },
      {
        "level": 2,
        "title": "\u603B\u7ED3run\u65B9\u6CD5",
        "slug": "\u603B\u7ED3run\u65B9\u6CD5",
        "children": []
      },
      {
        "level": 2,
        "title": "\u81EA\u52A8\u914D\u7F6E\u539F\u7406",
        "slug": "\u81EA\u52A8\u914D\u7F6E\u539F\u7406",
        "children": []
      }
    ],
    "path": "/java/springboot/02.springboot%E5%90%AF%E5%8A%A8%E5%8E%9F%E7%90%86.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "springboot\u81EA\u52A8\u914D\u7F6E",
    "headers": [
      {
        "level": 2,
        "title": "@EnableAutoConfiguration",
        "slug": "enableautoconfiguration",
        "children": []
      }
    ],
    "path": "/java/springboot/03.springboot%E8%87%AA%E5%8A%A8%E9%85%8D%E7%BD%AE.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "java",
    "headers": [
      {
        "level": 2,
        "title": "\u524D\u671F",
        "slug": "\u524D\u671F",
        "children": [
          {
            "level": 3,
            "title": "\u5B78\u7FD2\u65B9\u6CD5",
            "slug": "\u5B78\u7FD2\u65B9\u6CD5",
            "children": []
          },
          {
            "level": 3,
            "title": "\u4EC0\u9EBC\u662F\u8A08\u7B97\u6A5F\uFF08\u786C\u4EF6\u548C\u8EDF\u4EF6\uFF09\uFF1F",
            "slug": "\u4EC0\u9EBC\u662F\u8A08\u7B97\u6A5F-\u786C\u4EF6\u548C\u8EDF\u4EF6",
            "children": []
          },
          {
            "level": 3,
            "title": "Windows \u5FEB\u6377\u9375",
            "slug": "windows-\u5FEB\u6377\u9375",
            "children": []
          },
          {
            "level": 3,
            "title": "DOS \u547D\u4EE4\uFF08\u547D\u4EE4\u884C\uFF09",
            "slug": "dos-\u547D\u4EE4-\u547D\u4EE4\u884C",
            "children": []
          },
          {
            "level": 3,
            "title": "java \u8A95\u751F\u548C\u7279\u6027\u53CA\u512A\u52E2",
            "slug": "java-\u8A95\u751F\u548C\u7279\u6027\u53CA\u512A\u52E2",
            "children": []
          },
          {
            "level": 3,
            "title": "java \u4E09\u5927\u7248\u672C",
            "slug": "java-\u4E09\u5927\u7248\u672C",
            "children": []
          },
          {
            "level": 3,
            "title": "JDK JRE JVM",
            "slug": "jdk-jre-jvm",
            "children": []
          },
          {
            "level": 3,
            "title": "\u5B89\u88DD JDK",
            "slug": "\u5B89\u88DD-jdk",
            "children": []
          },
          {
            "level": 3,
            "title": "\u5378\u8F09 JDK",
            "slug": "\u5378\u8F09-jdk",
            "children": []
          },
          {
            "level": 3,
            "title": "HelloWorld",
            "slug": "helloworld",
            "children": []
          },
          {
            "level": 3,
            "title": "\u7DE8\u8B6F\u578B\u548C\u89E3\u91CB\u578B",
            "slug": "\u7DE8\u8B6F\u578B\u548C\u89E3\u91CB\u578B",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "Java \u8A9E\u6CD5",
        "slug": "java-\u8A9E\u6CD5",
        "children": [
          {
            "level": 3,
            "title": "\u6CE8\u91CB\uFF0C\u6A19\u8B58\u7B26\uFF0C\u95DC\u9375\u5B57",
            "slug": "\u6CE8\u91CB-\u6A19\u8B58\u7B26-\u95DC\u9375\u5B57",
            "children": []
          },
          {
            "level": 3,
            "title": "\u6578\u64DA\u985E\u578B",
            "slug": "\u6578\u64DA\u985E\u578B",
            "children": []
          },
          {
            "level": 3,
            "title": "\u7C7B\u578B\u8F6C\u6362",
            "slug": "\u7C7B\u578B\u8F6C\u6362",
            "children": []
          },
          {
            "level": 3,
            "title": "\u53D8\u91CF\uFF0C\u5E38\u91CF\uFF0C\u4F5C\u7528\u57DF",
            "slug": "\u53D8\u91CF-\u5E38\u91CF-\u4F5C\u7528\u57DF",
            "children": []
          },
          {
            "level": 3,
            "title": "\u904B\u7B97\u7B26",
            "slug": "\u904B\u7B97\u7B26",
            "children": []
          },
          {
            "level": 3,
            "title": "\u5305\u6A5F\u5236",
            "slug": "\u5305\u6A5F\u5236",
            "children": []
          },
          {
            "level": 3,
            "title": "Scanner\u7528\u6236\u4EA4\u4E92",
            "slug": "scanner\u7528\u6236\u4EA4\u4E92",
            "children": []
          },
          {
            "level": 3,
            "title": "\u987A\u5E8F\u7ED3\u6784",
            "slug": "\u987A\u5E8F\u7ED3\u6784",
            "children": []
          },
          {
            "level": 3,
            "title": "\u9009\u62E9\u7ED3\u6784",
            "slug": "\u9009\u62E9\u7ED3\u6784",
            "children": []
          },
          {
            "level": 3,
            "title": "\u9009\u62E9\u7ED3\u6784",
            "slug": "\u9009\u62E9\u7ED3\u6784-1",
            "children": []
          },
          {
            "level": 3,
            "title": "\u9000\u51FA\u5FAA\u73AF",
            "slug": "\u9000\u51FA\u5FAA\u73AF",
            "children": []
          },
          {
            "level": 3,
            "title": "Debug\u4F7F\u7528",
            "slug": "debug\u4F7F\u7528",
            "children": []
          },
          {
            "level": 3,
            "title": "\u65B9\u6CD5",
            "slug": "\u65B9\u6CD5",
            "children": []
          },
          {
            "level": 3,
            "title": "\u65B9\u6CD5\u91CD\u8F09",
            "slug": "\u65B9\u6CD5\u91CD\u8F09",
            "children": []
          },
          {
            "level": 3,
            "title": "\u547D\u4EE4\u884C\u50B3\u53C3",
            "slug": "\u547D\u4EE4\u884C\u50B3\u53C3",
            "children": []
          },
          {
            "level": 3,
            "title": "\u53EF\u8B8A\u53C3\u6578",
            "slug": "\u53EF\u8B8A\u53C3\u6578",
            "children": []
          },
          {
            "level": 3,
            "title": "\u9012\u5F52",
            "slug": "\u9012\u5F52",
            "children": []
          },
          {
            "level": 3,
            "title": "\u6570\u7EC4",
            "slug": "\u6570\u7EC4",
            "children": []
          },
          {
            "level": 3,
            "title": "\u5185\u5B58\u5206\u6790",
            "slug": "\u5185\u5B58\u5206\u6790",
            "children": []
          },
          {
            "level": 3,
            "title": "\u591A\u7EF4\u6570\u7EC4",
            "slug": "\u591A\u7EF4\u6570\u7EC4",
            "children": []
          },
          {
            "level": 3,
            "title": "Arrays\u7C7B",
            "slug": "arrays\u7C7B",
            "children": []
          },
          {
            "level": 3,
            "title": "\u516B\u79CD\u5192\u6CE1\u6392\u5E8F",
            "slug": "\u516B\u79CD\u5192\u6CE1\u6392\u5E8F",
            "children": []
          },
          {
            "level": 3,
            "title": "\u9B06\u6563\u6578\u7D44\uFF08\u7A00\u758F\u6578\u7D44\uFF09",
            "slug": "\u9B06\u6563\u6578\u7D44-\u7A00\u758F\u6578\u7D44",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "\u9762\u5411\u5C0D\u8C61",
        "slug": "\u9762\u5411\u5C0D\u8C61",
        "children": [
          {
            "level": 3,
            "title": "\u65B9\u6CD5\u56DE\u9867",
            "slug": "\u65B9\u6CD5\u56DE\u9867",
            "children": []
          },
          {
            "level": 3,
            "title": "\u503C\u50B3\u905E\u548C\u5F15\u7528\u50B3\u905E",
            "slug": "\u503C\u50B3\u905E\u548C\u5F15\u7528\u50B3\u905E",
            "children": []
          },
          {
            "level": 3,
            "title": "\u985E\u548C\u5C0D\u8C61\u7684\u95DC\u4FC2\u548C\u5275\u5EFA",
            "slug": "\u985E\u548C\u5C0D\u8C61\u7684\u95DC\u4FC2\u548C\u5275\u5EFA",
            "children": []
          },
          {
            "level": 3,
            "title": "\u69CB\u9020\u5668",
            "slug": "\u69CB\u9020\u5668",
            "children": []
          },
          {
            "level": 3,
            "title": "\u5275\u5EFA\u5C0D\u8C61\u5167\u5B58\u5206\u6790",
            "slug": "\u5275\u5EFA\u5C0D\u8C61\u5167\u5B58\u5206\u6790",
            "children": []
          },
          {
            "level": 3,
            "title": "\u7E3D\u7D50",
            "slug": "\u7E3D\u7D50",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "\u5C01\u88DD",
        "slug": "\u5C01\u88DD",
        "children": []
      },
      {
        "level": 2,
        "title": "\u7E7C\u627F extends",
        "slug": "\u7E7C\u627F-extends",
        "children": []
      },
      {
        "level": 2,
        "title": "\u591A\u614B",
        "slug": "\u591A\u614B",
        "children": [
          {
            "level": 3,
            "title": "instanceof \u985E\u578B\u8F49\u63DB",
            "slug": "instanceof-\u985E\u578B\u8F49\u63DB",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "static\u5173\u952E\u5B57",
        "slug": "static\u5173\u952E\u5B57",
        "children": []
      },
      {
        "level": 2,
        "title": "\u62BD\u8C61\u7C7B",
        "slug": "\u62BD\u8C61\u7C7B",
        "children": []
      },
      {
        "level": 2,
        "title": "\u63A5\u53E3",
        "slug": "\u63A5\u53E3",
        "children": []
      },
      {
        "level": 2,
        "title": "\u591A\u79CD\u5185\u90E8\u7C7B",
        "slug": "\u591A\u79CD\u5185\u90E8\u7C7B",
        "children": []
      },
      {
        "level": 2,
        "title": "\u5F02\u5E38\uFF08Exception\uFF09",
        "slug": "\u5F02\u5E38-exception",
        "children": [
          {
            "level": 3,
            "title": "\u6355\u83B7\u548C\u629B\u51FA\u5F02\u5E38",
            "slug": "\u6355\u83B7\u548C\u629B\u51FA\u5F02\u5E38",
            "children": []
          },
          {
            "level": 3,
            "title": "\u81EA\u5B9A\u4E49\u5F02\u5E38\u53CA\u7ECF\u9A8C\u603B\u7ED3",
            "slug": "\u81EA\u5B9A\u4E49\u5F02\u5E38\u53CA\u7ECF\u9A8C\u603B\u7ED3",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "JavaSE\u603B\u7ED3",
        "slug": "javase\u603B\u7ED3",
        "children": []
      }
    ],
    "path": "/java/%E3%80%8Ajava%E5%85%A5%E9%97%A8%E3%80%8B/01.%E5%9F%BA%E7%A1%80%E4%BB%8B%E7%BB%8D.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "java\u6578\u64DA\u985E\u578B",
    "headers": [
      {
        "level": 2,
        "title": "\u57FA\u672C\u6570\u636E\u7C7B\u578B",
        "slug": "\u57FA\u672C\u6570\u636E\u7C7B\u578B",
        "children": []
      },
      {
        "level": 2,
        "title": "\u5F15\u7528\u6570\u636E\u7C7B\u578B",
        "slug": "\u5F15\u7528\u6570\u636E\u7C7B\u578B",
        "children": []
      },
      {
        "level": 2,
        "title": "\u6574\u6570\u7C7B\u578B",
        "slug": "\u6574\u6570\u7C7B\u578B",
        "children": []
      }
    ],
    "path": "/java/%E3%80%8Ajava%E5%85%A5%E9%97%A8%E3%80%8B/02.%E6%95%B8%E6%93%9A%E9%A1%9E%E5%9E%8B.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "\u591A\u7EBF\u7A0B",
    "headers": [
      {
        "level": 2,
        "title": "\u7EBF\u7A0B\uFF0C\u8FDB\u7A0B\uFF0C\u591A\u7EBF\u7A0B",
        "slug": "\u7EBF\u7A0B-\u8FDB\u7A0B-\u591A\u7EBF\u7A0B",
        "children": []
      }
    ],
    "path": "/java/%E3%80%8Ajava%E5%A4%9A%E7%BA%BF%E7%A8%8B%E3%80%8B/01.%E6%A6%82%E8%BF%B0.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "CSS",
    "headers": [
      {
        "level": 2,
        "title": "\u4EC0\u4E48\u662FCSS\uFF1F",
        "slug": "\u4EC0\u4E48\u662Fcss",
        "children": []
      }
    ],
    "path": "/web/css/01-css.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "Flutter",
    "headers": [
      {
        "level": 2,
        "title": "\u73AF\u5883\u642D\u5EFA",
        "slug": "\u73AF\u5883\u642D\u5EFA",
        "children": []
      },
      {
        "level": 2,
        "title": "JDK\u5B89\u88C5",
        "slug": "jdk\u5B89\u88C5",
        "children": []
      },
      {
        "level": 2,
        "title": "\u5B89\u5353\u73AF\u5883",
        "slug": "\u5B89\u5353\u73AF\u5883",
        "children": []
      },
      {
        "level": 2,
        "title": "Flutter\u5B89\u88C5",
        "slug": "flutter\u5B89\u88C5",
        "children": []
      },
      {
        "level": 2,
        "title": "VSCode\u914D\u7F6E",
        "slug": "vscode\u914D\u7F6E",
        "children": []
      },
      {
        "level": 2,
        "title": "\u7B2C\u4E00\u4E2A\u5E94\u7528",
        "slug": "\u7B2C\u4E00\u4E2A\u5E94\u7528",
        "children": []
      },
      {
        "level": 2,
        "title": "\u591C\u795E\u865A\u62DF\u673A",
        "slug": "\u591C\u795E\u865A\u62DF\u673A",
        "children": []
      }
    ],
    "path": "/web/Flutter/01.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "Dart\u8BED\u6CD5",
    "headers": [
      {
        "level": 2,
        "title": "\u53D8\u91CF\u7684\u4E24\u79CD\u7C7B\u578B",
        "slug": "\u53D8\u91CF\u7684\u4E24\u79CD\u7C7B\u578B",
        "children": []
      },
      {
        "level": 2,
        "title": "\u5E38\u91CF",
        "slug": "\u5E38\u91CF",
        "children": []
      },
      {
        "level": 2,
        "title": "\u6570\u503C",
        "slug": "\u6570\u503C",
        "children": []
      },
      {
        "level": 2,
        "title": "\u5E03\u5C14",
        "slug": "\u5E03\u5C14",
        "children": []
      },
      {
        "level": 2,
        "title": "\u5B57\u7B26\u4E32",
        "slug": "\u5B57\u7B26\u4E32",
        "children": []
      },
      {
        "level": 2,
        "title": "\u65E5\u671F\u548C\u65F6\u95F4",
        "slug": "\u65E5\u671F\u548C\u65F6\u95F4",
        "children": []
      },
      {
        "level": 2,
        "title": "List",
        "slug": "list",
        "children": []
      },
      {
        "level": 2,
        "title": "Map",
        "slug": "map",
        "children": []
      },
      {
        "level": 2,
        "title": "Set",
        "slug": "set",
        "children": []
      },
      {
        "level": 2,
        "title": "Runes",
        "slug": "runes",
        "children": []
      },
      {
        "level": 2,
        "title": "symbol\u3001enum\u3001comments",
        "slug": "symbol\u3001enum\u3001comments",
        "children": []
      },
      {
        "level": 2,
        "title": "\u51FD\u6570 Function",
        "slug": "\u51FD\u6570-function",
        "children": []
      },
      {
        "level": 2,
        "title": "\u64CD\u4F5C\u7B26",
        "slug": "\u64CD\u4F5C\u7B26-2",
        "children": []
      },
      {
        "level": 2,
        "title": "\u6D41\u7A0B\u63A7\u5236\u8BED\u53E5",
        "slug": "\u6D41\u7A0B\u63A7\u5236\u8BED\u53E5",
        "children": []
      },
      {
        "level": 2,
        "title": "\u7C7B",
        "slug": "\u7C7B",
        "children": []
      },
      {
        "level": 2,
        "title": "get\u3001set",
        "slug": "get\u3001set",
        "children": []
      },
      {
        "level": 2,
        "title": "\u9759\u6001\u6210\u5458",
        "slug": "\u9759\u6001\u6210\u5458",
        "children": []
      },
      {
        "level": 2,
        "title": "abstract \u62BD\u8C61",
        "slug": "abstract-\u62BD\u8C61",
        "children": []
      },
      {
        "level": 2,
        "title": "interface \u63A5\u53E3",
        "slug": "interface-\u63A5\u53E3",
        "children": []
      },
      {
        "level": 2,
        "title": "extends \u7EE7\u627F",
        "slug": "extends-\u7EE7\u627F",
        "children": []
      },
      {
        "level": 2,
        "title": "\u591A\u7EE7\u627F\u7C7B mixin",
        "slug": "\u591A\u7EE7\u627F\u7C7B-mixin",
        "children": []
      },
      {
        "level": 2,
        "title": "\u5DE5\u5382\u51FD\u6570",
        "slug": "\u5DE5\u5382\u51FD\u6570",
        "children": []
      },
      {
        "level": 2,
        "title": "\u5E93(\u5305\u7BA1\u7406)",
        "slug": "\u5E93-\u5305\u7BA1\u7406",
        "children": []
      },
      {
        "level": 2,
        "title": "\u6CDB\u578B",
        "slug": "\u6CDB\u578B",
        "children": []
      },
      {
        "level": 2,
        "title": "\u5F02\u6B65 async",
        "slug": "\u5F02\u6B65-async",
        "children": []
      },
      {
        "level": 2,
        "title": "\u6CE8\u89E3 Metadata",
        "slug": "\u6CE8\u89E3-metadata",
        "children": []
      }
    ],
    "path": "/web/Flutter/02.Dart%E8%AF%AD%E6%B3%95.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "widget",
    "headers": [
      {
        "level": 2,
        "title": "Widget\u4ECB\u7ECD\uFF08\u53EF\u8DF3\u8FC7\uFF09",
        "slug": "widget\u4ECB\u7ECD-\u53EF\u8DF3\u8FC7",
        "children": []
      },
      {
        "level": 2,
        "title": "\u7B80\u4ECB",
        "slug": "\u7B80\u4ECB",
        "children": [
          {
            "level": 3,
            "title": "\u6982\u5FF5",
            "slug": "\u6982\u5FF5",
            "children": []
          },
          {
            "level": 3,
            "title": "Widget \u63A5\u53E3",
            "slug": "widget-\u63A5\u53E3",
            "children": []
          },
          {
            "level": 3,
            "title": "Flutter\u4E2D\u7684\u56DB\u68F5\u6811",
            "slug": "flutter\u4E2D\u7684\u56DB\u68F5\u6811",
            "children": []
          },
          {
            "level": 3,
            "title": "StatelessWidget(\u91CD\u8981)",
            "slug": "statelesswidget-\u91CD\u8981",
            "children": []
          },
          {
            "level": 3,
            "title": "StatefulWidget(\u91CD\u8981)",
            "slug": "statefulwidget-\u91CD\u8981",
            "children": []
          },
          {
            "level": 3,
            "title": "State(\u91CD\u8981)",
            "slug": "state-\u91CD\u8981",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "\u7A7A\u5B89\u5168\uFF08null safety\uFF09",
        "slug": "\u7A7A\u5B89\u5168-null-safety",
        "children": []
      }
    ],
    "path": "/web/Flutter/03.widget.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "\u57FA\u672C\u7EC4\u4EF6",
    "headers": [
      {
        "level": 2,
        "title": "Text(\u6587\u672C)",
        "slug": "text-\u6587\u672C",
        "children": []
      },
      {
        "level": 2,
        "title": "Button\uFF08\u6309\u94AE\uFF09",
        "slug": "button-\u6309\u94AE",
        "children": [
          {
            "level": 3,
            "title": "ElevatedButton",
            "slug": "elevatedbutton",
            "children": []
          },
          {
            "level": 3,
            "title": "TextButton",
            "slug": "textbutton",
            "children": []
          },
          {
            "level": 3,
            "title": "OutlineButton",
            "slug": "outlinebutton",
            "children": []
          },
          {
            "level": 3,
            "title": "\u5E26\u56FE\u6807\u7684\u6309\u94AE",
            "slug": "\u5E26\u56FE\u6807\u7684\u6309\u94AE",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "image(\u56FE\u7247)",
        "slug": "image-\u56FE\u7247",
        "children": []
      },
      {
        "level": 2,
        "title": "\u56FE\u6807",
        "slug": "\u56FE\u6807",
        "children": []
      },
      {
        "level": 2,
        "title": "\u5BB9\u5668\u7C7B\u7EC4\u4EF6",
        "slug": "\u5BB9\u5668\u7C7B\u7EC4\u4EF6",
        "children": [
          {
            "level": 3,
            "title": "Container",
            "slug": "container",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "\u5E03\u5C40\u7C7B\u7EC4\u4EF6",
        "slug": "\u5E03\u5C40\u7C7B\u7EC4\u4EF6",
        "children": [
          {
            "level": 3,
            "title": "ListView",
            "slug": "listview",
            "children": []
          }
        ]
      }
    ],
    "path": "/web/Flutter/04.%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "html",
    "headers": [
      {
        "level": 2,
        "title": "\u4EC0\u4E48\u662FHTML\uFF1F",
        "slug": "\u4EC0\u4E48\u662Fhtml",
        "children": []
      }
    ],
    "path": "/web/html/01-html.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "\u5165\u95E8\u5BFC\u8BBA",
    "headers": [
      {
        "level": 2,
        "title": "JavaScript\u4ECB\u7ECD",
        "slug": "javascript\u4ECB\u7ECD",
        "children": []
      },
      {
        "level": 2,
        "title": "\u4F7F\u7528\u9886\u57DF",
        "slug": "\u4F7F\u7528\u9886\u57DF",
        "children": []
      },
      {
        "level": 2,
        "title": "JavaScript \u4E0E Java \u7684\u5173\u7CFB",
        "slug": "javascript-\u4E0E-java-\u7684\u5173\u7CFB",
        "children": []
      },
      {
        "level": 2,
        "title": "JavaScript \u4E0E ECMAScript \u7684\u5173\u7CFB",
        "slug": "javascript-\u4E0E-ecmascript-\u7684\u5173\u7CFB",
        "children": []
      }
    ],
    "path": "/web/JavaScript/%E5%85%A5%E9%97%A8%E5%AF%BC%E8%AE%BA.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "\u5185\u7F6E\u5BF9\u8C61",
    "headers": [
      {
        "level": 2,
        "title": "\u4E00\u3001Object \u5BF9\u8C61",
        "slug": "\u4E00\u3001object-\u5BF9\u8C61",
        "children": []
      },
      {
        "level": 2,
        "title": "Object() \u4F5C\u4E3A\u51FD\u6570\uFF08\u65B9\u6CD5\uFF09",
        "slug": "object-\u4F5C\u4E3A\u51FD\u6570-\u65B9\u6CD5",
        "children": []
      },
      {
        "level": 2,
        "title": "Object \u6784\u9020\u51FD\u6570(new\u521B\u5EFA)",
        "slug": "object-\u6784\u9020\u51FD\u6570-new\u521B\u5EFA",
        "children": []
      },
      {
        "level": 2,
        "title": "Object\u7684\u9759\u6001\u65B9\u6CD5",
        "slug": "object\u7684\u9759\u6001\u65B9\u6CD5",
        "children": [
          {
            "level": 3,
            "title": "Object.keys()",
            "slug": "object-keys",
            "children": []
          },
          {
            "level": 3,
            "title": "Object.getOwnPropertyNames()",
            "slug": "object-getownpropertynames",
            "children": []
          },
          {
            "level": 3,
            "title": "Object \u5176\u4ED6\u9759\u6001\u65B9\u6CD5",
            "slug": "object-\u5176\u4ED6\u9759\u6001\u65B9\u6CD5",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "Object \u7684\u5B9E\u4F8B\u65B9\u6CD5",
        "slug": "object-\u7684\u5B9E\u4F8B\u65B9\u6CD5",
        "children": [
          {
            "level": 3,
            "title": "Object.prototype.valueOf()",
            "slug": "object-prototype-valueof",
            "children": []
          },
          {
            "level": 3,
            "title": "Object.prototype.toString()",
            "slug": "object-prototype-tostring",
            "children": []
          },
          {
            "level": 3,
            "title": "Object.prototype.toLocaleString()",
            "slug": "object-prototype-tolocalestring",
            "children": []
          },
          {
            "level": 3,
            "title": "Object.prototype.hasOwnProperty()",
            "slug": "object-prototype-hasownproperty",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "\u4E8C\u3001\u5C5E\u6027\u63CF\u8FF0\u5BF9\u8C61",
        "slug": "\u4E8C\u3001\u5C5E\u6027\u63CF\u8FF0\u5BF9\u8C61",
        "children": [
          {
            "level": 3,
            "title": "Object.getOwnPropertyDescriptor()",
            "slug": "object-getownpropertydescriptor",
            "children": []
          },
          {
            "level": 3,
            "title": "Object.getOwnPropertyNames()",
            "slug": "object-getownpropertynames-1",
            "children": []
          },
          {
            "level": 3,
            "title": "Object.defineProperty()\uFF0CObject.defineProperties()",
            "slug": "object-defineproperty-object-defineproperties",
            "children": []
          },
          {
            "level": 3,
            "title": "Object.prototype.propertyIsEnumerable()",
            "slug": "object-prototype-propertyisenumerable",
            "children": []
          },
          {
            "level": 3,
            "title": "\u5143\u5C5E\u6027",
            "slug": "\u5143\u5C5E\u6027",
            "children": []
          }
        ]
      }
    ],
    "path": "/web/JavaScript/%E5%86%85%E7%BD%AE%E5%AF%B9%E8%B1%A1.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "\u6570\u636E\u7C7B\u578B\u4E0E\u8FD0\u7B97\u7B26",
    "headers": [
      {
        "level": 2,
        "title": "1.\u6570\u636E\u7C7B\u578B",
        "slug": "_1-\u6570\u636E\u7C7B\u578B",
        "children": [
          {
            "level": 3,
            "title": "null\u548Cundefined",
            "slug": "null\u548Cundefined",
            "children": []
          },
          {
            "level": 3,
            "title": "\u5E03\u5C14\u503C\uFF08boolean\uFF09",
            "slug": "\u5E03\u5C14\u503C-boolean",
            "children": []
          },
          {
            "level": 3,
            "title": "\u6570\u503C\uFF08Number\uFF09",
            "slug": "\u6570\u503C-number",
            "children": []
          },
          {
            "level": 3,
            "title": "\u5B57\u7B26\uFF08String\uFF09",
            "slug": "\u5B57\u7B26-string",
            "children": []
          },
          {
            "level": 3,
            "title": "\u5BF9\u8C61",
            "slug": "\u5BF9\u8C61",
            "children": []
          },
          {
            "level": 3,
            "title": "\u51FD\u6570",
            "slug": "\u51FD\u6570",
            "children": []
          },
          {
            "level": 3,
            "title": "\u6570\u7EC4",
            "slug": "\u6570\u7EC4",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "2.\u8FD0\u7B97\u7B26",
        "slug": "_2-\u8FD0\u7B97\u7B26",
        "children": [
          {
            "level": 3,
            "title": "\u7B97\u672F\u8FD0\u7B97\u7B26",
            "slug": "\u7B97\u672F\u8FD0\u7B97\u7B26",
            "children": []
          },
          {
            "level": 3,
            "title": "\u6BD4\u8F83\u8FD0\u7B97\u7B26",
            "slug": "\u6BD4\u8F83\u8FD0\u7B97\u7B26",
            "children": []
          },
          {
            "level": 3,
            "title": "\u5E03\u5C14\u8FD0\u7B97\u7B26",
            "slug": "\u5E03\u5C14\u8FD0\u7B97\u7B26",
            "children": []
          },
          {
            "level": 3,
            "title": "\u4E8C\u8FDB\u5236\u4F4D\u8FD0\u7B97\u7B26",
            "slug": "\u4E8C\u8FDB\u5236\u4F4D\u8FD0\u7B97\u7B26",
            "children": []
          },
          {
            "level": 3,
            "title": "\u5176\u4ED6\u8FD0\u7B97\u7B26",
            "slug": "\u5176\u4ED6\u8FD0\u7B97\u7B26",
            "children": []
          }
        ]
      }
    ],
    "path": "/web/JavaScript/%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E4%B8%8E%E8%BF%90%E7%AE%97%E7%AC%A6.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "\u8BED\u6CD5\u57FA\u7840",
    "headers": [
      {
        "level": 2,
        "title": "\u6570\u636E\u7C7B\u578B\u8F6C\u6362",
        "slug": "\u6570\u636E\u7C7B\u578B\u8F6C\u6362",
        "children": [
          {
            "level": 3,
            "title": "\u5F3A\u5236\u8F6C\u6362",
            "slug": "\u5F3A\u5236\u8F6C\u6362",
            "children": []
          },
          {
            "level": 3,
            "title": "\u81EA\u52A8\u8F6C\u6362",
            "slug": "\u81EA\u52A8\u8F6C\u6362",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "\u9519\u8BEF\u5904\u7406\u673A\u5236",
        "slug": "\u9519\u8BEF\u5904\u7406\u673A\u5236",
        "children": [
          {
            "level": 3,
            "title": "Error \u5B9E\u4F8B\u5BF9\u8C61",
            "slug": "error-\u5B9E\u4F8B\u5BF9\u8C61",
            "children": []
          },
          {
            "level": 3,
            "title": "\u539F\u751F\u9519\u8BEF\u7C7B\u578B",
            "slug": "\u539F\u751F\u9519\u8BEF\u7C7B\u578B",
            "children": []
          },
          {
            "level": 3,
            "title": "\u81EA\u5B9A\u4E49\u9519\u8BEF",
            "slug": "\u81EA\u5B9A\u4E49\u9519\u8BEF",
            "children": []
          },
          {
            "level": 3,
            "title": "throw\u8BED\u53E5",
            "slug": "throw\u8BED\u53E5",
            "children": []
          },
          {
            "level": 3,
            "title": "try...catch \u7ED3\u6784",
            "slug": "try-catch-\u7ED3\u6784",
            "children": []
          },
          {
            "level": 3,
            "title": "finally \u4EE3\u7801\u5757",
            "slug": "finally-\u4EE3\u7801\u5757",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "console \u5BF9\u8C61\u4E0E\u63A7\u5236\u53F0",
        "slug": "console-\u5BF9\u8C61\u4E0E\u63A7\u5236\u53F0",
        "children": [
          {
            "level": 3,
            "title": "console \u5BF9\u8C61\u7684\u9759\u6001\u65B9\u6CD5",
            "slug": "console-\u5BF9\u8C61\u7684\u9759\u6001\u65B9\u6CD5",
            "children": []
          },
          {
            "level": 3,
            "title": "\u63A7\u5236\u53F0\u547D\u4EE4\u884C API",
            "slug": "\u63A7\u5236\u53F0\u547D\u4EE4\u884C-api",
            "children": []
          },
          {
            "level": 3,
            "title": "debugger \u8BED\u53E5",
            "slug": "debugger-\u8BED\u53E5",
            "children": []
          }
        ]
      }
    ],
    "path": "/web/JavaScript/%E8%AF%AD%E6%B3%95%E5%9F%BA%E7%A1%80.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "Jenkins",
    "headers": [],
    "path": "/web/Jenkins/01.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "\u57FA\u7840\u7C7B\u578B",
    "headers": [
      {
        "level": 2,
        "title": "\u5B89\u88C5TypeScript",
        "slug": "\u5B89\u88C5typescript",
        "children": []
      },
      {
        "level": 2,
        "title": "\u57FA\u7840\u7C7B\u578B",
        "slug": "\u57FA\u7840\u7C7B\u578B-1",
        "children": [
          {
            "level": 3,
            "title": "\u5E03\u5C14\u503C",
            "slug": "\u5E03\u5C14\u503C",
            "children": []
          },
          {
            "level": 3,
            "title": "\u6570\u5B57",
            "slug": "\u6570\u5B57",
            "children": []
          },
          {
            "level": 3,
            "title": "\u5B57\u7B26\u4E32",
            "slug": "\u5B57\u7B26\u4E32",
            "children": []
          },
          {
            "level": 3,
            "title": "\u6570\u7EC4",
            "slug": "\u6570\u7EC4",
            "children": []
          },
          {
            "level": 3,
            "title": "\u679A\u4E3E",
            "slug": "\u679A\u4E3E",
            "children": []
          },
          {
            "level": 3,
            "title": "Any",
            "slug": "any",
            "children": []
          },
          {
            "level": 3,
            "title": "Void",
            "slug": "void",
            "children": []
          },
          {
            "level": 3,
            "title": "Null \u548C Undefined",
            "slug": "null-\u548C-undefined",
            "children": []
          },
          {
            "level": 3,
            "title": "Never",
            "slug": "never",
            "children": []
          },
          {
            "level": 3,
            "title": "Object",
            "slug": "object",
            "children": []
          },
          {
            "level": 3,
            "title": "\u7C7B\u578B\u65AD\u8A00",
            "slug": "\u7C7B\u578B\u65AD\u8A00",
            "children": []
          },
          {
            "level": 3,
            "title": "\u5173\u4E8Elet",
            "slug": "\u5173\u4E8Elet",
            "children": []
          }
        ]
      }
    ],
    "path": "/web/TypeScript/01.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "\u53D8\u91CF\u58F0\u660E",
    "headers": [
      {
        "level": 2,
        "title": "var\u58F0\u660E",
        "slug": "var\u58F0\u660E",
        "children": []
      },
      {
        "level": 2,
        "title": "let \u58F0\u660E",
        "slug": "let-\u58F0\u660E",
        "children": []
      },
      {
        "level": 2,
        "title": "const \u58F0\u660E",
        "slug": "const-\u58F0\u660E",
        "children": []
      },
      {
        "level": 2,
        "title": "\u89E3\u6784",
        "slug": "\u89E3\u6784",
        "children": []
      }
    ],
    "path": "/web/TypeScript/02.%E5%8F%98%E9%87%8F%E5%A3%B0%E6%98%8E.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "\u63A5\u53E3",
    "headers": [
      {
        "level": 2,
        "title": "1. \u7406\u89E3",
        "slug": "_1-\u7406\u89E3",
        "children": []
      },
      {
        "level": 2,
        "title": "2. readonly(\u53EA\u8BFB\u5C5E\u6027)",
        "slug": "_2-readonly-\u53EA\u8BFB\u5C5E\u6027",
        "children": []
      },
      {
        "level": 2,
        "title": "3. \uFF1F\uFF08\u53EF\u9009\u5C5E\u6027\uFF09",
        "slug": "_3-\u53EF\u9009\u5C5E\u6027",
        "children": []
      },
      {
        "level": 2,
        "title": "4. \u63CF\u8FF0\u5C5E\u6027",
        "slug": "_4-\u63CF\u8FF0\u5C5E\u6027",
        "children": []
      },
      {
        "level": 2,
        "title": "5. \u51FD\u6570\u63A5\u53E3",
        "slug": "_5-\u51FD\u6570\u63A5\u53E3",
        "children": []
      },
      {
        "level": 2,
        "title": "5. \u63A5\u53E3\u7684\u7EE7\u627F",
        "slug": "_5-\u63A5\u53E3\u7684\u7EE7\u627F",
        "children": []
      }
    ],
    "path": "/web/TypeScript/03.%E6%8E%A5%E5%8F%A3.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "\u7C7B",
    "headers": [
      {
        "level": 2,
        "title": "\u7C7B\u7684\u5B9A\u4E49",
        "slug": "\u7C7B\u7684\u5B9A\u4E49",
        "children": []
      },
      {
        "level": 2,
        "title": "\u7EE7\u627F",
        "slug": "\u7EE7\u627F",
        "children": []
      },
      {
        "level": 2,
        "title": "\u516C\u5171\uFF0C\u79C1\u6709\u4E0E\u53D7\u4FDD\u62A4\u7684\u4FEE\u9970\u7B26",
        "slug": "\u516C\u5171-\u79C1\u6709\u4E0E\u53D7\u4FDD\u62A4\u7684\u4FEE\u9970\u7B26",
        "children": []
      },
      {
        "level": 2,
        "title": "readonly \u53EA\u8B80\u4FEE\u9970\u7B26",
        "slug": "readonly-\u53EA\u8B80\u4FEE\u9970\u7B26",
        "children": [
          {
            "level": 3,
            "title": "\u53C2\u6570\u5C5E\u6027",
            "slug": "\u53C2\u6570\u5C5E\u6027",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "\u5B58\u53D6\u5668",
        "slug": "\u5B58\u53D6\u5668",
        "children": []
      }
    ],
    "path": "/web/TypeScript/04.%E7%B1%BB.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "vue\u524D\u7F6E",
    "headers": [
      {
        "level": 2,
        "title": "\u524D\u7F6E",
        "slug": "\u524D\u7F6E",
        "children": []
      },
      {
        "level": 2,
        "title": "MVVM\u6A21\u5F0F\uFF1F",
        "slug": "mvvm\u6A21\u5F0F",
        "children": [
          {
            "level": 3,
            "title": "MVC",
            "slug": "mvc",
            "children": []
          },
          {
            "level": 3,
            "title": "MVP",
            "slug": "mvp",
            "children": []
          },
          {
            "level": 3,
            "title": "MVVM",
            "slug": "mvvm",
            "children": []
          },
          {
            "level": 3,
            "title": "\u4F8B\u5B50\u5BF9\u6BD4",
            "slug": "\u4F8B\u5B50\u5BF9\u6BD4",
            "children": []
          },
          {
            "level": 3,
            "title": "vue\u5B9E\u73B0\u4F8B\u5B50",
            "slug": "vue\u5B9E\u73B0\u4F8B\u5B50",
            "children": []
          }
        ]
      },
      {
        "level": 2,
        "title": "\u5B89\u88C5vue-devtools",
        "slug": "\u5B89\u88C5vue-devtools",
        "children": []
      },
      {
        "level": 2,
        "title": "\u5F00\u53D1\u5DE5\u5177",
        "slug": "\u5F00\u53D1\u5DE5\u5177",
        "children": []
      }
    ],
    "path": "/web/vue/01.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "vue\u6307\u4EE4",
    "headers": [
      {
        "level": 2,
        "title": "\u5F15\u5165vue",
        "slug": "\u5F15\u5165vue",
        "children": []
      },
      {
        "level": 2,
        "title": "vue\u5B9E\u4F8B",
        "slug": "vue\u5B9E\u4F8B",
        "children": []
      },
      {
        "level": 2,
        "title": "\u63D2\u503C\u4E0E\u6307\u4EE4",
        "slug": "\u63D2\u503C\u4E0E\u6307\u4EE4",
        "children": [
          {
            "level": 3,
            "title": "v-if\u3001v-else\u3001v-show",
            "slug": "v-if\u3001v-else\u3001v-show",
            "children": []
          },
          {
            "level": 3,
            "title": "v-for",
            "slug": "v-for",
            "children": []
          },
          {
            "level": 3,
            "title": "v-text \u3001v-html",
            "slug": "v-text-\u3001v-html",
            "children": []
          },
          {
            "level": 3,
            "title": "v-on",
            "slug": "v-on",
            "children": []
          },
          {
            "level": 3,
            "title": "v-bind",
            "slug": "v-bind",
            "children": []
          },
          {
            "level": 3,
            "title": "v-model",
            "slug": "v-model",
            "children": []
          },
          {
            "level": 3,
            "title": "v-pre\u3001v-cloak\u3001v-once",
            "slug": "v-pre\u3001v-cloak\u3001v-once",
            "children": []
          }
        ]
      }
    ],
    "path": "/web/vue/02vue%E6%8C%87%E4%BB%A4.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "vue\u5168\u5C40API",
    "headers": [
      {
        "level": 2,
        "title": "Vue.directive\u81EA\u5B9A\u4E49\u5C5E\u6027",
        "slug": "vue-directive\u81EA\u5B9A\u4E49\u5C5E\u6027",
        "children": []
      },
      {
        "level": 2,
        "title": "Vue.extend\u6784\u9020\u5668",
        "slug": "vue-extend\u6784\u9020\u5668",
        "children": []
      },
      {
        "level": 2,
        "title": "Vue.set\u5168\u5C40\u64CD\u4F5C",
        "slug": "vue-set\u5168\u5C40\u64CD\u4F5C",
        "children": []
      },
      {
        "level": 2,
        "title": "Vue\u751F\u547D\u5468\u671F(\u94A9\u5B50\u51FD\u6570)",
        "slug": "vue\u751F\u547D\u5468\u671F-\u94A9\u5B50\u51FD\u6570",
        "children": []
      },
      {
        "level": 2,
        "title": "Template\u6A21\u677F",
        "slug": "template\u6A21\u677F",
        "children": []
      },
      {
        "level": 2,
        "title": "componemt(\u7EC4\u4EF6)",
        "slug": "componemt-\u7EC4\u4EF6",
        "children": []
      }
    ],
    "path": "/web/vue/03%E5%85%A8%E5%B1%80API.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "Vue3.x",
    "headers": [
      {
        "level": 2,
        "title": "\u524D\u7F6E",
        "slug": "\u524D\u7F6E",
        "children": []
      },
      {
        "level": 2,
        "title": "\u521B\u5EFAvue3.x\u9879\u76EE",
        "slug": "\u521B\u5EFAvue3-x\u9879\u76EE",
        "children": [
          {
            "level": 3,
            "title": "1. vite\u521B\u5EFA",
            "slug": "_1-vite\u521B\u5EFA",
            "children": []
          },
          {
            "level": 3,
            "title": "\u76EE\u5F55\u89E3\u6790\uFF08\u57FA\u672C\u53D8\u5316\u89E3\u6790\uFF09",
            "slug": "\u76EE\u5F55\u89E3\u6790-\u57FA\u672C\u53D8\u5316\u89E3\u6790",
            "children": []
          }
        ]
      }
    ],
    "path": "/web/vue3/01.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "webpack\u4ECB\u7ECD",
    "headers": [
      {
        "level": 2,
        "title": "webpack\u5165\u5751",
        "slug": "webpack\u5165\u5751",
        "children": []
      },
      {
        "level": 2,
        "title": "webpack\u57FA\u7840",
        "slug": "webpack\u57FA\u7840",
        "children": [
          {
            "level": 3,
            "title": "\u5FEB\u901F\u4E0A\u624B",
            "slug": "\u5FEB\u901F\u4E0A\u624B",
            "children": []
          },
          {
            "level": 3,
            "title": "\u914D\u7F6E\u6587\u4EF6",
            "slug": "\u914D\u7F6E\u6587\u4EF6",
            "children": []
          },
          {
            "level": 3,
            "title": "Loader",
            "slug": "loader",
            "children": []
          },
          {
            "level": 3,
            "title": "\u63D2\u4EF6\uFF08plugin\uFF09",
            "slug": "\u63D2\u4EF6-plugin",
            "children": []
          },
          {
            "level": 3,
            "title": "\u81EA\u52A8\u6E05\u7A7A\u6253\u5305\u76EE\u5F55",
            "slug": "\u81EA\u52A8\u6E05\u7A7A\u6253\u5305\u76EE\u5F55",
            "children": []
          },
          {
            "level": 3,
            "title": "\u533A\u5206\u73AF\u5883",
            "slug": "\u533A\u5206\u73AF\u5883",
            "children": []
          },
          {
            "level": 3,
            "title": "\u4F7F\u7528devServer",
            "slug": "\u4F7F\u7528devserver",
            "children": []
          }
        ]
      }
    ],
    "path": "/web/webpack/webpack.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "",
    "headers": [],
    "path": "/404.html",
    "pathLocale": "/",
    "extraFields": []
  }
];
const searchIndex = ref(searchIndex$1);
const useSearchIndex = () => searchIndex;
if (import_meta.webpackHot || false) {
  __VUE_HMR_RUNTIME__.updateSearchIndex = (data) => {
    searchIndex.value = data;
  };
}
const nonASCIIRegExp = /[^\x00-\x7F]/;
const splitWords = (str) => str.split(/\s+/g).map((str2) => str2.trim()).filter((str2) => !!str2);
const escapeRegExp = (str) => str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
const isQueryMatched = (query, toMatch) => {
  const toMatchStr = toMatch.join(" ");
  const words = splitWords(query);
  if (nonASCIIRegExp.test(query)) {
    return words.some((word) => toMatchStr.toLowerCase().indexOf(word) > -1);
  }
  const hasTrailingSpace = query.endsWith(" ");
  const searchRegex = new RegExp(words.map((word, index2) => {
    if (words.length === index2 + 1 && !hasTrailingSpace) {
      return `(?=.*\\b${escapeRegExp(word)})`;
    }
    return `(?=.*\\b${escapeRegExp(word)}\\b)`;
  }).join("") + ".+", "gi");
  return searchRegex.test(toMatchStr);
};
const useSearchSuggestions = ({ searchIndex: searchIndex2, routeLocale, query, maxSuggestions: maxSuggestions2 }) => {
  const localeSearchIndex = computed(() => searchIndex2.value.filter((item) => item.pathLocale === routeLocale.value));
  return computed(() => {
    const searchStr = query.value.trim().toLowerCase();
    if (!searchStr)
      return [];
    const suggestions = [];
    const matchPageHeader = (searchIndexItem, header) => {
      if (isQueryMatched(searchStr, [header.title])) {
        suggestions.push({
          link: `${searchIndexItem.path}#${header.slug}`,
          title: searchIndexItem.title,
          header: header.title
        });
      }
      for (const child of header.children) {
        if (suggestions.length >= maxSuggestions2.value) {
          return;
        }
        matchPageHeader(searchIndexItem, child);
      }
    };
    for (const searchIndexItem of localeSearchIndex.value) {
      if (suggestions.length >= maxSuggestions2.value) {
        break;
      }
      if (isQueryMatched(searchStr, [
        searchIndexItem.title,
        ...searchIndexItem.extraFields
      ])) {
        suggestions.push({
          link: searchIndexItem.path,
          title: searchIndexItem.title
        });
        continue;
      }
      for (const header of searchIndexItem.headers) {
        if (suggestions.length >= maxSuggestions2.value) {
          break;
        }
        matchPageHeader(searchIndexItem, header);
      }
    }
    return suggestions;
  });
};
const useSuggestionsFocus = (suggestions) => {
  const focusIndex = ref(0);
  const focusNext = () => {
    if (focusIndex.value < suggestions.value.length - 1) {
      focusIndex.value += 1;
    } else {
      focusIndex.value = 0;
    }
  };
  const focusPrev = () => {
    if (focusIndex.value > 0) {
      focusIndex.value -= 1;
    } else {
      focusIndex.value = suggestions.value.length - 1;
    }
  };
  return {
    focusIndex,
    focusNext,
    focusPrev
  };
};
const SearchBox = defineComponent({
  name: "SearchBox",
  props: {
    locales: {
      type: Object,
      required: false,
      default: () => ({})
    },
    hotKeys: {
      type: Array,
      required: false,
      default: () => []
    },
    maxSuggestions: {
      type: Number,
      required: false,
      default: 5
    }
  },
  setup(props) {
    const { locales: locales2, hotKeys: hotKeys2, maxSuggestions: maxSuggestions2 } = toRefs(props);
    const router = useRouter();
    const routeLocale = useRouteLocale();
    const searchIndex2 = useSearchIndex();
    const input = ref(null);
    const isActive = ref(false);
    const query = ref("");
    const locale = computed(() => {
      var _a2;
      return (_a2 = locales2.value[routeLocale.value]) !== null && _a2 !== void 0 ? _a2 : {};
    });
    const suggestions = useSearchSuggestions({
      searchIndex: searchIndex2,
      routeLocale,
      query,
      maxSuggestions: maxSuggestions2
    });
    const { focusIndex, focusNext, focusPrev } = useSuggestionsFocus(suggestions);
    useHotKeys({ input, hotKeys: hotKeys2 });
    const showSuggestions = computed(() => isActive.value && !!suggestions.value.length);
    const onArrowUp = () => {
      if (!showSuggestions.value) {
        return;
      }
      focusPrev();
    };
    const onArrowDown = () => {
      if (!showSuggestions.value) {
        return;
      }
      focusNext();
    };
    const goTo = (index2) => {
      if (!showSuggestions.value) {
        return;
      }
      const suggestion = suggestions.value[index2];
      if (!suggestion) {
        return;
      }
      router.push(suggestion.link).then(() => {
        query.value = "";
        focusIndex.value = 0;
      });
    };
    return () => h("form", {
      class: "search-box",
      role: "search"
    }, [
      h("input", {
        ref: input,
        type: "search",
        placeholder: locale.value.placeholder,
        autocomplete: "off",
        spellcheck: false,
        value: query.value,
        onFocus: () => isActive.value = true,
        onBlur: () => isActive.value = false,
        onInput: (event) => query.value = event.target.value,
        onKeydown: (event) => {
          switch (event.key) {
            case "ArrowUp": {
              onArrowUp();
              break;
            }
            case "ArrowDown": {
              onArrowDown();
              break;
            }
            case "Enter": {
              event.preventDefault();
              goTo(focusIndex.value);
              break;
            }
          }
        }
      }),
      showSuggestions.value && h("ul", {
        class: "suggestions",
        onMouseleave: () => focusIndex.value = -1
      }, suggestions.value.map(({ link, title, header }, index2) => h("li", {
        class: [
          "suggestion",
          {
            focus: focusIndex.value === index2
          }
        ],
        onMouseenter: () => focusIndex.value = index2,
        onMousedown: () => goTo(index2)
      }, h("a", {
        href: link,
        onClick: (event) => event.preventDefault()
      }, [
        h("span", {
          class: "page-title"
        }, title),
        header && h("span", { class: "page-header" }, `> ${header}`)
      ]))))
    ]);
  }
});
var vars$2 = "";
var search = "";
const locales = { "/": { "placeholder": "\u641C\u7D22" } };
const hotKeys = ["s", "/"];
const maxSuggestions = 5;
var clientAppEnhance5 = defineClientAppEnhance(({ app }) => {
  app.component("SearchBox", (props) => h(SearchBox, __spreadValues({
    locales,
    hotKeys,
    maxSuggestions
  }, props)));
});
const clientAppEnhances = [
  clientAppEnhance0,
  clientAppEnhance1,
  clientAppEnhance2,
  clientAppEnhance3,
  clientAppEnhance4,
  clientAppEnhance5
];
function r(r2, e, n) {
  var i, t, o;
  e === void 0 && (e = 50), n === void 0 && (n = {});
  var a = (i = n.isImmediate) != null && i, u = (t = n.callback) != null && t, c = n.maxWait, v = Date.now(), l = [];
  function f() {
    if (c !== void 0) {
      var r3 = Date.now() - v;
      if (r3 + e >= c)
        return c - r3;
    }
    return e;
  }
  var d = function() {
    var e2 = [].slice.call(arguments), n2 = this;
    return new Promise(function(i2, t2) {
      var c2 = a && o === void 0;
      if (o !== void 0 && clearTimeout(o), o = setTimeout(function() {
        if (o = void 0, v = Date.now(), !a) {
          var i3 = r2.apply(n2, e2);
          u && u(i3), l.forEach(function(r3) {
            return (0, r3.resolve)(i3);
          }), l = [];
        }
      }, f()), c2) {
        var d2 = r2.apply(n2, e2);
        return u && u(d2), i2(d2);
      }
      l.push({ resolve: i2, reject: t2 });
    });
  };
  return d.cancel = function(r3) {
    o !== void 0 && clearTimeout(o), l.forEach(function(e2) {
      return (0, e2.reject)(r3);
    }), l = [];
  }, d;
}
const getScrollTop = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
var vars$1 = "";
var backToTop = "";
const BackToTop = defineComponent({
  name: "BackToTop",
  setup() {
    const scrollTop = ref(0);
    const show = computed(() => scrollTop.value > 300);
    const onScroll = r(() => {
      scrollTop.value = getScrollTop();
    }, 100);
    onMounted(() => {
      scrollTop.value = getScrollTop();
      window.addEventListener("scroll", () => onScroll());
    });
    const backToTopEl = h("div", { class: "back-to-top", onClick: scrollToTop });
    return () => h(Transition, {
      name: "back-to-top"
    }, {
      default: () => show.value ? backToTopEl : null
    });
  }
});
const clientAppRootComponents = [
  BackToTop
];
const useActiveHeaderLinks = ({ headerLinkSelector: headerLinkSelector2, headerAnchorSelector: headerAnchorSelector2, delay: delay2, offset: offset2 = 5 }) => {
  const router = useRouter();
  const page = usePageData();
  const setActiveRouteHash = () => {
    var _a2, _b2, _c, _d;
    const headerLinks = Array.from(document.querySelectorAll(headerLinkSelector2));
    const headerAnchors = Array.from(document.querySelectorAll(headerAnchorSelector2));
    const existedHeaderAnchors = headerAnchors.filter((anchor) => headerLinks.some((link) => link.hash === anchor.hash));
    const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
    const scrollBottom = window.innerHeight + scrollTop;
    const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const isAtPageBottom = Math.abs(scrollHeight - scrollBottom) < offset2;
    for (let i = 0; i < existedHeaderAnchors.length; i++) {
      const anchor = existedHeaderAnchors[i];
      const nextAnchor = existedHeaderAnchors[i + 1];
      const isTheFirstAnchorActive = i === 0 && scrollTop === 0;
      const hasPassedCurrentAnchor = scrollTop >= ((_b2 = (_a2 = anchor.parentElement) === null || _a2 === void 0 ? void 0 : _a2.offsetTop) !== null && _b2 !== void 0 ? _b2 : 0) - offset2;
      const hasNotPassedNextAnchor = !nextAnchor || scrollTop < ((_d = (_c = nextAnchor.parentElement) === null || _c === void 0 ? void 0 : _c.offsetTop) !== null && _d !== void 0 ? _d : 0) - offset2;
      const isActive = isTheFirstAnchorActive || hasPassedCurrentAnchor && hasNotPassedNextAnchor;
      if (!isActive)
        continue;
      const routeHash = decodeURIComponent(router.currentRoute.value.hash);
      const anchorHash = decodeURIComponent(anchor.hash);
      if (routeHash === anchorHash)
        return;
      if (isAtPageBottom) {
        for (let j = i + 1; j < existedHeaderAnchors.length; j++) {
          if (routeHash === decodeURIComponent(existedHeaderAnchors[j].hash)) {
            return;
          }
        }
      }
      replaceWithoutScrollBehavior(router, {
        hash: anchorHash,
        force: true
      });
      return;
    }
  };
  const onScroll = r(() => setActiveRouteHash(), delay2);
  onMounted(() => {
    onScroll();
    window.addEventListener("scroll", () => onScroll());
  });
  onBeforeUnmount(() => {
    window.removeEventListener("scroll", () => onScroll());
  });
  watch(() => page.value.path, () => onScroll());
};
const replaceWithoutScrollBehavior = async (router, ...args) => {
  const { scrollBehavior } = router.options;
  router.options.scrollBehavior = void 0;
  await router.replace(...args).finally(() => router.options.scrollBehavior = scrollBehavior);
};
const headerLinkSelector = "a.sidebar-item";
const headerAnchorSelector = ".header-anchor";
const delay = 200;
const offset = 5;
var clientAppSetup0 = defineClientAppSetup(() => {
  useActiveHeaderLinks({
    headerLinkSelector,
    headerAnchorSelector,
    delay,
    offset
  });
});
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var nprogress$1 = { exports: {} };
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
(function(module, exports) {
  (function(root, factory) {
    {
      module.exports = factory();
    }
  })(commonjsGlobal, function() {
    var NProgress = {};
    NProgress.version = "0.2.0";
    var Settings = NProgress.settings = {
      minimum: 0.08,
      easing: "ease",
      positionUsing: "",
      speed: 200,
      trickle: true,
      trickleRate: 0.02,
      trickleSpeed: 800,
      showSpinner: true,
      barSelector: '[role="bar"]',
      spinnerSelector: '[role="spinner"]',
      parent: "body",
      template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
    };
    NProgress.configure = function(options) {
      var key, value;
      for (key in options) {
        value = options[key];
        if (value !== void 0 && options.hasOwnProperty(key))
          Settings[key] = value;
      }
      return this;
    };
    NProgress.status = null;
    NProgress.set = function(n) {
      var started = NProgress.isStarted();
      n = clamp(n, Settings.minimum, 1);
      NProgress.status = n === 1 ? null : n;
      var progress = NProgress.render(!started), bar = progress.querySelector(Settings.barSelector), speed = Settings.speed, ease = Settings.easing;
      progress.offsetWidth;
      queue2(function(next) {
        if (Settings.positionUsing === "")
          Settings.positionUsing = NProgress.getPositioningCSS();
        css2(bar, barPositionCSS(n, speed, ease));
        if (n === 1) {
          css2(progress, {
            transition: "none",
            opacity: 1
          });
          progress.offsetWidth;
          setTimeout(function() {
            css2(progress, {
              transition: "all " + speed + "ms linear",
              opacity: 0
            });
            setTimeout(function() {
              NProgress.remove();
              next();
            }, speed);
          }, speed);
        } else {
          setTimeout(next, speed);
        }
      });
      return this;
    };
    NProgress.isStarted = function() {
      return typeof NProgress.status === "number";
    };
    NProgress.start = function() {
      if (!NProgress.status)
        NProgress.set(0);
      var work = function() {
        setTimeout(function() {
          if (!NProgress.status)
            return;
          NProgress.trickle();
          work();
        }, Settings.trickleSpeed);
      };
      if (Settings.trickle)
        work();
      return this;
    };
    NProgress.done = function(force) {
      if (!force && !NProgress.status)
        return this;
      return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
    };
    NProgress.inc = function(amount) {
      var n = NProgress.status;
      if (!n) {
        return NProgress.start();
      } else {
        if (typeof amount !== "number") {
          amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
        }
        n = clamp(n + amount, 0, 0.994);
        return NProgress.set(n);
      }
    };
    NProgress.trickle = function() {
      return NProgress.inc(Math.random() * Settings.trickleRate);
    };
    (function() {
      var initial = 0, current = 0;
      NProgress.promise = function($promise) {
        if (!$promise || $promise.state() === "resolved") {
          return this;
        }
        if (current === 0) {
          NProgress.start();
        }
        initial++;
        current++;
        $promise.always(function() {
          current--;
          if (current === 0) {
            initial = 0;
            NProgress.done();
          } else {
            NProgress.set((initial - current) / initial);
          }
        });
        return this;
      };
    })();
    NProgress.render = function(fromStart) {
      if (NProgress.isRendered())
        return document.getElementById("nprogress");
      addClass(document.documentElement, "nprogress-busy");
      var progress = document.createElement("div");
      progress.id = "nprogress";
      progress.innerHTML = Settings.template;
      var bar = progress.querySelector(Settings.barSelector), perc = fromStart ? "-100" : toBarPerc(NProgress.status || 0), parent = document.querySelector(Settings.parent), spinner;
      css2(bar, {
        transition: "all 0 linear",
        transform: "translate3d(" + perc + "%,0,0)"
      });
      if (!Settings.showSpinner) {
        spinner = progress.querySelector(Settings.spinnerSelector);
        spinner && removeElement(spinner);
      }
      if (parent != document.body) {
        addClass(parent, "nprogress-custom-parent");
      }
      parent.appendChild(progress);
      return progress;
    };
    NProgress.remove = function() {
      removeClass(document.documentElement, "nprogress-busy");
      removeClass(document.querySelector(Settings.parent), "nprogress-custom-parent");
      var progress = document.getElementById("nprogress");
      progress && removeElement(progress);
    };
    NProgress.isRendered = function() {
      return !!document.getElementById("nprogress");
    };
    NProgress.getPositioningCSS = function() {
      var bodyStyle = document.body.style;
      var vendorPrefix = "WebkitTransform" in bodyStyle ? "Webkit" : "MozTransform" in bodyStyle ? "Moz" : "msTransform" in bodyStyle ? "ms" : "OTransform" in bodyStyle ? "O" : "";
      if (vendorPrefix + "Perspective" in bodyStyle) {
        return "translate3d";
      } else if (vendorPrefix + "Transform" in bodyStyle) {
        return "translate";
      } else {
        return "margin";
      }
    };
    function clamp(n, min, max) {
      if (n < min)
        return min;
      if (n > max)
        return max;
      return n;
    }
    function toBarPerc(n) {
      return (-1 + n) * 100;
    }
    function barPositionCSS(n, speed, ease) {
      var barCSS;
      if (Settings.positionUsing === "translate3d") {
        barCSS = { transform: "translate3d(" + toBarPerc(n) + "%,0,0)" };
      } else if (Settings.positionUsing === "translate") {
        barCSS = { transform: "translate(" + toBarPerc(n) + "%,0)" };
      } else {
        barCSS = { "margin-left": toBarPerc(n) + "%" };
      }
      barCSS.transition = "all " + speed + "ms " + ease;
      return barCSS;
    }
    var queue2 = function() {
      var pending = [];
      function next() {
        var fn = pending.shift();
        if (fn) {
          fn(next);
        }
      }
      return function(fn) {
        pending.push(fn);
        if (pending.length == 1)
          next();
      };
    }();
    var css2 = function() {
      var cssPrefixes = ["Webkit", "O", "Moz", "ms"], cssProps = {};
      function camelCase(string) {
        return string.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(match, letter) {
          return letter.toUpperCase();
        });
      }
      function getVendorProp(name) {
        var style = document.body.style;
        if (name in style)
          return name;
        var i = cssPrefixes.length, capName = name.charAt(0).toUpperCase() + name.slice(1), vendorName;
        while (i--) {
          vendorName = cssPrefixes[i] + capName;
          if (vendorName in style)
            return vendorName;
        }
        return name;
      }
      function getStyleProp(name) {
        name = camelCase(name);
        return cssProps[name] || (cssProps[name] = getVendorProp(name));
      }
      function applyCss(element, prop, value) {
        prop = getStyleProp(prop);
        element.style[prop] = value;
      }
      return function(element, properties) {
        var args = arguments, prop, value;
        if (args.length == 2) {
          for (prop in properties) {
            value = properties[prop];
            if (value !== void 0 && properties.hasOwnProperty(prop))
              applyCss(element, prop, value);
          }
        } else {
          applyCss(element, args[1], args[2]);
        }
      };
    }();
    function hasClass(element, name) {
      var list = typeof element == "string" ? element : classList(element);
      return list.indexOf(" " + name + " ") >= 0;
    }
    function addClass(element, name) {
      var oldList = classList(element), newList = oldList + name;
      if (hasClass(oldList, name))
        return;
      element.className = newList.substring(1);
    }
    function removeClass(element, name) {
      var oldList = classList(element), newList;
      if (!hasClass(element, name))
        return;
      newList = oldList.replace(" " + name + " ", " ");
      element.className = newList.substring(1, newList.length - 1);
    }
    function classList(element) {
      return (" " + (element.className || "") + " ").replace(/\s+/gi, " ");
    }
    function removeElement(element) {
      element && element.parentNode && element.parentNode.removeChild(element);
    }
    return NProgress;
  });
})(nprogress$1);
var vars = "";
var nprogress = "";
const useNprogress = () => {
  onMounted(() => {
    const router = useRouter();
    const loadedPages = new Set();
    loadedPages.add(router.currentRoute.value.path);
    nprogress$1.exports.configure({ showSpinner: false });
    router.beforeEach((to) => {
      if (!loadedPages.has(to.path)) {
        nprogress$1.exports.start();
      }
    });
    router.afterEach((to) => {
      loadedPages.add(to.path);
      nprogress$1.exports.done();
    });
  });
};
var clientAppSetup1 = defineClientAppSetup(() => {
  useNprogress();
});
var clientAppSetup2 = defineClientAppSetup(() => {
  setupDarkMode();
  setupSidebarItems();
});
const clientAppSetups = [
  clientAppSetup0,
  clientAppSetup1,
  clientAppSetup2
];
const routeItems = [
  ["v-8daa1a0e", "/", { "title": "" }, ["/index.html", "/README.md"]],
  ["v-67b7fbf4", "/actualCombat/", { "title": "" }, ["/actualCombat/index.html", "/actualCombat/README.md"]],
  ["v-6886cbbd", "/course/elementui%E5%9C%A8%E8%A1%A8%E6%A0%BC%E4%B8%AD%E6%8F%92%E5%85%A5%E5%9B%BE%E7%89%87.html", { "title": "elementui\u5728\u8868\u683C\u4E2D\u63D2\u5165\u56FE\u7247" }, ["/course/elementui\u5728\u8868\u683C\u4E2D\u63D2\u5165\u56FE\u7247.html", "/course/elementui%E5%9C%A8%E8%A1%A8%E6%A0%BC%E4%B8%AD%E6%8F%92%E5%85%A5%E5%9B%BE%E7%89%87", "/course/elementui\u5728\u8868\u683C\u4E2D\u63D2\u5165\u56FE\u7247.md", "/course/elementui%E5%9C%A8%E8%A1%A8%E6%A0%BC%E4%B8%AD%E6%8F%92%E5%85%A5%E5%9B%BE%E7%89%87.md"]],
  ["v-b9c2d34a", "/course/", { "title": "\u65E5\u5E38\u8BB0\u5F55" }, ["/course/index.html", "/course/README.md"]],
  ["v-4b48928e", "/course/spring%E6%B3%A8%E8%A7%A3.html", { "title": "spring" }, ["/course/spring\u6CE8\u89E3.html", "/course/spring%E6%B3%A8%E8%A7%A3", "/course/spring\u6CE8\u89E3.md", "/course/spring%E6%B3%A8%E8%A7%A3.md"]],
  ["v-9148d7c4", "/course/stripe%E6%94%AF%E4%BB%98.html", { "title": "stripe\u652F\u4ED8" }, ["/course/stripe\u652F\u4ED8.html", "/course/stripe%E6%94%AF%E4%BB%98", "/course/stripe\u652F\u4ED8.md", "/course/stripe%E6%94%AF%E4%BB%98.md"]],
  ["v-4bac9763", "/course/utils.html", { "title": "\u8D44\u6E90\u5DE5\u5177" }, ["/course/utils", "/course/utils.md"]],
  ["v-66ff7ae2", "/course/vscode%E5%B8%B8%E7%94%A8%E6%8F%92%E4%BB%B6.html", { "title": "vscode\u5E38\u7528\u63D2\u4EF6" }, ["/course/vscode\u5E38\u7528\u63D2\u4EF6.html", "/course/vscode%E5%B8%B8%E7%94%A8%E6%8F%92%E4%BB%B6", "/course/vscode\u5E38\u7528\u63D2\u4EF6.md", "/course/vscode%E5%B8%B8%E7%94%A8%E6%8F%92%E4%BB%B6.md"]],
  ["v-c8744e90", "/actualCombat/Flutter%E5%B7%A5%E7%A8%8B%E5%AE%9E%E6%88%98/01.%E8%B5%B7%E6%AD%A5.html", { "title": "Flutter\u5B9E\u6218" }, ["/actualCombat/Flutter\u5DE5\u7A0B\u5B9E\u6218/01.\u8D77\u6B65.html", "/actualCombat/Flutter%E5%B7%A5%E7%A8%8B%E5%AE%9E%E6%88%98/01.%E8%B5%B7%E6%AD%A5", "/actualCombat/Flutter\u5DE5\u7A0B\u5B9E\u6218/01.\u8D77\u6B65.md", "/actualCombat/Flutter%E5%B7%A5%E7%A8%8B%E5%AE%9E%E6%88%98/01.%E8%B5%B7%E6%AD%A5.md"]],
  ["v-3509cb32", "/guide/interview/interview.html", { "title": "\u95EE\u9898\u96C6\u9526" }, ["/guide/interview/interview", "/guide/interview/interview.md"]],
  ["v-5d3f7a3b", "/guide/interview/JSinterview.html", { "title": "JS\u9762\u8BD5" }, ["/guide/interview/JSinterview", "/guide/interview/JSinterview.md"]],
  ["v-2d570564", "/guide/interview/VUEinterview.html", { "title": "VUE\u9762\u8BD5" }, ["/guide/interview/VUEinterview", "/guide/interview/VUEinterview.md"]],
  ["v-71958ec2", "/guide/%E6%95%85%E4%BA%8B/story.html", { "title": "\u65E5\u5E38\u6545\u4E8B" }, ["/guide/\u6545\u4E8B/story.html", "/guide/%E6%95%85%E4%BA%8B/story", "/guide/\u6545\u4E8B/story.md", "/guide/%E6%95%85%E4%BA%8B/story.md"]],
  ["v-3803ce0e", "/guide/%E6%95%99%E7%A8%8B/text.html", { "title": "\u6559\u7A0B" }, ["/guide/\u6559\u7A0B/text.html", "/guide/%E6%95%99%E7%A8%8B/text", "/guide/\u6559\u7A0B/text.md", "/guide/%E6%95%99%E7%A8%8B/text.md"]],
  ["v-6c145c9c", "/guide/%E9%9A%8F%E7%AC%94/reflection.html", { "title": "\u67D2" }, ["/guide/\u968F\u7B14/reflection.html", "/guide/%E9%9A%8F%E7%AC%94/reflection", "/guide/\u968F\u7B14/reflection.md", "/guide/%E9%9A%8F%E7%AC%94/reflection.md"]],
  ["v-88893a3e", "/java/git/01.git%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6.html", { "title": "git\u7248\u672C\u63A7\u5236" }, ["/java/git/01.git\u7248\u672C\u63A7\u5236.html", "/java/git/01.git%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6", "/java/git/01.git\u7248\u672C\u63A7\u5236.md", "/java/git/01.git%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6.md"]],
  ["v-061c80c6", "/java/Linux/01.Linux%E5%85%A5%E9%97%A8.html", { "title": "Linux\u5165\u95E8" }, ["/java/Linux/01.Linux\u5165\u95E8.html", "/java/Linux/01.Linux%E5%85%A5%E9%97%A8", "/java/Linux/01.Linux\u5165\u95E8.md", "/java/Linux/01.Linux%E5%85%A5%E9%97%A8.md"]],
  ["v-6785e53a", "/java/mysql/01.mysql.html", { "title": "MySql\u57FA\u790E" }, ["/java/mysql/01.mysql", "/java/mysql/01.mysql.md"]],
  ["v-4f12841a", "/java/mysql/02.mysql%E6%95%B8%E6%93%9A%E7%AE%A1%E7%90%86.html", { "title": "\u6578\u64DA\u7BA1\u7406" }, ["/java/mysql/02.mysql\u6578\u64DA\u7BA1\u7406.html", "/java/mysql/02.mysql%E6%95%B8%E6%93%9A%E7%AE%A1%E7%90%86", "/java/mysql/02.mysql\u6578\u64DA\u7BA1\u7406.md", "/java/mysql/02.mysql%E6%95%B8%E6%93%9A%E7%AE%A1%E7%90%86.md"]],
  ["v-363b4215", "/java/mysql/03.mysql%E4%BA%8B%E5%8B%99.html", { "title": "MySql\u4E8B\u52D9" }, ["/java/mysql/03.mysql\u4E8B\u52D9.html", "/java/mysql/03.mysql%E4%BA%8B%E5%8B%99", "/java/mysql/03.mysql\u4E8B\u52D9.md", "/java/mysql/03.mysql%E4%BA%8B%E5%8B%99.md"]],
  ["v-39d72d95", "/java/mysql/04.JDBC.html", { "title": "JDBC" }, ["/java/mysql/04.JDBC", "/java/mysql/04.JDBC.md"]],
  ["v-23b022e9", "/java/springboot/01.springboot.html", { "title": "springboot" }, ["/java/springboot/01.springboot", "/java/springboot/01.springboot.md"]],
  ["v-1f229241", "/java/springboot/02.springboot%E5%90%AF%E5%8A%A8%E5%8E%9F%E7%90%86.html", { "title": "springboot\u542F\u52A8\u539F\u7406" }, ["/java/springboot/02.springboot\u542F\u52A8\u539F\u7406.html", "/java/springboot/02.springboot%E5%90%AF%E5%8A%A8%E5%8E%9F%E7%90%86", "/java/springboot/02.springboot\u542F\u52A8\u539F\u7406.md", "/java/springboot/02.springboot%E5%90%AF%E5%8A%A8%E5%8E%9F%E7%90%86.md"]],
  ["v-21d7a310", "/java/springboot/03.springboot%E8%87%AA%E5%8A%A8%E9%85%8D%E7%BD%AE.html", { "title": "springboot\u81EA\u52A8\u914D\u7F6E" }, ["/java/springboot/03.springboot\u81EA\u52A8\u914D\u7F6E.html", "/java/springboot/03.springboot%E8%87%AA%E5%8A%A8%E9%85%8D%E7%BD%AE", "/java/springboot/03.springboot\u81EA\u52A8\u914D\u7F6E.md", "/java/springboot/03.springboot%E8%87%AA%E5%8A%A8%E9%85%8D%E7%BD%AE.md"]],
  ["v-64dc3831", "/java/%E3%80%8Ajava%E5%85%A5%E9%97%A8%E3%80%8B/01.%E5%9F%BA%E7%A1%80%E4%BB%8B%E7%BB%8D.html", { "title": "java" }, ["/java/\u300Ajava\u5165\u95E8\u300B/01.\u57FA\u7840\u4ECB\u7ECD.html", "/java/%E3%80%8Ajava%E5%85%A5%E9%97%A8%E3%80%8B/01.%E5%9F%BA%E7%A1%80%E4%BB%8B%E7%BB%8D", "/java/\u300Ajava\u5165\u95E8\u300B/01.\u57FA\u7840\u4ECB\u7ECD.md", "/java/%E3%80%8Ajava%E5%85%A5%E9%97%A8%E3%80%8B/01.%E5%9F%BA%E7%A1%80%E4%BB%8B%E7%BB%8D.md"]],
  ["v-ff7fbc46", "/java/%E3%80%8Ajava%E5%85%A5%E9%97%A8%E3%80%8B/02.%E6%95%B8%E6%93%9A%E9%A1%9E%E5%9E%8B.html", { "title": "java\u6578\u64DA\u985E\u578B" }, ["/java/\u300Ajava\u5165\u95E8\u300B/02.\u6578\u64DA\u985E\u578B.html", "/java/%E3%80%8Ajava%E5%85%A5%E9%97%A8%E3%80%8B/02.%E6%95%B8%E6%93%9A%E9%A1%9E%E5%9E%8B", "/java/\u300Ajava\u5165\u95E8\u300B/02.\u6578\u64DA\u985E\u578B.md", "/java/%E3%80%8Ajava%E5%85%A5%E9%97%A8%E3%80%8B/02.%E6%95%B8%E6%93%9A%E9%A1%9E%E5%9E%8B.md"]],
  ["v-f1c2e4d6", "/java/%E3%80%8Ajava%E5%A4%9A%E7%BA%BF%E7%A8%8B%E3%80%8B/01.%E6%A6%82%E8%BF%B0.html", { "title": "\u591A\u7EBF\u7A0B" }, ["/java/\u300Ajava\u591A\u7EBF\u7A0B\u300B/01.\u6982\u8FF0.html", "/java/%E3%80%8Ajava%E5%A4%9A%E7%BA%BF%E7%A8%8B%E3%80%8B/01.%E6%A6%82%E8%BF%B0", "/java/\u300Ajava\u591A\u7EBF\u7A0B\u300B/01.\u6982\u8FF0.md", "/java/%E3%80%8Ajava%E5%A4%9A%E7%BA%BF%E7%A8%8B%E3%80%8B/01.%E6%A6%82%E8%BF%B0.md"]],
  ["v-72cc4ebc", "/web/css/01-css.html", { "title": "CSS" }, ["/web/css/01-css", "/web/css/01-css.md"]],
  ["v-1b13d411", "/web/Flutter/01.html", { "title": "Flutter" }, ["/web/Flutter/01", "/web/Flutter/01.md"]],
  ["v-4d4398ea", "/web/Flutter/02.Dart%E8%AF%AD%E6%B3%95.html", { "title": "Dart\u8BED\u6CD5" }, ["/web/Flutter/02.Dart\u8BED\u6CD5.html", "/web/Flutter/02.Dart%E8%AF%AD%E6%B3%95", "/web/Flutter/02.Dart\u8BED\u6CD5.md", "/web/Flutter/02.Dart%E8%AF%AD%E6%B3%95.md"]],
  ["v-8cbd5a1e", "/web/Flutter/03.widget.html", { "title": "widget" }, ["/web/Flutter/03.widget", "/web/Flutter/03.widget.md"]],
  ["v-48456869", "/web/Flutter/04.%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6.html", { "title": "\u57FA\u672C\u7EC4\u4EF6" }, ["/web/Flutter/04.\u57FA\u7840\u7EC4\u4EF6.html", "/web/Flutter/04.%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6", "/web/Flutter/04.\u57FA\u7840\u7EC4\u4EF6.md", "/web/Flutter/04.%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6.md"]],
  ["v-cce3d85c", "/web/html/01-html.html", { "title": "html" }, ["/web/html/01-html", "/web/html/01-html.md"]],
  ["v-72bd4e03", "/web/JavaScript/%E5%85%A5%E9%97%A8%E5%AF%BC%E8%AE%BA.html", { "title": "\u5165\u95E8\u5BFC\u8BBA" }, ["/web/JavaScript/\u5165\u95E8\u5BFC\u8BBA.html", "/web/JavaScript/%E5%85%A5%E9%97%A8%E5%AF%BC%E8%AE%BA", "/web/JavaScript/\u5165\u95E8\u5BFC\u8BBA.md", "/web/JavaScript/%E5%85%A5%E9%97%A8%E5%AF%BC%E8%AE%BA.md"]],
  ["v-783b80d4", "/web/JavaScript/%E5%86%85%E7%BD%AE%E5%AF%B9%E8%B1%A1.html", { "title": "\u5185\u7F6E\u5BF9\u8C61" }, ["/web/JavaScript/\u5185\u7F6E\u5BF9\u8C61.html", "/web/JavaScript/%E5%86%85%E7%BD%AE%E5%AF%B9%E8%B1%A1", "/web/JavaScript/\u5185\u7F6E\u5BF9\u8C61.md", "/web/JavaScript/%E5%86%85%E7%BD%AE%E5%AF%B9%E8%B1%A1.md"]],
  ["v-5debe7e1", "/web/JavaScript/%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E4%B8%8E%E8%BF%90%E7%AE%97%E7%AC%A6.html", { "title": "\u6570\u636E\u7C7B\u578B\u4E0E\u8FD0\u7B97\u7B26" }, ["/web/JavaScript/\u6570\u636E\u7C7B\u578B\u4E0E\u8FD0\u7B97\u7B26.html", "/web/JavaScript/%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E4%B8%8E%E8%BF%90%E7%AE%97%E7%AC%A6", "/web/JavaScript/\u6570\u636E\u7C7B\u578B\u4E0E\u8FD0\u7B97\u7B26.md", "/web/JavaScript/%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E4%B8%8E%E8%BF%90%E7%AE%97%E7%AC%A6.md"]],
  ["v-24f06668", "/web/JavaScript/%E8%AF%AD%E6%B3%95%E5%9F%BA%E7%A1%80.html", { "title": "\u8BED\u6CD5\u57FA\u7840" }, ["/web/JavaScript/\u8BED\u6CD5\u57FA\u7840.html", "/web/JavaScript/%E8%AF%AD%E6%B3%95%E5%9F%BA%E7%A1%80", "/web/JavaScript/\u8BED\u6CD5\u57FA\u7840.md", "/web/JavaScript/%E8%AF%AD%E6%B3%95%E5%9F%BA%E7%A1%80.md"]],
  ["v-4fa2b6ab", "/web/Jenkins/01.html", { "title": "Jenkins" }, ["/web/Jenkins/01", "/web/Jenkins/01.md"]],
  ["v-3689f102", "/web/TypeScript/01.html", { "title": "\u57FA\u7840\u7C7B\u578B" }, ["/web/TypeScript/01", "/web/TypeScript/01.md"]],
  ["v-998cc5e4", "/web/TypeScript/02.%E5%8F%98%E9%87%8F%E5%A3%B0%E6%98%8E.html", { "title": "\u53D8\u91CF\u58F0\u660E" }, ["/web/TypeScript/02.\u53D8\u91CF\u58F0\u660E.html", "/web/TypeScript/02.%E5%8F%98%E9%87%8F%E5%A3%B0%E6%98%8E", "/web/TypeScript/02.\u53D8\u91CF\u58F0\u660E.md", "/web/TypeScript/02.%E5%8F%98%E9%87%8F%E5%A3%B0%E6%98%8E.md"]],
  ["v-3859e3e8", "/web/TypeScript/03.%E6%8E%A5%E5%8F%A3.html", { "title": "\u63A5\u53E3" }, ["/web/TypeScript/03.\u63A5\u53E3.html", "/web/TypeScript/03.%E6%8E%A5%E5%8F%A3", "/web/TypeScript/03.\u63A5\u53E3.md", "/web/TypeScript/03.%E6%8E%A5%E5%8F%A3.md"]],
  ["v-1e578a45", "/web/TypeScript/04.%E7%B1%BB.html", { "title": "\u7C7B" }, ["/web/TypeScript/04.\u7C7B.html", "/web/TypeScript/04.%E7%B1%BB", "/web/TypeScript/04.\u7C7B.md", "/web/TypeScript/04.%E7%B1%BB.md"]],
  ["v-e9674cca", "/web/vue/01.html", { "title": "vue\u524D\u7F6E" }, ["/web/vue/01", "/web/vue/01.md"]],
  ["v-306f3916", "/web/vue/02vue%E6%8C%87%E4%BB%A4.html", { "title": "vue\u6307\u4EE4" }, ["/web/vue/02vue\u6307\u4EE4.html", "/web/vue/02vue%E6%8C%87%E4%BB%A4", "/web/vue/02vue\u6307\u4EE4.md", "/web/vue/02vue%E6%8C%87%E4%BB%A4.md"]],
  ["v-2ca8e124", "/web/vue/03%E5%85%A8%E5%B1%80API.html", { "title": "vue\u5168\u5C40API" }, ["/web/vue/03\u5168\u5C40API.html", "/web/vue/03%E5%85%A8%E5%B1%80API", "/web/vue/03\u5168\u5C40API.md", "/web/vue/03%E5%85%A8%E5%B1%80API.md"]],
  ["v-d71deaac", "/web/vue3/01.html", { "title": "Vue3.x" }, ["/web/vue3/01", "/web/vue3/01.md"]],
  ["v-58f4867c", "/web/webpack/webpack.html", { "title": "webpack\u4ECB\u7ECD" }, ["/web/webpack/webpack", "/web/webpack/webpack.md"]],
  ["v-3706649a", "/404.html", {}, ["/404"]]
];
const pagesRoutes = routeItems.reduce((result, [name, path, meta, redirects]) => {
  result.push({
    name,
    path,
    component: Vuepress,
    meta
  }, ...redirects.map((item) => ({
    path: item,
    redirect: path
  })));
  return result;
}, [
  {
    name: "404",
    path: "/:catchAll(.*)",
    component: Vuepress
  }
]);
const provideGlobalComputed = (app, router) => {
  const routeLocale = computed(() => resolveRouteLocale(siteData.value.locales, router.currentRoute.value.path));
  const siteLocaleData = computed(() => resolveSiteLocaleData(siteData.value, routeLocale.value));
  const pageFrontmatter = computed(() => resolvePageFrontmatter(pageData.value));
  const pageHeadTitle = computed(() => resolvePageHeadTitle(pageData.value, siteLocaleData.value));
  const pageHead = computed(() => resolvePageHead(pageHeadTitle.value, pageFrontmatter.value, siteLocaleData.value));
  const pageLang = computed(() => resolvePageLang(pageData.value));
  app.provide(routeLocaleSymbol, routeLocale);
  app.provide(siteLocaleDataSymbol, siteLocaleData);
  app.provide(pageFrontmatterSymbol, pageFrontmatter);
  app.provide(pageHeadTitleSymbol, pageHeadTitle);
  app.provide(pageHeadSymbol, pageHead);
  app.provide(pageLangSymbol, pageLang);
  Object.defineProperties(app.config.globalProperties, {
    $frontmatter: { get: () => pageFrontmatter.value },
    $headTitle: { get: () => pageHeadTitle.value },
    $lang: { get: () => pageLang.value },
    $page: { get: () => pageData.value },
    $routeLocale: { get: () => routeLocale.value },
    $site: { get: () => siteData.value },
    $siteLocale: { get: () => siteLocaleData.value },
    $withBase: { get: () => withBase }
  });
};
const registerGlobalComponents = (app) => {
  app.component("ClientOnly", ClientOnly);
  app.component("Content", Content);
};
const appCreator = createSSRApp;
const historyCreator = createWebHistory;
const createVueApp = async () => {
  const app = appCreator({
    name: "VuepressApp",
    setup() {
      setupUpdateHead();
      for (const clientAppSetup of clientAppSetups) {
        clientAppSetup();
      }
      return () => [
        h(RouterView),
        ...clientAppRootComponents.map((comp) => h(comp))
      ];
    }
  });
  const router = createRouter({
    history: historyCreator(removeEndingSlash(siteData.value.base)),
    routes: pagesRoutes,
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition)
        return savedPosition;
      if (to.hash)
        return { el: to.hash };
      return { top: 0 };
    }
  });
  router.beforeResolve(async (to, from) => {
    var _a2;
    if (to.path !== from.path || from === START_LOCATION_NORMALIZED) {
      [pageData.value] = await Promise.all([
        resolvePageData(to.name),
        (_a2 = pagesComponents[to.name]) === null || _a2 === void 0 ? void 0 : _a2.__asyncLoader()
      ]);
    }
  });
  provideGlobalComputed(app, router);
  registerGlobalComponents(app);
  for (const clientAppEnhance of clientAppEnhances) {
    await clientAppEnhance({ app, router, siteData });
  }
  app.use(router);
  return {
    app,
    router
  };
};
{
  createVueApp().then(({ app, router }) => {
    router.isReady().then(() => {
      app.mount("#app");
    });
  });
}
export { useSiteLocaleData as A, useDarkMode as B, isArray as C, withBase as D, normalizeClass as E, Fragment as F, removeLeadingSlash as G, removeEndingSlash as H, ref as I, watch as J, withDirectives as K, vShow as L, useRouter as M, isString$1 as N, useNavLink as O, onMounted as P, normalizeStyle as Q, usePageData as R, useSidebarItems as S, Transition as T, isPlainObject as U, h as V, onUnmounted as W, useScrollPromise as X, createStaticVNode as a, createElementBlock as b, createBlock as c, createVueApp, createVNode as d, createBaseVNode as e, createTextVNode as f, renderList as g, defineComponent as h, useThemeLocaleData as i, unref as j, useRoute as k, toRefs as l, computed as m, mergeProps as n, openBlock as o, renderSlot as p, createCommentVNode as q, resolveComponent as r, isLinkHttp as s, toDisplayString as t, useRouteLocale as u, isLinkMailto as v, withCtx as w, isLinkTel as x, useSiteData as y, usePageFrontmatter as z };
