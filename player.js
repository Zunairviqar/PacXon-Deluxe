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
        this.moving = 'moving';
        if (this.pKeyPress != this.currKeyCode){
          this.pKeyPress = this.currKeyCode;
          let roundx = this.x%20

          if (roundx !=0){

            if (roundx > 10){
              this.x = this.x + (20 - roundx);
            }
            else if(roundx <= 10){
              this.x = this.x - roundx;
            }
          }

          let roundy = this.y%20

          if (roundy !=0){

            if (roundy > 10){
              this.y = this.y + (20 - roundy);
            }
            else if(roundy <= 10){
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
      this.x  += 3;
    }

    if (this.currKeyCode == 65 && this.x > 0){
      this.x  -= 3;
    }

    if (this.currKeyCode == 87 && this.y > 0){
      this.y  -= 3;
    }

    if (this.currKeyCode == 83 && this.y < height){
      this.y += 3;
    }

    // let lid = getTile(this.sensorLeft,this.middleY);
    // let rid = getTile(this.sensorRight,this.middleY);
    // let uid = getTile(this.middleX, this.sensorTop);
    // let bid = getTile(this.middleX, this.sensorBottom);

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
    else if (id == 0){
      modifyTile(this.middleX, this.middleY)
    }
    else if (id == 1 || nt == 1) {
      solidTiles();
      if (this.moving == 'stopped'){
        this.moving = 'not moving';

        // console.log(int(ghost.y/tileSize), int(ghost.x/tileSize))
        var xyz = makeDeepCopy(level);
        let pghosty = int(pghost.middleY/tileSize);
        let pghostx = int(pghost.middleX/tileSize);
        let bghosty = int(bghost.middleY/tileSize);
        let bghostx = int(bghost.middleX/tileSize);
        level[pghosty][pghostx] = 2
        level[bghosty][bghostx] = 2

        mArea, sVals = maxAreaOfIsland(xyz);
        // console.log(sVals);
        if(sVals.length>1){
          let vals = smallerPair(sVals);
          pVals = makeDeepCopy(sVals);
          // console.log(sVals);
          level[pghosty][pghostx] = 0
          level[bghosty][bghostx] = 0

          fill_array(level, vals[0], vals[1], 1, 0);
        }
        else{
          level[pghosty][pghostx] = 0
          level[bghosty][bghostx] = 0
        }

      }
    }

    this.x = constrain(this.x, 0, width-20);
    this.y = constrain(this.y, 0, height-20);
    }
  }

