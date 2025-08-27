function debounce(
  fn,
  delay,
  options = { leading: true, trailing: false, maxWait: 0 }
) {
  let timer = null;
  let result;
  let lastArgs;
  let context;
  function de(...args) {
    context = this;
    lastArgs = args;
    const { leading, trailing } = options;
    const callNow = leading && !timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (trailing && !callNow) {
        result = fn.apply(context, args);
      }
    }, delay);
    if (callNow) {
      fn.apply(context, args);
    }
    return result;
  }

  de.cancel = function () {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    lastArgs = lastThis = undefined;
  };

  de.flush = function () {
    if (timer === null) return result;
    clearTimeout(timer);
    timer = null;
    if (trailing && lastArgs) return invoke();
    return result;
  };

  return de;
}
