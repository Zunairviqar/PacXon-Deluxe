class Ghost {
  constructor(){
    this.x = random(80, width-100);
    this.y = random(80, height-80);
    this.speedX = random(1, 3);
    this.speedY = random(1, 3);
    this.speed = 0.005;
    this.graphic = blueGhost;

    this.pspeedX = this.speedX;
    this.pspeedY = this.speedY;
    this.pspeed = this.speed;
  }

  display(){
    image(this.graphic, this.x, this.y, 20,20);
  }

  collision () {
    // set up sensor positions
    this.sensorLeft = this.x-3;
    this.sensorRight = this.x+tileSize+3;
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
    console.log(this.type);
    console.log(uid, bid, lid, rid);


    if (uid == 1) {
      this.y += 3;
      this.speedY *= -1;
    }
    if (bid == 1) {
      this.y -= 3;
      this.speedY *= -1;
    }
    if (lid == 1) {
      this.x += 3;
      this.speedX *= -1;
    }
    if (rid == 1) {
      this.x -= 3;
      this.speedX *= -1;
    }

    this.enemyCollision(rid, lid, uid, bid);
    if (this.type == "eat" || this.type == "duplicate"){
      this.eat(rid, lid, uid, bid)
    }

  }

  eat(rid, lid, uid, bid) {
    if (rid == 1 && this.x < width-tileSize-30){
      deleteTile(this.sensorRight, this.middleY);
      // getTile(rid, this.middleY) = 0;
      // console.log(getTile(rid, this.middleY))
    }

    else if (lid == 1 && this.x > 30){
      // getTile(lid, this.middleY) = 0;
      deleteTile(this.sensorLeft, this.middleY);
      // console.log(getTile(lid, this.middleY))
    }

    else if (uid == 1 && this.y > 30){
      // getTile(this.middleX, uid) = 0;
      deleteTile(this.middleX, this.sensorTop);
      // console.log("uppppp")
    }

    else if (bid == 1 && this.y < height-tileSize-30){
      // getTile(this.middleX, bid) = 0;
      deleteTile(this.middleX, this.sensorBottom);
      // console.log("downnnn")
    }
  }

  duplicate() {
    if (player.x >= this.x-40 && player.x <= this.x+60 && player.y >= this.y-40 && player.y <= this.y+60) {
      if (this.dup == true){
        enemy.push(new BlueGhost());
        this.dup = false;
      }
    }
    else {
      this.dup = true
    }
  }

  move() {
    this.collision();

    if (this.type == "bounce"){
      this.x += this.speedX;
      this.y += this.speedY;
    }

    else if (this.type == "follow"){
      let distX = player.x - this.x;
      let distY = player.y - this.y;

      this.x += this.speed * distX;
      this.y += this.speed * distY;
    }

    else if (this.type == "eat"){
      this.x += this.speedX;
      this.y += this.speedY;
    }

    else if (this.type == "duplicate"){
      noFill();
      stroke(0,255,255);
      ellipse(this.x + 10,this.y + 10, 100);
      this.duplicate();
      this.x += this.speedX;
      this.y += this.speedY;

    }
  }

  enemyCollision(rid, lid, uid, bid) {
    if(lid == -1 || rid == -1 || uid == -1 || bid == -1 || dist(this.x, this.y, player.x, player.y) < 20){
      collisionsound.play();
      player.x = 0;
      player.y = 0;
      player.graphic = rightPacXon;
      player.currKeyCode = 0;
      player.lives -= 1;
      if (lid == -1 && rid != 1){
        this.x += 10;
      }
      else if (rid == -1 && lid != 1){
        this.x -= 10;
      }
      else if (uid == -1 && bid != 1){
        this.y += 10;
      }
      else if (bid == -1 && uid != 1){
        this.y -= 10;
      }

      if (dist(this.x, this.y, player.x, player.y) < 20) {
        if (rid != 1 || rid != -1){
          this.x += 10;
        }
        else if (lid != 1 || lid != -1){
          this.x -= 10;
        }
        else if (uid != 1 || uid != -1){
          this.y -= 10;
        }
        else if (bid != 1 || bid != -1){
          this.y += 10;
        }

      }
      // this.x = random(20, width-20);
      // this.y = random(20, height-20);
      if (player.lives <= 0){
        let window_score = document.getElementById('current_lives')
        window_score.innerHTML = player.lives;
        endscreen = true;
        player.lives = 3;
        timer = 100;
        powerups = [];
        resetLevel();
        allLevels();
        gameoversound.play();
        levels = 1;
      }

      else {
          resetDrawing();
      }
    }
  }

  // powerupCollision() {

  // }
}

class PinkGhost extends Ghost{
  constructor(){
    super();
    this.speedX = random(1.5, 3);
    this.speedY = random(1.5, 3);
    this.graphic = pinkGhost;
    this.type = "bounce";
  }
}

class BlueGhost extends Ghost{
  constructor(){
    super();
    this.graphic = blueGhost;
    this.speedX = random(1.5, 3);
    this.speedY = random(1.5, 3);
    this.type = "duplicate";
  }


}

class RedGhost extends Ghost{
  constructor(){
    super();
    this.graphic = redGhost;
    this.type = "eat";
  }
}

class YellowGhost extends Ghost{
  constructor(){
    super();
    this.graphic = yellowGhost;
    this.type = "follow";
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
