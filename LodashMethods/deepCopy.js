function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map((it) => deepCopy(it));
  }

  const result = {};

  for (const key in obj) {
    result[key] = deepCopy(obj[key]);
  }
  return result;
}

const a = { c: 1, p: { o: 9 } };

const ca = deepCopy(a);

console.log(ca);
