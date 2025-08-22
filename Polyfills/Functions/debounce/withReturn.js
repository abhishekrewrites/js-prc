function debounce(fn, delay, immediate = false) {
  let timer;
  let pendingPromises = [];
  return function (...args) {
    pendingPromises.forEach(({ reject }) => {
      reject(new Error("Rejected"));
    });
    pendingPromises = [];
    return new Promise((resolve, reject) => {
      pendingPromises.push({ resolve, reject });

      if (timer) {
        clearTimeout(timer);
      }
      const callNow = immediate && !timer;
      if (callNow) {
        try {
          const result = fn.apply(this, args);
          resolve(result);
        } catch (e) {
          reject(e);
        }
      }

      timer = setTimeout(() => {
        timer = null;

        if (!immediate) {
          try {
            const result = fn.apply(this, args);
            pendingPromises.forEach(({ resolve }) => {
              resolve(result);
            });
          } catch (e) {
            pendingPromises.forEach(({ reject }) => {
              reject(e);
            });
          }
          pendingPromises = [];
        }
      }, delay);
    });
  };
}
