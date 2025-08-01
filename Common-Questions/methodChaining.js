/*

Showcase a working demo of method chaining in 
JavaScript by implementing the following example.

Input:
computeAmount().lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7).value();

Output:
143545000

You need to create a function that returns an 
object with methods that can be chained together. Each method should:

Perform a calculation (add to a running total)

Return this to enable chaining

Have a final value() method that returns the result

*/

function computeAmount() {
  let total = 0;
  return {
    lacs(amt) {
      total += amt * 100000;
      return this;
    },
    crore(amt) {
      total += amt * 10000000;
      return this;
    },
    thousand(amt) {
      total += amt * 1000;
      return this;
    },
    hundred(amt) {
      total += amt * 100;
      return this;
    },
    value() {
      return total;
    },
  };
}

// Test with the exact example from your query
const result = computeAmount()
  .lacs(15) // 15 × 100,000 = 1,500,000
  .crore(5) // 5 × 10,000,000 = 50,000,000
  .crore(2) // 2 × 10,000,000 = 20,000,000
  .lacs(20) // 20 × 100,000 = 2,000,000
  .thousand(45) // 45 × 1,000 = 45,000
  .crore(7) // 7 × 10,000,000 = 70,000,000
  .value(); // Total: 143,545,000

console.log(result); // 143545000
