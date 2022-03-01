//  imports the Potion() constructor into the test, establishing Potion as a usable variable
const Potion = require('../lib/Potion');

// mocks/replaces the constructor's implementation with our faked data
jest.mock('../lib/Potion');

console.log(new Potion());

// don't need the .js extension! 
// Node will assume that the file is a JS file if no extension is specified 
const Player = require('../lib/Player');

// tests will check for the player object to have a name and 3 number properties: health, strength, agility
test('creates a player object', () => {
    const player = new Player('Dave');
  
    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));

    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
    
    console.log(player);
});