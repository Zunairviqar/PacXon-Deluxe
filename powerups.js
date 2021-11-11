class Powerup {
	constructor(){

		this.graphic = random([bomb]);

		if (this.graphic == bomb) {
			let coord = placeBomb();
			// console.log(coord)

			if (coord == false){
				this.graphic = random([bolt, slow, ice]);
				this.x = int(random(2*tileSize, width-2*tileSize));
   				this.y = int(random(2*tileSize, height-2*tileSize));
			}
			else {
				this.x = coord[0];
				this.y = coord[1];
				this.pframe = frameCount;
			}
			// console.log(getTile(this.x, this.y))
		}

		else {
			this.x = int(random(2*tileSize, width-2*tileSize));
   			this.y = int(random(2*tileSize, height-2*tileSize));
		}

		this.disp = true;
		this.p2frame = frameCount;
		this.xNoiseOffset = random(0,1000);
    	// this.yNoiseOffset = random(1000,2000);
		// console.log(this.graphic);
		// console.log(this.x);
		// console.log(this.y);
	}

	display(){
		if (this.disp == true) {
			let size = map(noise(this.xNoiseOffset), 0, 1, 0.75, 1.5);
			this.xNoiseOffset += 0.01;
			image(this.graphic, this.x, this.y, 25*size,25*size);
		}
  	}

  	effect() {
  		if (this.graphic == slow || this.graphic == ice) {
  		// console.log("helo")

	  		if (dist(this.x, this.y, player.x, player.y) < 20) {
	  			console.log("player touched ice")
	  			// collectionsound.play();
	  			this.pframe = frameCount;
	  			for (let i = 0; i < enemy.length; i++) {
  					if (this.graphic == slow) {
  						enemy[i].speedX = 1;
  						enemy[i].speedY = 1;
  						enemy[i].speed = 0.001;
  					}
  					else if (this.graphic == ice){
  						enemy[i].speedX = 0;
  						enemy[i].speedY = 0;
  						enemy[i].speed = 0;
  					}
	  			}
	  			this.disp = false;
	  			this.x=-100;
	  			this.y=-100;
	  			collectionsound.play();
	  		}

  			if (frameCount - this.pframe == 180 || frameCount - this.p2frame == 360){
  				for (let i = 0; i < enemy.length; i++) {
	  				enemy[i].speedX = enemy[i].pspeedX;
	  				enemy[i].speedY = enemy[i].pspeedY;
	  				enemy[i].speed = enemy[i].pspeed;
	  			}
	  			powerups.splice(0, 1);
  			}

  		}

  		if (this.graphic == bolt) {
  		// console.log("helo")
  		  	// this.pframe = 0;
	  		if (dist(this.x, this.y, player.x, player.y) < 20) {
	  			console.log("player touched bolt")
	  			// collectionsound.play();
	  			this.pframe = frameCount;
	  			player.speed = 6;
	  			this.disp = false;
	  			this.x=-100;
	  			this.y=-100;
	  			collectionsound.play();
  			}
			if (frameCount - this.pframe == 180 || frameCount - this.p2frame == 360){
				// console.log("SLOOWWWWWW DOWNNN")
				player.speed = player.pspeed;
				powerups.splice(0, 1);
			}

  		}

  		else if (this.graphic == bomb) {

  			if (dist(this.x, this.y, player.x, player.y) < 20) {
  				console.log("player touched bomb");
  				powerups.splice(0, 1);
  				collectionsound.play();
  			}

			else if (frameCount - this.pframe == 180){
				// console.log("phattt jaaa")
				deleteTiles(this.x, this.y);
				powerups.splice(0, 1);

			}


  		}





  	}
}

function placeBomb() {

  let x = random(4*tileSize, width-5*tileSize);
  let y = random(4*tileSize, height-5*tileSize);
  let count = 0;
  // console.log(x, y)
  while (getTile(x, y) == 0 && count < 5) {
    x = int(random(4*tileSize, width-5*tileSize));
    y = int(random(4*tileSize, height-5*tileSize));
    count += 1;
  }

  if (count < 5) {
    return [x, y];
  }

  else {
    return false;
  }


}
