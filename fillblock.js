function fill_array(level, r, c, newColor, current){
    if(r < 0){
        return;
    }
    if(c < 0){
        return;
    }
    if(r > level.length){
        return;
    }
    if(c > level[r].length){
        return;
    }
    if(level[r][c] === 2){
        count = 10000;
        return;
    }
    if(level[r][c] !== current){
        return;
    }

     level[r][c] = newColor;
     count = count + 1;
     fill_array(level, r - 1, c, newColor, current);
     fill_array(level, r + 1, c, newColor, current);
     fill_array(level, r, c - 1, newColor, current);
     fill_array(level, r, c + 1, newColor, current);

     return level
};

function smallerPair(values){
    areas = [];
    pairs = [];
    let enemfound = false;
    for (let i = 0; i< values.length; i ++){
      console.log(values[i]);
      fill_array(level,values[i][0], values[i][1], 3, 0);
      c1 = count;
      fill_array(level, values[i][0], values[i][1], 0, 3);
      count = 0;
      console.log(c1);
      if(c1<1000){
        areas.push(c1);
        pairs.push(values[i]);
        enemfound = true;
      }
    }
    console.log(pairs);
    console.log(areas);
    if(enemfound == false){
      maxA = max(areas)
      maxIndex = areas.indexOf(maxA);
      pairs.splice(maxIndex,1);
    }
    console.log(pairs);
    return pairs;
};

function maxAreaOfIsland(grid) {
    let maxArea = 10000
    let compass = [[-1, 0], [0, -1], [1, 0], [0, 1]];

    let prow;
    let pcol;
    let smallVals = [];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 0) {
                flood([[i, j]])
            }
        }
    }
    return maxArea, smallVals
    function flood(stack) {
        let currentArea = 0
        while (stack.length) {
            let [row, col] = stack.pop()
            if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length || grid[row][col] === 1) {
                continue
            }
            currentArea++
            grid[row][col] = 1
            prow = row;
            pcol = col;
            for (const direction of compass) {
                stack.push([row + direction[0], col + direction[1]])
            }
        }
        smallVals.push([prow,pcol]);
        maxArea = Math.min(maxArea, currentArea)
    }
};

function makeDeepCopy(g) {
  var gridCopy = [];

  for (var x = 0; x < g.length; x++) {
    var newRow = [];

    for (var y = 0; y < g[x].length; y++) {
      newRow.push(g[x][y])
    }
    gridCopy.push(newRow);
  }
  return gridCopy;
};
