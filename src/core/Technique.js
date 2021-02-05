import Container from '../equipment/Container.js';

import { toStringListComma } from '../utils/stringUtils.js';

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

  evalTemplate(parameters) {
    let placeholders = [
      {
        text: /\${key}/g,
        replacer: () => this.key,
      },
      {
        text: /\${name}/g,
        replacer: () => this.name,
      },
      {
        text: /\${ingredients}/g,
        replacer: () => this.ingredientString(parameters.ingredients),
      },
      {
        text: /\${target}/g,
        replacer: () => this.targetString(parameters.target),
      },
      {
        text: /\${products}/g,
        replacer: () => this.ingredientString(parameters.products),
      },
      {
        text: /\${duration}/g,
        replacer: () => ` for ${parameters.duration}`,
      },
      {
        text: /\${temperature}/g,
        replacer: () => parameters.temperature || '',
      },
    ];

    // TODO: Add required equipment from this technique as replacers
    // To support something like {oven.temperature}, we can allow equipment
    // to register replacers or specify properties (maybe just allow all of them)

    // Object.keys(this.required).forEach((text) => {
    //   placeholders.push({ text, replacer: () => this.required[text] })
    // })

    let result = this.template;
    placeholders.forEach((swap) => {
      result = result.replace(swap.text, swap.replacer());
    });

    return result;
  }

  /**
   * Gets a comma-delimited string for the ingredients used by this technique.
   * @param {*} ingredients Array of ingredients/containers, a single ingredient or container, or a query object.
   * @returns {string} String of ingredients needed.
   */
  ingredientString(ingredients) {
    // Valid types for ingredients:
    //  Array of ingredient class - ingredients to use
    //  Array of equipment class - containers
    //  Arrays of intermixed types is fine
    //  Ingredient - ingredient
    //  Equipment (Container?) - container
    if (ingredients) {
      if (Array.isArray(ingredients)) {
        let stringArray = ingredients.map((i) => {
          if (i instanceof Container) {
            return i.contentsString();
          }

          return i.toString();
        });

        return toStringListComma(stringArray);
      }

      if (ingredients instanceof Container) {
        return ingredients.contentsString();
      }

      return ingredients.toString();
    }

    return '';
  }

  /**
   * Gets the target as a string
   */
  targetString(target) {
    return target ? target.toString() : '';
  }
}
