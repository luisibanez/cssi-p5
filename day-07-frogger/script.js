let backgroundColor, score, lives, gameIsOver

let car1X, car1Y, car1V
let car1W, car1H

let car2X, car2Y, car2V
let car2W, car2H

let frogX, frogY, frogSize
let frogHomeX, frogHomeY
let frogJumpSize

let goalX, goalY, goalW, goalH

function setup(){
  createCanvas(500, 500)
  colorMode(HSB, 360, 100, 100)
  backgroundColor = 95
  
  frogHomeX = width/2
  frogHomeY = height - 15
  frogX = frogHomeX
  frogY = frogHomeY
  frogSize = 20
  frogJumpSize = 30
  
  score = 0
  lives = 3
  gameIsOver = false
  
  car1X = random(width)
  car1Y = 100
  car1V = 5
  car1W = 40
  car1H = 30
  
  car2X = random(width)
  car2Y = 200
  car2V = 10
  car2W = 40
  car2H = 30
  
  goalX = 0
  goalY = 0
  goalW = width
  goalH = 50
}

function draw(){
  background(backgroundColor)
  
  // Code for gold goal line
  fill(60, 80, 80)
  rect(goalX, goalY, goalW, goalH)
  
  // Code to display Frog
  fill(120, 80, 80)
  ellipse(frogX, frogY, frogSize)
  moveCars()
  drawCars()
  checkCollisions()
  checkWin()
  displayScores()
}

function keyPressed() {
  if (gameIsOver) {
    console.log("Game over - user input ignored.")
  } else if (keyCode === UP_ARROW){
    frogY -= frogJumpSize
  } else if (keyCode === DOWN_ARROW){
    frogY += frogJumpSize
  } else if (keyCode === LEFT_ARROW){
    frogX -= frogJumpSize
  } else if (keyCode === RIGHT_ARROW){
    frogX += frogJumpSize
  }
}

function moveCars(){
  car1X += car1V
  if(car1X > width) {
    car1X = 0
  }
  
  car2X += car2V
  if(car2X > width) {
    car2X = 0
  }
}

function drawCars() {
  // Code for car 1
  fill( 0, 80, 80)
  rect(car1X, car1Y, car1W, car1H)
  // Code for additional cars
  fill(30, 80, 80)
  rect(car2X, car2Y, car2W, car2H)
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life
  hit =  collideRectCircle(car1X,car1Y,car1W,car1H,frogX,frogY,frogSize);
  hit |= collideRectCircle(car2X,car2Y,car2W,car2H,frogX,frogY,frogSize);
  
  if (hit){
    lives -= 1
    if (lives === 0 ){
      gameIsOver = true
    }
    frogX = frogHomeX
    frogY = frogHomeY
    console.log("Hit")
  }
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score and move the frog back down to the bottom.
  hit = collideRectCircle(goalX,goalY,goalW,goalH,frogX,frogY,frogSize);
  if (hit){
    score += 1    
    frogX = frogHomeX
    frogY = frogHomeY
    console.log("Score!")
    if (score === 5 ){
      gameIsOver = true
    }
  }
}

function displayScores() {
  textSize(12)
  fill(0)
  
  // Display lives
  text(`Lives: ${lives}`, 10, 20)
  if (lives >= 1) {
    ellipse(50, 16, 10, 10)
  }
  if (lives >= 2) {
    ellipse(65, 16, 10, 10)
  }
  if (lives >= 3) {
    ellipse(80, 16, 10, 10)
  }
  
  // Display Score
  text(`Score: ${score}`, width - 60, 20)
  
  // Display game over message if the game is over
  if( gameIsOver) {
    textSize(60)
    if (lives > 1) {
      text(`YOUR WIN!`, width/2 - 200, height / 2)
    } else {
      text(`GAME OVER!`, width/2 - 200, height / 2)
    } 
  }
}