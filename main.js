video="";
status="";
objects= [];
function preload(){
    video = createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas = createCanvas(500,400);
     canvas.center();
    
}
function draw(){
    image (video,0,0,500,400);
    if (status != "") {
        objectDetector.detect(video, gotResults);
        for (i =0;i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Objects Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are: "+objects.length;
        percent = floor(objects[i].confidence*100);
        fill(255,0,0)
        text(objects[i].label + ", " + percent+"%", objects[i].x+15,objects[i].y+15);
        noFill();
        stroke(255,0,0);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }

}
function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects...";
    
}
function modelLoaded(){
    console.log("Model Is Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResults(error,results){
    if (error) {
        console.error(error);
    } else {
       console.log(results);
       objects = results;
    }
}