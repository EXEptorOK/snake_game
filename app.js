spid = 100;
                let direction = "right";

                let canvas = document.getElementById("cv");
                let ctx = canvas.getContext("2d");
                canvas.height = window.innerHeight - 15;
                canvas.width = canvas.height;

                let apple = {
                    col: 0,
                    row: 0,
                    generating () {
                        apple.col = Math.floor(Math.random() * 15);
                        apple.row = Math.floor(Math.random() * 15);
                    },
                    draw(){
                        ctx.fillStyle = "red";
                        ctx.fillRect(apple.col * 15, apple.row * 15, 15, 15);
                    }
                }
                    
                class Block {
                    constructor(col, row, size){
                        this.col = col;
                        this.row = row;
                        this.size = size;
                    }
                    draw() {
                        ctx.fillStyle = "green";
                        ctx.fillRect(this.col * this.size, this.row * this.size, this.size, this.size);
                    }
                }
                let snake = [new Block(2, 0, 15), new Block(1, 0, 15), new Block(0, 0, 15)];


                apple.generating();
                apple.draw();
                snake[0].draw();

                let keys = {};

                document.addEventListener("keydown", function (event) {
                    keys[event.key] = true;
                });

                document.addEventListener("keyup", function (event) {
                    keys[event.key] = false;
                });


                function changeDirection () {
                    if (keys["w"] && direction != "down") {
                        direction = "up";
                    }
                    if (keys["a"]  && direction != "right") {
                        direction = "left";
                    }
                    if (keys["s"]  && direction != "up") {
                        direction = "down";
                    }
                    if (keys["d"] && direction != "left") {
                        direction = "right";
                    }
                }
                
                function moveHead () {
                    if (direction == "up") {
                        snake[0].row--;
                    }
                    if (direction == "left") {
                        snake[0].col--;
                    }
                    if (direction == "down") {
                        snake[0].row++;
                    }
                    if (direction == "right") {
                        snake[0].col++;
                    }
                }

                function eat () {
                    if (snake[0].col == apple.col && snake[0].row == apple.row) {
                        while (checkFoodCollision() == true) {
                            apple.generating();
                        }
                        snake.push(new Block(-1, -1, snake[0].size));
                        clearInterval(gameplay);
                        spid /= 1.05;
                        gameplay = setInterval(game, spid);
                    }
                }

                function moveBody () {
                    for (let i = snake.length-1; i > 0; i--) {
                        snake[i].row = snake[i-1].row;
                        snake[i].col = snake[i-1].col;
                    }
                }

                function drawCells () {
                    for (let x = 0; x < canvas.width/15; x++) {
                        ctx.beginPath();
                        ctx.moveTo(x * 15, 0);
                        ctx.lineTo(x * 15, canvas.width);
                    }
                    for (let y = 0; y < canvas.width/15; y++) {
                        ctx.beginPath();
                        ctx.moveTo(0, y * 15);
                        ctx.lineTo(y * 15, canvas.height);
                    }
                }

                function lose () {
                    if (snake[0].col < 0) {
                        snake[0].col++;
                        afterGame();
                    }
                    if (snake[0].col > (canvas.width/15)) {
                        snake[0].col--;
                        afterGame();
                    }
                    if (snake[0].row < 0) {
                        snake.col++;
                        afterGame();
                    }
                    if (snake[0].row > (canvas.width/15)) {
                        afterGame();
                    }
                    for (let i = 1; i < snake.length; i++) {
                        if (snake[0].col == snake[i].col && snake[i].row == snake[0].row) {
                            afterGame();
                        }
                    }
                }

                function checkFoodCollision() {
                    for (let i = 0; i < snake.length; i++) {
                        if (apple.row == snake[i].row && apple.col == snake[i].col){
                            return true;
                        }
                    }
                    return false;
                }
                    
                function game() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    drawCells();
                    moveBody();
                    moveHead();
                    for (let i = 0; i < snake.length; i++) {
                        snake[i].draw();
                    }
                    apple.draw();
                    eat();
                    lose();
                }

                function rotate () {
                    changeDirection();
                }



                function afterGame() {
                    clearInterval(gameplay);
                    clearInterval(rot);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    alert("КАКОЙ ЖЕ ТЫ СЛАБЫЙ!!!!!!!!");
                    startGame = confirm("Ты хочешь поиграть еще?");
                    if (startGame == true) {   
                        location.reload();
                    }
                    else {
                        location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
                    }
                }
                
                let gameplay = setInterval(game, spid);
                let rot = setInterval(rotate, 5);
