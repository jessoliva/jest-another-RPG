class Character {

    constructor(name = '') {
        this.name = name;
        this.health = Math.floor(Math.random() * 10 + 95);
        this.strength = Math.floor(Math.random() * 5 + 7);
        this.agility = Math.floor(Math.random() * 5 + 7);
    }

    isAlive() {
        if (this.health === 0) {
            return false;
        }
        return true;
    }

    getHealth() {
        return `${this.name}'s health is now ${this.health}!`;
    }

    getAttackValue() {
        const min = this.strength - 5;
        const max = this.strength + 5;
    
        return Math.floor(Math.random() * (max - min) + min);
    }

    reduceHealth(health) {
        // this.health = this.health - health
        // health parameter will be the damage from the attack from the enemy    
        this.health -= health;

        // include the conditional to ensure the health never goes negative
        if (this.health < 0) {
            this.health = 0;
        }
    }
}

module.exports = Character;

// function Character() {} // parent class && Player and Enemy are children

// Character.prototype.isAlive = function() {
//     if (this.health === 0) {
//         return false;
//     }
//     return true;
// };

// Character.prototype.getHealth = function() {
//     return `${this.name}'s health is now ${this.health}!`;
// };

// Character.prototype.getAttackValue = function() {
//     const min = this.strength - 5;
//     const max = this.strength + 5;

//     return Math.floor(Math.random() * (max - min) + min);
//      // Math.floor rounds number up
//     // Math.random provides a random decimal btw 0 and 1
//     // ((decimal btw 0-1) * (max - min)) + min
//     // We've created variables for min and max to make this function a little easier to maintain. What if you decide to increase the range of attacks later on? This code will be easier to understand upon revisit than if we wrote all of the expressions in one single return statement
// };

// Character.prototype.reduceHealth = function(health) {
//     // this.health = this.health - health
//     // health parameter will be the damage from the attack from the enemy    
//     this.health -= health;

//     // include the conditional to ensure the health never goes negative
//     if (this.health < 0) {
//         this.health = 0;
//     }
// };

// console.log(new Character().getHealth());
// this will console.log undefined bc Character doesn't have any info!
// but that's ok bc we're just building this to have Player and Enemy inherit these methods!

// Note that isAlive(), getHealth(), getAttackValue(), and reduceHealth() are the only methods that the Player and Enemy objects have in common, so those are the only methods we included on the Character() constructor

// we want objects to inherit from the Character() constructor that we just created