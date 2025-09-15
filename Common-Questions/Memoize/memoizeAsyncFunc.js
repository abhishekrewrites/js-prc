/*
Async Support
* Memoize async functions or promises.

const memoizedFetch = memoize(async (url) => await fetch(url));
* Handle race conditions, in-flight deduplication, and errors.

*/

function memoizeAsync(fn) {
  let cache = new Map();
  return (...innerArgs) => {
    const key = innerArgs;

    if (cache.has(key)) {
      return cache[key];
    }

    const promise = fn.apply(...args).catch((e) => {
      cache.delete(key);
      throw err;
    });

    cache.set(key, promise);
    return promise;
  };
}
