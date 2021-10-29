// A 2D list to store the tiles for the game board
let level = [];
// Stores the images
let tile, movingTile, player, redGhost, blueGhost, yellowGhost, pinkGhost;

let tileSize;

function preload() {
  tile = loadImage('assets/Tiles/tile.png');
  movingTile = loadImage('assets/Tiles/movingTile.png');
  pacXonImg = loadImage('assets/pacXon.gif');
  redGhost = loadImage('assets/Enemies/red-ghost.png');
  blueGhost = loadImage('assets/Enemies/blue-ghost.png');
  yellowGhost = loadImage('assets/Enemies/yellow-ghost.png');
  pinkGhost = loadImage('assets/Enemies/pink-ghost.png');
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

  //declare a new player
  player = new Player();
  ghost = new Ghost();


}

function draw(){

  background(0);
  drawLevel();

  player.display();
  player.move();
  ghost.display();

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
  // console.log("tile at ", x, y, "is", level[y][x]);
  return level[y][x];
}

function modifyTile(x,y) {
  x = int(x/tileSize);
  y = int(y/tileSize);
  // console.log("tile at ", x, y, "is", level[y][x]);
  level[y][x] = -1;
}

//class to draw player
class Player {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.startMovingRight = false;
    this.startMovingDown = false;
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

    if (keyIsPressed == true && keyCode == 68){
      // while(this.x != width && keyCode != 68){
        this.currKeyCode = 68;

        console.log(this.currKeyCode == 68)
        // while (this.currKeyCode == 68 || this.x >= width) {
        //   this.x +=3;
        // }
    }

    if (keyIsPressed == true && keyCode == 65){
      // while(this.x != width && keyCode != 68){
        this.currKeyCode = 65;

        if (this.currKeyCode == 65) {
          this.x -=3;
        }
    }
      // }
      // ellipse(this.sensorRight, this.middleY,5,5)
      // let id = getTile(this.sensorRight,this.middleY);
      // if (id == 0){
      //   // modifyTile(this.sensorRight,this.middleY)
      //   this.startMovingDown = false;
      //   this.startMovingRight = true;
      // }
      // else if(id ==1){
      //     this.x +=3;
      // }
      this.x = constrain(this.x, 0, width-20);
      this.y = constrain(this.y, 0, height-20);

  // }

    }
  }

    // if (keyIsDown(65)){
    //   ellipse(this.sensorLeft, this.middleY,5,5);
    //   let id = getTile(this.sensorLeft,this.middleY);
    //   if (id == 0){
    //     modifyTile(this.sensorLeft,this.middleY)
    //   }
    //   else if(id ==1){
    //       this.x -=3;
    //   }
    // }

    // else if (keyIsDown(87)){
    //   ellipse(this.middleX, this.sensorTop,5,5);
    //   let id = getTile(this.middleX, this.sensorTop);
    //   if (id == 0){
    //     modifyTile(this.middleX, this.sensorTop)
    //   }
    //   else if(id ==1){
    //       this.y -=3;
    //   }
    // }

    // else if (keyIsDown(83)){
    //   ellipse(this.middleX, this.sensorBottom,5,5);
    //   let id = getTile(this.middleX, this.sensorBottom);
    //   if (id == 0){
    //     modifyTile(this.middleX, this.sensorBottom);
    //     this.startMovingRight = false;
    //     this.startMovingDown = true;
    //   }
    //   else if(id ==1){
    //       this.y +=3;
    //   }
    // }
    // // Continously Move Right
    // if (this.startMovingRight == true){
    //   this.x+=3;
    //   ellipse(this.sensorRight, this.middleY,5,5)
    //   let id = getTile(this.sensorRight,this.middleY);
    //   if (id == 0){
    //     modifyTile(this.sensorRight,this.middleY)
    //   }
    // }
    
    // // Continously Move Down
    // if (this.startMovingDown == true){
    //   this.y+=3;
    //   ellipse(this.middleX, this.sensorBottom,5,5)
    //   let id = getTile(this.middleX, this.sensorBottom);
    //   if (id == 0){
    //     modifyTile(this.middleX, this.sensorBottom)
    //   }
    // }

// }

class Ghost {
  constructor(){
    this.x = random(20, width-20);
    this.y = random(20, height-20);
  }

  display(){
    image(redGhost, 40, 90, 20,20);
    image(blueGhost, 660, height-40, 20,20);
    image(yellowGhost, 203, 200, 20,20);
    image(pinkGhost, 32, 304, 20,20);

  }
}
