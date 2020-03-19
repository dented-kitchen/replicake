
export default class Recipe {
  constructor(options) {
    const defaults = {
      name: '',
      author: '',
      description: '',
      ingredients: {},
    };

    const actual = Object.assign({}, defaults, options);

    if (actual.id) this.id = actual.id;
    this.name = actual.name;
    this.author = actual.author;
    this.description = actual.description;
    this.ingredients = actual.ingredients;
  }
}
