// Aven Le Zhou https://www.aven.cc
// IMA, NYU Shanghai
// Artificial Intelligence Arts Fall 2019 https://wp.nyu.edu/shanghai-ima-aiarts/

let video;
let poseNet;
let poses;
//let lifespan;
let graphic;

function setup() {
  createCanvas(windowWidth, windowHeight);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function (results) {
    poses = results;
  });

  graphic = createGraphics(width, height, RGB);
}


function draw() {
  //background(0);
  graphic.background(0);

  if (poses != undefined ) {
    for (let i = 0; i < poses.length; i++) {
      for (let j=0; j< poses[i].pose.keypoints.length; j++) {

        let partname = poses[i].pose.keypoints[j].part;
        let score = poses[i].pose.keypoints[j].score;
        let x = poses[i].pose.keypoints[j].position.x;
        let y = poses[i].pose.keypoints[j].position.y;

        if (partname == "leftWrist") {
          if (score > 0.8) {
            playSound(square, x*3, 0.5);
            let randomX = Math.floor(randomNumber(0,windowWidth));
            let randomY = Math.floor(randomNumber(0,windowHeight));
            console.log('x' + randomX);
            console.log('y' + randomY);
            graphic.noStroke();
            graphic.fill(180, 120, 10);
            graphic.ellipse(randomX, randomY, x/7, x/7);
            
            
            
        }
      }

      }
    }
  }

  //image(video, 0, 0);
  blendMode(ADD);
  image(graphic, 0, 0);
  blendMode(NORMAL);

  text("Press SpaceBar to clear the drawing.")
}

function randomNumber(min, max) {  
  return Math.random() * (max - min) + min; 
}  

function modelReady() {
  console.log("Model Ready!");
}


function keyPressed() {
  if (key == " ") {
    graphic.background(0);
  }
}
