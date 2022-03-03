const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

// The initializeGame() method is where we'll set up the Enemy and Player objects
Game.prototype.initializeGame = function() {

    // populate the enemies array
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));    

    this.currentEnemy = this.enemies[0];

    inquirer.prompt({
        type: 'text',
        name: 'name',
        message: 'What is your name?'
    })
    // destructure name from the prompt object
    .then(({ name }) => { // inquirer callback function
        this.player = new Player(name);

        // make the characters fight
        this.startNewBattle()
    });
};

Game.prototype.startNewBattle = function() {
    // Establish who will take their turn first based on their agility values
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } 
    else {
        this.isPlayerTurn = false;
    }

    // Display the Player object's stats
    console.log('Your stats are as follows:');
    console.table(this.player.getStats());

    // Display the description of the current Enemy
    console.log(this.currentEnemy.getDescription());
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

    // responsible for each individual turn in the round
    // battle() method is the main event of the game that will run an indefinite number of times
    // Each time, it will either be the Player turn or the Enemy turn
    this.battle();
};

Game.prototype.battle = function() {

    //  The inquirer prompts are asynchronous, so we must wait for their promises to be resolved and perform our "end turn" logic in their callbacks
    
    if (this.isPlayerTurn) {
        // prompt user to attack or use a Potion
        inquirer
        .prompt({
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: ['Attack', 'Use potion']
        })
        .then(({ action }) => { // take user response
            
            // if it equals to Use potion
            if (action === 'Use potion') { 
                
                // check if the inventory is empty
                //  If the inventory is empty, immediately return to end the Player turn.
                if (!this.player.getInventory()) {
                    console.log("You don't have any potions!");

                    return this.checkEndOfBattle();
                }

                // if the inventory is not empty
                // display list of Potion objects to user
                inquirer
                .prompt({
                  type: 'list',
                  message: 'Which potion would you like to use?',
                  name: 'action',
                  choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                })
                .then(({ action }) => {
                    // split the user input @ : 
                    // will return an array like this ['2', 'agility']
                    const potionDetails = action.split(': ');
                    
                    // the 0 will be the index number! for just subtract 1 from it to get the actual index number of the potion selected
                    // potionDetails[0] - 1 = index number
                    this.player.usePotion(potionDetails[0] - 1);
                    console.log(`You used a ${potionDetails[1]} potion.`);
                    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

                    this.checkEndOfBattle();
                });
            }
            else {
                const damage = this.player.getAttackValue();
                this.currentEnemy.reduceHealth(damage);

                console.log(`You attacked ${this.currentEnemy.name}`);
                console.log(this.currentEnemy.getHealth());
                console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

                this.checkEndOfBattle();
            }
        })
    }
    else { // enemy turn, attack player
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

        this.checkEndOfBattle();
    }
}

Game.prototype.checkEndOfBattle = function() {

    // verify if both characters are alive and can continue fighting
    // If so, we should switch the turn order and run battle() again
    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
    }
    // Player is still alive but the Enemy has been defeated
    else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {

        // the Player is awarded a Potion, and the roundNumber increases
        // However, it's possible there are no more enemies to fight, in which case the Player has won the overall game. Otherwise, a new battle should start

        console.log(`You've defeated the ${this.currentEnemy.name}`);
      
        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      
        this.roundNumber++;
      
        if (this.roundNumber < this.enemies.length) {

          this.currentEnemy = this.enemies[this.roundNumber];
          this.startNewBattle();

        } 
        else {
          console.log('You win!');
        }
    }
    // if the player is dead but enemy alive
    else {
        console.log("You've been defeated!");
    }

};


module.exports = Game;