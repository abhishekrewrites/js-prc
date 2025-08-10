Object.prototype.runMyCreate = function (context) {
  function F() {}
  F.prototype = context;
  return new F();
};

const n = Object.runMyCreate(null);

console.log(n, "11");

console.log(n.hasOwnProperty("hi"), "22");
