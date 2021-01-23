import Equipment from './Equipment.js';
import Ingredient from './Ingredient.js';
import Instruction from './Instruction.js';

export default class Recipe {
  constructor(options) {
    const defaults = {
      name: '',
      author: '',
      description: '',
      ingredients: {},
      equipment: {},
      instructions: [],
    };

    const actual = Object.assign({}, defaults, options);

    if (actual.id) this.id = actual.id;
    this.name = actual.name;
    this.author = actual.author;
    this.description = actual.description;

    this.ingredients = {};
    Object.keys(actual.ingredients).forEach((key) => {
      const value = actual.ingredients[key];
      if (value instanceof Ingredient) {
        this.ingredients[key] = value;
      }
      else {
        // Defaults name to key if omitted
        let options = {
          key,
          name: key,
        };

        // Copy properties from value if it's an Object
        if (value instanceof Object) {
          Object.assign(options, value);
        }
        else {
          // Otherwise we just use the value as a quantity
          options.quantity = value;
        }

        this.ingredients[key] = new Ingredient(options);
      }
    });

    // TODO: We can probably accept values similarly to ingredients.
    this.equipment = actual.equipment;

    this.instructions = [];
    actual.instructions.forEach((instr) => {
      this.instructions.push((instr instanceof Instruction) ? instr : new Instruction(instr));
    });
  }
}
