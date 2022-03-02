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

Player.prototype.getAttackValue = function() {
    const min = this.strength - 5;
    const max = this.strength + 5;
  
    return Math.floor(Math.random() * (max - min) + min);
    // Math.floor rounds number up
    // Math.random provides a random decimal btw 0 and 1
    // ((decimal btw 0-1) * (max - min)) + min
    // We've created variables for min and max to make this function a little easier to maintain. What if you decide to increase the range of attacks later on? This code will be easier to understand upon revisit than if we wrote all of the expressions in one single return statement
};

Player.prototype.addPotion = function(potion) {
    // when player decides add potion, add potion to the inventory array
    this.inventory.push(potion);
};

Player.prototype.usePotion = function(index) {
    // getInventory() returns actual inventory array
    // .splice --> return array containing removed potion
    // from that array, get the potion[0]
    // the original inventory array has a single Potion removed at the specified index value  --> the 1 indicates only 1 potion removed 
    // returned array --> potion removed put into a new "removed items" array
    // then the Potion at index [0] of this "removed items" array is saved in a potion variable
    const potion = this.getInventory().splice(index, 1)[0];
  
    switch (potion.name) {
      case 'agility':
        this.agility += potion.value;
        break;
      case 'health':
        this.health += potion.value;
        break;
      case 'strength':
        this.strength += potion.value;
        break;
    }
};

// export Player constructor function
module.exports = Player;