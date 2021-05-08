class Food {
   constructor() {
      this.foodStock = 0
      this.lastFed = 0
      this.gameState = " "
      this.image = loadImage("Milk.png");
   }
   getFoodStock() {
      var foodStockref = database.ref("food");
      foodStockref.on('value', (data) => {
         this.foodStock = data.val();
      })

   }

   getfeedTime(){
      var lastFed = database.ref("feedTime");
      lastFed.on('value', (data) =>{
         this.lastFed = data.val();
      })
   }

   getgameState(){
      var readState = database.ref('gameState');
      readState.on("value",(data) =>{
         this.gameState = data.val();
      })

   }
   
   
   updateFoodStock() {
      database.ref('/').update({
         food: this.foodStock
      })
   }

   updategameState(updateactivity) {
      database.ref('/').update({
         gameState: updateactivity
      })
   }


   bedroom(){
      background(bedroomimg);

   }

   washroom(){
      background(washroomimg);

   }

   garden(){
      background(gardenimg);

   }
   
   

   display() {
      var x = 130, y = 150;
      imageMode(CENTER);
      //image(this.image,720,220,70,70); 
      if (this.foodStock != 0) {
         for (var i = 0; i < this.foodStock; i++) {
            if (i % 10 === 0) {
               x = 130;
               y = y + 50;
            }
            image(this.image, x, y, 50, 50);
            x = x + 30;
         }
      }
   }

}