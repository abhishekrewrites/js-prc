class EventEmitter {
  constructor() {
    this.events = [];
  }

  on(evtName, cb) {
    if (!evtName[this.events]) {
      this.events[evtName] = new Set();
    }
    this.events[evtName].add(cb);
  }

  off(evtName) {
    if (evtName[this.events]) {
      this.events[evtName].delete(cb);
    }
  }

  once(evtName, cb) {
    const wrapper = (...args) => {
      cb(...args);
      this.off(evtName, wrapper);
    };
    this.on(evtName, wrapper);
  }

  emit(evtName, args) {
    if (this.events[evtName]) {
      this.events[evtName].forEach((cb) => cb(...args));
    }
  }
}
