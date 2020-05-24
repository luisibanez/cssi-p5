let brushHue, priorX, priorY, strokeW

function setup(){
  createCanvas(400, 400)
  colorMode(HSB, 360, 100, 100)
  brushHue = 0
  strokeW = 5
  strokeWeight(strokeW)
  background(95)
  priorX = 0
  priorY = 0
}

function draw(){
  chooseColors()
  if (mouseIsPressed){
    line(mouseX, mouseY, priorX, priorY)
  }
  priorX = mouseX
  priorY = mouseY
}

function chooseColors(){
  strokeWeight(strokeW)
  stroke(brushHue, 50, 80)
  fill(brushHue, 50, 80)
  brushHue += 5
  if (brushHue > 360){
    brushHue = 0
  }
  strokeW += 1
  if (strokeW > 15){
    strokeW = 0
  }
}

function keyPressed(){
  background(95)
}

// function mousePressed(){
//   ellipse(random(width), random(height), 30, 30)
// }