/*

leading, trailing, maxWait all handled

*/

function debounce(
  fn,
  wait,
  {
    leading = false,
    trailing = true,
    maxWait, // optional
  } = {}
) {
  let timer = null; // regular debounce timer
  let maxTimer = null; // forces execution after maxWait
  let lastArgs, lastThis;

  function invoke() {
    fn.apply(lastThis, lastArgs);
    lastArgs = lastThis = null;
    clearTimeout(timer);
    timer = null;
  }

  function startMaxTimer() {
    if (maxWait != null && !maxTimer) {
      maxTimer = setTimeout(() => {
        if (trailing && lastArgs) invoke(); // ensure trailing logic
        clearTimeout(timer);
        maxTimer = null;
      }, maxWait);
    }
  }

  function debounced(...args) {
    lastArgs = args;
    lastThis = this;

    if (leading && !timer) invoke(); // immediate call

    clearTimeout(timer);
    timer = setTimeout(() => {
      if (trailing && lastArgs) invoke();
      clearTimeout(maxTimer);
      maxTimer = null;
    }, wait);

    startMaxTimer();
  }

  debounced.cancel = () => {
    clearTimeout(timer);
    timer = null;
    clearTimeout(maxTimer);
    maxTimer = null;
    lastArgs = lastThis = null;
  };

  debounced.flush = () => {
    if (timer || maxTimer) invoke();
    clearTimeout(maxTimer);
    maxTimer = null;
  };

  return debounced;
}

function log(msg) {
  console.log(`${Date.now() % 100000}: ${msg}`);
}

const work = debounce(log, 5000, {
  leading: true,
  trailing: true,
});

let i = 0;
const id = setInterval(() => {
  i += 1;
  work(`event ${i}`);
  if (i === 5) clearInterval(id);
}, 200);

// ---- try the helpers after 1.5 s ----
setTimeout(() => {
  work.cancel(); // aborts any trailing call for the first burst
  work("manual event"); // starts a new burst
}, 1500);

setTimeout(() => {
  work.flush(); // forces the pending trailing call right now
}, 3000);
