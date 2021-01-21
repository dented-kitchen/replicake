import Ingredient from './core/Ingredient.js';
import Nutrition from './core/Nutrition.js';
import Quantity from './core/Quantity.js';
import Recipe from './core/Recipe.js';
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
      if (typeof(value) === 'string') {
        value = { quantity: value }
      }
      options.ingredients[key] = Object.assign({}, _pantry[key], value);
    });

    return new Recipe(options);
  },

  CreateIngredient(options) {
    return new Ingredient(options);
  },

  /**
   * Link a pantry ingredient data library to use when creating all recipes via Create().
   * @param {*} pantry Pantry data library to link.
   */
  use(pantry) {
    return Object.assign(_pantry, pantry);
  },

  Ingredient,
  Nutrition,
  Quantity,
  Recipe,
  Units,
}

export default Replicake;
