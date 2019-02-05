const coeff = 0.05, 
      fontSize = 14,
      totalWidth = 600,
      totalHeight = 600,
      xFont = fontSize*0.8,
      yFont = fontSize*1.33,
      sqaureSize = 16*fontSize,
      leftWall = (totalWidth - sqaureSize) / 2,
      xAnchor = leftWall + 12*xFont,
      upperWall = (totalHeight - sqaureSize) / 2, 
      yAnchor = upperWall + 12*yFont;

var xCoord = xAnchor,
    yCoord = yAnchor,
    isAnchored = true;

function setup() {
  cnv = createCanvas(totalWidth, totalHeight);
  cnv.position((windowWidth - width)/2, (windowHeight - height)/2);
  textSize(fontSize);
}

function draw() {
  background(255);
  updateTriangle(mouseX, mouseY);
  renderTriangel();
  renderSquare();
}

function mousePressed() {
  isAnchored = !isAnchored;
}

function updateTriangle (x, y){
  let targetX = isAnchored ? xAnchor : x;
  let targetY = isAnchored ? yAnchor : y;
  xCoord += (targetX - xCoord) * coeff;
  yCoord += (targetY - yCoord) * coeff;
}

function renderTriangel(){
  for(j = 0; j < 16; j++){
    for(i = 0; i < 16 - j; i++){
      x = xCoord - i*xFont;
      y = yCoord - j*yFont;
      letter = isInSquare(x, y) ? ' ' : 'e';
      text(letter, x, y);
    }
  }
}

function renderSquare(){
  for(let i = 0; i < 20; i++){
    for(let j = 0; j < 12; j++){
      x = leftWall + i*xFont;
      y = upperWall + j*yFont;
      letter = isInTriangle(x, y) ? 'ö' : 'o';
      text(letter, x, y);
    }
  }
}

function isInTriangle(x, y){
  let x1 = xCoord - 16*xFont,
      y1 = yCoord,
      x2 = xCoord,
      y2 = yCoord - 16*yFont;
     
  if(    x < xCoord + xFont/2
      && y < yCoord
      && 1 < (x - x1)/0.8 + (y - y1)/1.33 )
    {
      return true;
    } else {
      return false;
    }
}

function isInSquare(x, y){
  if(    x > leftWall - xFont/2  
      && x < leftWall + sqaureSize
      && y > upperWall - yFont/2
      && y < upperWall + sqaureSize - yFont/2)
     {
       return true;
     } else {
       return false;
     }
}