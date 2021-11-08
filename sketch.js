// A 2D list to store the tiles for the game board
let level = [];
// Stores the images
let tile, movingTile, rightPacXon, leftPacXon, upPacXon, downPacXon;
let redGhost, blueGhost, yellowGhost, pinkGhost;

let tileSize;
let count = 0;

let c1 = 0;
let c2 = 0;

let mArea;
let sVals = [];
let tc;
let pVals = [];

let levels = 1;


function preload() {
  tile = loadImage('assets/Tiles/tile.png');
  movingTile = loadImage('assets/Tiles/movingTile.png');
  rightPacXon = loadImage('assets/Paxon/right_paXon.gif');
  leftPacXon = loadImage('assets/Paxon/left_paXon.gif');
  upPacXon = loadImage('assets/Paxon/up_paXon.gif');
  downPacXon = loadImage('assets/Paxon/down_paXon.gif');
  redGhost = loadImage('assets/Enemies/red-ghost.png');
  blueGhost = loadImage('assets/Enemies/blue-ghost.png');
  yellowGhost = loadImage('assets/Enemies/yellow-ghost.png');
  pinkGhost = loadImage('assets/Enemies/pink-ghost.png');
}

function setup() {

  createCanvas(760,500);
  tileSize = 20;
  initializeLevel();
  resetLevel();
  tc = 0;
  //declare a new player and a ghost
  player = new Player();
  // p1ghost = new PinkGhost();
  // p2ghost = new PinkGhost();
  // bghost = new BlueGhost();
  // yghost = new YellowGhost();

}

function draw(){

  background(0);
  drawLevel();
  fill(255);
  text("Lives: " + player.lives, 10, 15);

  //player
  player.display();
  player.move();

  //ghosts
  // p1ghost.display();
  // p1ghost.bounce();
  // bghost.display();
  // bghost.follow();
  // yghost.display();
  // yghost.follow();


  text("Progress: " + completeLevel() + "%", width-300, 15);

  // allLevels();

  // nextLevel();
  text("Level: " + levels, width-60, 15);


}
