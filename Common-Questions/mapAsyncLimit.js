/*

In Map Async, we wrote a function that accepts an array of items and maps each element 
with an asynchronous mapping function and returns a Promise which resolves to the mapped results.

Practically, this can be used for mapping an input array with the results of calling 
an API where the input element is the argument to the API. However, 
if your array has a large amount of items, you'd be making that many API 
calls at the same time which will almost certainly get you rate limited by 
the API service. We want to execute our tasks concurrently so that
 it is more efficient while staying within the rate limits of the API.

Implement a mapAsyncLimit function that takes in an optional parameter size, 
the maximum number of ongoing async tasks so that the input array can be 
processed in chunks of size, achieving parallelism while staying within the 
provided limit. If size is not specified, the chunk size is unlimited.

At any time there will be size items at processing 

*/

function asyncMapLimit(arr, func, size = Infinity) {
  if (!Array.isArray(arr) || arr.length === 0) return Promise.resolve([]);
  if (typeof func !== "function") throw new Error("Not a function");
  if (size === Infinity || size > arr.length) return Promise.all(arr.map(func));

  return new Promise((resolve, reject) => {
    const result = new Array(arr.length);
    let completed = 0;
    let running = 0;
    let started = 0;
    function processNext() {
      while (running < size && started < arr.length) {
        const index = started++;
        running++;
        Promise.resolve(func(arr[index], index, arr))
          .then((r) => {
            result[index] = r;
            running--;
            completed++;
            if (arr.length === completed) {
              resolve(result);
            } else {
              processNext();
            }
          })
          .catch(reject);
      }
    }
    processNext();
  });
}

const ex = [1, 2, 3, 4];

function double(v) {
  return v * 2;
}

asyncMapLimit(ex, double, 2);
