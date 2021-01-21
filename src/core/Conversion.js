import Quantity from './Quantity.js';

export default class Conversion {
  constructor(options) {
    const defaults = {
      weight: '1',
      volume: '1',
    };

    const actual = Object.assign({}, defaults, options);

    this.weight = new Quantity(actual.weight);
    this.volume = new Quantity(actual.volume);
  }
}