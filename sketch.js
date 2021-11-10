// A 2D list to store the tiles for the game board
let level = [];
// Stores the images
let tile, movingTile, rightPacXon, leftPacXon, upPacXon, downPacXon;
let redGhost, blueGhost, yellowGhost, pinkGhost;
let home;
let bomb, ice, bolt, slow;

let powerups = [];

let tileSize;
let count = 0;

let c1 = 0;
let c2 = 0;

let mArea;
let sVals = [];
let tc;
let pVals = [];
let areas = [];

let levels = 2;

let enemy = [];
let ghostx, ghosty;

let level_up = false;

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

  home = loadImage('assets/Screens/home.png');

  bomb = loadImage('assets/Extras/redbomb.png');
  ice = loadImage('assets/Extras/ice.png');
  bolt = loadImage('assets/Extras/lightning-bolt.png');
  slow = loadImage('assets/Extras/snail.png');

}

function setup() {

  createCanvas(760,500);
  tileSize = 20;
  initializeLevel();

  resetLevel();
  tc = 0;
  //declare a new player and a ghost
  player = new Player();
  // powerup = new Powerup();

  levelTwo();
  noiseDetail(24);


  // enemy.push(new PinkGhost());
  // enemy.push(new PinkGhost());
  // enemy.push(new PinkGhost());
  // console.log(enemy);

  // p1ghost = new PinkGhost();
  // p2ghost = new PinkGhost();
  // bghost = new BlueGhost();
  // yghost = new YellowGhost();

}

function draw(){


  // image(home, 0, 0);

  background(0);
  drawLevel();
  stroke(0);
  fill(255);
  text("Lives: " + player.lives, 10, 15);

  //player
  player.display();
  player.move();

  if (powerups.length > 0) {
    powerups[0].display();
    powerups[0].effect();
  }

  //ghosts
  for (let i = 0; i < enemy.length; i++){
    enemy[i].display();
    enemy[i].move();
  }
  // p1ghost.display();
  // p1ghost.bounce();
  // bghost.display();
  // bghost.follow();
  // yghost.display();
  // yghost.follow();

  stroke(0);
  fill(255);
  text("Progress: " + completeLevel() + "%", width-300, 15);

  // allLevels();

  nextLevel();
  text("Level: " + levels, width-60, 15);



  if (frameCount % 120 == 0 && powerups.length == 0) {
    powerups.push(new Powerup())
  } 


}
