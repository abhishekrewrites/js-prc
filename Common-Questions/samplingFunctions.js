/*

To create a sampling function we can create a 
closure that will track how many times the function has been 
called and once it reaches the count, execute the input function and reset the counter.

*/

function sampler(fn, count) {
  let d = 0;
  return (...innerArgs) => {
    if (++d !== count) return;
    fn.apply(this, innerArgs);
    d = 0;
  };
}

function message() {
  console.log("hello");
}

const sample = sampler(message, 4);
sample();
sample();
sample();
sample(); // hello
sample();
sample();
sample();
sample(); // hello
