import Units from './Units.js';

/**
   * Extracts an amount and units value from a string which specifies both amount and unit.
   * String must be of the form "<amount> <unit>" where all whitespace is optional.
   * Amount string must be readable by parseFloat().
   * Unit string must match a unit name, its plural, or symbol exactly.
   */
function _matchRegex(str) {
  const rgx = /(\d*\.?\d*) *([a-z|A-z]*)/;
  const groups = str.match(rgx);
  if (groups === null) {
    return { amount: 0, units: '' };
  }

  return { 
    amount: parseFloat(groups[1]),
    units: groups[2],
  };
}

/**
 * Represent an amount with a specific {@link Units} (e.g '30 grams').
 */
export default class Quantity {
  constructor(options) {
    const defaults = {
      amount: 0,
      units: '',
    };

    const opts = (typeof(options) === 'string') ? _matchRegex(options) : options;
    const actual = Object.assign({}, defaults, opts);

    this.amount = actual.amount;
    this.units = (actual.units instanceof Units) ? actual.units : Units.Lookup(actual.units);
  }

  toString() {
    return `${this.amount} ${this.units}`;
  }
}
