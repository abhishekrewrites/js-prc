/*

Create a queue which takes in items adds in a queue, takes 1 item
processes an item, takes the next item and so on

*/

class ProcessQueue {
  constructor(processingFunction = null) {
    this.items = [];
    this.isProcessing = false;
    this.processedItem = null;
    this.processingFunction = processingFunction || this.defaultProcessing;
    this.completedItems = [];
  }

  queue(node) {
    const newItem = {
      id: new Date().getTime().toString(),
      status: "waiting",
      data: node,
    };

    this.items = [...this.items, newItem];

    if (!this.isProcessing) {
      this.processNext();
    }
  }

  async processNext() {
    if (this.isEmpty()) {
      this.isProcessing = false;
      this.processedItem = null;
      return;
    }

    //take the first item

    const nextItem = this.items[0];
    this.items = this.items.slice(1);
    this.isProcessing = true;
    this.processedItem = { ...nextItem, status: "Processing" };

    try {
      const result = await this.processingFunction(nextItem);
      const completedItem = {
        ...nextItem,
        status: "Completed",
        completedAt: new Date(),
        result,
      };

      this.completedItems.push(completedItem);
    } catch (e) {
      const completedItem = {
        ...nextItem,
        status: "Failed",
        completedAt: new Date(),
        error: e.message,
      };
      this.completedItems.push(completedItem);
    }

    this.processedItem = null;

    setTimeout(() => this.processNext(), 200);
  }

  defaultProcessing(item) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(item.data);
      }, 200);
    });
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const removed = this.items[0];
    this.items = this.items.slice(1);
    return removed;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  peek() {
    if (!this.isEmpty()) {
      return this.items[0];
    }
  }

  setProcessingFunction(func) {
    this.processingFunction = func;
  }

  size() {
    return this.items.length;
  }

  display() {
    if (this.isEmpty()) {
      console.log("Queue is empty");
    } else {
      console.log("queue is", this.items.join(", "));
    }
    console.log;
    ("--------******--------");
  }
}
