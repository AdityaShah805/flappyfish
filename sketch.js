var bg,bgimage ;
var fish,fishimage;
var Gamestate="play";
var shark1group,shark2group;
var gameover;
var score=0;
function  preload(){
bgimage=loadImage("water.jpg");
fishimage=loadImage("fish.png");
shark1image=loadImage("shark1.png");
shark2image=loadImage("shark2.png");
gameoverimage=loadImage("GAMEOVER.png");

die=loadSound("sfx_die.wav");
hit=loadSound("sfx_hit.wav");
point=loadSound("sfx_point.wav");
wing=loadSound("sfx_wing.wav");
swoosh=loadSound("sfx_swooshing.wav");


}       
function setup() {
  createCanvas(displayWidth-80,displayHeight-170);
 bg=createSprite(600,600,1200,400);
  bg.addImage("water",bgimage)
  bg.scale=8;
  bg.x=bg.width/2;
bg.velocityX=-5;

fish=createSprite(400,400,100,100);
fish.addImage("wfish",fishimage)
fish.velocityY=6;
fish.scale=0.4;

gameover=createSprite(400,400,100,100);
gameover.addImage("game",gameoverimage);
gameover.visible=false;

shark1group=createGroup();
shark2group=createGroup();
}

function draw() {
// background(0,0,0);  
drawSprites();
textSize(50);
textFont("jokerman");
fill("yellow");
stroke("black");
strokeWeight(5);
text("SCORE: "+score,900,70);
 if(Gamestate === "play"){
   if(frameCount%100===0){
     score=score+1;
   }

  if(bg.x<0){
    bg.x=bg.width/2
  }
  if(keyDown("space")){
    fish.velocityY=-10;
    wing.play();
  }
 
  fish.velocityY=fish.velocityY+1;
spawnshark1();
spawnshark2();
if(fish.isTouching(shark1group)||fish.isTouching(shark2group)){
  Gamestate="end";
  die.play();
 }
 if(fish.y>500){
   hit.play();
 }
}
 else if(Gamestate==="end"){
 bg.velocityX=0;
 fish.velocityY=0;
 shark1group.destroyEach();
 shark2group.destroyEach();  
 gameover.visible=true;

 }

  
//  textSize(25);
// text("x:"+mouseX,200,200)
 //text("y:"+mouseY,200,250)
}
function spawnshark1(){
  if(World.frameCount%100===0){
    var shark1=createSprite(800,random(50,200),100,100);
    shark1.setCollider("rectangle",0,0,20,20);
    shark1.addImage(shark1image);
    shark1.velocityX=-5;
    shark1.scale=0.5;
    shark1group.add(shark1);
    point.play();
   }
}
function spawnshark2(){
  if(World.frameCount%100===0){
    var shark2=createSprite(800,random(400,600),100,100);
    shark2.addImage(shark2image);
    shark2.setCollider("rectangle",0,0,20,20);
    shark2.velocityX=-5;
    shark2.scale=0.5;
    shark2group.add(shark2);
   }
}