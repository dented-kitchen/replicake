import Conversion from './Conversion.js';
import Nutrition from './Nutrition.js';
import Quantity from './Quantity.js';

/**
 * An ingredient in a recipe, usually with a provided {@link Quantity}.
 */
export default class Ingredient {
  constructor(options) {
    const defaults = {};

    const actual = Object.assign({}, defaults, options);

    if (actual.id) this.id = actual.id;
    this.key = actual.key;
    this.name = actual.name;
    if (actual.quantity) {
      this.quantity = new Quantity(actual.quantity);
    }
    if (actual.conversion) this.conversion = new Conversion(actual.conversion);
    if (actual.nutrition) this.nutrition = new Nutrition(actual.nutrition);
    if (actual.tags) this.tags = actual.tags;
  }

  hasTag(tag) {
    return this.tags.includes(tag);
  }

  toString() {
    return `${this.quantity ? this.quantity + ' ' : ''}${this.name}`;
  }
}
