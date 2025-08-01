function retryAsyncFunc(pro, retry = 0) {
  return new Promise((resolve, reject) => {
    Promise.resolve(pro)
      .then((r) => {
        resolve(r);
      })
      .catch((e) => {
        if (retry < 3) {
          console.log(retry, "retry");
          setTimeout(() => {
            retryAsyncFunc(pro, retry + 1)
              .then(resolve)
              .catch(reject);
          }, 1000);
        } else {
          reject(e);
        }
      });
  });
}

let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Resolved-1");
  }, 1000);
});

retryAsyncFunc(promise1);
