let capture;
let posenet;
let singlePose;
let skeleton;
function setup() {
  createCanvas(800,500);
  capture = createCapture(VIDEO);  
  capture.hide();
  posenet=ml5.poseNet(capture,modelLoaded);
  posenet.on('pose',receivedPoses);
}
function modelLoaded(){
   console.log("Model Loaded");

}
function receivedPoses(poses){
    console.log(poses);
    if(poses.length>0){
        singlePose=poses[0].pose;
        skeleton=poses[0].skeleton;
    }
}
function draw(){
    image(capture,0,0);
    fill(255,0,0);
    if(singlePose)
    {
    for(let i=0;i<singlePose.keypoints.length;i++){
        let x=singlePose.keypoints[i].position.x;
        let y=singlePose.keypoints[i].position.y;
        ellipse(x,y,10,10);

    }
    stroke(255,255,255);
    strokeWeight(5);
    for(let i=0;i<skeleton.length;i++){
        let a=skeleton[i][0];
        let b=skeleton[i][1];
        line(a.position.x,a.position.y,b.position.x,b.position.y);
    }
   }
}