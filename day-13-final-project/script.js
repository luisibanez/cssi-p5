//
//  Basic Simulation of the SIR epidemiological model
//
//  https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology#The_SIR_model
//
//  Click with the mouse, to start an outbreak.
//

let spreadRadius
let numberOfInfected
let numberOfSucceptible
let numberOfRecovered
let maxStepLength
let maxRecoveryTime

function setup() {
  createCanvas(500, 500)
  colorMode(HSL, 360, 100, 100)
  
  // 1 frame is simulating one hour of real time
  // 24 frames (one second) is simulating one day of real time
  frameRate(24)  
  
  spreadRadius = 100
  maxStepLength = 5
  
  maxRecoveryTime = 6 * 7 * 24 // 6 weeks
  minRecoveryTime = 2 * 7 * 24 // 6 weeks
  
  numberOfSucceptible = 500
  numberOfInfected = 0
  numberOfRecovered = 0
  
  creatures = []
  for (let i = 0; i < numberOfSucceptible; i++) {
    creatures.push(new Creature())
  }
}

function draw() {
  background(0, 0, 0) 
  
  checkCollisions();
  drawCreatures();
  drawStatusBoard();
}

function drawCreatures() {
  for (let i = 0; i < creatures.length; i++) {
    creatures[i].timeTick()
    creatures[i].randomStep()
    creatures[i].show()
  }
}

function mousePressed() {
  for (let i = 0; i < creatures.length; i++) {
    let hit = collideCircleCircle(mouseX, mouseY, spreadRadius, creatures[i].x, creatures[i].y, creatures[i].size);
    if (hit){
      creatures[i].exposeToInfection();
    }
  }
}

function drawStatusBoard() {
  fill(200, 80, 80);
  rect(0, 0, width, 25)
  fill(0, 80, 80);
  rect(0, 25, width, 35)
  
  fill(0, 0, 0);
  text(`https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology#The_SIR_model`, 20, 15); 
  let nextLine = 45
  text(`Succeptible: ${numberOfSucceptible}`, 20, nextLine);
  text(`Infected: ${numberOfInfected}`, 220, nextLine);
  text(`Recovered: ${numberOfRecovered}`, 400, nextLine);
}

class Creature {
  constructor() {
    this.x = random(width)
    this.y = random(height)
    this.size = 5
    this.state = 'S'
    this.timeToRecover = 0
  }
  
  show() {
    switch (this.state) {
      case 'S':
        fill(100, 80, 70);
        break;
      case 'I':
        fill(0, 80, 70);
        break;
      case 'R':
        fill(200, 80, 70);
        break;        
    }
    
    noStroke()
    ellipse(this.x, this.y, this.size)
  }
  
  randomStep() {
    const direction = floor(random(4));
    const stepLength = floor(random(maxStepLength));
    switch(direction) {
      case 0:
        this.x += stepLength;
        break;
      case 1:
        this.x -= stepLength;
        break;
      case 2:
        this.y += stepLength;
        break;
      case 3:
        this.y -= stepLength;
        break;        
    }
  }
  
  timeTick() {
    if (this.isInfected()) {
      this.timeToRecover -= 1
      if (this.timeToRecover < 0) {
        numberOfRecovered += 1
        numberOfInfected -=1
        this.setToRecovered()
      }
    }
    
  }
  
  isInfected() {
    return (this.state === 'I')
  }
  
  isSucceptible() {
    return (this.state === 'S')
  }
  
  setToInfected() {
    this.state = 'I'
    this.timeToRecover = random(minRecoveryTime, maxRecoveryTime);
  }
  
  setToRecovered() {
    this.state = 'R'
  }
  
  exposeToInfection() {
    if (this.isSucceptible()) {
      numberOfSucceptible -= 1
      numberOfInfected +=1
      this.setToInfected()
    }
  }
}

function checkCollisions() {
   for (let i = 0; i < creatures.length-1; i++) {
     for (let j = i+1; j < creatures.length; j++) {
        checkCollision(creatures[i], creatures[j]);
    }
  }
}

function checkCollision(creature1, creature2) {  
  let hit = collideCircleCircle(creature1.x, creature1.y, creature1.size, creature2.x, creature2.y, creature2.size);
  if (hit){
    handleCollision(creature1, creature2)
  }
}

function handleCollision(creature1, creature2) {
  if (creature1.isInfected()) {
    creature2.exposeToInfection();
    return;
  } 
  if (creature2.isInfected()) {
    creature1.exposeToInfection();
    return;
  } 
}