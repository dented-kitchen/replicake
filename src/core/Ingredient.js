import Quantity from './Quantity.js';

/**
 * An ingredient in a recipe, usually with a provided {@link Quantity}.
 */
export default class Ingredient {
  constructor(options) {
    const defaults = {
      name: '',
      quantity: {},
    };

    const actual = Object.assign({}, defaults, options);

    if (actual.id) this.id = actual.id;
    this.name = actual.name;
    this.quantity = new Quantity(actual.quantity);
  }
}
