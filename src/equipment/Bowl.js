import Equipment from '../core/Equipment.js';

export default class Bowl extends Equipment {
  constructor(options) {
    super(options);

    this.contents = [];
  }
}
