function memoize(fn, { maxSize = 100, ttl = 0 } = {}) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);
    const now = Date.now();

    if (cache.has(key)) {
      const { value, expiry } = cache.get(key);

      if (ttl > 0 && now > expiry) {
        cache.delete(key);
      } else {
        cache.delete(key); // LRU: refresh position
        cache.set(key, { value, expiry });
        return value;
      }
    }

    const result = fn(...args);
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

console.log(memoizedAdd(1, 2)); // Computes
console.log(memoizedAdd(1, 2)); // Cached

setTimeout(() => {
  console.log("After 4s:");
  console.log(memoizedAdd(1, 2)); // Recomputes due to TTL
}, 4000);

console.log(memoizedAdd(2, 3)); // Computes
console.log(memoizedAdd(4, 5)); // Computes, triggers LRU eviction

console.log(memoizedAdd(1, 2)); // Recomputes because it was evicted
