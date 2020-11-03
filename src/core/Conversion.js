import Quantity from './Quantity.js';

export default class Conversion {
  constructor(options) {
    const defaults = {
      weight: '1',
      volume: '1',
    };

    const actual = Object.assign({}, defaults, options);

    this.weight = Quantity.FromString(actual.weight);
    this.volume = Quantity.FromString(actual.volume);
  }
}