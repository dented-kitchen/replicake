import Quantity from '../core/Quantity.js';
import Units from '../core/Units.js';

/**
 * Represent a temperature value.
 * @extends Quantity
 */
export default class Temperature extends Quantity {
  /**
   * Constructs a Celsius temperature.
   * @param {number} amount The temperature value expressed in Celsius.
   * @returns {Temperature} The temperature object.
   */
  static Celsius(amount) {
    return new Temperature({ amount, units: Units.CELSIUS });
  }

  /**
   * Constructs a Fahrenheit temperature.
   * @param {number} amount The temperature value expressed in Fahrenheit.
   * @returns {Temperature} The temperature object.
   */
  static Fahrenheit(amount) {
    return new Temperature({ amount, units: Units.FAHRENHEIT });
  }

  toString() {
    return `${this.amount}°${this.units.symbol}`;
  }
}
