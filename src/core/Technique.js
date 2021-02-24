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
      template: '${name}',
    };

    const actual = Object.assign({}, defaults, options);
    this.key = actual.key;
    this.name = actual.name;
    // TODO: Actions
    
    // We accept the following types for required
    if (actual.required) {
      this.required = {};
      let parameters = {};
      if (typeof actual.required === 'string') {
        // string: single expect parameter
        parameters[actual.required] = true;
      }
      else if (Array.isArray(actual.required)) {
        // array of string: expected parameters
        // TODO: array of complex objects?
        actual.required.forEach((req) => {
          parameters[req] = true;
        });
      }
      else {
        // object with ingredients, equipment and/or parameters
        if (actual.required.ingredients) this.required.ingredients = actual.required.ingredients;
        if (actual.required.equipment) this.required.equipment = actual.required.equipment;
        if (actual.required.parameters) parameters = actual.required.parameters;
      }

      this.required.parameters = parameters;
    }

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

    // Add required equipment from this technique as replacers
    if (this.required.equipment) {
      Object.keys(this.required.equipment).forEach((text) => {
        const equip = parameters.equipment[text];
        placeholders.push({ 
          text: new RegExp(`\\\${${text}}`, 'g'),
          replacer: () => equip,
        });

        // To support something like {oven.temperature}
        // we add the object properties as well
        Object.keys(equip).forEach((key) => {
          placeholders.push({ 
            text: new RegExp(`\\\${${text}\.${key}}`, 'g'),
            replacer: () => equip[key],
          });
        })
      });
    }

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
