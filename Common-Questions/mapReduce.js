/*

The mapReduce pattern in JavaScript arrays is
a functional programming approach that combines the map() and reduce() 
methods to process data in two distinct phases: transformation and aggregation. 
This pattern provides an elegant abstraction for various computations over 
collections by first transforming individual elements and then reducing them to a single result.

*/

const people = [
  { name: "John", city: "NYC", age: 25 },
  { name: "Jane", city: "NYC", age: 30 },
  { name: "Bob", city: "LA", age: 35 },
];

const result =
  people.map((item) => item.age).reduce((acc, c) => acc + c, 0) / people.length;

console.log(result, "111");
