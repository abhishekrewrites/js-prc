function curry(fn) {
  return (...args) => {
    if (fn.length >= args.length) {
      return fn(...args);
    } else {
      return (...next) => {
        return fn(...args, ...next);
      };
    }
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
