import Equipment from '../core/Equipment.js';
import Temperature from '../quantities/Temperature.js';

export default class Oven extends Equipment {
  constructor(options) {
    super(options);

    this.temperature = Temperature.Fahrenheit(0);
  }
}
