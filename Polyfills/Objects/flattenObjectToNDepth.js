function flattenToNDepth(obj, n, prefix = "") {
  let result = {};

  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  for (const key in obj) {
    const element = obj[key];

    const newKey = prefix ? `${prefix}.${key}` : key;

    if (
      typeof element === "object" &&
      element !== null &&
      !Array.isArray(element) &&
      n > 0
    ) {
      const flatData = flattenToNDepth(element, n - 1, newKey);
      result = { ...result, ...flatData };
    } else {
      result[newKey] = element;
    }
  }

  return result;
}

const ex = { a: 1, b: { c: [2, 3], d: { e: 4 } } };

console.log(flattenToNDepth(ex, 1));
