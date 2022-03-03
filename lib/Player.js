const Potion = require('../lib/Potion');
const Character = require('./Character');

// ES6 Player class
// to use Character class need 'extends'
class Player extends Character {
    constructor(name = '') {
        // call parent constructor here:
        super(name);

        this.inventory = [new Potion('health'), new Potion()];
    }
  
    getStats() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    }
  
    getInventory() {
        if (this.inventory.length) {
            return this.inventory;
        }
        return false;
    }
  
    addPotion(potion) {
        this.inventory.push(potion);
    }
  
    usePotion(index) {
        const potion = this.inventory.splice(index, 1)[0];
  
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
    }
}

// export Player class
module.exports = Player;


// // ES5 Player constructor function
// //  the name parameter sets a default empty string if no name is provided
// // creates player object with a name or empty string and 3 properties
// function Player(name = '') {
//     this.name = name;
  
//     this.health = Math.floor(Math.random() * 10 + 95);
//     this.strength = Math.floor(Math.random() * 5 + 7);
//     this.agility = Math.floor(Math.random() * 5 + 7);

//     // add 2 potions to the inventory
//     this.inventory = [new Potion('health'), new Potion()];
// }

// // inherit prototype methods from Character here:
// Player.prototype = Object.create(Character.prototype);

// Player.prototype.getStats = function() {
//     return {
//       potions: this.inventory.length,
//       health: this.health,
//       strength: this.strength,
//       agility: this.agility
//     };
// };
  
// Player.prototype.getInventory = function() {
//     // if the inventory is not empty
//     if (this.inventory.length) {
//       return this.inventory;
//     }

//     // return false if the inventory is empty
//     return false;
// };

// Player.prototype.addPotion = function(potion) {
//     // when player decides add potion, add potion to the inventory array
//     this.inventory.push(potion);
// };

// Player.prototype.usePotion = function(index) {
//     // getInventory() returns actual inventory array
//     // .splice --> return array containing removed potion
//     // from that array, get the potion[0]
//     // the original inventory array has a single Potion removed at the specified index value  --> the 1 indicates only 1 potion removed 
//     // returned array --> potion removed put into a new "removed items" array
//     // then the Potion at index [0] of this "removed items" array is saved in a potion variable
//     const potion = this.getInventory().splice(index, 1)[0];
  
//     switch (potion.name) {
//       case 'agility':
//         this.agility += potion.value;
//         break;
//       case 'health':
//         this.health += potion.value;
//         break;
//       case 'strength':
//         this.strength += potion.value;
//         break;
//     }
// };

