function TaskManager(limit) {
  this.limit = limit;
  this.queue = [];
  this.running = 0;
  this.deadLetterQueue = [];

  this.addTask = function (task) {
    const newTask = {
      id: Date.now(),
      fn: task,
      retry: 0,
      maxRetry: 0,
    };
    this.queue.push(newTask);
    this.runNextTask();
  };

  this.runNextTask = async function () {
    if (this.running >= this.limit || this.queue.length === 0) {
      return;
    }

    this.running++;
    const next = this.queue.shift();
    try {
      const r = await next.fn();
      console.log(r);
    } catch (e) {
      if (next.retry < next.maxRetry) {
        task.retries++;
        this.queue.unshift(task);
      } else {
        this.deadLetterQueue.push(task);
      }
    } finally {
      this.running--;
      this.runNextTask();
    }
  };
}

const createTask = (id, delay) => () => {
  return new Promise((resolve) => {
    console.log(`Task ${id} started`);
    setTimeout(() => {
      console.log(`Task ${id} finished`);
      resolve();
    }, delay);
  });
};

const taskManager = new TaskManager(2);

taskManager.addTask(createTask(1, 2000));
taskManager.addTask(createTask(2, 1000));
taskManager.addTask(createTask(3, 3000));
taskManager.addTask(createTask(4, 500));
