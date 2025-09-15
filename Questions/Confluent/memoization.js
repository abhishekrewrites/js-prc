// write a memoize function for which takes in arg such as num, string, boolean which will be 1 only

function memoize(fn) {
  let cache = {};
  return function (arg) {
    const key = String(arg);
    if (key in cache) {
      return cache[key];
    }
    const result = fn.call(this, arg);
    cache[key] = result;
    return result;
  };
}

// write a memoize function for which takes in args such as num, string, boolean which could ne any no

function memoize(fn) {
  let cache = {};
  return function (args) {
    const key = args.join("|");
    if (key in cache) {
      return cache[key];
    }
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

/*

    Join has certain issues as few args could cause hash collisions

    JSON.stringify([1, 2, 3]) → "[1,2,3]"
    JSON.stringify(["1", "2", "3"]) → "[\"1\",\"2\",\"3\"]"

*/
//Solution 1: JSON Serialization (Recommended)

function memoize(fn) {
  let cache = {};

  return function (...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    }
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

function memoize(fn) {
  let cache = {};

  function createKey(args) {
    const kkey = args.map((arg) => `${typeof arg}:${arg}`).join("|");
    return kkey;
  }

  return function (...args) {
    const key = createKey(args);
    if (key in cache) {
      return cache[key];
    }
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// Write a memoize function for which takes in args such as num, string, boolean which could ne any no

function deepEqual(a, b) {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (typeof a !== "object" || typeof b !== "object") return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  if (Array.isArray(a) || Array.isArray(b)) return false;

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) return false;
  for (let key of aKeys) {
    if (!bKeys.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}

function memoize(fn) {
  let lastArgs = undefined;
  let lastResult = undefined;

  return function (...args) {
    if (
      lastArgs !== undefined &&
      lastArgs.length === args.length &&
      lastArgs.every((arg, index) => deepEqual(arg, args[index]))
    ) {
      return lastResult;
    }

    lastArgs = [...args];
    lastResult = fn(...args);
    return lastResult;
  };
}
