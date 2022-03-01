const Potion = require('../lib/Potion');

//  the name parameter sets a default empty string if no name is provided
// creates player object with a name or empty string and 3 properties
function Player(name = '') {
    this.name = name;
  
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);

    // add 2 potions to the inventory
    this.inventory = [new Potion('health'), new Potion()];
}

module.exports = Player;