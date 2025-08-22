function debounce(fn, delay) {
  let timer;
  return function (...innerArgs) {
    if (timer) {
      clearTimeout(timer);
    }
    setTimeout(() => {
      fn.apply(this, innerArgs);
    }, delay);
  };
}

/**/

function debounce(fn, delay) {
  let timer;
  return function (...innerArgs) {
    if (timer) {
      clearTimeout(timer);
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(fn.apply(this, innerArgs));
      }, delay);
    });
  };
}
