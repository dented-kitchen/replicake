import Replicake from '../src/index.js';

// This is the recipe used on the Getting Started page
// For now, this is just a simple way to test the library
Replicake.use({ flour: { name: 'all-purpose flour' }});
let muffins = Replicake.Create({
  name: 'muffins',
  author: 'luke',
  description: 'A simple muffin recipe with lots of easy customization options!',
  ingredients: {
    flour: '240g',
    sugar: '120g',
    bakingpowder: '14g',
    salt: '5g',
    eggs: '1',
    milk: '170g',
    vanilla: '1/2 tsp',
    buttermelted: '1 stick',
  },
});
console.log(muffins);

/*
  instructions: [
    preheat('oven', '400F'),
    sift('bowl', ingredientsTagged('dry')),
    mix('bowl#2', ingredientsTagged('wet')),
    mix('bowl', contents('bowl#2'), 'until just combined'),
    fold('bowl', ingredientsTagged('pieces')),
    distribute('muffin-pan', contents('bowl')),
    bake('oven', 'muffin-pan', '20-30m'),
    cool('muffin-pan', '10m'),
  ],
});
*/
