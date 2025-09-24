/*

Implement a function deepMap(value, fn) to return a new value containing the results of
 calling a provided function on every non-Array and non-Object element in the value input, 
 including elements within nested Arrays and Objects. 
The function fn is called with a single argument, 
the element that is being mapped/transformed.

*/

function isPlainObject(value) {
  if (value == null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

function mapHelper(element, fn, original) {
  if (Array.isArray(element)) {
    return element.map((item) => mapHelper(item, fn, original));
  }

  if (isPlainObject(element)) {
    return Object.fromEntries(
      Object.entries(element).map(([key, value]) => [
        key,
        mapHelper(value, fn, original),
      ])
    );
  }

  return fn.call(original, element);
}

export default function deepMap(value, fn) {
  return mapHelper(value, fn, value);
}
