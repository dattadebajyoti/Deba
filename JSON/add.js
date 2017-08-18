var getData=" ";
var fs=require('fs');
readFile='personalData.json';
getData=JSON.parse(fs.readFileSync(readFile));
//var express=require('express');
function add()
{
  var firstName=document.getElementById("fname").value;
  var lastName=document.getElementById("lname").value;
  var address=document.getElementById("add").value;
  var city=document.getElementById("cit").value;
  var state=document.getElementById("sta").value;
  var zip=document.getElementById("zi").value;
  var phoneNumber=document.getElementById("pno").value;
  getData.personalData.push(
    {
      "firstName": "firstName",
      "lastName": "lastName",
      "address": "address",
      "city": "city",
      "state": "state",
      "zip": "zip",
      "phoneNumber": "phoneNumber"
    }
  );
}

//function to print the info
function print()
{
  var keep=[];
  for(var i=0;i<getData.personalData.length;i++)
  {
    keep[i]=getData.personalData[i].firstName;
    document.write(keep[i]);
    //document.write("First Name: "+getData.personalData[i].firstName);
    // document.write("Last Name: "+getData.personalData[i].lastName);
    // document.write("Address: "+getData.personalData[i].address);
    // document.write("State: "+getData.personalData[i].state);
    // document.write("Zip: "+getData.personalData[i].zip);
    // document.write("Phone Number: "+getData.personalData[i].phoneNumber);
    // documnet.write("<br>")
  }
}
