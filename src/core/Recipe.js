import Equipment from './Equipment.js';
import Ingredient from './Ingredient.js';
import Instruction from './Instruction.js';
import Parameters from './Parameters.js';

export default class Recipe {
  constructor(options) {
    const defaults = {
      name: '',
      author: '',
      description: '',
      ingredients: {},
      equipment: {},
      products: {},
      // method: [],
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
    this.products = actual.products;

    // The method is the unaltered instruction list
    this.method = [];
    actual.instructions.forEach((instr) => {
      this.method.push((instr instanceof Instruction) ? instr : new Instruction(instr));
    });

    // Instructions are auto-generated when the recipe changes
    this.dirty = true;
    this._update();
  }

  /**
   * Get a reference to the Ingredient or Equipment object in this recipe identified by the passed string.
   * @param {string} identifier Unique identifier for an ingredient, equipment or product from this recipe.
   */
  findItem(identifier) {
    if (typeof(identifier) === 'string') {
      if (this.ingredients[identifier]) return this.ingredients[identifier];
      if (this.equipment[identifier]) return this.equipment[identifier];
      if (this.products[identifier]) return this.products[identifier];
    }

    return undefined;
  }

  _verifyProduct(product) {
    if (typeof(product) === 'string') {
      const productRef = this.products[product];
      if (!productRef) {
        this.products[product] = new Ingredient({ key: product, name: product });
      }
    }
    else if (product instanceof Ingredient) {
      const productRef = this.products[product.key];
      if (!productRef) {
        this.products[product.key] = product;
      }
      else if (productRef !== product) {
        // TODO: Duplicate product key
        // Do we error or overwrite?
      }
    }
    // product is assumed to be Ingredient constructor options
    else {
      const productRef = new Ingredient(product);
      // TODO: Check productRef is valid, no dupe key?
      this.products[productRef.key] = productRef;
    }
  }

  /**
   * Called internally when the recipe changes. This will recalculate the instruction list based on any changes.
   */
  _update() {
    if (!this.dirty) return;

    // This function should do the following:
    //
    // 1. TODO: Prepend instructions when ingredients are not in default state
    // For example, add instruction to melt butter step before it is needed
    //
    // 2. TODO: Evaluate instruction parameter queries over the recipe ingredient and equipment list
    // For example, mix({ target: 'bowl', ingredients: { tag: 'dry' } })
    // We will replace the { tag: 'dry' } query with an array of ingredients with the tag 'dry'
    //
    // 3. Extract 'products' and create objects for them if they are omitted
    //
    // 4. Validate techniques and populate the required references (to oven, temperature, etc)
    // If the equipment does not exist, it is created and added to equipment list with a flag

    this.method.forEach((instr) => {
      // Extract 'products' and create objects for them if they are omitted
      const products = instr.parameters.products;
      if (products) {
        if (Array.isArray(products)) {
          products.forEach((prod) => {
            this._verifyProduct(prod);
          });
        }
        else {
          this._verifyProduct(products);
        }
      }
    });

    // After validating technique and creating needed references, create instruction list
    this.instructions = [];
    this.method.forEach((instr) => {
      let instruction = new Instruction(instr);

      // Replace string keys in instructions with the actual objects.
      instruction.parameters = new Parameters(instruction.parameters, this);

      // TODO: Prepend instructions when ingredients are not in default state
      // For example, add instruction to melt butter step before it is needed

      this.instructions.push(instruction);
    });

    this.dirty = false;
  }

}
