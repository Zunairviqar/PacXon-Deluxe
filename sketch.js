// A 2D list to store the tiles for the game board
let level = [];
// Stores the image of the fixed tile to be used globally.
let tile;


function preload() {
  tile = loadImage('assets/Tiles/tile.png');
  movingTile = loadImage('assets/Tiles/movingTile.png');

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
  // background(5,5,43,255);
  background(0);
  drawLevel();

  // for (let i =0; i<37; i++){
  //   for(let j=0; j<24; j++){
  //     if (i<20){
  //       image(tile,i*20,j*20,24,24)
  //     }
  //     else{
  //       image(movingTile,i*20,j*20,33,33)
  //     }
  //   }
  // }


}
function drawLevel() {
  for (let r = 0; r < level.length; r++) {
    for (let c = 0; c < level[r].length; c++) {
      if(level[r][c] == 1){
        image(tile,c*20,r*20,20,20);
      }
    }
  }
  // for (let i =0; i<37; i++){
  //   for(let j=0; j<24; j++){
  //     if (i<20){
  //       image(tile,i*20,j*20,24,24)
  //     }
  //     else{
  //       image(movingTile,i*20,j*20,33,33)
  //     }
  //   }
  // }

}
