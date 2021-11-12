// calculate and return the percentage of solid tiles in the array
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
	totalcount = ((count/828)* 100);
	return round(totalcount * 100) / 100;
}

// promotes player to next level
function nextLevel() {
	// if 80% of level is completed
	if (completeLevel() >= 80) {
		// play level up sound
		levelupsound.play();
		// increment level
		levels +=1;
		// if all 6 levels completed, 
		if(levels>6){
			// game has been completed
			gamecomplete = true;
		}
		// else increment the number of levels unlocked
		else{
			mylevel +=1;
			// set the number of levels unlocked in local storage
			window.localStorage.setItem('levelsCompleted', levels);
		}
		console.log("level up")
		// reset level, remove all walls except borders
		resetLevel();
		// reset player position, lives, graphics, timer
		player.x = 0;
		player.y = 0;
		player.lives = 3;
		player.graphic = rightPacXon;
		player.currKeyCode = 0;
		timer = 100;
		// call the next level
		allLevels();
		// display the screens accordingly
		checkfornextLevel = false;
		levelupscreen = true;
		gamebegin=false;
		load_level = true;
		checkforselectlevel = false;
		checkforStart = false;
	}
}
// function which contains all levels
function allLevels() {
	// level 2
	if (levels == 2) {
		levelTwo();
	}
	// level 3
	else if (levels == 3) {
		levelThree();
	}
	// level 4
	else if (levels == 4) {
		levelFour();
	}
	// level 5
	else if (levels == 5) {
		levelFive();
	}
	// level 6
	else if (levels == 6) {
		levelSix();
	}
}

// level one enemy array declaration
function levelOne() {
	enemy = [];

	enemy.push(new PinkGhost());
	enemy.push(new PinkGhost());
}

// level two enemy array declaration
function levelTwo() {
	enemy = [];

	enemy.push(new PinkGhost());
	enemy.push(new PinkGhost());
	enemy.push(new RedGhost());
}

// level three enemy array declaration
function levelThree() {
	enemy = [];

	enemy.push(new PinkGhost());
	enemy.push(new RedGhost());
	enemy.push(new RedGhost());
	enemy.push(new YellowGhost());
}
// level four enemy array declaration
function levelFour() {
	enemy = [];

	enemy.push(new PinkGhost());
	enemy.push(new BlueGhost());
	enemy.push(new RedGhost());
	enemy.push(new RedGhost());
	enemy.push(new YellowGhost());
}

// level five enemy array declaration
function levelFive() {
	enemy = [];

	enemy.push(new PinkGhost());
	enemy.push(new RedGhost());
	enemy.push(new RedGhost());
	enemy.push(new BlueGhost());
	enemy.push(new YellowGhost());
	enemy.push(new YellowGhost());
}

// level six enemy array declaration
function levelSix() {
	enemy = [];

	enemy.push(new PinkGhost());
	enemy.push(new PinkGhost());
	enemy.push(new RedGhost());
	enemy.push(new RedGhost());
	enemy.push(new BlueGhost());
	enemy.push(new BlueGhost());
	enemy.push(new YellowGhost());
	enemy.push(new YellowGhost());

}
