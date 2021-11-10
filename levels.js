function completeLevel() {
	let count = 0
	let totalcount = 0;
	for (let i=1; i < (height/20) - 1; i++){
	    for (let j=1; j < (width/20) - 1; j++){
	      if (level[i][j] == 1){
	        count += 1;
	      }
	    }
	}
	// count -= 122
	totalcount = ((count/828)* 100);
	// console.log(totalcount);
	// totalcount = count/
	return round(totalcount * 100) / 100;
	// console.log(count)
	// return totalcount;
}

function nextLevel() {
	// completeLevel();
	// levelOne();
	if (completeLevel() >= 15) {
		// console.log(completeLevel())
		levels +=1;
		if(levels>6){
			gamecomplete = true;
		}
		else{
			mylevel +=1;
		}
		console.log("level up")
		resetLevel();
		player.x = 0;
		player.y = 0;
		player.lives = 3;
		allLevels();
		checkfornextLevel = false;
		levelupscreen = true;
		gamebegin=false;
		checkforStart = false;
	}
}

function allLevels() {

	if (levels == 2) {
		levelTwo();
	}

	else if (levels == 3) {
		levelThree();
	}

	// else if (levels == 4) {
	// 	levelFour();
	// }

	// else if (levels == 5) {
	// 	levelFive();
	// }

	// else if (levels == 6) {
	// 	levelSix();
	// }
}

function levelOne() {
	enemy = [];

	enemy.push(new PinkGhost());
	enemy.push(new PinkGhost());

}

function levelTwo() {
	enemy = [];

	enemy.push(new PinkGhost());
	enemy.push(new PinkGhost());
	enemy.push(new YellowGhost());
}

function levelThree() {
	enemy = [];

	enemy.push(new PinkGhost());
	enemy.push(new RedGhost());
	enemy.push(new YellowGhost());
}

function levelFour() {
	enemy = [];

	enemy.push(new PinkGhost());
	enemy.push(new PinkGhost());
	enemy.push(new YellowGhost());
}

function levelFive() {
	enemy = [];

	enemy.push(new PinkGhost());
	enemy.push(new PinkGhost());
	enemy.push(new YellowGhost());
}

function levelSix() {
	enemy = [];

	enemy.push(new PinkGhost());
	enemy.push(new PinkGhost());
	enemy.push(new YellowGhost());
}
