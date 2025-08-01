const obj = {
  name: "Ab",
  age: 34,
};
const obj2 = {
  name: "cd",
  age: 98,
};
const obj3 = {
  name: "Test",
  age: 100,
};

function details(greeting) {
  return `${greeting} My name is ${this.name} and I am ${this.age} years old`;
}

const greet = details.bind(obj, "Hi");

Function.prototype.runMyBind = function (thisArgs, ...args) {
  const fn = this;

  return function (...newArgs) {
    return fn.call(thisArgs, ...args, ...newArgs);
  };
};

const greetWithPollyfill = details.runMyBind(obj3, "Hi");

console.log(greetWithPollyfill());
console.log(greetWithPollyfill.call(obj2));
console.log(greetWithPollyfill.apply(obj2));
