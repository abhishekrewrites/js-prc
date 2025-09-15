function memoize(fn) {
  let cache = {};
  return (...innerArgs) => {
    const stringifiedArgs = JSON.stringify(innerArgs);

    const value = cache[stringifiedArgs];

    if (stringifiedArgs in cache) {
      return value;
    } else {
      cache[stringifiedArgs] = fn(...innerArgs);
      return value;
    }
  };
}

function deepEqual(a, b) {
  // 1. Same reference or primitive equality
  if (a === b) return true;

  // 2. Guard against null
  if (a === null || b === null) return false;

  // 3. Primitives of different types → not equal
  if (typeof a !== "object" || typeof b !== "object") return false;

  // 4. Handle arrays first
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true; // all items matched
  }
  if (Array.isArray(a) || Array.isArray(b)) {
    return false; // one is array, other isn’t
  }

  // 5. Ordinary objects
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }
  return true;
}

const test = (t) => {
  for (let i = 0; i < 1000000; i++) {}
  return t;
};

const time1 = performance.now();
test(10);
const time2 = performance.now();
console.log(time2 - time1, "org");

const menoizedR = memoize(test);
menoizedR(10);
const time3 = performance.now();
menoizedR(10);
const time4 = performance.now();
console.log(time4 - time3, "memo");
