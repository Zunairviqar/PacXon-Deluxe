// A 2D list to store the tiles for the game board
let level = [];
// Stores the images
let tile, movingTile, player, redGhost, blueGhost, yellowGhost, pinkGhost;

let tileSize;
let count = 0;

let c1 = 0;
let c2 = 0;

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

  resetLevel();

  //declare a new player
  player = new Player();
  ghost = new Ghost();


}

function draw(){

  background(0);
  drawLevel();
  // frameRate(30);
  player.display();
  player.move();
  ghost.display();
  ghost.move();

  // ghost.display();


}

function resetLevel() {
  // The following block populates the fixed borders of the board
  for (let i=0; i < height/20; i++){
    for (let j=0; j < width/20; j++){
      level[i][j] = 0;
      if (i == 0 || i == height/20-1 || j == 0 || j == width/20-1 ){
        level[i][j] = 1;
      }
    }
  }
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
  return level[y][x];
}
function getCoord(x,y) {
  x = int(x/tileSize);
  y = int(y/tileSize);
  return x,y;
}

function modifyTile(x,y) {
  x = int(x/tileSize);
  y = int(y/tileSize);
  level[y][x] = -1;
}

function solidTiles(){
  let maxRow = 0, maxCol=0;
  for (let r = 0; r < level.length; r++) {
    for (let c = 0; c < level[r].length; c++) {
      if(level[r][c] == -1){
        player.moving = 'stopped'
        maxRow = max(maxRow, r);
        maxCol = max(maxCol, c);
        level[r][c] = 1;
      }
    }
  }
}

//class to draw player
class Player {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.startMovingRight = false;
    this.startMovingDown = false;
    this.pKeyPress = 'None';
    this.moving = 'not moving';

