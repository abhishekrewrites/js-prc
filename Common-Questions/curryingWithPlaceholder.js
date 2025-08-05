const _ = Symbol("placeholder");

function curryWithPlaceholder(fn) {
  return function curried(...args) {
    const isComplete = (args) =>
      args.length >= fn.length &&
      args.slice(0, fn.length).every((arg) => arg !== _);

    if (isComplete(args)) {
      try {
        return fn(...args);
      } catch (e) {
        throw new Error(
          "Tried to call function before filling all placeholders."
        );
      }
    }

    return (...nextArgs) => {
      const newArgs = [];

      let nextIndex = 0;
      for (let i = 0; i < args.length; i++) {
        if (args[i] === _ && nextIndex < nextArgs.length) {
          newArgs.push(nextArgs[nextIndex++]);
        } else {
          newArgs.push(args[i]);
        }
      }

      while (nextIndex < nextArgs.length) {
        newArgs.push(nextArgs[nextIndex++]);
      }

      return curried(...newArgs);
    };
  };
}

// Usage with placeholders
function add(a, b, c) {
  return a + b + c;
}

const curriedSubtract = curryWithPlaceholder(add);
console.log(curriedSubtract(_, 2, _)(10, 3)); // 10 - 2 - 3 = 5
console.log(curriedSubtract(20)(_, 5)(3)); // 20 - 3 - 5 = 12
