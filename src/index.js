import Ingredient from './core/Ingredient.js';
import Nutrition from './core/Nutrition.js';
import Quantity from './core/Quantity.js';
import Recipe from './core/Recipe.js';
import Units from './core/Units.js';

const Replicake = {
  /**
   * Create a new {@link Recipe} with the provided options.
   * @param {*} options Options to create recipe with.
   */
  Create(options) {
    return new Recipe(options);
  },

  Ingredient,
  Nutrition,
  Quantity,
  Recipe,
  Units,
}

export default Replicake;