    this.tile_beforeX1 = 0;
    this.tile_beforeY1 = 0;
    this.tile_beforeX2 = 0;
    this.tile_beforeY2 = 0;
  }

  display(){
    image(pacXonImg, this.x, this.y, 20,20)
  }

  move(){
    // set up sensor positions
    this.middleX = this.x+tileSize/2;
    this.middleY = this.y+tileSize/2;

    if (keyIsPressed==true){
      if (this.pKeyPress == 'None'){
        this.pKeyPress = keyCode;
      }
      else {
        if (this.pKeyPress != this.currKeyCode){
          this.pKeyPress = this.currKeyCode;
          let roundx = this.x%20

          if (roundx !=0){

            if (roundx > 10){
              this.x = this.x + (20 - roundx);
            }
            else if(roundx <= 10){
              this.x = this.x - roundx;
            }
          }

          let roundy = this.y%20

          if (roundy !=0){

            if (roundy > 10){
              this.y = this.y + (20 - roundy);
            }
            else if(roundy <= 10){
              this.y = this.y - roundy;
            }
          }
        }
        if (keyCode ==68) {
          this.currKeyCode = 68;
          this.moving = 'moving';
        }
        if (keyCode ==65) {
          this.currKeyCode = 65;
          this.moving = 'moving';
        }
        if (keyCode ==87) {
          this.currKeyCode = 87;
          this.moving = 'moving';
        }
        if (keyCode ==83) {
          this.currKeyCode = 83;
          this.moving = 'moving';
        }
      }

    }

    if (this.currKeyCode == 68 && this.x < width){
      this.x  += 400/60;
    }

    if (this.currKeyCode == 65 && this.x > 0){
      this.x  -= 400/60;
    }

    if (this.currKeyCode == 87 && this.y > 0){
      this.y  -= 400/60;
    }

    if (this.currKeyCode == 83 && this.y < height){
      this.y += 400/60;
    }

    let id = getTile(this.middleX, this.middleY);
    if (id == 0){
      modifyTile(this.middleX, this.middleY)
    }

    else if (id == 1) {
      solidTiles();
      if (this.moving == 'stopped'){
        this.moving = 'not moving';

        if(this.y >= height-20 || this.currKeyCode == 83){

          this.tile_beforeY1 = int(this.y/tileSize) - 2;
          this.tile_beforeX1 = int(this.x/tileSize) - 1;
          fill_array(level, this.tile_beforeY1, this.tile_beforeX1, 3, 0);
          c1 = count;
          fill_array(level, this.tile_beforeY1, this.tile_beforeX1, 0, 3);
          count = 0;

          this.tile_beforeY2 = int(this.y/tileSize) - 2;
          this.tile_beforeX2 = int(this.x/tileSize) + 1;
          fill_array(level, this.tile_beforeY2, this.tile_beforeX2, 3, 0);
          c2 = count;
          fill_array(level, this.tile_beforeY2, this.tile_beforeX2, 0, 3);
          count = 0;

          if(c1<c2){
            fill_array(level, this.tile_beforeY1, this.tile_beforeX1, 1, 0);
          }
          else{
            fill_array(level, this.tile_beforeY2, this.tile_beforeX2, 1, 0);
          }
        }

        if(this.y<=20 || this.currKeyCode == 87){
          console.log("break")
          this.tile_beforeY1 = int(this.y/tileSize) + 2;
          this.tile_beforeX1 = int(this.x/tileSize) - 1;
          console.log(this.tile_beforeY1, this.tile_beforeX1)
          fill_array(level, this.tile_beforeY1, this.tile_beforeX1, 3, 0);
          c1 = count;
          console.log(c1);
          fill_array(level, this.tile_beforeY1, this.tile_beforeX1, 0, 3);
          count = 0;

          this.tile_beforeY2 = int(this.y/tileSize) + 2;
          this.tile_beforeX2 = int(this.x/tileSize) + 1;
          console.log(this.tile_beforeY2, this.tile_beforeX2)
          fill_array(level, this.tile_beforeY2, this.tile_beforeX2, 3, 0);
          c2 = count;
          console.log(c2);
          fill_array(level, this.tile_beforeY2, this.tile_beforeX2, 0, 3);
          console.log(level)
          count = 0;

          if(c1<c2){
            fill_array(level, this.tile_beforeY1, this.tile_beforeX1, 1, 0);
          }
          else{
            fill_array(level, this.tile_beforeY2, this.tile_beforeX2, 1, 0);
          }
        }

        if(this.x<=20 || this.currKeyCode == 65){
          this.tile_beforeY1 = int(this.y/tileSize) - 1;
          this.tile_beforeX1 = int(this.x/tileSize) + 2;
          console.log(this.tile_beforeY1, this.tile_beforeX1)
          fill_array(level, this.tile_beforeY1, this.tile_beforeX1, 3, 0);
          c1 = count;
          console.log(c1);
          fill_array(level, this.tile_beforeY1, this.tile_beforeX1, 0, 3);
          count = 0;

          this.tile_beforeY2 = int(this.y/tileSize) + 1;
          this.tile_beforeX2 = int(this.x/tileSize) + 2;
          console.log(this.tile_beforeY2, this.tile_beforeX2)
          fill_array(level, this.tile_beforeY2, this.tile_beforeX2, 3, 0);
          c2 = count;
          console.log(c2);
          fill_array(level, this.tile_beforeY2, this.tile_beforeX2, 0, 3);
          console.log(level)
          count = 0;

          if(c1<c2){
            fill_array(level, this.tile_beforeY1, this.tile_beforeX1, 1, 0);
          }
          else{
            fill_array(level, this.tile_beforeY2, this.tile_beforeX2, 1, 0);
          }
        }

        if(this.x >= width-30 || this.currKeyCode == 68){
          console.log("LEFT")
          this.tile_beforeY1 = int(this.y/tileSize) - 1;
          this.tile_beforeX1 = int(this.x/tileSize) - 2;
          console.log(this.tile_beforeY1, this.tile_beforeX1)
          fill_array(level, this.tile_beforeY1, this.tile_beforeX1, 3, 0);
          c1 = count;
          console.log(c1);
          fill_array(level, this.tile_beforeY1, this.tile_beforeX1, 0, 3);
          count = 0;

          this.tile_beforeY2 = int(this.y/tileSize) + 1;
          this.tile_beforeX2 = int(this.x/tileSize) - 2;
          console.log(this.tile_beforeY2, this.tile_beforeX2)
          fill_array(level, this.tile_beforeY2, this.tile_beforeX2, 3, 0);
          c2 = count;
          console.log(c2);
          fill_array(level, this.tile_beforeY2, this.tile_beforeX2, 0, 3);
          console.log(level)
          count = 0;

          if(c1<c2){
            fill_array(level, this.tile_beforeY1, this.tile_beforeX1, 1, 0);
          }
          else{
            fill_array(level, this.tile_beforeY2, this.tile_beforeX2, 1, 0);
          }
        }

      }
    }
    this.x = constrain(this.x, 0, width-20);
    this.y = constrain(this.y, 0, height-20);

    }

  }


