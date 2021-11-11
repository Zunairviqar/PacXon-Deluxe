function StartScreen(){
  image(main_image, 0, 0);
  if (frameCount == 180){
    main_image.pause();
  }
  if(mouseIsPressed){
    if(mouseX>285 && mouseX <475 && mouseY>230&& mouseY<275){
      load_level = true;
      clickedsound.play();
    }
    if(mouseX>285 && mouseX <475 && mouseY>285&& mouseY<330){
      console.log("HOW TO PLAY")
      loadhowtoplay = true;
      clickedsound.play();
    }
    if(mouseX>285 && mouseX <475 && mouseY>340&& mouseY<385){
      console.log("MORE GAMES")
      clickedsound.play();
    }
  }
}

function HowToPlayScreen(){
  image(howtoplay, 0, 0);
  if(mouseIsPressed){
    if(mouseX>270 && mouseX <460 && mouseY>408&& mouseY<453){
      loadhowtoplay = false;
      clickedsound.play();
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
  // LevelScreenClick();
}

function LevelScreenClick(){
  if(mouseIsPressed){
    if(mylevel >0){
      if(mouseX>118 && mouseX <193 && mouseY>215&& mouseY<293){
        console.log("LEVEL 1");
        clickedsound.play();
        gamestart = true;
        load_level =  false;
        levelOne();
      }
    }
    if(mylevel >1){
      if(mouseX>205 && mouseX <283 && mouseY>215&& mouseY<293){
        console.log("LEVEL 2");
        clickedsound.play();
        gamestart = true;
        load_level =  false;
        levels = 2;
        levelTwo();

      }
    }
    if (mylevel >2){
      if(mouseX>290 && mouseX <368 && mouseY>215&& mouseY<293){
        console.log("LEVEL 3");
        clickedsound.play();
        gamestart = true;
        load_level =  false;
        levels = 3;
        levelThree();
      }
    }
    if (mylevel >3){
      if(mouseX>375 && mouseX <453 && mouseY>215&& mouseY<293){
        console.log("LEVEL 4");
        clickedsound.play();
        gamestart = true;
        load_level =  false;
        levels = 4;
        levelFour();
      }
    }
    if(mylevel >4){
      if(mouseX>460 && mouseX <538 && mouseY>215&& mouseY<293){
        console.log("LEVEL 5");
        clickedsound.play();
        gamestart = true;
        load_level =  false;
        levels = 5;
        levelFive();
      }
    }
    if(mylevel >5){
      if(mouseX>545 && mouseX <623 && mouseY>215&& mouseY<293){
        console.log("LEVEL 6");
        clickedsound.play();
        gamestart = true;
        load_level =  false;
        levels = 6;
        levelSix();
      }
    }
  }
}
