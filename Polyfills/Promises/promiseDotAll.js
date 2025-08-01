Promise.runMyAll = function (promiseArr) {
  const result = new Array(promiseArr.length);
  let completedPromise = 0;
  return new Promise((resolve, reject) => {
    promiseArr.forEach((pro, idx) => {
      Promise.resolve(pro)
        .then((res) => {
          result[idx] = res;
          completedPromise++;

          if (completedPromise === promiseArr.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
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
  resolve("Resolved-3");
});

const promiseArr = [promise1, 4, promise2, promise3];

Promise.runMyAll(promiseArr)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
