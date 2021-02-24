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
        let ingrOpts = {
          key,
          name: key,
        };

        // Copy properties from value if it's an Object
        if (value instanceof Object) {
          Object.assign(ingrOpts, value);
        }
        else {
          // Otherwise we just use the value as a quantity
          ingrOpts.quantity = value;
        }

        this.ingredients[key] = new Ingredient(ingrOpts);
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
    this.#update();
  }

  /**
   * Get a reference to the Ingredient or Equipment object in this recipe identified by the passed string.
   * @param {string} identifier Unique identifier for an ingredient, equipment or product from this recipe.
   */
  findItem(identifier) {
    if (typeof identifier === 'string') {
      if (this.ingredients[identifier]) return this.ingredients[identifier];
      if (this.equipment[identifier]) return this.equipment[identifier];
      if (this.products[identifier]) return this.products[identifier];
    }

    return undefined;
  }

  #verifyIngredient(ingredient) {
    if (typeof ingredient === 'string') {

    }
  }

  #verifyEquipment(equipment, type) {
    let match = undefined;
    Object.values(this.equipment).forEach((equip) => {
      if (equip instanceof type) {
        match = equip;
      }
    });

    if (match) {
      return match;
    }

    // TODO: Creating this equipment should include data from pantry
    // That data will need to be injected at a higher level so perhaps this code will go bye bye
    const options = { name: equipment, key: equipment };
    const equip = type ? new type(options) : new Equipment(options);

    if (!(equipment in this.equipment)) {
      this.equipment[equipment] = equip;
    }
    else {
      console.warn(`duplicate equip key '${equipment}'`);
      this.equipment[`${equipment}-auto`] = equip;
    }

    return equip;
  }

  /**
   * Ensures the recipe has a product object reference for a given string identifier or Ingredient class object.
   * If the product does not exist, it is created.
   * @param {*} product
   */
  #verifyProduct(product) {
    if (typeof product === 'string') {
      let productRef = this.products[product];
      if (!productRef) {
        productRef = new Ingredient({ key: product, name: product });
        this.products[product] = productRef;
      }

      return productRef;
    }
    else if (product instanceof Ingredient) {
      const productRef = this.products[product.key];
      if (!productRef) {
        this.products[product.key] = product;
        return product;
      }
      else if (productRef !== product) {
        console.warn(`duplicate key detected: ${product.key}`);
        // TODO: Duplicate product key
        // Do we error or overwrite? For now, we do neither.
      }

      return productRef;
    }

    // product is assumed to be Ingredient constructor options
    const productRef = new Ingredient(product);
    // TODO: Check productRef is valid, no dupe key?
    this.products[productRef.key] = productRef;
    return productRef;
  }

  /**
   * Called internally when the recipe changes. This will recalculate the instruction list based on any changes.
   */
  #update() {
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
    //
    // 5. Evaluate technique actions after each instruction to compute/evaluate recipe state.

    this.method.forEach((instr) => {
      // Extract 'products' and create Ingredient objects for them (only if they are omitted)
      const products = instr.parameters.products;
      if (products) {
        if (Array.isArray(products)) {
          products.forEach((prod) => {
            this.#verifyProduct(prod);
          });
        }
        else {
          this.#verifyProduct(products);
        }
      }
    });

    // After validating technique and creating needed references, create instruction list
    this.instructions = [];
    this.method.forEach((instr) => {
      // Inject required references from Technique into instruction parameters
      // Replace string keys in instructions with the actual objects.
      let instruction = new Instruction(instr, this);

      // Create and tag any Ingredients or Equipment needed for Techniques (only if they are omitted)
      const required = instr.technique.required;
      if (required) {
        if (required.ingredients) {
          // TODO: ingredients
        }

        if (required.equipment) {
          instruction.parameters.equipment = {};
          Object.keys(required.equipment).forEach((key) => {
            instruction.parameters.equipment[key] = this.#verifyEquipment(key, required.equipment[key]);
          });
        }
      }

      // TODO: Prepend instructions when ingredients are not in default state
      // For example, add instruction to melt butter step before it is needed

      this.instructions.push(instruction);

      // TODO: Evaluate technique actions to advance recipe state
    });

    this.dirty = false;
  }
}
