import Recipe from './core/Recipe.js';

const Replicake = {
  /**
   * Create a new {@link Recipe} with the provided options.
   * @param {*} options Options to create recipe with.
   */
  Create(options) {
    return new Recipe(options);
  },
}

export default Replicake;
