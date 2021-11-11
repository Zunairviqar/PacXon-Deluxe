//class to draw player
class Player {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.startMovingRight = false;
    this.startMovingDown = false;
    this.pKeyPress = 'None';
    this.moving = 'not moving';
    this.lives = 3;
    this.speed = 3;
    this.pspeed = this.speed;
    this.graphic = rightPacXon;
  }

  display(){
    image(this.graphic, this.x, this.y, 20,20)
  }

  move(){
    // set up sensor positions
    this.middleX = this.x+tileSize/2;
    this.middleY = this.y+tileSize/2;

    if (keyIsPressed==true){
      if (this.pKeyPress == 'None'){
        this.pKeyPress = keyCode;
      }
      else {
        console.log("hereee")
        this.moving = 'moving';
        if (this.pKeyPress != this.currKeyCode){
          this.pKeyPress = this.currKeyCode;
          let roundx = this.x%20

          if (roundx !=0){

            if (roundx >= 10){
              this.x = this.x + (20 - roundx);
            }
            else if(roundx < 10){
              this.x = this.x - roundx;
            }
          }

          let roundy = this.y%20

          if (roundy !=0){

            if (roundy >= 10){
              this.y = this.y + (20 - roundy);
            }
            else if(roundy < 10){
              this.y = this.y - roundy;
            }
          }
        }
        if (keyCode ==68) {
          this.currKeyCode = 68;
          this.graphic = rightPacXon;
        }
        if (keyCode ==65) {
          this.currKeyCode = 65;
          this.graphic = leftPacXon;
        }
        if (keyCode ==87) {
          this.currKeyCode = 87;
          this.graphic = upPacXon;
        }
        if (keyCode ==83) {
          this.currKeyCode = 83;
          this.graphic = downPacXon;
        }
      }

    }

    if (this.currKeyCode == 68 && this.x < width){
      this.x  += this.speed;
    }

    if (this.currKeyCode == 65 && this.x > 0){
      this.x  -= this.speed;
    }

    if (this.currKeyCode == 87 && this.y > 0){
      this.y  -= this.speed;
    }

    if (this.currKeyCode == 83 && this.y < height){
      this.y += this.speed;
    }

    let id = getTile(this.middleX, this.middleY);
    let nt;

    if((this.middleX>20 && this.middleY>20 && this.middleX<width-20 && this.middleY<height-20)){
      this.sensorLeft = this.x-10;
      this.sensorRight = this.x+tileSize+10;
      this.sensorTop = this.y-10;
      this.sensorBottom = this.y+tileSize+5;

      if(this.currKeyCode==68){
        nt = getTile(this.sensorRight,this.middleY);
      }
      else if(this.currKeyCode==65){
        nt = getTile(this.sensorLeft,this.middleY);
      }
      else if(this.currKeyCode==87){
        nt = getTile(this.middleX,this.sensorTop);
      }
      else if(this.currKeyCode==83){
        nt = getTile(this.middleX,this.sensorBottom);
      }
    }
    if(nt == -1){
      console.log("LAG GAYE");
      player.x = 0;
      player.y = 0;
      resetLevel();
    }
    if (id == 0){
      modifyTile(this.middleX, this.middleY)
    }
    else if (id == 1) {
      solidTiles();
      if (this.moving == 'stopped'){
        this.moving = 'not moving';

        var xyz = makeDeepCopy(level);
        for (let i = 0; i < enemy.length; i++){
          ghostx = int(enemy[i].x/tileSize);
          ghosty = int(enemy[i].y/tileSize)
          level[ghosty][ghostx] = 2;
        }

        mArea, sVals = maxAreaOfIsland(xyz);
        let vals = smallerPair(sVals);

        for (let i = 0; i < enemy.length; i++){
          ghostx = int(enemy[i].x/tileSize);
          ghosty = int(enemy[i].y/tileSize)
          level[ghosty][ghostx] = 0;
        }

        for (let i = 0; i < vals.length; i++){
          fill_array(level, vals[i][0], vals[i][1], 1, 0);
        }
      }
    }

    this.x = constrain(this.x, 0, width-20);
    this.y = constrain(this.y, 0, height-20);
    }
  }
