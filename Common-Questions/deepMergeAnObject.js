//output { a: 1, b: 1 }

function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

function deepMerge(obj1, obj2) {
  const result = { ...obj1 };

  for (const key in obj2) {
    const obj1Item = result[key];
    const obj2Item = obj2[key];

    if (isObject(obj1Item) && isObject(obj2Item)) {
      result[key] = deepMerge(obj1Item, obj2Item);
    } else {
      result[key] = obj2Item;
    }
  }
  return result;
}

const x = { a: 1 };
const y = { b: 1 };

console.log(deepMerge(x, y));
