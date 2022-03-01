const checkIfEqual = require('../lib/random.js');
// use this relative path when going back a folder into root and into another folder

test('checks if 10 is equal to 10', () => {
   expect(checkIfEqual(10, 10)).toBe(true);
});