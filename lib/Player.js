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

Player.prototype.getStats = function() {
    return {
      potions: this.inventory.length,
      health: this.health,
      strength: this.strength,
      agility: this.agility
    };
};
  
Player.prototype.getInventory = function() {
    if (this.inventory.length) {
      return this.inventory;
    }
    return false;
};

Player.prototype.getHealth = function() {
    return `${this.name}'s health is now ${this.health}!`;
};

Player.prototype.isAlive = function() {
    if (this.health === 0) {
      return false;
    }
    return true;
};

Player.prototype.reduceHealth = function(health) {
    // this.health = this.health - health
    this.health -= health;
    
    // include the conditional to ensure the health never goes negative
    if (this.health < 0) {
      this.health = 0;
    }
};

// export Player constructor function
module.exports = Player;