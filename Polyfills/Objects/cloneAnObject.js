function cloneAnObject(obj) {
  if (obj === null) return null;

  if (typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((it) => cloneAnObject(it));
  }
  let result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = cloneAnObject(obj[key]);
    }
  }

  return result;
}

const ex = { a: 1, b: [2, 3], c: { d: 4 } };

console.log(cloneAnObject(ex));
