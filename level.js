function resetDrawing() {
  // The following block populates the fixed borders of the board
  for (let i=0; i < height/20; i++){
    for (let j=0; j < width/20; j++){
      if (level[i][j] == -1){
        level[i][j] = 0;
      }
    }
  }
}

function initializeLevel() {
  let rows = []

  // The following for loops populate the 2D list, level, dynamically and leaves it blank
  for (let i = 0; i < height/20; i++){
    rows = []
    for (let j =0; j < width/20; j++){
      rows.push(0);
    }
    // console.log("row len" + rows.length)

    level.push(rows)
  }
  // console.log("col len" + level.length)
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
