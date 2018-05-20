
//@description: Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
	"use strict";
    this.sprite = 'images/enemy-bug.png';
    //position
    this.x = x;
    this.y = y;

    this.speed = speed;
};

//@description:
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
	"use strict";
    this.x += this.speed * dt;
    // which will ensure the game runs at the same speed for
    // all computers.
    // when off canvas, reset position of enemy to move across again
    if (this.x > 550) {
        this.x = -100;
        //speed of the bugs with Math.random() from
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        this.speed = 100 + Math.floor(Math.random() * 512);
    }
};

//@description:
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
	"use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
//@param:
var Player = function () {
	"use strict";
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 400;
};

//@description:
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function (dt) {
	"use strict";
    var self = this;
    //if left key is pressed:
    if (this.pressedKey === 'left' && this.x > 0) { //player isn't on left edge
        this.x = this.x - 100;
    }
     //if right key is pressed:
    if (this.pressedKey === 'right' && this.x < 400) { //player isn't on right edge
        this.x = this.x + 100;
    }

    //if up key is pressed:
    if (this.pressedKey === 'up' && this.y > 0) {
        this.y = this.y - 90;
    }

    //if down key is pressed:
    if (this.pressedKey === 'down' && this.y < 400) {
        this.y = this.y + 90;
    }

    //this will make player jump only once when key is pressed:
    this.pressedKey = null;

    // if player and enemy collide the player's position get reset
	 allEnemies.forEach(function(enemy) {
        if(self.x >= enemy.x - 25 &&
            self.x <= enemy.x + 25 &&
            self.y >= enemy.y - 25 && 
            self.y <= enemy.y + 25){
                player.reset();  
            }    

        });

    //if player reaches water, position reset:
    if (this.y < 0) {
        this.reset();
    }
};

//@constructor: Renders the player on the board
Player.prototype.render = function() {
    
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//@constructor:Handling player input
Player.prototype.handleInput = function(e) {
    this.pressedKey = e;
};

Player.prototype.checkCollisions = function(){
    if (Math.round(enemy.x) === self.x && enemy.y === self.y) {
            self.reset();
        }
        console.log("update");
};

//@constructor: Reset player to starting position
Player.prototype.reset = function() {
	this.x = 200;
    this.y = 400;
};

// Now instantiate your objects.

//@param: Place all enemy objects in an array called allEnemies
var allEnemies = [];

// @description:Position "y" where the enemies are created
var enemyPosition = [60, 140, 220, 220, 140, 60];
var player = new Player(200, 380, 50);
var enemy;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});
// @param:  Place the player object in a variable called player
var player = new Player();


// @description: This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});