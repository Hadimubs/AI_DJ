song="";
RightWristX=0;
LeftWristX=0;
scoreLeftWrist=0;
scoreRightWrist=0;
function preload(){
song=loadSound("music.mp3");
}
function setup(){
canvas=createCanvas(600,500);
canvas.center();
g=createCapture(VIDEO);
g.hide();
p=ml5.poseNet(g,PoseNetIsActive);
p.on('pose',GotPoses);
}

function PoseNetIsActive(){
console.log("PoseNet Is Initialized");
}

function GotPoses(result){
if (result.length>0) {
    console.log(result);

scoreLeftWrist=result[0].pose.keypoints[9].score;
scoreRightWrist=result[0].pose.keypoints[10].score;

RightWristX=result[0].pose.rightWrist.x;
LeftWristX=result[0].pose.leftWrist.x;
RightWristY=result[0].pose.rightWrist.y;
LeftWristY=result[0].pose.leftWrist.y;
console.log("Right Wrist X is  -  "+RightWristX);
console.log("Left Wrist X is  -  "+LeftWristX);
console.log("Right Wrist Y is  -  "+RightWristY);
console.log("Left Wrist Y is  -  "+LeftWristY);
}
}

function draw(){
image(g,0,0,600,500);
fill("red");
stroke("white");
if (scoreRightWrist>0.2) {
circle(RightWristX,RightWristY,20);


if (RightWristY>0&&RightWristY<=100) {
 song.rate(0.5);   
 document.getElementById("s").innerHTML="Song Speed Is 0.5x";
}
else if(RightWristY>100 && RightWristY<=200){
    song.rate(1);   
    document.getElementById("s").innerHTML="Song Speed Is 1x";
}

else if(RightWristY>200 && RightWristY<=300){
    song.rate(1.5);   
    document.getElementById("s").innerHTML="Song Speed Is 1.5x";
}

else if(RightWristY>300 && RightWristY<=400){
    song.rate(2);   
    document.getElementById("s").innerHTML="Song Speed Is 2x";
}

else if(RightWristY>400){
    song.rate(2.5);   
    document.getElementById("s").innerHTML="Song Speed Is 2.5x";
}

}
if(scoreLeftWrist>0.2){
circle(LeftWristX,LeftWristY,20);
L=Number(LeftWristY);

r=floor(L);
di=r/500;
document.getElementById("v").innerHTML="Volume = " + di;
song.setVolume(di);

}
}

function pl(){
song.play();
song.setVolume();
song.rate(1);
}
