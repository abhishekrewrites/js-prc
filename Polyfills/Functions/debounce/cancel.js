function debounce(fn, delay) {
  let timer;
  function de(...innerArgs) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, innerArgs);
    }, delay);
  }
  de.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };
  return de;
}

debounce.cancel = function () {};
