var name=process.argv[2];
var weight=+process.argv[3];
var price=+process.argv[4];
var fs=require('fs');
var store=" ";
var readFile='inventory.json';
inventoryDetails();
function inventoryDetails()
{
   store=JSON.parse(fs.readFileSync(readFile));
   addtoStore(name,weight,price);
}

function addtoStore(name,weight,price)
{
   //var totPrice=0;
   store.inventory.push(
      {
         "name":name,
         "weight":weight,
         "price_per_kg":price
      }
   );
   for(var i=0;i<store.inventory.length;i++)
   {
       console.log("name: "+store.inventory[i].name);
       console.log("Weight "+store.inventory[i].weight);
       console.log("Price: "+store.inventory[i].price_per_kg);
       var totPrice=store.inventory[i].weight*store.inventory[i].price_per_kg;
       console.log("total price for "+store.inventory[i].name+" is "+totPrice);
       console.log("------------------");
   }
}
