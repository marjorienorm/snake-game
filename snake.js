// Get the canvas element and its context
var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');

// Define the size of the box that represents the snake and food
var box = 20;

// Initialize the snake as an array of objects
var snake = [];
snake[0] = { x: 10 * box, y: 10 * box };

// Initialize the food at a random position
var food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};

// Initialize the obstacles as an array of objects
var obstacles = [
    { x: 5 * box, y: 7 * box },
    { x: 8 * box, y: 12 * box },
    { x: 13 * box, y: 15 * box },
];

// Initialize the score
var score = 0;

// Variable to store the direction of the snake
var d;

// Event listener for the arrow keys
document.addEventListener('keydown', direction);

// Function to update the direction based on the key pressed
function direction(event) {
    if (event.keyCode == 37 && d != 'RIGHT') {
        d = 'LEFT';
    } else if (event.keyCode == 38 && d != 'DOWN') {
        d = 'UP';
    } else if (event.keyCode == 39 && d != 'LEFT') {
        d = 'RIGHT';
    } else if (event.keyCode == 40 && d != 'UP') {
        d = 'DOWN';
    }
}

// Function to draw the snake, food, and obstacles
function draw() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    for (var i = 0; i < snake.length; i++) {
        context.fillStyle = (i == 0) ? 'green' : 'white';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw the food
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box);

    // Draw the obstacles
    for (var i = 0; i < obstacles.length; i++) {
        context.fillStyle = 'gray';
        context.fillRect(obstacles[i].x, obstacles[i].y, box, box);
    }

    // Store the current head position
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    // Update the position of the head based on the direction
    if (d == 'LEFT') snakeX = (snakeX - box < 0) ? canvas.width - box : snakeX - box;
    if (d == 'UP') snakeY = (snakeY - box < 0) ? canvas.height - box : snakeY - box;
    if (d == 'RIGHT') snakeX = (snakeX + box >= canvas.width) ? 0 : snakeX + box;
    if (d == 'DOWN') snakeY = (snakeY + box >= canvas.height) ? 0 : snakeY + box;


    // Check if the snake has eaten the food
    if (snakeX == food.x && snakeY == food.y) {
        // Increase the score
        score++;
        document.getElementById('score').innerHTML = 'Score: ' + score;
        // Generate new food position
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box
        };
    } else {
        // Remove the tail of the snake
        snake.pop();
    }

    // Check for collisions with the obstacles
    for (var i = 0; i < obstacles.length; i++) {
        if (snakeX == obstacles[i].x && snakeY == obstacles[i].y) {
            clearInterval(game);
        }
    }

    // Create the new head position
    var newHead = {
        x: snakeX,
        y: snakeY
    };

    // Game over rules
    if (snakeX < 0 || snakeY < 0 || snakeX > 19 * box || snakeY > 19 * box || collision(newHead, snake)) {
        clearInterval(game);
    }

    // Add the new head to the snake
    snake.unshift(newHead);

    // Draw the score
    context.fillStyle = 'white';
    context.font = '45px Changa one';
    context.fillText(score, 2 * box, 1.6 * box);
}

// Function to check collision with the snake body
function collision(head, array) {
    for (var i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Call the draw function every 100 ms
var game = setInterval(draw, 100);