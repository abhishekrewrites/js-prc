Array.prototype.runMyFlat = function (arr) {
  const arrayToFlatten = arr || this;

  if (!Array.isArray(arrayToFlatten)) {
    throw new Error("not a valid entry");
  }

  let results = [];

  function flatten(arr) {
    arr.forEach((item) => {
      if (Array.isArray(item)) {
        flatten(item);
      } else {
        results.push(item);
      }
    });
  }

  flatten(arrayToFlatten);
  return results;
};

const inpt = [1, 2, [3, 4], [5, 6, 7]];

console.log(inpt.runMyFlat());
