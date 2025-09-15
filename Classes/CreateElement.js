class CreateElement {
  constructor() {
    this.tag = null;
  }

  create(tag) {
    this.tag = document.createElement(tag);
    return this.tag;
  }

  set({ key, value }) {
    this.tag.setAttribute(key, value);
  }
}

const el = new CreateElement();
el.create("div");

console.log(el);
