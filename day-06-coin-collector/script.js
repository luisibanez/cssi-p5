let brushHue, backgroundColor, coinX, coinY, score, time, gameIsOver, hit

function setup() {
  createCanvas(400, 400)
  colorMode(HSB, 360, 100, 100)
  brushHue = 0
  backgroundColor = 95
  coinX = random(width)
  coinY = random(height)
  time = 1000
  score = 0
  gameIsOver = false
}

function draw() {
  background(backgroundColor)
  ellipse(coinX, coinY, 20)
  ellipse(mouseX, mouseY, 20)
  
  text(`Time remaining: ${time}`, 20, 40)
  text(`Hit: ${hit}`, 20, 60)
  text(`Score: ${score}`, 20, 80)
  
  handleTime()
  
  hit = collideCircleCircle(coinX, coinY, 20, mouseX, mouseY, 20)
  if (hit){
    handleCollision()
  }

}

function handleCollision(){
  if (!gameIsOver){
    score += 1
    coinX = random(width)
    coinY = random(height)
  }
  
}

function handleTime(){
  if (time > 0 ){
    time -= 1
  }
  else {
    gameIsOver = true
    text(`GAME IS OVER`, width/2, height/2)
  }
    
}