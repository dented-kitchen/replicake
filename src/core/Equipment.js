
export default class Equipment {
  constructor(options) {
    const defaults = {};

    const actual = Object.assign({}, defaults, options);

    if (actual.id) this.id = actual.id;
    this.key = actual.key;
    this.name = actual.name;
  }

  toString() {
    return this.name;
  }
}
