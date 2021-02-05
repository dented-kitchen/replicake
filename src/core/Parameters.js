import Duration from '../quantities/Duration.js';
import Temperature from "../quantities/Temperature";

export default class Parameters {
  constructor(options, recipe) {
    const defaults = {};

    const actual = Object.assign({}, defaults, options);

    Object.assign(this, actual);
    if (recipe) {
      if (actual.target) this.target = recipe.findItem(actual.target) || actual.target;
      if (actual.ingredients) this.ingredients = recipe.findItem(actual.ingredients) || actual.ingredients;
      if (actual.products) this.products = recipe.findItem(actual.products) || actual.products;
    }

    if (actual.duration) this.duration = new Duration(actual.duration);
    if (actual.temperature) this.temperature = new Temperature(actual.temperature);
  }


}
