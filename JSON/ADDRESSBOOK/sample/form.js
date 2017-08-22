var temp=1;
//var getData=[];
$('#add').click(submithandler);
function submithandler()
{
  //var testform=document.getElementById('form1');

  $.ajax({
    url:'/saving',
    type:'POST',
    data: {
      firstName:form1.fname.value,
      lastName:form1.lname.value,
      address:form1.addr.value,
      city:form1.cit.value,
      state:form1.sta.value,
      zip:form1.zi.value,
      phoneNumber:form1.pno.value
    },
    sucess: function(data)
    {
      alert("sucess");
    }
  });
}

function read()
{
  var getData=[];
  var promise = $.ajax({
    url:'/get',
    type:'GET'
  }).done(function(data)
  {
    document.write("Address Details:"+"<br>"+"<br>");

    var items=data.forEach(function(item)
  {
    getData.push(items);
    document.write("Reading data for person "+temp+"<br>");
    document.write("First Name: "+item.firstName+"<br>");
    // document.write("hiii");
    document.write("Last Name: "+item.lastName+"<br>");
    document.write("Address: "+item.address+"<br>");
    document.write("City: "+item.city+"<br>");
    document.write("State: "+item.state+"<br>");
    document.write("Zip Code: "+item.zip+"<br>");
    document.write("Phone Number: "+item.phoneNumber+"<br>"+"<br>");
    temp++;
  });
    alert("sucess");
    //document.write(getData);
    // document.write(getData);
    document.write(getData.length);
  })
console.log(promise);
print();
}
// document.write(getData.length);


//function to sort by zip
function sortByZip()
{
  var getData=[];
  var promise = $.ajax({
    url:'/get',
    type:'GET'
  }).done(function(data)
  {
    for(var i=0;i<data.length;i++)
    {
      getData.push(data[i]);
    }
    for(var j=0;j<getData.length-1;j++)
    {
      for(var k=0;k<getData.length-1-j;k++)
      {
        //document.write(getData[k].zip+","+getData[k+1].zip+",");
        if(getData[k].zip>getData[k+1].zip)
        {
          var temp1=getData[k];
          getData[k]=getData[k+1];
          getData[k+1]=temp1;
        }
      }
    }
    for(i=0;i<getData.length;i++)
    {
      document.write(JSON.stringify(getData[i])+"<br>");
    }
    alert("sucess");
  })
console.log(promise);
}



//function to sort by lastName
function sortByName()
{
  var getData=[];
  var promise = $.ajax({
    url:'/get',
    type:'GET'
  }).done(function(data)
  {
    for(var i=0;i<data.length;i++)
    {
      getData.push(data[i]);
    }
    for(var j=0;j<getData.length-1;j++)
    {
      for(var k=0;k<getData.length-1-j;k++)
      {
        //document.write(getData[k].zip+","+getData[k+1].zip+",");
        if(getData[k].lastName>getData[k+1].lastName)
        {
          var temp1=getData[k];
          getData[k]=getData[k+1];
          getData[k+1]=temp1;
        }
      }
    }
    for(i=0;i<getData.length;i++)
    {
      document.write(JSON.stringify(getData[i])+"<br>");
    }
    alert("sucess");
  })
console.log(promise);
}



//function to delete
function del()
{
  var phone=prompt("enter the number to delete");
  $.ajax({
    url:'/deleting',
    type:'POST',
    data: {
      phoneNumber: phone
    },
    sucess: function(data)
    {
      alert("sucess");
    }
  });
}











function search()
{
  var getData=[];
  var temp=0;
  var search=prompt("Enter the mobile no. whose info u want to search")
  var promise = $.ajax({
    url:'/get',
    type:'GET'
  }).done(function(data)
  {
    for(var i=0;i<data.length;i++)
    {
      getData.push(data[i]);
    }
    for(var j=0;j<getData.length;j++)
    {
      if(getData[j].phoneNumber==search)
      {
        document.write(JSON.stringify(getData[j]));
        temp++;
        break;
      }
    }
    if(temp==0)
    {
      document.write("Search not found");
    }
  })
}





// function search()
// {
//   var update=prompt("Enter your phone number");
//   var noOfUpdates=prompt("how many updates you want?");
//   for(var i=0;i<noOfUpdates;i++)
//   {
//     var toUpdate=prompt("what you want to update 1.firstName 2.lastName 3.address 4.city 5.state 6.zip 7.phoneNumber? 1/2/3/4/5/6/7");
//     var doUpdate=prompt("enter your update");
//     if(toUpdate==1)
//     {
//       getData[i].firstName=doUpdate;
//     }
//     if(toUpdate==2)
//     {
//       getData[i].lastName=doUpdate;
//     }
//     if(toUpdate==3)
//     {
//       getData[i].address=doUpdate;
//     }
//     if(toUpdate==4)
//     {
//       getData.city=doUpdate;
//     }
//     if(toUpdate==5)
//     {
//       getData[i].state=doUpdate;
//     }
//     if(toUpdate==6)
//     {
//       getData[i].zip=doUpdate;
//     }
//     if(toUpdate==7)
//     {
//       getData[i].phoneNumber=doUpdate;
//     }
//   }
// }
