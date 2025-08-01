const obj = {
  name: "ab",
  age: 23,
};

function details(greeting) {
  return `${greeting}! My name is ${this.name} and I am ${this.age} years old`;
}

console.log(details.apply(obj, ["hi"]));

Function.prototype.runMyApply = function (thisArgs, argsArray) {
  const funcToCall = this;

  const context = thisArgs || window;

  const args = argsArray || [];

  const uniqueId = Symbol();
  context[uniqueId] = funcToCall;

  const result = context[uniqueId](...args);
  delete context[uniqueId];

  return result;
};

console.log(details.runMyApply(obj, ["Hi"]));
