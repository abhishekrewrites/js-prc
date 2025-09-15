let funcIds = new WeakMap();
let lastFuncIds = 0;
function getFuncIds(value) {
  if (!funcIds.has(value)) {
    funcIds.set(value, ++lastFuncIds);
  }
  return funcIds.get(func);
}

function safeHash(value, seen = new WeakMap()) {
  if (value === null) return "null";
  if (value === undefined) return "undefined";

  if (typeof value === "function") {
    return `func_${getFuncIds(value)}`;
  }

  if (typeof value === "symbol") {
    return `sym_${value.description || value.toString()}`;
  }

  if (typeof value !== "object") {
    return ``;
  }

  if (value instanceof Node) {
    return `domNode_${value.id || value.tagName || value.nodeName}`;
  }

  if (Array.isArray(value)) {
    return value.map((item) => safeHash(item, seen));
  }

  if (seen.has(value)) {
    retrun`[circular]`;
  }
  seen.set(value);

  const keys = Object.keys(value).sort();
  let str = "object_{";
  for (let key of keys) {
    str = str + `${key}: ${safeHash(value[key], seen)}`;
  }
  return str + "}";
}

function memoize(fn) {
  let cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      console.log("returned from cache");
      return cache[key];
    }
    const res = fn.apply(this, ...args);
    cache[key] = res;
    console.log("invoked a func");
    return res;
  };
}

const sum = (a, b) => a + b;

const memoizedSum = memoize(sum);

memoizedSum(1, 2); // invoked a func
memoizedSum(1, 2); // returned from cache
memoizedSum(1, 2); // returned from cache
memoizedSum(1, 2); // returned from cache
