function once(fn) {
  let called = false;
  let result;
  return (...innerArgs) => {
    if (!called) {
      called = true;
      result = fn.apply(this, innerArgs);
    }
    return result;
  };
}

function sum(a, b) {
  console.log("computing sum");
  return a + b;
}

const onceSum = once(sum);

console.log(onceSum(2, 3)); // logs “computing sum”, returns 5
console.log(onceSum(7, 8)); // returns 5 (no “computing sum” again)
