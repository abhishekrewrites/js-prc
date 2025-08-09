function flattenToNDepth(arr, n) {
  let results = [];
  let k = 0;
  if (!Array.isArray(arr) && n === 0) {
    return arr;
  }
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    if (Array.isArray(value) && n > 0) {
      const re = flattenToNDepth(value, n - 1);
      results = [...results, ...re];
    } else {
      results[i] = value;
    }
  }
  return results;
}

const ex = [1, 2, [3, 4, [6, 7]]];

console.log(flattenToNDepth(ex, 1));
