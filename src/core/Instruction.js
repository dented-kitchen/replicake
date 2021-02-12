import Parameters from './Parameters';

export default class Instruction {
  /**
   * Create a new Instruction.
   * @param {Technique=} options.technique The technique being applied.
   * @param {*} options.parameters The parameters for the technique being applied.
   * @param {Recipe=} recipe Optional recipe parent object
   */
  constructor(options, recipe) {
    const defaults = {
      parameters: {},
    };

    // Simple string instruction
    if (typeof options === 'string') {
      this.text = options;
    }
    else {
      const actual = Object.assign({}, defaults, options);
      this.technique = actual.technique;
      this.parameters = new Parameters(actual.parameters, recipe);
    }
  }

  toJSON() {
    return {
      technique: this.technique.key,
      parameters: this.parameters,
    };
  }

  toString() {
    if (this.text) return this.text;
    return this.technique.evalTemplate(this.parameters);
  }
}
