Promise.runAllSettled = function (promises) {
  let result = [];
  let completed = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((pro, idx) => {
      Promise.resolve(pro)
        .then((re) => {
          result[idx] = {
            status: "fulfilled",
            value: re,
          };
        })
        .catch((e) => {
          result[idx] = {
            status: "rejected",
            value: e,
          };
        })
        .finally(() => {
          completed++;
          if (completed === promises.length) {
            resolve(result);
          }
        });
    });
  });
};

let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Resolved-1");
  }, 1000);
});

let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Resolved-2");
  }, 500);
});

let promise3 = new Promise((resolve, reject) => {
  resolve("Resolved-3");
});

const promiseArr = [promise1, 4, promise2, promise3];

Promise.runAllSettled(promiseArr)
  .then((re) => console.log(re))
  .catch((e) => console.log(e));
