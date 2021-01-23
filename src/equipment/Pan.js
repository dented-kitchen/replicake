import Equipment from '../core/Equipment.js';

export default class Pan extends Equipment {
  constructor(options) {
    super(options);
    const defaults = {
    };

    const actual = Object.assign({}, defaults, options);
  }
}
