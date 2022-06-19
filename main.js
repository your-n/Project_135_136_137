video = "";
status = "";
objects = [];


function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
  }

function start(){
objectDetector = ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Person";
}

function draw(){
image(video, 0, 0, 600, 400);
if(status != "")
{
objectDetector.detect(video, gotResults);
}
}

function modelLoaded(){
console.log("Model Loaded!");
status = true;
video.loop();
video.speed(1);
video.volume(0);
}

function gotResults(error, results){
if (error)
{
console.log(error);
}
console.log(results);
objects= results;
for (i = 0; i < objects.length; i++) 
{ 
document.getElementById("status").innerHTML = "Status: Person detected";
document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: "+ objects.length;

fill("#ab83c9");
stroke("#ab83c9");
noFill();
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
percent = floor(objects[i].confidence*100);
text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
}
}
