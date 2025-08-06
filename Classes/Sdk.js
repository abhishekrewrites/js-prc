function EventsQueueSdk() {
  this.queue = [];
  this.count = 0;
  this.processing = false;

  this.logEvent = function (eventName) {
    this.queue.push({ id: Date.now().toString(), name: eventName });
    if (!this.processing) this._processQueue();
  };

  this._processQueue = async function () {
    if (this.processing || !this.queue.length) return;
    this.processing = true;

    const item = this.queue.shift();

    try {
      await this._send(item, false); // false = not a retry
      this.count++;
    } catch (err) {
      console.log("-----------------------");
      console.log(err.message);
      console.log(`Retrying sending ${item.name}`);
      console.log("-----------------------");

      // Retry - this should succeed
      await this._send(item, true); // true = is a retry
      this.count++;
    }

    this.processing = false;

    if (this.queue.length) {
      this._processQueue();
    }
  };

  this._send = function (item, isRetry = false) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Only fail on first attempt of every 5th event
        const shouldFail = (this.count + 1) % 5 === 0 && !isRetry;

        if (shouldFail) {
          reject(new Error(`Failed to send ${item.name}`));
        } else {
          console.log(`Analytics sent ${item.name}`);
          resolve();
        }
      }, 1000);
    });
  };
}

// Demo
const sdk = new EventsQueueSdk();

for (let i = 1; i <= 10; i++) {
  sdk.logEvent(`event ${i}`);
}
