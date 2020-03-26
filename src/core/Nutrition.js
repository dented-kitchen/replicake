import Quantity from './Quantity.js';

// Constants used to calculate calories
const CALORIES_PER_GRAM_FAT = 9;
const CALORIES_PER_GRAM_CARB = 4;
const CALORIES_PER_GRAM_PROTEIN = 4;

/**
 * All values are assumed to be in the units indicated.
 */
export default class Nutrition {
  constructor(options) {
    const defaults = {
      size: '1 serving',
      quantity: {},
      fat: 0,           // g
      saturated: 0,     // g
      trans: 0,         // g
      cholesterol: 0,   // mg
      sodium: 0,        // mg
      carbs: 0,         // g
      fiber: 0,         // g
      sugar: 0,         // g
      protein: 0,       // g
    };

    const actual = Object.assign({}, defaults, options);

    this.size = actual.size;
    this.quantity = new Quantity(actual.quantity);
    this.fat = actual.fat;
    this.saturated = actual.saturated;
    this.trans = actual.trans;
    this.cholesterol = actual.cholesterol;
    this.sodium = actual.sodium;
    this.carbs = actual.carbs;
    this.fiber = actual.fiber;
    this.sugar = actual.sugar;
    this.protein = actual.protein;

    // Calories is optional and is estimated from nutrition macros if omitted
    if (actual.calories) this._calories = actual.calories;
  }

  /**
   * The number of calories, either as provided or computed based on nutrition macros.
   */
  get calories() {
    if (this._calories) return this._calories;
    return this.calculateCalories();
  }

  set calories(value) {
    this._calories = value;
  }

  /**
   * Gets the approximate number of calories based on nutrition macros.
   */
  calculateCalories() {
    return this.fat * CALORIES_PER_GRAM_FAT +
           this.carbs * CALORIES_PER_GRAM_CARB +
           this.protein * CALORIES_PER_GRAM_PROTEIN;
  }
}
