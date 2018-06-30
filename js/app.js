class Entity {
  constructor() {
    this.sprite = 'img/';
    this.x = 2;
    this.y = 5;
  }

  update(dt) {
    this.isOutOfBoundsX = this.x > 5;
    this.isOutOfBoundsY = this.y < 1;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
  }

  checkCollisions(playerOrEnemy) {
    if (this.y === playerOrEnemy.y) {
      if (this.x >= playerOrEnemy.x - 0.5 && this.x <= playerOrEnemy.x + 0.5) {
        return true;
      }
    }
    else {
      return false;
    }
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Entity {
  constructor() {
    super();
    this.sprite += 'char-boy.png';
    this.moving = false;
    this.win = false;
  }

  update(dt) {
    super.update();
    if (this.isOutOfBoundsY && !this.moving && !this.win) {
      alert("Win");
      this.win = true;
    }
  }

  render() {
    super.render();
    this.moving = false;
    }
  }

  function handleInput(input) {
    switch (input) {
      case 'left':
          this.x = this.x > 0 ? this.x - 1 : this.x;
          break;
      case 'up':
          this.y = this.y > 0 ? this.y - 1 : this.y;
          break;
      case 'right':
          this.x = this.x < 4 ? this.x + 1 : this.x;
          break;
      case 'down':
          this.y = this.y < 5 ? this.y + 1 : this.y;
          break;
      default:
          break;
    }
    this.moving = true;
  }


// Enemies our player must avoid
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
class Enemy extends Entity {
  constructor(x, y) {
      super();
      this.sprite += 'enemy-bug.png';
      this.x = x;
      this.y = y;
  }

  update(dt) {
    super.update();
    if(this.isOutOfBoundsX) {
      this.x = -1;
    }
    else {
      this.x += dt;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [...Array(3)].map((_,i)=> new Enemy(0,i+1));
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
