function throttle(
  fn,
  wait,
  { leading = true, trailing = true, maxWait = 700 } = {}
) {
  if (!leading && !trailing) return () => {};

  let lastExec = 0;
  let timerId = null;
  let maxTimer = null;
  let lastArgs, lastThis;

  function invoke(time) {
    lastExec = time;
    fn.apply(lastThis, lastArgs);
    lastArgs = lastThis = null;
  }

  function startTimer(remaining) {
    timerId = setTimeout(() => {
      timerId = null;
      if (trailing && lastArgs) invoke(Date.now());
    }, remaining);
  }

  function clearMaxTimer() {
    clearTimeout(maxTimer);
    maxTimer = null;
  }

  function startMaxTimer() {
    maxTimer = setTimeout(() => {
      if (maxWait !== null && !maxTimer) {
        if (lastArgs) {
          if (timerId) {
            clearTimeout(timerId);
            timerId = null;
          }
          invoke(Date.now());
        }
      }
    }, maxWait);
  }

  function throttled(...args) {
    const now = Date.now();
    const elapsed = now - lastExec;

    lastArgs = args;
    lastThis = this;

    if (leading && (elapsed >= wait || lastExec === 0)) {
      invoke(now);
      clearMaxTimer();
      startMaxTimer();
      return;
    }

    if (!timerId && trailing) {
      startTimer(wait - elapsed);
    }
  }

  throttled.cancel = () => {
    clearTimeout(timerId);
    clearMaxTimer();
    timerId = null;
    lastArgs = lastThis = null;
    lastExec = 0;
  };

  throttled.flush = () => {
    if (timerId || maxTimer) {
      clearTimeout(timerId);
      clearMaxTimer();
      timerId = null;

      if (lastArgs) {
        invoke(Date.now());
      }
    }
  };
  return throttled;
}

const log = throttle(
  (msg) => console.log(`${Date.now() % 100000}: ${msg}`),
  1000,
  { leading: true, trailing: true }
);

log("call 1"); // 0 ms – runs
setTimeout(() => log("call 2"), 300); // ignored
setTimeout(() => log("call 3"), 600); // ignored
setTimeout(() => log("call 4"), 1500); // ~1000 ms – runs (trailing)
setTimeout(() => log.cancel(), 1800); // cancels any queued call
setTimeout(() => log("call 5"), 2500); // new burst – runs immediately
setTimeout(() => log.flush(), 2600); // no pending timer, nothing happens
