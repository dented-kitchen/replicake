import Equipment from '../core/Equipment.js';

import { toStringListComma } from '../utils/stringUtils.js';

export default class Container extends Equipment {
  constructor(options) {
    super(options);

    this.contents = [];
  }

  contentsString() {
    return `contents of ${this.name}`;
    // TOOO: If one thing, just list that thing
    // TODO: If multiple things, say 'contents of {name}'??
    // return toStringListComma(this.contents.map(i => i.toString()));
  }
}
