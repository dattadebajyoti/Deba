var fs = require('fs');
//read the jason file
fs.readFile('inventorydetails.json', 'utf8', function (err, data) {
  if (err) throw err;
  //parse the json data in the variable jsonData
  var jsonData = JSON.parse(data);
  console.log("--------------Inventory Information --------");
  for (var i = 0; i < jsonData.length; ++i) {
    console.log("Inventory: "+jsonData[i].Inventory);
    console.log("Weight: "+jsonData[i].Weight);
    console.log("Cost per kg: "+jsonData[i].Cost);
    console.log("----------------------------------------");
  }
});
