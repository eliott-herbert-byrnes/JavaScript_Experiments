// setup canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Ball Counter
const counter = document.querySelector("p");
let count = 0;
counter.textContent = `Ball count: ${count}`;

// Utility Functions
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Shape Base Class
class Shape {
    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
    }
}


// Ball creation class
class Ball extends Shape {
    constructor(x, y, velX, velY, color, size) {
        super(x, y, velX, velY);
        this.color = color;
        this.size = size;
        this.exists = true;
        // Incrementing ball count
        count++;
        counter.textContent = `Ball count: ${count}`;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();

    }

    update() {
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }

        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }

        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        for (const ball of balls) {
            if (!(this === ball) && ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                }
            }
        }
    }

}

// EvilCircle class
class EvilCircle extends Shape {
    constructor(x, y) {
        super(x, y, 20, 20);
    
        this.color = "white";
        this.size = 10;
    
        // Moves the EvilCircle using WASD keys.
        window.addEventListener('keydown', (e) => {
          switch(e.key) {
            case 'a':
              this.x -= this.velX;
              break;
            case 'd':
              this.x += this.velX;
              break;
            case 'w':
              this.y -= this.velY;
              break;
            case 's':
              this.y += this.velY;
              break;
          }
        });
      }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.lineWidth = 3;
    }

    checkBounds() {
        if (this.x - this.size < 0) {
            this.x = this.size;
        } else if (this.x + this.size > width) {
            this.x = width - this.size;
        }

        if (this.y - this.size < 0) {
            this.y = this.size;
        } else if (this.y + this.size > height) {
            this.y = height - this.size;
        }
    }

    collisionDetect() {
        for (const ball of balls) {
            if (ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.exists = false
                    // Decrementing ball count
                    count--;
                    counter.textContent = `Ball count: ${count}`;

                }
            }
        }
    }

}

// Ball Creation
// Ball array to store all the balls with random positions, velocities, colors and sizes
const balls = [];

while (balls.length < 25) {
    const size = random(10, 20);
    const ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size,
    );
    balls.push(ball);
}

//EvilCircle Creation
// Spawns the EvilCircle at a random position.
const evilBall = new EvilCircle(random(0, width), random(0, height));

// Game Loop
function loop() {
    ctx.fillStyle = "rgb(0 0 0 / 25%)";
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        if (ball.exists) {
            ball.draw();
            ball.update();
            ball.collisionDetect();
        }
    }

    evilBall.draw();
    evilBall.checkBounds();
    evilBall.collisionDetect();

    requestAnimationFrame(loop);
}


loop();
