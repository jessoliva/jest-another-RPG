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
});


//  checking that player.getStats() returns an object with four specific properties
test("gets player's stats as an object", () => {
    const player = new Player('Dave');
  
    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

test('gets inventory from player or returns false', () => {
    const player = new Player('Dave');

    // On player creation, the inventory should already have something in it, so a call to player.getInventory() should return an array
    expect(player.getInventory()).toEqual(expect.any(Array));

    // There's also the case of an empty inventory needing to return false. You can simulate an empty array yourself by setting player.inventory = [] before the next expect() runs
    player.inventory = [];
  
    expect(player.getInventory()).toEqual(false);
});