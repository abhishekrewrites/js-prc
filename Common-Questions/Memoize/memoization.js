function memoize(fn) {
  let cache = {};
  return (...innerArgs) => {
    const stringifiedArgs = JSON.stringify(innerArgs);

    const value = cache[stringifiedArgs];

    if (stringifiedArgs in cache) {
      return value;
    } else {
      cache[stringifiedArgs] = fn(...innerArgs);
      return value;
    }
  };
}

const test = (t) => {
  for (let i = 0; i < 1000000; i++) {}
  return t;
};

const time1 = performance.now();
test(10);
const time2 = performance.now();
console.log(time2 - time1, "org");

const menoizedR = memoize(test);
menoizedR(10);
const time3 = performance.now();
menoizedR(10);
const time4 = performance.now();
console.log(time4 - time3, "memo");
