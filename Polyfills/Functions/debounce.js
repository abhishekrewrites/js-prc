function debounce(fn, delay) {
  let timer;
  return (...innerArgs) => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimeout(() => {
      fn.apply(this, innerArgs);
    }, delay);
  };
}