class Ghost {
  constructor(){
    this.x = random(20, width-20);
    this.y = random(20, height-20);
    this.speedX = random(1, 3);
    this.speedY = random(1, 3)
    this.graphic = random([redGhost, blueGhost, yellowGhost, pinkGhost]);
    // this.xNoiseOffset = random(0,1000);
    // this.yNoiseOffset = random(1000,2000);
  }

  display(){
    image(this.graphic, this.x, this.y, 20,20);
    // console.log("loser")
  }
  move() {

    // set up sensor positions
    this.sensorLeft = this.x-2;
    this.sensorRight = this.x+tileSize+2;
    this.sensorTop = this.y-2;
    this.sensorBottom = this.y+1;
    this.middleX = this.x+tileSize/2;
    this.middleY = this.y+tileSize/2;

    // check tile to the left
    ellipse(this.sensorLeft, this.middleY,5,5);
    let lid = getTile(this.sensorLeft,this.middleY);
    let rid = getTile(this.sensorRight,this.middleY);
    let uid = getTile(this.middleX, this.sensorTop);
    let bid = getTile(this.middleX, this.sensorBottom);
    console.log(lid)
    console.log(rid)
    console.log(uid)
    console.log(bid)

    if (uid == 1 
      || bid == 1) {
      this.speedY *= -1;

    }


    else if (lid == 1 
      || rid == 1 ) {
        this.speedX *= -1;
    }

    // //if ghost hits left or right
    // if (this.x <= 20 || this.x >= width-40) {
    //     this.speedX *= -1;
    // }

    // //if ghost hits top or bottom
    // if (this.y <= 20 || this.y >= height-40) {
    //     this.speedY *= -1;
    // }

    //detect collision
    if (dist(this.x, this.y, player.x, player.y) < 20) {
      player.x = 0;
      player.y = 0;
      resetLevel();
    }

    this.x += this.speedX;
    this.y += this.speedY;

    // // compute how much we should move
    // let xMovement = map( noise(this.xNoiseOffset), 0, 1, -2, 2);
    // let yMovement = map( noise(this.yNoiseOffset), 0, 1, -2, 2);

    // // update our position
    // this.x += xMovement;
    // this.y += yMovement;

    // // update our noise offset values
    // this.xNoiseOffset += 0.01;
    // this.yNoiseOffset += 0.01;
  }

}


function fill_array(level, r, c, newColor, current){
    //If row is less than 0
    if(r < 0){
        return;
    }

    //If column is less than 0
    if(c < 0){
        return;
    }

    //If row is greater than image length
    if(r > level.length){
        return;
    }

    //If column is greater than image length
    if(c > level[r].length){
        return;
    }

    //If the current pixel is not which needs to be replaced
    if(level[r][c] !== current){
        return;
    }

     //Update the new color
     level[r][c] = newColor;
     count = count + 1;
     // count = count + 1;
     // console.log(count);


     //Fill in all four directions
     //Fill Prev row
     fill_array(level, r - 1, c, newColor, current);

     //Fill Next row
     fill_array(level, r + 1, c, newColor, current);

     //Fill Prev col
     fill_array(level, r, c - 1, newColor, current);

     //Fill next col
     fill_array(level, r, c + 1, newColor, current);

     return level
}
