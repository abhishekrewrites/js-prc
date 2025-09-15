const RETRY_LIMIT = 3;

class TaskManager {
  constructor(limit) {
    this.queue = [];
    this.limit = limit;
    this.processingCount = 0;
  }

  addTask(task) {
    if (this.processingCount < this.limit) {
      this.push(task);
    } else {
      const copy = [...this.queue];
      copy.push(task);
      const sortedCopy = copy.sort((a, b) => b.priority - a.priority);
      this.queue = sortedCopy;
    }
  }

  async push(taskObj, retry = 0) {
    this.processingCount++;
    try {
      const result = await taskObj.task();
      console.log(result);
    } catch (e) {
      if (retry < RETRY_LIMIT) {
        this.push(taskObj, retry + 1);
      }
    } finally {
      this.processingCount--;
      if (this.queue.length > 0 && this.processingCount < this.limit) {
        const next = this.queue.shift();
        this.push(next);
      }
    }
  }
}

const example = [
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Resolved 1`);
      }, 1000);
    }),
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Resolved 2`);
      }, 2000);
    }),
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        reject(`Resolved 3`);
      }, 1000);
    }),
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Resolved 4`);
      }, 5000);
    }),
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Resolved 5`);
      }, 4000);
    }),
];

const runner = new TaskManager(2);
example.forEach((item) => {
  runner.addTask(item);
});
