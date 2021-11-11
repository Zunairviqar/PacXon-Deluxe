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

<<<<<<< Updated upstream
let levels = 2;
=======
let timer = 9;

let levels = 1;
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
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
            // stroke(0);
            // fill(255);
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

            // gameOver();

            let window_progress = document.getElementById('current_progress')
            window_progress.innerHTML = completeLevel() + "%";

            nextLevel();
            // text("Level: " + levels, width-60, 15);
            let window_level = document.getElementById('current_level')
            window_level.innerHTML = levels;



            if (frameCount % 420 == 0 && powerups.length == 0) {
              console.log("POWERUP APPEAR")
              powerups.push(new Powerup())
            }

            stroke(0);
            fill(255);
            text("Timer: " + timer + 's', width-300, 15);
            // console.log("timer");

            if (frameCount % 60 == 0 && timer > 0) { 
              timer --;
            }

            if (timer == 0 || player.lives == 0){
              endscreen = true;
              player.graphic = rightPacXon;
              player.currKeyCode = 0;
              resetLevel();
              player.lives = 3;
              timer = 9;
              
              allLevels();
            }

          }
        }
      }

    }
  }
}
>>>>>>> Stashed changes


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

// function gameOver () {
//   if (player.lives <= 0 || timer <= 0){
//     endscreen = true;
//     resetLevel();
//     player.lives = 3;

//     timer = 90;
//   }

//   else {
//     resetDrawing();
//   }
// }
