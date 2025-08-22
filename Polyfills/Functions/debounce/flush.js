function debounce(cb, delay) {
  let timer;
  let latestArgs;
  let conetxt;
  function de(...args) {
    latestArgs = args;
    conetxt = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb.apply(this, args);
    }, delay);
  }

  de.flush = function () {
    if (timer) {
      clearTimeout(timer);
      cb.apply(conetxt, latestArgs);
    }
  };
  return de;
}
