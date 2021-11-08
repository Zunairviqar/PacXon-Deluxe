function completeLevel() {
	let count = 0
	let totalcount = 0;
	for (let i=0; i < height/20; i++){
	    for (let j=0; j < width/20; j++){
	      if (level[i][j] == 1){
	        count += 1;
	      }
	    }
	}
	count -= 122
	totalcount = ((count/950)* 100)
	return int(totalcount);
}

function nextLevel() {
	if (completeLevel() >= 2) {
		levels +=1;
		resetLevel();
		player.x = 0;
		player.y = 0;
		player.lives = 3;
	}
}

function allLevels() {

	if (levels == 1) {
		levelOne();
	}

	else if (levels == 2) {
		levelTwo();
		level = 1;
	}

	else if (levels == 3) {
		levelThree();
	}

	else if (levels == 4) {
		levelFour();
	}

	else if (levels == 5) {
		levelFive();
	}

	else if (levels == 6) {
		levelSix();
	}
}

function levelOne() {
	p1ghost.display();
  	p1ghost.bounce();
  	p2ghost.display();
  	p2ghost.bounce();
}

function levelTwo() {
	p1ghost.display();
  	p1ghost.bounce();
  	p2ghost.display();
  	p2ghost.bounce();
  	yghost.display();
  	yghost.follow();
}