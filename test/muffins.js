import Replicake from '../src/index.js';

// Setup a simple pantry dataset for this recipe
Replicake.use({ flour: { name: 'all-purpose flour' }});

// Create the techniques used in this recipe
let preheat = Replicake.CreateTechnique({
  key: 'preheat',
  name: 'preheat',
  required: {
    equipment: { 
      oven: Replicake.Oven,
    },
    parameters: {
      temperature: Replicake.Temperature,
    },
  },
  template: '${name} ${oven} to ${temperature}',
});

let mix = Replicake.CreateTechnique({
  key: 'mix',
  name: 'mix',
  required: [ 'target', 'ingredients' ],
  template: '${name} ${ingredients} in ${target}',
});

let distribute = Replicake.CreateTechnique({
  key: 'distribute',
  name: 'distribute',
  required: [ 'target', 'ingredients' ],
  template: '${name} ${ingredients} to ${target}',
});

let bake = Replicake.CreateTechnique({
  key: 'bake',
  name: 'bake',
  required: {
    equipment: { 
      oven: Replicake.Oven,
    },
    parameters: {
      duration: Replicake.Duration,
    },
    products: true,
  },
  template: '${name} ${products} in ${oven}${oven.temperature}${duration}',
});

let cool = Replicake.CreateTechnique({
  key: 'cool',
  name: 'cool',
  required: [ 'target' ],
  template: '${name} ${target}${duration}${temperature}',
});

// This is the recipe used on the Getting Started page
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
  equipment: {
    // TODO: Simple equipment list, similar to ingredients
    oven: new Replicake.Oven({ key: 'oven', name: 'oven' }),
    bowl: new Replicake.Bowl({ key: 'bowl', name: 'bowl' }),
    bowl2: new Replicake.Bowl({ key: 'bowl', name: 'another bowl' }),
    pan: new Replicake.Pan({ key: 'pan', name: 'muffin pan'}),
  },
  instructions: [
    preheat({ temperature: '400F' }),
    mix({ target: 'bowl', ingredients: { tag: 'dry' } }),
    mix({ target: 'bowl2', ingredients: { tag: 'wet' } }),
    mix({ target: 'bowl', ingredients: 'bowl2', suffix: 'until just combined' }),
    distribute({ target: 'pan', ingredients: 'bowl' }),
    bake({ target: 'pan', duration: { min: '20m', max: '30m' }, products: 'muffins' }),
    cool({ target: 'muffins', duration: '10m' }),
  ],
});

//console.log(muffins);
//console.log(JSON.stringify(muffins, null, 2));

muffins.instructions.forEach((i) => console.log(i.toString()));
