const randomNumber = require('../lib/random.js');
// use this relative path when going back a folder into root and into another folder

test('gets random number between 1 and 10', () => {

   expect(randomNumber()).toBeGreaterThanOrEqual(1);
   expect(randomNumber()).toBeLessThanOrEqual(10);
   
});