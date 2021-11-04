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
        // console.log("FOUNDD")
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
}

function smallerPair(values){
    fill_array(level,values[0][0], values[0][1], 3, 0);
    c1 = count;
    console.log(c1)
    // console.log(values[0][0], values[0][1])
    // console.log(c1)
    fill_array(level, values[0][0], values[0][1], 0, 3);
    count = 0;
    fill_array(level,values[1][0], values[1][1], 3, 0);
    c2 = count;
    // console.log(values[1][0], values[1][1])
    console.log(c2);
    fill_array(level, values[1][0], values[1][1], 0, 3);
    count = 0;
    // if((c1<10000 || c2<10000)){
        if(c1<c2){
          return([values[0][0], values[0][1]])
        }
        else{
          return([values[1][0], values[1][1]])
        }
    // }
    // else{
    //     c1 = 0;
    //     c2 = 0;
    //     console.log("NAHIII")
    //     return([0,0])
    // }


}

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
        console.log("PVALSSSS");
        for (let i = 0; i< pVals.length; i++){
            console.log(pVals)
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
}
