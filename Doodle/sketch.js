// Find my blog at https://codeheir.com/
// I do a lot of p5.js stuff that might interest you!
// var pname = prompt("Enter your name");
let doodler;

let gap;
let platforms = [];

let score;
let bg;
let doodlerLeft;
let doodlerRight;
let platformImg;

function setup() {
  createCanvas(400, 500);

  platforms = [];
  score = 0;
  bg = loadImage('bg.png'); // add this to load the background
  doodlerLeft = loadImage('doodler-left.png');
  doodlerRight = loadImage('doodler-right.png');
  doodler = new Doodler(doodlerLeft, doodlerRight);
  platformImg = loadImage('platform.png');

  let platformCount = 4;
  gap = height / platformCount;
  for (let i = 1; i < 10; i++) {
    platforms.push(new Platform(random(width), (height * 1.5) - i * gap, platformImg))
  }

}

function draw() {
  image(bg, 0, 0);
  if (doodler.velocity > 10) {
    noLoop();
    gameOver();
  } else {
    translate(0, width / 2 - doodler.y);

    push();
    fill(0)
    textSize(30);
    textAlign(CENTER);
    text(score, width / 2, doodler.y - 150);
    pop();

    doodler.draw();
    doodler.update(platforms);




    for (let platform of platforms) {
      platform.draw();
    }


    // create more platforms as the doodler moves up the screen
    if (doodler.y < platforms[platforms.length - 1].y + 200) {
      platforms.push(new Platform(random(width), platforms[platforms.length - 1].y - gap, platformImg));
    }

    if (platforms[0].y > doodler.y + 400) {
      platforms.splice(0, 1);
      score++;
    }


  }


}

function gameOver() {
  
  textSize(40);
  image(bg, 0, 0);
  textAlign(CENTER);
  text(`You scored ${score}`, width / 2,  50 );
  textSize(25);
  text(`How to Play!`, width / 2,100);
  text(`-To play, 
  Jump simply move left to right 
  to reach the platforms`, width / 2,150);
  text(`-The gameplay is endless,
  so jump for as long as possible 
  to achieve your greatest score.`, width / 2,250);
  text(`-For higher jump u need to jump
   on the below platform from 
   current platform to get to 
   above plateforms`, width / 2,350);
  
   textSize(30);
  text(`Press Spacebar to play`, width / 2, height / 2 + 240);
}


function keyPressed() {
  if (key == ' ') {
    setup();
    loop();
  }
}