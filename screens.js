function StartScreen(){
  image(main_image, 0, 0);
  if(mouseIsPressed){
    if(mouseX>285 && mouseX <475 && mouseY>230&& mouseY<275){
      load_level = true;
    }
    if(mouseX>285 && mouseX <475 && mouseY>285&& mouseY<330){
      console.log("HOW TO PLAY")
    }
    if(mouseX>285 && mouseX <475 && mouseY>340&& mouseY<385){
      console.log("MORE GAMES")
    }
  }
}

function LevelScreen(){
  if (mylevel == 1){
    image(level1, 0 ,0);
  }
  else if (mylevel == 2){
    image(level2, 0 ,0);
  }
  else if (mylevel == 3){
    image(level3, 0 ,0);
  }
  else if (mylevel == 4){
    image(level4, 0 ,0);
  }
  else if (mylevel == 5){
    image(level5, 0 ,0);
  }
  else if (mylevel == 6){
    image(level6, 0 ,0);
  }
  LevelScreenClick();
}

function LevelScreenClick(){
  if(mouseIsPressed){
    if(mylevel >0){
      if(mouseX>118 && mouseX <193 && mouseY>215&& mouseY<293){
        console.log("LEVEL 1");
        gamestart = true;
        levelOne();
      }
    }
    if(mylevel >1){
      if(mouseX>205 && mouseX <283 && mouseY>215&& mouseY<293){
        console.log("LEVEL 2");
        gamestart = true;
        levels = 2;
        levelTwo();

      }
    }
    if (mylevel >2){
      if(mouseX>290 && mouseX <368 && mouseY>215&& mouseY<293){
        console.log("LEVEL 3");
        gamestart = true;
        levels = 3;
        levelThree();
      }
    }
    if (mylevel >3){
      if(mouseX>375 && mouseX <453 && mouseY>215&& mouseY<293){
        console.log("LEVEL 4");
        gamestart = true;
        levels = 4;
        levelFour();
      }
    }
    if(mylevel >4){
      if(mouseX>460 && mouseX <538 && mouseY>215&& mouseY<293){
        console.log("LEVEL 5");
        gamestart = true;
        levels = 5;
        levelFive();
      }
    }
    if(mylevel >5){
      if(mouseX>545 && mouseX <623 && mouseY>215&& mouseY<293){
        console.log("LEVEL 6");
        gamestart = true;
        levels = 6;
        levelSix();
      }
    }
  }
}
