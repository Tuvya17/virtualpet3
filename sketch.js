//Create variables here
var dog, happydog1, happydog2, foodS, foodStock,foodfeed, addFood, bedroomimg, gardenimg, washroomimg, saddogimg  

var currentTime;
function preload()
{
	//load images here
  happydog1 = loadImage("dogImg.png");
  happydog2 = loadImage("dogImg1.png");
  gardenimg = loadImage("Garden.png");
  bedroomimg = loadImage("BedRoom.png");
  washroomimg = loadImage("WashRoom.png");
  saddogimg = loadImage("LivingRoom.png");
  
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();
  dog = createSprite(400,500,50,50);
  dog.addImage(happydog1);
  dog.scale = 0.3;
  foodobj = new Food();
  foodobj.getFoodStock();
  foodobj.getfeedTime();
  foodobj.getgameState();
  
  foodfeed = createButton("Feed the dog");
  foodfeed.position(500,50);
  foodfeed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(600,50);
  addFood.mousePressed(addFoods);

  



}

function draw() {  
  background(46, 139, 87);
  
  
  drawSprites();
  //foodobj.display();
  fill(255,255,254);
  textSize(15);
  var lastFeedTime = foodobj.lastFed;
  if(lastFeedTime>=12){
    lastFeedTime=lastFeedTime-12+" PM" 
  }
  else if(lastFeedTime===0){
    lastFeedTime = "12 AM";
  }
  else{
    lastFeedTime = lastFeedTime+" AM";
  }
  
  text("Last feed: "+ lastFeedTime,350,65);


  

  
  currentTime = hour();
  if(currentTime===(foodobj.lastFed+1)){
    console.log("play");
    foodobj.updategameState("Playing");
    foodobj.garden();
    
  }
  else if(currentTime===(foodobj.lastFed+2)){
    foodobj.updategameState("Sleeping");
    foodobj.bedroom();
  }
  else if(currentTime>(foodobj.lastFed+2) && currentTime<=(foodobj.lastFed+4)){
    foodobj.updategameState("Bathing");
    foodobj.washroom();
  }
  else{
    foodobj.updategameState("Hungry");
    foodobj.display();
  }

  if(foodobj.gameState !== "Hungry"){
    foodfeed.hide();
    //dog.remove();
    addFood.hide();
  }
  else{
    foodfeed.show();
    addFood.show();
    //dog.addImage(saddogimg);
  }

  
}


function feedDog(){
  console.log("feed");
  console.log(foodobj.foodStock);
  dog.addImage(happydog2);
  
  foodobj.foodStock=foodobj.foodStock-1
  foodobj.updateFoodStock();
  database.ref('/').update({
    feedTime:hour()
  })
}


function addFoods(){
  foodobj.foodStock=foodobj.foodStock+1
  foodobj.updateFoodStock();
}

