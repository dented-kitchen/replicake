import Quantity from '../core/Quantity';
import Units from '../core/Units';

/**
 * Represent an amount of time ('1 hour' or '20 - 30 minutes').
 * @extends Quantity
 */
export default class Duration {
  constructor(options) {
    // If given a string, use the Quantity constructor
    if (typeof(options) === 'string') {
      this.min = new Quantity(options);
      this.max = this.min;
    }
    else {
      const defaults = {
        min: '0m',
      };
      const actual = Object.assign({}, defaults, options);

      // If a single amount, match min/max
      if (actual.amount) {
        this.min = new Quantity(actual.amount, actual.units || Units.MINUTES);
        this.max = this.min;
      }
      else {
        // Else extract the range
        this.min = new Quantity(actual.min);
        this.max = actual.max ? new Quantity(actual.max) : this.min;
      }
    }
  }

  toString() {
    if (this.min === this.max) return `${this.min}`;
    return `${this.min} - ${this.max}`;
  }
}
