function setup() {
  cw = 600;
  ch = 500;

  logoWidth = 200;
  logoHeight = 150;

  createCanvas(cw, ch);
  dvdImage = loadImage(
    "https://cdn.glitch.com/eaea72a4-ac6d-4777-b76e-f37d75959aa5%2Fdvd.jpeg?1515761833387"
  );

  x = 0;
  y = 0;

  masterVelocity = 6
  
  xVelocity = masterVelocity;
  yVelocity = masterVelocity;
}

function draw() {
  background(220);
  image(dvdImage, x, y, logoWidth, logoHeight);

  x += xVelocity;
  y += yVelocity;

  if ((x > width - logoWidth) || (x < 0)) {
    xVelocity = -xVelocity
  }

  if ((y > height - logoHeight) || (y < 0)) {
    yVelocity = -yVelocity
  }
}
