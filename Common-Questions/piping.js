/*

Function piping is a functional programming concept that 
allows you to chain multiple functions together so that the output 
of one function becomes the input of the next function, 
creating a clean data transformation pipeline.

What is Function Piping?
Function piping takes an initial input, passes it through the first
function, takes that output and passes it as input to the next function,
and continues this process through all functions in the pipeline. 
The result flows left-to-right through the functions.


*/

function pipe(...fns) {
  return function (value) {
    return fns.reduce((cur, fn) => fn(cur), value);
  };
}

const add10 = (r) => r + 10;
const multiply2 = (r) => r * 2;
const subtract5 = (r) => r - 5;

const res = pipe(add10, multiply2, subtract5)(20);

console.log(res, "res");
