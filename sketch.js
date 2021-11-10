// A 2D list to store the tiles for the game board
let level = [];
// Stores the images
let tile, movingTile, rightPacXon, leftPacXon, upPacXon, downPacXon;
let redGhost, blueGhost, yellowGhost, pinkGhost;
let home;

let tileSize;
let count = 0;

let c1 = 0;
let c2 = 0;

let mArea;
let sVals = [];
let tc;
let pVals = [];
let areas = [];

let levels = 1;

let enemy = [];
let ghostx, ghosty;

let level_up = false;

let gamestart;
let load_level;
let loadhowtoplay;
let gamebegin;
let checkforStart;
let checkfornextLevel;
let levelupscreen;
let endscreen;
let checkforretry;
let gamecomplete;
let checkforfinish;
let mylevel;

let level1;
let level2;
let level3;
let level4;
let level5;
let level6;
let main_image;
let howtoplay;
let clicktostart;
let levelup;
let endimg;
let finish;


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
  main_image = loadImage('assets/Screens/home-screen.png');
  main_image2 = loadImage('assets/Screens/home.png');
  main_image3 = loadImage('assets/Screens/home-screen.gif');
  level1 = loadImage('assets/Screens/level1.png');
  level2 = loadImage('assets/Screens/level2.png');
  level3 = loadImage('assets/Screens/level3.png');
  level4 = loadImage('assets/Screens/level4.png');
  level5 = loadImage('assets/Screens/level5.png');
  level6 = loadImage('assets/Screens/level6.png');
  howtoplay = loadImage('assets/Screens/howtoplay.png');
  clicktostart = loadImage('assets/Screens/clicktostart.png');
  levelup = loadImage('assets/Screens/levelcompleted.png');
  endimg = loadImage('assets/Screens/gameover.png');
  finish = loadImage('assets/Screens/congrats.png');

}

function setup() {

  createCanvas(760,500);
  gamestart = false;
  load_level = false;
  loadhowtoplay = false;
  gamebegin = false;
  checkforStart = false;
  levelupscreen = false;
  checkfornextLevel = false;
  endscreen = false;
  checkforretry = false;
  gamecomplete = false;
  checkforfinish = false;
  mylevel = 1;

  tileSize = 20;
  initializeLevel();
  resetLevel();
  tc = 0;
  player = new Player();
}

function draw(){
  if(gamestart == false){
    if (load_level == false){
      if (loadhowtoplay == false){
        StartScreen();
      }
      else{
        HowToPlayScreen();
      }
    }
    else if(load_level == true){
      LevelScreen();
    }
  }
  else {
    background(0);
    drawLevel();

    if(endscreen == true){
      image(endimg, 0, 0);
      checkforretry =  true;
    }

    else{
      if(levelupscreen==true){
        image(levelup, 0,0);
        checkfornextLevel = true;
      }
      else{
        if(gamebegin==false){
          image(clicktostart, 0, 0);
          checkforStart = true;
        }

        if(gamebegin == true){
            fill(255);
            text("Lives: " + player.lives, 10, 15);

            //player
            player.display();
            player.move();

            //ghosts
            for (let i = 0; i < enemy.length; i++){
              enemy[i].display();
              enemy[i].move();
            }

            text("Progress: " + completeLevel() + "%", width-300, 15);

            nextLevel();
            text("Level: " + levels, width-60, 15);
        }
      }
    }

  }
}

function mousePressed(){
  if(checkforStart == true){
    gamebegin =  true;
  }
  if(checkfornextLevel == true){
    if(mouseX>400 && mouseX <495 && mouseY>325&& mouseY<363){
      levelupscreen = false;
    }
    else if(mouseX>250 && mouseX <345 && mouseY>325&& mouseY<363){
      gamestart = false;
      levelupscreen = false;
    }
  }
  if(checkforretry == true){
    if(mouseX>400 && mouseX <495 && mouseY>325&& mouseY<363){
      endscreen = false;
    }
    else if(mouseX>250 && mouseX <345 && mouseY>325&& mouseY<363){
      gamestart = false;
      endscreen = false;
    }
  }
}
