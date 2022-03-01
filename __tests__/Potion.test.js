// require the Potion module that has the actual code 
const Potion = require('../lib/Potion.js');

test('creates a health potion object', () => {

    const potion = new Potion('health');
    // new keyword --> creates new Potion object 
    // it will take the string we pass in and assign it to the potion's name
    // Even though we haven't even written any code for the new potion yet, we can still specify that it should have a name property equal to health, and a value property that is a number of some kind
    // so --> health: number,
  
    expect(potion.name).toBe('health');
    expect(potion.value).toEqual(expect.any(Number));
});