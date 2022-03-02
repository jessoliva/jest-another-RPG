//  imports the Potion() constructor into the test, establishing Potion as a usable variable
const Potion = require('../lib/Potion');

// mocks/replaces the constructor's implementation with our faked data
jest.mock('../lib/Potion');

// console.log(new Potion());

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

test("gets player's health value", () => {
    const player = new Player('Dave');
  
    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
    // The expect.stringContaining() method is an expect method that we can use to make sure our string includes our player's health
});

test('checks if player is alive or not', () => {
    const player = new Player('Dave');

    // Here, we're updating the value of our Player health halfway through the test so that we can check for both conditions: true and false
  
    expect(player.isAlive()).toBeTruthy();
  
    player.health = 0;
  
    expect(player.isAlive()).toBeFalsy();
});

test("subtracts from player's health", () => {
    const player = new Player('Dave');
    const oldHealth = player.health;

    // call the reduceHealth() method twice—the second time with an absurdly high value to make sure that it never goes negative
  
    player.reduceHealth(5);
  
    expect(player.health).toBe(oldHealth - 5);
  
    player.reduceHealth(99999);
  
    expect(player.health).toBe(0);
});