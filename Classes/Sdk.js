function EventsQueueSdk() {
  this.items = [];
  this.count = 0;

  this.logEvent = function (evtName) {
    //send for processing

    const newNodeId = new Date().getTime().toString();

    const newNode = {
      id: newNodeId,
      name: evtName,
    };
    this.items = [...this.items, newNode];

    // queue them

    //doProcessing

    this.doProcessing();
  };

  this.doProcessing = async function () {
    if (!this.items.length) return null;

    const processedItem = this.items[0];
    this.items = this.items.slice(1);

    try {
      this.processEvents(processedItem);
      this.count++;
    } catch (e) {}

    setTimeout(() => this.doProcessing(), 200);
  };

  this.processEvents = function (item) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.count % 5 === 0) {
          console.log(`Failed to send ${item.name} `);
          reject(new Error(`Failed to send ${item.name}`));
        }
        resolve(`Analytics sent ${item.name}`);
      }, 1000);
    });
  };
}
const sdk = new EventsQueueSdk();

sdk.logEvent("event 1");
sdk.logEvent("event 2");
sdk.logEvent("event 3");
