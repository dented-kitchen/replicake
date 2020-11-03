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

  /**
   * Create a new Quantity object from a string which specifies both amount and unit.
   * String must be of the form "<amount> <unit>" where all whitespace is optional. Unit string
   * must match a unit name, its plural, or symbol exactly.
   */
  static FromString(str) {

  }
}
