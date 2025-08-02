class EventBus {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);

    return () => {
      this.events[eventName] = this.events[eventName].filter(
        (listenr) => listenr !== callback
      );
    };
  }

  publish(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((cb) => cb(data));
    }
  }

  showData() {
    console.log(this.events);
  }
}

const eventBus = new EventBus();

eventBus.subscribe("user-login", (userData) => {
  console.log(`Welcome ${userData.name}!`);
});

eventBus.subscribe("user-login", (userData) => {
  console.log(`Welcome ${userData.name}!`);
});

eventBus.showData();

//eventBus.publish("user-login", { age: 1, name: "police" });
