function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

/*

leading: should the function run immediately at the first call?
trailing: should the function run one last time after the user stops calling it?

*/

function throttleWithLeadAndTrail(
  fn,
  delay,
  options = { leading: true, trailing: true }
) {
  return;
}
