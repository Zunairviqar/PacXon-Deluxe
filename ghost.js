class Ghost {
  constructor(){
    this.x = random(80, width-100);
    this.y = random(80, height-80);
    this.speedX = random(1, 3);
    this.speedY = random(1, 3);
    this.graphic = blueGhost;
  }

  display(){
    image(this.graphic, this.x, this.y, 20,20);
  }

  move () {
    // set up sensor positions
    this.sensorLeft = this.x-3;
    this.sensorRight = this.x+tileSize;
    this.sensorTop = this.y-3;
    this.sensorBottom = this.y+tileSize+3;
    this.middleX = this.x+tileSize/2;
    this.middleY = this.y+tileSize/2;

    // check tile to the left
    let id = getTile(this.middleX,this.middleY);
    let lid = getTile(this.sensorLeft,this.middleY);
    let rid = getTile(this.sensorRight,this.middleY);
    let uid = getTile(this.middleX, this.sensorTop);
    let bid = getTile(this.middleX, this.sensorBottom);

    if (uid == 1
      || bid == 1) {
      this.speedY *= -1;
    }
    else if (lid == 1
            || rid == 1 ) {
      this.speedX *= -1;
    }

    this.detectCollision(rid, lid, uid, bid);

  }

  bounce() {

    this.move();
    this.x += this.speedX;
    this.y += this.speedY;
  }

  follow() {
    let distX = player.x - this.x;
    let distY = player.y - this.y;

    this.x += 0.005 * distX;
    this.y += 0.005 * distY;
    this.move();

  }

  follow2(){

    // set up sensor positions
    this.sensorLeft = this.x-20;
    this.sensorRight = this.x+tileSize+20;
    this.sensorTop = this.y-20;
    this.sensorBottom = this.y+tileSize+20;
    this.middleX = this.x+tileSize/2;
    this.middleY = this.y+tileSize/2;

    // check tile to the left
    let id = getTile(this.middleX,this.middleY);
    let lid = getTile(this.sensorLeft,this.middleY);
    let rid = getTile(this.sensorRight,this.middleY);
    let uid = getTile(this.middleX, this.sensorTop);
    let bid = getTile(this.middleX, this.sensorBottom);

    // if (lid == 1 && )
    // if (player.moving != "moving"){
    //   this.bounce();
    // }

    // else {

    //   let distX = 0;
    //   let distY = 0;

    //   if ((lid != 1 || rid != 1) || (uid != 1 || bid != 1)){

    //     // compute the distance between the ghost and the player
    //     if (lid != 1 || rid != 1){
    //       distX = player.x - this.x;
    //     }

    //     if (uid != 1 || bid != 1){
    //       distY = player.y - this.y;
    //     }

    //     // move 1% of the way toward the desired position



    //   }

    //   else {
    //     this.bounce();
    //   }

    // }

    this.detectCollision(rid, lid, uid, bid);

    // // the player position is always the desired position
    // let xDesired = player.x;
    // let yDesired = player.y;

  }

  detectCollision(rid, lid, uid, bid) {
    if(lid == -1 || rid == -1 || uid == -1 || bid == -1 || dist(this.x, this.y, player.x, player.y) < 20){
      player.x = 0;
      player.y = 0;
      player.lives -= 1;
      if (lid == -1){
        this.x += 5;
      }
      if (rid == -1){
        this.x -= 5;
      }
      if (uid == -1){
        this.y += 5;
      }
      if (bid == -1){
        this.y -= 5;
      }
      // this.x = random(20, width-20);
      // this.y = random(20, height-20);
      if (player.lives <= 0){
          resetLevel();
          player.lives = 3;
      }

      else {
          resetDrawing();
      }
    }
  }
}

class PinkGhost extends Ghost{
  constructor(){
    super();
    this.speedX = 3;
    this.speedY = 3;
    this.graphic = pinkGhost;
  }
}

class BlueGhost extends Ghost{
  constructor(){
    super();
    this.graphic = blueGhost;
    this.speedX = 0.5;
    this.speedY = 0.5;
  }
}

class RedGhost extends Ghost{
  constructor(){
    super();
    this.graphic = redGhost;
  }
}

class YellowGhost extends Ghost{
  constructor(){
    super();
    this.graphic = yellowGhost;
  }
}


    // if (id == 1) {
    //   if (rid == 1) {
    //     player.x -= 20;
    //   }
    //   if (lid == 1) {
    //     player.x += 20;
    //   }
    //   if (uid == 1) {
    //     player.y += 20;
    //   }
    //   if (bid == 1) {
    //     player.y -= 20;
    //   }
    // }