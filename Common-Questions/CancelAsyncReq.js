// using a abort controller

const controller = new AbortController();

const res = fetch("https://jsonplaceholder.typicode.com/posts", {
  signal: controller.signal,
})
  .then((r) => r.json())
  .then((d) => console.log(d))
  .catch((e) => {
    if (e.name === "AbortError") console.log("request was cancelled");
    else console.log("request failed", e);
  });

// using a flag

let isCancelled = false;

async function makeRequest() {
  try {
    const r = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (isCancelled) {
      throw new Error("");
    }
    const d = await r.json();
    if (isCancelled) {
      throw new Error("");
    }
    return data;
  } catch (e) {}
}
