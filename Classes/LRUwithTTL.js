class LRU {
  constructor(limit, ttl = 0) {
    this.cache = new Map();
    this.capacity = limit;
    this.ttl = ttl;
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const { val, expiry } = this.cache.get(key);
    const now = Date.now();
    if (expiry < now) {
      this.cache.delete(key);
      return -1;
    }
    this.cache.delete(key);
    this.cache.set(key, { val, expiry });
    return val;
  }

  put(key, val) {
    const now = Date.now();
    const expiry = this.ttl > 0 ? now + this.ttl : Infinity;
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, { val, expiry });
  }
}
