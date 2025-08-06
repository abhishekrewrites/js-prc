function memoizeWithTTl(fn, { maxSize = 100, ttl = 0 } = {}) {
  const cache = new Map();

  return (...innerArgs) => {
    const key = JSON.stringify(innerArgs);
    const now = Date.now();

    if (cache.has(key)) {
      const { value, expiry } = cache[key];

      if (ttl > 0 && now > expiry) {
        cache.delete(key);
      } else {
        cache.delete(key);
        cache.set(key, { value, expiry });
        return value;
      }
    }

    const result = fn.apply(...innerArgs);
    const expiry = ttl > 0 ? now + ttl : Infinity;

    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    cache.set(key, { value: result, expiry });
    return result;
  };
}

const slowAdd = (a, b) => {
  console.log("Computing...");
  return a + b;
};

const memoizedAdd = memoize(slowAdd, { maxSize: 2, ttl: 3000 });

memoizedAdd(1, 2); // Computes
memoizedAdd(1, 2); // Cached
setTimeout(() => memoizedAdd(1, 2), 4000); // Recomputes (expired)
memoizedAdd(2, 3); // Computes
memoizedAdd(4, 5); // Computes, LRU eviction happens
memoizedAdd(1, 2); // Was evicted, recomputes
