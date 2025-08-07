class LRU {
  constructor(limit) {
    this.cache = new Map();
    this.capacity = limit;
  }

  get(key) {
    if (this.cache.has(key)) {
      const val = this.cache.get(key);
      this.cache.delete(key); // Fix: add the key parameter
      this.cache.set(key, val);
      return val;
    }
    return -1;
  }

  put(key, val) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size === this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, val);
  }
}
