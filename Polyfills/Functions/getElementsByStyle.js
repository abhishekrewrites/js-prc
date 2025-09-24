function getElementsByStyle(root, property, value) {
  const queue = [...root.children];
  const results = [];

  while (queue.length > 0) {
    const ele = queue.shift();

    //Node.ELEMENT_NODE is a DOM constant that equals 1 and represents HTML/XML element nodes like <div>, <p>, <span>, etc.

    if (ele.nodeType === Node.ELEMENT_NODE) {
      const computedStyles = getComputedStyle(ele);

      if (computedStyles[property] === value) {
        results.push(ele);
      }

      queue.push(...ele.children);
    }
  }
  return results;
}

const elements = getElementsByStyle(
  document.getElementById("root"),
  "borderRadius",
  "4px"
);
