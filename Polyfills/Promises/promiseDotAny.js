Promise.runAny = function (promiseArr) {
  let rejectedResult = [];
  let rejects = 0;
  return new Promise((resolve, reject) => {
    promiseArr.forEach((element, idx) => {
      Promise.resolve(element)
        .then((r) => {
          resolve(r);
        })
        .catch((e) => {
          rejects++;
          rejectedResult[idx] = e;
          if (rejects === promiseArr.length) {
            reject(rejectedResult);
          }
        });
    });
  });
};

let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Resolved-1");
  }, 1000);
});

let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Resolved-2");
  }, 500);
});

let promise3 = new Promise((resolve, reject) => {
  reject("Resolved-3");
});

const promiseArr = [promise1, promise2, promise3];

Promise.runAny(promiseArr)
  .then((r) => console.log(r))
  .catch((e) => console.log(e));
