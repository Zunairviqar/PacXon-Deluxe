// A 2D list to store the tiles for the game board
let level = [];
// Stores the images
let tile, movingTile, player, redGhost, blueGhost, yellowGhost, pinkGhost;

let tileSize;
let count = 0;

let c1 = 0;
let c2 = 0;

let mArea;
let sVals = [];

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
      this.x  += 400/100;
    }

    if (this.currKeyCode == 65 && this.x > 0){
      this.x  -= 400/100;
    }

    if (this.currKeyCode == 87 && this.y > 0){
      this.y  -= 400/100;
    }

    if (this.currKeyCode == 83 && this.y < height){
      this.y += 400/100;
    }

    // let lid = getTile(this.sensorLeft,this.middleY);
    // let rid = getTile(this.sensorRight,this.middleY);
    // let uid = getTile(this.middleX, this.sensorTop);
    // let bid = getTile(this.middleX, this.sensorBottom);

    let id = getTile(this.middleX, this.middleY);
    let nt;

    if((this.middleX>20 && this.middleY>20 && this.middleX<width-20 && this.middleY<height-20)){
      this.sensorLeft = this.x-10;
      this.sensorRight = this.x+tileSize+10;
      this.sensorTop = this.y-10;
      this.sensorBottom = this.y+tileSize+5;

      if(this.currKeyCode==68){
        nt = getTile(this.sensorRight,this.middleY);
      }
      else if(this.currKeyCode==65){
        nt = getTile(this.sensorLeft,this.middleY);
      }
      else if(this.currKeyCode==87){
        nt = getTile(this.middleX,this.sensorTop);
      }
      else if(this.currKeyCode==83){
        nt = getTile(this.middleX,this.sensorBottom);
      }
    }
    if(nt == -1){
      console.log("LAG GAYE");
      player.x = 0;
      player.y = 0;
      resetLevel();
    }
    else if (id == 0){
      modifyTile(this.middleX, this.middleY)
    }
    else if (id == 1 || nt == 1) {
      solidTiles();
      if (this.moving == 'stopped'){
        this.moving = 'not moving';

        // console.log(int(ghost.y/tileSize), int(ghost.x/tileSize))
        var xyz = makeDeepCopy(level);
        let ghosty = int(ghost.middleY/tileSize);
        let ghostx = int(ghost.middleX/tileSize);
        level[ghosty][ghostx] = 2

        mArea, sVals = maxAreaOfIsland(xyz);
        // console.log(sVals);
        if(sVals.length>1){
          let vals = smallerPair(sVals);
          level[ghosty][ghostx] = 0
          fill_array(level, vals[0], vals[1], 1, 0);
        }
        else{
          level[ghosty][ghostx] = 0
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
    this.sensorBottom = this.y+tileSize+2;
    this.middleX = this.x+tileSize/2;
    this.middleY = this.y+tileSize/2;

    // check tile to the left
    let lid = getTile(this.sensorLeft,this.middleY);
    let rid = getTile(this.sensorRight,this.middleY);
    let uid = getTile(this.middleX, this.sensorTop);
    let bid = getTile(this.middleX, this.sensorBottom);

    if (uid == 1
      || bid == 1) {
      this.speedY *= -1;
    }
    else if (lid == 1
      || rid == 1 ) {
        this.speedX *= -1;
    }
    if(lid == -1 || rid == -1 || uid == -1 || bid == -1){
      console.log("TAKKAR");
      player.x = 0;
      player.y = 0;
      resetLevel();
    }

    //detect collision
    if (dist(this.x, this.y, player.x, player.y) < 20) {
      player.x = 0;
      player.y = 0;
      resetLevel();
    }

    this.x += this.speedX;
    this.y += this.speedY;
  }

}


function fill_array(level, r, c, newColor, current){
    if(r < 0){
        return;
    }
    if(c < 0){
        return;
    }
    if(r > level.length){
        return;
    }
    if(c > level[r].length){
        return;
    }
    if(level[r][c] === 2){
        // console.log("FOUNDD")
        count = 10000;
        return;
    }
    if(level[r][c] !== current){
        return;
    }

     level[r][c] = newColor;
     count = count + 1;
     fill_array(level, r - 1, c, newColor, current);
     fill_array(level, r + 1, c, newColor, current);
     fill_array(level, r, c - 1, newColor, current);
     fill_array(level, r, c + 1, newColor, current);

     return level
}

function smallerPair(values){
    fill_array(level,values[0][0], values[0][1], 3, 0);
    c1 = count;
    // console.log(values[0][0], values[0][1])
    // console.log(c1)
    fill_array(level, values[0][0], values[0][1], 0, 3);
    count = 0;
    fill_array(level,values[1][0], values[1][1], 3, 0);
    c2 = count;
    // console.log(values[1][0], values[1][1])
    // console.log(c2);
    fill_array(level, values[1][0], values[1][1], 0, 3);
    count = 0;
    if(c1<c2){
      return([values[0][0], values[0][1]])
    }
    else{
      return([values[1][0], values[1][1]])
    }
}

function maxAreaOfIsland(grid) {
    let maxArea = 10000
    let compass = [[-1, 0], [0, -1], [1, 0], [0, 1]];

    let prow;
    let pcol;
    let smallVals = [];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 0) {
                flood([[i, j]])
            }
        }
    }
    return maxArea, smallVals
    function flood(stack) {
        let currentArea = 0
        while (stack.length) {
            let [row, col] = stack.pop()
            if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length || grid[row][col] === 1) {
                continue
            }
            currentArea++
            grid[row][col] = 1
            prow = row;
            pcol = col;
            for (const direction of compass) {
                stack.push([row + direction[0], col + direction[1]])
            }
        }
        smallVals.push([prow,pcol]);
        maxArea = Math.min(maxArea, currentArea)
    }
};

function makeDeepCopy(g) {
  var gridCopy = [];

  for (var x = 0; x < g.length; x++) {
    var newRow = [];

    for (var y = 0; y < g[x].length; y++) {
      newRow.push(g[x][y])
    }
    gridCopy.push(newRow);
  }
  return gridCopy;
}
