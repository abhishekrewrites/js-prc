function sum(...args) {
  const total = args.reduce((acc, curr) => acc + curr, 0);

  const chainFunction = (...innerArgs) => {
    if (innerArgs.length === 0) {
      return total;
    }

    const additionalSum = innerArgs.reduce((acc, curr) => acc + curr, 0);
    return sum(total + additionalSum);
  };

  chainFunction.valueOf = () => total;
  chainFunction.toString = () => total.toString();

  return chainFunction;
}

// Now your test cases will work:
console.log(sum(1)(2)(3)()); // 6
console.log(sum(1, 2, 3)(4)()); // 10
console.log(sum(1)(2, 3)(4, 5)()); // 15
console.log(sum(1)(2)(3) + 4); // 10 (auto-conversion)
console.log(sum(5)(10)); // 15 (auto-conversion)
