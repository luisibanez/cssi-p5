let drops

let dropSizeRange
let dropSpeedMin, dropSpeedMax

function setup() {
  createCanvas(500, 500)
  colorMode(HSB, 100);

  dropSizeRange = 10
  
  dropSpeedMin = 5
  dropSpeedMax = 10
  
  drops = []
  
  for (let i = 0; i < 50; i++) {
    drops.push(new RainDrop())
  }
}

function draw() {
  background(0, 0, 95)
  
  for (let i = 0; i < drops.length; i++ ) {
    drops[i].drip()
    drops[i].show()
  }
}

class RainDrop {
  
  constructor() {
    this.x = random(width)
    this.y = random(height)
    this.d = random(dropSizeRange)
    this.fallSpeed = random(dropSpeedMin, dropSpeedMax)
  }
  
  show() {
    noStroke()
    fill(60, 80, 80)
    ellipse(this.x, this.y, this.d)
    triangle(this.x - this.d/2, this.y, this.x + this.d/2, this.y, this.x, this.y-this.d)
  }
  
  drip() {
    this.y += this.fallSpeed
    if (this.y >= height) {
      this.y = 0
      this.x = random(width)
    }
  }
}