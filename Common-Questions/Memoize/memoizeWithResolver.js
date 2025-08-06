function memoizeWithResolver(
  fn,
  { resolver = (...args) => JSON.stringify(args) } = {}
) {
  const cache = new Map();

  return function (...args) {
    const key = resolver(...args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const add = (a, b) => a + b;
const memoizedAdd = memoizeWithResolver(add);

console.log(memoizedAdd(1, 2)); // 3 (computed)
console.log(memoizedAdd(1, 2)); // 3 (cached)

const getWeather = ({ city, date }) => {
  console.log(`Fetching weather for ${city} on ${date}`);
  return `Weather data for ${city} on ${date}`;
};

const memoizedWeather = memoizeWithResolver(getWeather, {
  resolver: ([params]) => `${params.city}-${params.date}`,
});

memoizedWeather({ city: "Delhi", date: "2025-08-05" });
// Fetching...
memoizedWeather({ city: "Delhi", date: "2025-08-05" });
// Cached
