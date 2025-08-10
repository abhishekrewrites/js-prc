/*
Create Animal and Dog using constructor functions and prototypes.
Add a shared speak() on Animal.prototype and override it in Dog.
prototype while still calling the parent implementation.

*/

function Animal(name, breed) {
  this.name = name;
  this.breed = breed;
}

Animal.prototype.speak = function () {
  return `Hi! My name is ${this.name} and I am a ${this.breed}`;
};

function Dog(name, breed) {
  Animal.call(this, name, breed);
}

Dog.prototype = Object.create(Animal.prototype);

let myDog = new Dog("Bruno", "Lab");

console.log(myDog);
