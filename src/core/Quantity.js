import Units from './Units.js';

/**
 * Represent an amount with a specific {@link Units} (e.g '30 grams').
 */
export default class Quantity {
  constructor(options) {
    const defaults = {
      amount: 0,
      units: '',
    };

    const actual = Object.assign({}, defaults, options);

    this.amount = actual.amount;
    this.units = Units.Lookup(actual.units);
  }
}
