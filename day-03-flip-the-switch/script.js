let backgroundColor, color1, color2, textColor

let globalS
let globalB

function setup() {
  // Canvas and color settings
  createCanvas(400, 400)
  colorMode(HSB, 360, 100, 100)
  noStroke()
  
  globalS = 80
  globalB = 80
  
  // 0-100 is greyscale in HSB.
  backgroundColor = color(95)
  textColor = color(20)
  
  color1 = color(0, globalS, globalB)
  color2 = color(200, globalS, globalB)
}

function draw(){
  background(backgroundColor)
  drawCenterLine();
  
  if (mouseX > width / 2) {
    nightMode()
  } else {
    dayMode()
  }
    
  fill(color1)
  ellipse(width * 1/4, height/2, 50)
  fill(color2)
  ellipse(width * 3/4, height/2, 50)
  
  fill(textColor)
  
  text("Flip the switch", 20, 20)
  ellipse(mouseX, mouseY, 50)
  
  
}

function drawCenterLine(){
  stroke(textColor)
  line(width/2, 0, width/2, height)
  noStroke()
}

function nightMode() {
  backgroundColor = color(95)
  color1 = color(0, globalS, globalB)
  color2 = color(200, globalS, globalB)
  textColor = color(20)
}

function dayMode() {
  backgroundColor = color(20)
  color1 = color(200, globalS, globalB)
  color2 = color(0, globalS, globalB)  
  textColor = color(95)  
}