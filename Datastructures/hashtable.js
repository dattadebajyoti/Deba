//take user input for the number to be searched
var search = +process.argv[2];
// var search=search1.toString("UTF8");
console.log("the number to be searched is: " + search);
//requiring the fs module
var fs = require("fs");
//reading the text file
var text = fs.readFileSync("hashtable.txt").toString("UTF8");
var myarray1 = text.split(",");
var myarray = [];
//inserting all the data from the text file into an array
for (var i = 0; i < myarray1.length; i++) {
  myarray[i] = parseInt(myarray1[i]);
}
// for(i=0;i<myarray.length;i++)
// {
//   console.log(myarray[i]);
// }
//
// console.log("_____________________________");

//defining the hash entry
var HashEntry = function(key, value) {
  this.key = key;
  this.value = value;
  this.nextEntry = undefined;
};
//function to get the key,valu and the next entry is defined here
HashEntry.prototype = {
  getKey: function() {
    return this.key;
  },
  getValue: function() {
    return this.value;
  },
  setNext: function(entry) {
    this.nextEntry = entry;
  },
  getNext: function() {
    return this.nextEntry;
  }

};

//defining the hash table
var HashTable = function() {
  this.tableSize = 100;
  this.table = []; //this will be holding HashEntry(s)
};

HashTable.prototype = {
  hashFunction: function(input) {
    //return an hash
    return input % this.tableSize;
  },
  put: function(key, value) {
    var hash = this.hashFunction(key);
    var table = this.table;
    if (table[hash] === undefined) {
      table[hash] = new HashEntry(key, value);
    } else {
      var curr = table[hash];
      while (curr.getNext() !== undefined) {
        curr = curr.getNext();
      }
      curr.setNext(new HashEntry(key, value));
    }
  },
  get: function(key) {
    var hash = this.hashFunction(key);
    var table = this.table;
    var currEntry = table[hash];
    if (currEntry === undefined) return null;
    if (currEntry.getKey() === key) {
      return currEntry.getValue();
    } else {
      while (currEntry.getNext() !== undefined) {
        currEntry = currEntry.getNext();
        if (currEntry.getKey() === key) {
          return currEntry.getValue();
        }
      }
    }
  }
};

//creating an object of the hash table
var hashTable = new HashTable();
//printing the hash table
for (i = 0; i < myarray.length; i++) {
  hashTable.put(myarray[i], myarray[i]);
  console.log(hashTable.get(myarray[i]));
}
//logic for searching in the hash table
if (search == parseInt(hashTable.get(search)))
  console.log(search + " is found");
// console.log("the entered number: "+parseInt(hashTable.get(search))+" is found");
//save into the file the search entered by the user
else {
  fs.appendFile('hashtable.txt', "," + search, function(err) {
    if (err) throw err;
    console.log('Saved!');
  });
}
