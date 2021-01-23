import Quantity from '../core/Quantity';

/**
 * Represent an amount of time ('1 hour' or '20 - 30 minutes').
 * @extends Quantity
 */
export default class Duration extends Quantity {
  constructor(options) {
    super(options);
    const defaults = {};

    const actual = Object.assign({}, defaults, options);

    this.min = actual.min;
    this.max = actual.max;
  }
}
