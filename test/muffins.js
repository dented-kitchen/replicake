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
    target: true,
  },
  template: '${name} ${target} in ${oven}${oven.temperature}{$duration}',
});

let cool = Replicake.CreateTechnique({
  key: 'cool',
  name: 'cool',
  required: [ 'target' ],
  template: '${name} ${target}${duration}${temperature}',
});

// Create our equipment
let oven = new Replicake.Oven({ key: 'oven', name: 'oven' });
let bowl = new Replicake.Bowl({ key: 'bowl', name: 'large bowl' });
let bowl2 = new Replicake.Bowl({ key: 'bowl2', name: 'another bowl' });
let muffinPan = new Replicake.Pan({ key: 'muffin-pan', name: 'muffin pan' });

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
    oven,
    bowl,
    bowl2,
    muffinPan,
  },
  instructions: [
    preheat({ temperature: '400F' }),
    mix({ target: bowl, ingredients: 'dry' }),
    mix({ target: bowl2, ingredients: 'wet' }),
    mix({ target: bowl, ingredients: bowl2.contents, suffix: 'until just combined' }),
    distribute({ target: muffinPan, ingredients: bowl.contents }),
    bake({ target: muffinPan, duration: { min: '20m', max: '30m' }, product: 'muffins' }),
    cool({ target: 'muffins', duration: '10m' }),
  ],
});

//console.log(muffins);
console.log(JSON.stringify(muffins, null, 2));
