/*
Create a function in javascript which will take a nested 
object and a filter function as input and return the filtered object.


*/

const obj = {
  a: 1,
  b: {
    c: "Hello World",
    d: 2,
    e: {
      f: {
        g: -4,
      },
    },
    h: "Good Night Moon",
  },
};

function filterStrings(obj) {
  let res = {};
  if (obj !== null && typeof obj !== "object") return obj;
  for (let key in obj) {
    const val = obj[key];
    if (typeof val === "object") {
      return filterStrings(val);
    } else if (typeof val === "string") {
      res[key] = val;
    }
  }

  return res;
}

console.log(filterStrings(obj));
