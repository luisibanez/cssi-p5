let backgroundColor, playerSnake, currentApple, score

function setup() {
  createCanvas(400, 400)
  colorMode(HSB, 360, 100, 100)
  backgroundColor = 95
  frameRate(12)
  playerSnake = new Snake()
  currentApple = new Apple()
  score = 0
}

function draw() {
  background(backgroundColor)
  
  playerSnake.moveSelf()
  playerSnake.showSelf()
  playerSnake.checkCollisions()
  playerSnake.checkApples(currentApple)

  currentApple.showSelf()
  
  displayScore()
}

function displayScore() {
  fill(0)
  text(`Score: ${score}`, 20, 40)
}

class Apple {
  constructor() {
    this.x = random(width)
    this.y = random(height)
    this.size = 15
    this.color = 0  // Red
  }
  
  showSelf() {
    fill(this.color, 80, 80)
    noStroke()
    ellipse(this.x, this.y, this.size)
  }
}

class TailSegment {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.size = 15
    this.color = 100  // Red
  }
  
  showSelf() {
    fill(this.color, 80, 80)
    noStroke()
    ellipse(this.x, this.y, this.size)
  }    
}

class Snake {
  constructor() {
    this.size = 10
    this.x = width/2
    this.y = height - 10
    this.direction = 'N'
    this.speed = 12
        
    let headX = this.x + this.size / 2
    let headY = this.y + this.size / 2
    this.tail = [new TailSegment(headX,headY)]
  }
    
  extendTail() {
    let lastTailSegment = this.tail[this.tail.length - 1]
    this.tail.push(new TailSegment(lastTailSegment.x, lastTailSegment.y))
  }
  
  moveSelf() {      
    let headX = this.x + this.size / 2
    let headY = this.y + this.size / 2
    this.tail.unshift(new TailSegment(headX,headY))    
    this.tail.pop()
    if (this.direction === "N") {
      this.y -= this.speed
    } else if (this.direction === "S") {
      this.y += this.speed
    } else if (this.direction === "E") {
      this.x += this.speed
    } else if (this.direction === "W") {
      this.x -= this.speed
    }
  }
  
  
  showSelf() {
    stroke(240, 100, 100)
    noFill()
    rect(this.x, this.y, this.size, this.size)
    noStroke()
    for (let i = 0; i < this.tail.length; i++) {
      this.tail[i].showSelf()
    }
  }
  
  checkApples(apple) {
    let hit = collideRectCircle(this.x, this.y, this.size, this.size, apple.x, apple.y, apple.size)
    if (hit) {
      score += 1
      currentApple = new Apple()
      this.extendTail()
    }
  }
  
  checkCollisionWithTailSegment(tailSegment) {
    let hit = collideRectCircle(this.x, this.y, this.size, this.size, tailSegment.x, tailSegment.y, tailSegment.size)
    return hit
  }
  
  checkCollisions() {
    for (let i = 1; i < this.tail.length; i++) {
      if (this.checkCollisionWithTailSegment(this.tail[i])) {
        gameOver()
      }    
    }
  }

}

function keyPressed() {
  console.log("key pressed: ", keyCode)
  if (keyCode === UP_ARROW && playerSnake.direction != 'S') {
    playerSnake.direction = "N"
  } else if (keyCode === DOWN_ARROW && playerSnake.direction != 'N') {
    playerSnake.direction = "S"
  } else if (keyCode === RIGHT_ARROW && playerSnake.direction != 'W') {
    playerSnake.direction = "E"
  } else if (keyCode === LEFT_ARROW && playerSnake.direction != 'E') {
    playerSnake.direction = "W"
  } else if (keyCode === ENTER ) {
    restartGame()
  } else {
    console.log("wrong key")
  }
}


function restartGame() {
  text(`NEW GAME`, width/2 - 40, height/2)
  playerSnake = new Snake()
  currentApple = new Apple()
  score = 0
  loop()
}

function gameOver() {
  text(`GAME OVER`, width/2 - 40, height/2)
  noLoop()
}
