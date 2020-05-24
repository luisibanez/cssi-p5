let backgroundColor, shperePosition, rectPosition

function setup() {
  createCanvas(500, 400)
  colorMode(HSB, 360, 100, 100)
  backgroundColor = 95
  
  // this variable contains a JSON object
  spherePosition = {
    x: 100,
    y: 100
  }
  
  rectPosition = {
    x: 200,
    y: 300
  }
}

function draw() {
  background(backgroundColor);
  ellipse(spherePosition.x, spherePosition.y, 20, 20)
  rect(rectPosition.x, rectPosition.y, 20, 20)
  line(spherePosition.x, spherePosition.y, rectPosition.x, rectPosition.y)
  
  let distance1 = computeDistance(spherePosition, rectPosition)
  console.log("distance %d", distance1)
  text(`The circle and sphere are ${round(distance1)} units apart.`, 20, 20)
  
  let mousePosition = {
    x: mouseX,
    y: mouseY
  }

  let distance2 = computeDistance(spherePosition, mousePosition)
  let category = computeCategoryOfDistance(spherePosition, mousePosition)
  
  console.log("distance %d", distance2)
  text(`The circle and mouse are ${round(distance2)} units apart. You are ${category}`, 20, 40)
}

function mousePressed() {
  spherePosition.x = random(width)
  spherePosition.y = random(height)
  
  // rectPosition.x = random(width)
  // rectPosition.y = random(height)
}

function computeDistance(p1, p2) {
  let deltaX = p1.x - p2.x
  let deltaY = p1.y - p2.y
  let distance = sqrt( (deltaX ** 2) + (deltaY ** 2))
  return distance
  // return dist(p1.x, p1.y, p2.x, p2.y); 
}

function computeCategoryOfDistance(point1, point2) {
  let distance = computeDistance(point1, point2)
  if (distance > 200) {
    backgroundColor =  color(240, 10, 100)
    return "cold"
  } else if (distance > 50) {
    backgroundColor =  color(120, 10, 100)
    return "warmer"
  } else {
    backgroundColor = color(0, 10, 100)
    return "red hot"
  }
}