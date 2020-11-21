//Create variables here
var a=0;
var database;
var dog
var happyDog;
var foodS;
var foodStock;
var dogHappy;
var input;
var input2;
var input3;
var input4;
var input5;
var sleep;
var sleeping;
var play;
var playing;
var feed;
var addFood;
var fedTime;
var lastFed
function preload()
{
  //load images here
  happyDog=loadImage("images/dogImg.png")
  dogHappy=loadImage("images/dogImg1.png")
  sleeping= loadImage("dog sleep.jpg");
  playing=loadImage("dog play.jpg")
}

function setup() {
  createCanvas(1000, 600);
  database=firebase.database();
  console.log(database)
  dog = createSprite(150,200,20,20)
  dog.addImage(happyDog)
  dog.scale=0.5
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)
  fill("blue")
  input = createInput("Your puppy's name");
  input2 = createInput("Your puppy's favourite food");
  input3 = createInput("Your puppy's favourite color");
  input4= createInput("Your puppy's best friend");
  
  input.position(800, 100);
  input2.position(800, 150);
  input3.position(800, 200);
  input4.position(800, 250);
  sleep = createButton('sleep');
  play = createButton('play');
  sleep.position(600,300)
  play.position(600,350)
  feed = createButton('feed your dog')
  feed.position(600,400)
  addFood = createButton('add food to  feed your dog')
  addFood.position(600,450)
}


function draw() {  
  background("white")
  drawSprites();
  //add styles here
feed.mousePressed(()=>{
  writeStock(foodS)
  dog.addImage(dogHappy)
  a=a+1
})


addFood.mousePressed(()=>{
  addStock(foodS)
  dog.addImage(happyDog)
  a=a-1
})


sleep.mousePressed(()=>{
dog.addImage(sleeping)
})
play.mousePressed(()=>{
  dog.addImage(playing)
  })
fill("red")
textSize(20)
//text("Press UP arrow to feed your puppy",200,550)
//text("Press DOWN arrow to add food",200,500)
text("food remaining  : " + foodS,350,200)
}
if(a==1){
  textSize(30)
  text("Thank you for feeding me",300,300)
}
console.log(a)
function readStock(data){
  foodS=data.val()
}


function writeStock(x){
  if(x<=0){
    x=0
  }else{
    x=x-1;
    a=a-1
  }
  database.ref('/').update({
    Food:x
  });
}
function addStock(x){
 if(x!=20){
    x=x+1;
    a=a+1
  }
  
  database.ref('/').update({
    Food:x
  });
}
