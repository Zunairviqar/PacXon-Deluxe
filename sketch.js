// A 2D list to store the tiles for the game board
let level = [];
// Stores the images
let tile, movingTile, player;
let tileSize;

function preload() {
  tile = loadImage('assets/Tiles/tile.png');
  movingTile = loadImage('assets/Tiles/movingTile.png');
  pacXonImg = loadImage('assets/pacXon.gif');
}

function setup() {

  createCanvas(760,500);
  tileSize = 20;

  let rows = []

  // The following for loops populate the 2D list, level, dynamically and leaves it blank
  for (let i = 0; i < height/20; i++){
    rows = []
    for (let j =0; j < width/20; j++){
      rows.push(0);
    }
    level.push(rows)
  }

  // The following block populates the fixed borders of the board
  for (let i=0; i < height/20; i++){
    for (let j=0; j < width/20; j++){
      if (i == 0 || i == height/20-1 || j == 0 || j == width/20-1 ){
        level[i][j] = 1;
      }
    }
  }

  player = new Player();

}

function draw(){

  background(0);
  drawLevel();

  player.display();
  player.move();
}

// function to draw the tiles
function drawLevel() {
  for (let r = 0; r < level.length; r++) {
    for (let c = 0; c < level[r].length; c++) {
      if(level[r][c] == 1){
        image(tile,c*20,r*20,20,20);
      }
      if(level[r][c] == -1){
        image(movingTile,c*20,r*20,20,20);
      }
    }
  }
}
function getTile(x,y) {
  x = int(x/tileSize);
  y = int(y/tileSize);
  console.log("tile at ", x, y, "is", level[y][x]);
  return level[y][x];
}
function modifyTile(x,y) {
  x = int(x/tileSize);
  y = int(y/tileSize);
  console.log("tile at ", x, y, "is", level[y][x]);
  level[y][x] = -1;
}

//class to draw player
class Player {
  constructor(){
    this.x = 0;
    this.y = 0;
  }
  display(){
    image(pacXonImg, this.x, this.y, 20,20)
  }
  move(){
    // set up sensor positions
    this.sensorLeft = this.x-2;
    this.sensorRight = this.x+tileSize+2;
    this.sensorTop = this.y-2;
    this.sensorBottom = this.y+tileSize+2;
    this.middleX = this.x+tileSize/2;
    this.middleY = this.y+tileSize/2;

    if (keyIsDown(68)){
      ellipse(this.sensorRight, this.middleY,5,5)
      let id = getTile(this.sensorRight,this.middleY);
      if (id == 0){
        modifyTile(this.sensorRight,this.middleY)
      }
      this.startMoving = true;
    }

    else if (keyIsDown(65)){
      ellipse(this.sensorLeft, this.middleY,5,5);
      let id = getTile(this.sensorLeft,this.middleY);
      if (id == 0){
        modifyTile(this.sensorLeft,this.middleY)
      }
      this.startMoving = true;
    }

    else if (keyIsDown(87)){
      ellipse(this.middleX, this.sensorTop,5,5);
      let id = getTile(this.middleX, this.sensorTop);
      if (id == 0){
        modifyTile(this.middleX, this.sensorTop)
      }
      this.startMoving = true;
    }

    else if (keyIsDown(83)){
      ellipse(this.middleX, this.sensorBottom,5,5);
      let id = getTile(this.middleX, this.sensorBottom);
      if (id == 0){
        modifyTile(this.middleX, this.sensorBottom)
      }
      this.startMoving = true;
    }

    if (this.startMoving = true){
      this.x +=3;
    }

    this.x = constrain(this.x, 0, width-20)
    this.y = constrain(this.y, 0, height-20)


  }

}
