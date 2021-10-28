// A 2D list to store the tiles for the game board
let level = [];
// Stores the images
let tile, movingTile, player;

function preload() {
  tile = loadImage('assets/Tiles/tile.png');
  movingTile = loadImage('assets/Tiles/movingTile.png');
  player = loadImage('assets/transparent.gif');
}

function setup() {

  createCanvas(760,500);

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
}

function draw(){

  background(0);
  drawLevel();
  
}

// function to draw the tiles
function drawLevel() {
  for (let r = 0; r < level.length; r++) {
    for (let c = 0; c < level[r].length; c++) {
      if(level[r][c] == 1){
        image(tile,c*20,r*20,20,20);
      }
    }
  }
}

//class to draw player
class Player {
  constructor(){

  }
}
