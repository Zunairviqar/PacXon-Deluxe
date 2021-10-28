// let level = [][]



function preload() {
  // tile = loadImage('assets/tile3.png');
  // tile = loadImage('assets/tile2.png');
  tile = loadImage('assets/tile.png');

}

function setup() {
  createCanvas(760,500);
}

function draw(){
  // background(5,5,43,255);
  background(120);
  // image(tile, 0,0, 20,20)
  for (let i =0; i<50; i++){
    for(let j=0; j<30; j++){
      image(tile,i*20,j*20,24,24)
    }
  }
}
