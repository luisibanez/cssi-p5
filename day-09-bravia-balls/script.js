let dots

let dotSizeMin
let dotSizeMax
let dotSpeedMin
let dotSpeedMax


function setup(){
  createCanvas(windowWidth - 20, windowHeight - 20)
  colorMode(HSL, 360, 100, 100)

  dotSizeMin = 5
  dotSizeMax = 12
  
  dotSpeedMin = 3
  dotSpeedMax = 10

  dots = []
  for (let i = 0; i < 200; i++) {
    dots.push(new BouncyDot())
  }
}

function draw() {
  background(220, 0, 80)  
  for (let i=0; i<dots.length; i++) {
    dots[i].float()
    dots[i].display()
  }  
}

function mousePressed() {
  console.log(dots[0].x)
}

class BouncyDot {
  
  constructor() {

    this.x = random(width)
    this.y = random(height)
    
    this.r = random(dotSizeMin, dotSizeMax)
    
    this.color = random(360)
    
    this.masterXvelocity = random(dotSpeedMin, dotSpeedMax)
    this.masterYvelocity = random(dotSpeedMin, dotSpeedMax)
    
    this.xVelocity = this.masterXvelocity
    this.yVelocity = this.masterYvelocity
  }
  
  float() {
    this.x += this.xVelocity
    this.y += this.yVelocity
    
    if (this.x + this.r > width) {
      this.xVelocity = -this.masterXvelocity
    }
    if (this.x - this.r < 0) {
      this.xVelocity = this.masterXvelocity
    }
    if (this.y + this.r > height) {
      this.yVelocity = -this.masterYvelocity
    }
    if (this.y - this.r < 0) {
      this.yVelocity = this.masterYvelocity
    }
  }
  
  display() {
    fill(this.color, 80, 70)
    noStroke()
    ellipse(this.x, this.y, this.r * 2)
  }
}