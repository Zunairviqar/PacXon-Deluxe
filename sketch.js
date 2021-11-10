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


let levels = 1;

let enemy = [];
let ghostx, ghosty;

let level_up = false;

let gamestart;
let load_level;
let loadhowtoplay;
let gamebegin;
let checkforselectlevel;
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

  bomb = loadImage('assets/Extras/redbomb.png');
  ice = loadImage('assets/Extras/ice.png');
  bolt = loadImage('assets/Extras/lightning-bolt.png');
  slow = loadImage('assets/Extras/snail.png');

}

function setup() {

  var canvasMain = createCanvas(760,500);
    // set the ID on the canvas element
  canvasMain.id("p5_mainCanvas");

  // set the parent of the canvas element to the element in the DOM with
  // an ID of "left"
  canvasMain.parent("#center");

  gamestart = false;
  load_level = false;
  loadhowtoplay = false;
  gamebegin = false;
  checkforselectlevel =  false;
  checkforStart = false;
  levelupscreen = false;
  checkfornextLevel = false;
  endscreen = false;
  checkforretry = false;
  gamecomplete = false;
  checkforfinish = false;
  mylevel = 1;

  let user_levels = window.localStorage.getItem('levelsCompleted');
  if (user_levels) {
    mylevel = user_levels
  }

  tileSize = 20;
  initializeLevel();

  resetLevel();
  tc = 0;
  player = new Player();
  // powerup = new Powerup();

  noiseDetail(24);

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
      checkforselectlevel = true;
    }
  }
  else {
    background(0);
    drawLevel();

    if(gamecomplete == true){
      image(finish, 0, 0);
      checkforfinish = true;
    }
    else{
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
            stroke(0);
            fill(255);
            // text("Lives: " + player.lives, 10, 15);
            let window_score = document.getElementById('current_lives')
            window_score.innerHTML = player.lives;

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

            stroke(0);
            fill(255);
            // text("Progress: " + completeLevel() + "%", width-300, 15);
            let window_progress = document.getElementById('current_progress')
            window_progress.innerHTML = completeLevel() + "%";

            nextLevel();
            // text("Level: " + levels, width-60, 15);
            let window_level = document.getElementById('current_level')
            window_level.innerHTML = levels;



            if (frameCount % 120 == 0 && powerups.length == 0) {
              powerups.push(new Powerup())
            }

          }
        }
      }

    }
  }
}

function mousePressed(){
  if(checkforselectlevel == true){
    LevelScreenClick();
  }
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
  if(checkforfinish == true){
    // rect(279, 318, 190, 45);
    if(mouseX>279 && mouseX <469 && mouseY>318&& mouseY<363){
      gamestart = false;
      gamecomplete = false;
    }
  }
}
