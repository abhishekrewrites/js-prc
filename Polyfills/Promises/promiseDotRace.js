Promise.runMyRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((element) => {
      Promise.resolve(element)
        .then((re) => {
          resolve(re);
        })
        .catch((e) => {
          reject(e);
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
    resolve("Resolved-2");
  }, 500);
});

let promise3 = new Promise((resolve, reject) => {
  reject("Resolved-3");
});

const promiseArr = [promise1, promise2, promise3];

Promise.runMyRace(promiseArr)
  .then((r) => console.log(r))
  .catch((e) => console.log(e));
