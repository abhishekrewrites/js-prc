Array.prototype.runMyreduce = function (fn, ini) {
  let acc = ini;

  for (let i = 0; i < this.length; i++) {
    acc = acc ? fn(acc, this[i], i, this) : this[i];
  }

  return acc;
};

const u = [1, 2, 3, 4].runMyreduce((acc, c) => (acc += c), 0);

console.log(u);
