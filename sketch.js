// let level = [][]



function preload() {
  // tile = loadImage('assets/tile3.png');
  tile = loadImage('assets/Tiles/tile2.png');
  // Good Tiles
  // tile = loadImage('assets/Tiles/tile.png');

}

function setup() {
  createCanvas(762,502);
}

function draw(){
  // background(5,5,43,255);
  background(0);
  // image(tile, 0,0, 20,20)
  for (let i =0; i<37; i++){
    for(let j=0; j<24; j++){
      image(tile,i*20,j*20,24,24)
    }
  }
}
