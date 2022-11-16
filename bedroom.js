img = "";
stats = "";
dtres = [];
function preload(){
    img = loadImage("bedroom.webp");
}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    od = ml5.objectDetector('cocossd', modelLoaded);
}

function draw(){
    image(img,0,0,480,380);
    if (stats != "") {
        for ( i = 0; i< dtres.length; i++) {
            document.getElementById("stats").innerHTML = "Status : Objects Detected";

            fill("red");
            stroke("red");
            percent = floor(dtres[i].confidence *100);
            text(dtres[i].label +" "+percent+"%", dtres[i].x +15, dtres[i].y +15);
            noFill();
            rect(dtres[i].x, dtres[i].y, dtres[i].width, dtres[i].height);
        }
    }
}
function modelLoaded(){
    console.log("Model is Loaded");
    stats = true;
    od.detect(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        dtres = results;
    }
}