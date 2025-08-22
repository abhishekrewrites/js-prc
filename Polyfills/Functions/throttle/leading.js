function throttle(cb, delay, options = {}) {
  const { leading = true } = options;
  let lastCall = 0;
  let timeOutId = nul;
  return function (...args) {
    const now = Date.now();

    if (!leading && lastCall === 0) {
      lastCall = now;
    }

    if (now - lastCall >= delay) {
      if (leading) {
        lastCall = now;
        cb.apply(this, args);
      } else {
        if (!timeOutId) {
          timeOutId = setTimeout(() => {
            lastCall = Date.now();
            cb.apply(this, args);
            timeOutId = null;
          }, delay);
        }
      }
    }
  };
}

function testFn(msg) {
  console.log(`${msg} executed at:`, new Date().toLocaleTimeString());
}

// Test leading: true (default)
console.log("=== Testing leading: true ===");
const leadingTrue = throttle(testFn, 2000, { leading: true });
leadingTrue("Leading true call 1"); // Should execute immediately
leadingTrue("Leading true call 2"); // Should be ignored

// Test leading: false
console.log("=== Testing leading: false ===");
const leadingFalse = throttle(testFn, 2000, { leading: false });
leadingFalse("Leading false call 1"); // Should NOT execute immediately
leadingFalse("Leading false call 2"); // Should NOT execute immediately
// Wait and see - should execute after 2 seconds
