
/**
 * Represents commonly used units in recipes.
 */
export default class Units {
  constructor(options) {
    const defaults = {
      name: '',
      symbol: '',
    };

    const actual = Object.assign({}, defaults, options);

    this.name = actual.name;
    this.symbol = actual.symbol;
    if (actual.plural) this.plural = actual.plural;
  }

  /**
   * Returns a string with the units name.
   * @returns {string} The units name.
   */
  toString() {
    return this.name;
  }

  /**
   * Find and returns a Units constant given a string name or symbol. Must be exact match.
   * @param {string} str Unit name or symbol to lookup.
   * @returns {Units} Matching Units object, or undefined if not found.
   */
  static Lookup(str) {
    Object.values(UNITS).forEach((unit) => {
      if (str === unit.name ||                      // Match the unit name
          str === unit.name + 's' ||                // Match the plural unit name
          str === unit.symbol ||                    // Match the symbol (matches '' to UNITS.count)
          (unit.plural && str === unit.plural)) {   // Match a custom plural name
        return unit;
      }
    });

    return undefined;
  }

  /**
   * Units constant for a count (a unit-less number).
   * For example, this would be used for the number of eggs.
   */
  static get COUNT() { return UNITS.count; }

  /**
   * Units constant for grams (g).
   */
  static get GRAMS() { return UNITS.grams; }
}

// Create 'singleton' constants for each pre-defined unit type
// These are accessed via the Units class static getters below
const UNITS = Object.freeze({
  count: Object.freeze(
    new Units({
      name: 'count',
      symbol: '',
    }
  )),
  grams: Object.freeze(
    new Units({
      name: 'gram',
      symbol: 'g',
    }
  )),
});
