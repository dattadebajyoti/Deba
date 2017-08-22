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
  for(var i=0;i<getData.personalData.length;i++)
  {
    if(getData.personalData[i]!=null)
    {
      document.write("First Name: "+getData.personalData[i].firstName);
      document.write("Last Name: "+getData.personalData[i].lastName);
      document.write("Address: "+getData.personalData[i].address);
      document.write("State: "+getData.personalData[i].state);
      document.write("city:"+getData.personalData[i].city);
      document.write("Zip: "+getData.personalData[i].zip);
      document.write("Phone Number: "+getData.personalData[i].phoneNumber);
      documnet.write("<br>");
    }
  }
}

//sorting by name
function sortByName()
{
  for(var j=0;j<getData.personalData.length-1;j++)
  {
    for(var k=0;k<getData.personalData.length-1-j;k++)
    {
      if(getData.personalData[k].lastName>getData.personalData[k+1].lastName)
      {
        var temp1=getData.personalData[k];
        getData.personalData[k]=getData.personalData[k+1];
        getData.personalData[k+1]=temp1;
      }
    }
  }
  print();
}

//sorting by Zip code

function sortByZip()
{
  for(var j=0;j<getData.personalData.length-1;j++)
  {
    for(var k=0;k<getData.personalData.length-1-j;k++)
    {
      if(getData.personalData[k].zip>getData.personalData[k+1].zip)
      {
        var temp1=getData.personalData[k];
        getData.personalData[k]=getData.personalData[k+1];
        getData.personalData[k+1]=temp1;
      }
    }
  }
  print();
}


//function to delete a info
function del()
{
  var pno=document.getElementById("pno").value;
  var zi=document.getElementById("zi").value;
  for(var i=0;i<getData.personalData.length;i++)
  {
    if(getData.personalData[i].phoneNumber==pno)
    {
      if(getData.personalData[i].zip==zi)
      {
        delete getData.personalData[i];
        break;
      }
    }
  }
  print();
}


//function to edit or update the details
function edit()
{
  var update=document.getElementById("pno");
  var noOfUpdates=prompt("how many updates you want?");
  for(var i=0;i<noOfUpdates;i++)
  {
    var toUpdate=prompt("what you want to update 1.firstName 2.lastName 3.address 4.city 5.state 6.zip 7.phoneNumber? 1/2/3/4/5/6/7");
    var doUpdate=prompt("enter your update");
    if(toUpdate==1)
    {
      getData.personalData[i].firstName=doUpdate;
    }
    if(toUpdate==2)
    {
      getData.personalData[i].lastName=doUpdate;
    }
    if(toUpdate==3)
    {
      getData.personalData[i].address=doUpdate;
    }
    if(toUpdate==4)
    {
      getData.personalData[i].city=doUpdate;
    }
    if(toUpdate==5)
    {
      getData.personalData[i].state=doUpdate;
    }
    if(toUpdate==6)
    {
      getData.personalData[i].zip=doUpdate;
    }
    if(toUpdate==7)
    {
      getData.personalData[i].phoneNumber=doUpdate;
    }
  }
  print();
}
