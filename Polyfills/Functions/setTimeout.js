function createSetTimeout() {
  var timers = {};

  function check() {
    var t = Date.now();
    for (const timerId in timers) {
      if (timers.hasOwnProperty(timerId) && t > timers[timerId].time) {
        timers[timerId].callback();
        myClearTimeout(timerId);
      }
    }
    requestIdleCallback(check);
  }

  window.mySetTimeout = function (callback, delay) {
    if (typeof callback != "function")
      throw new Error("callback should be a function");
    if (typeof delay != "number" || delay < 0)
      throw new Error("delay should be a positive number");

    var newId = Math.random().toString(36).substring(2);

    timers[newId] = {
      callback: callback,
      time: Date.now() + delay,
    };

    return newId;
  };

  window.myClearTimeout = function (id) {
    if (timers.hasOwnProperty(id)) delete timers[id];
  };

  requestIdleCallback(check);
}

/*

createSetTimeout();
const p = window.mySetTimeout(() => console.log("hi"), 3000);
window.myClearTimeout(p);

*/
