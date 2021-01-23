/**
 * A technique for manipulation of ingredients during a recipe.
 */
export default class Technique {
  constructor(options) {
    const defaults = {
      name: '',
      actions: [],
      required: {},
      template: '${name}',
    };

    const actual = Object.assign({}, defaults, options);
    this.key = actual.key;
    this.name = actual.name;
    // TODO: Actions
    this.required = actual.required;
    this.template = actual.template;
  }

  evalTemplate() {
    return this.name;
  }

}
