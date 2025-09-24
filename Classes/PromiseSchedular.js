function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class PromiseSchedular {
  constructor(arr, cb) {
    this.items = arr;
    this.cb = cb;
    this.isPaused = false;
  }

  async run() {
    for (let prom of this.items) {
      const r = await prom();
      this.cb(r);
    }
  }

  async pause() {}
  getState() {}
  runAllUnexecutedFunctions() {}
}

const funcArr = [
  () => console.log("Function 1"),
  async () => {
    await delay(1000);
    return "Function 2";
  },
  () => "Function 3",
];

function t(h) {
  console.log(h, "hhhhhhhhhh");
}

const ne = new PromiseSchedular(funcArr, t);
ne.run();
