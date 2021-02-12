import Bowl from './equipment/Bowl.js';
import Container from './equipment/Container.js';
import Duration from './quantities/Duration.js';
import Equipment from './core/Equipment.js';
import Ingredient from './core/Ingredient.js';
import Instruction from './core/Instruction.js';
import Nutrition from './core/Nutrition.js';
import Oven from './equipment/Oven.js';
import Pan from './equipment/Pan.js';
import Quantity from './core/Quantity.js';
import Recipe from './core/Recipe.js';
import Technique from './core/Technique.js';
import Temperature from './quantities/Temperature.js';
import Units from './core/Units.js';

const _pantry = {};

const Replicake = {
  /**
   * Create a new {@link Recipe} with the provided options.
   * @param {*} options Options to create recipe with. See Recipe class constructor for details.
   */
  Create(options) {
    // Merge ingredient pantry data into the ingredients object passed to options
    Object.keys(options.ingredients).forEach((key) => {
      let value = options.ingredients[key];
      if (typeof value === 'string') {
        value = { quantity: value };
      }
      options.ingredients[key] = Object.assign({}, _pantry[key], value);
    });

    let recipe = new Recipe(options);
    return recipe;
  },

  CreateIngredient(options) {
    return new Ingredient(options);
  },

  CreateEquipment(options) {
    return new Equipment(options);
  },

  CreateTechnique(options) {
    let technique = new Technique(options);
    return (parameters) => {
      // TODO: Verify technique valid with these parameters
      return new Instruction({
        technique,
        parameters,
      });
    };
  },

  /**
   * Link a pantry ingredient data library to use when creating all recipes via Create().
   * @param {*} pantry Pantry data library to link.
   */
  use(pantry) {
    return Object.assign(_pantry, pantry);
  },

  // Core
  Equipment,
  Ingredient,
  Instruction,
  Nutrition,
  Quantity,
  Recipe,
  Technique,
  Units,

  // Equipment
  Bowl,
  Container,
  Oven,
  Pan,

  // Quantities
  Duration,
  Temperature,
};

export default Replicake;
