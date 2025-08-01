const obj = {
  name: "Ab",
  age: 34,
};

function details(greeting) {
  return `${greeting} My name is ${this.name} and I am ${this.age} years old`;
}

Function.prototype.runMyCall = function (thisArgs, ...args) {
  const funcToCall = this;
  const context = thisArgs || window;
  const uniqueId = Symbol();
  context[uniqueId] = funcToCall;
  const result = context[uniqueId](...args);
  delete context[uniqueId];
  return result;
};

console.log(details.call(obj, "hi!"));

console.log(details.runMyCall(obj, "hi!"));
