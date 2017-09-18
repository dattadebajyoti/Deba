var temp=0;
//function to add entry
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
//function to print entry
function printEntries()
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
    if(item!=null)
    {
      temp=temp+1;
      document.write("Reading data for person "+temp+"<br>");
      document.write("First Name: "+item.firstName+"<br>");
      // document.write("hiii");
      document.write("Last Name: "+item.lastName+"<br>");
      document.write("Address: "+item.address+"<br>");
      document.write("City: "+item.city+"<br>");
      document.write("State: "+item.state+"<br>");
      document.write("Zip Code: "+item.zip+"<br>");
      document.write("Phone Number: "+item.phoneNumber+"<br>"+"<br>");
      //temp++;
    }

  });
    alert("sucess");
    //document.write(getData);
    // document.write(getData);
    // for(var i=0;i<getData.length;i++)
    // {
    //   if(items!=null)
    //   {
    //     document.write("Reading data for person "+temp+"<br>");
    //     document.write("First Name: "+item.firstName+"<br>");
    //     // document.write("hiii");
    //     document.write("Last Name: "+item.lastName+"<br>");
    //     document.write("Address: "+item.address+"<br>");
    //     document.write("City: "+item.city+"<br>");
    //     document.write("State: "+item.state+"<br>");
    //     document.write("Zip Code: "+item.zip+"<br>");
    //     document.write("Phone Number: "+item.phoneNumber+"<br>"+"<br>");
    //     temp++;
    //   }
    // }
    document.write("total number of entries are: "+temp);
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
      if(data[i]!=null)
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
      if(data[i]!=null)
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
function deleteEntry()
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










// //function to search
// function search()
// {
//   var getData=[];
//   var temp=0;
//   var search=prompt("Enter the mobile no. whose info u want to search")
//   var promise = $.ajax({
//     url:'/get',
//     type:'GET'
//   }).done(function(data)
//   {
//     for(var i=0;i<data.length;i++)
//     {
//       if(data[i]!=null)
//       getData.push(data[i]);
//     }
//     for(var j=0;j<getData.length;j++)
//     {
//       if(getData[j].phoneNumber==search)
//       {
//         document.write(JSON.stringify(getData[j]));
//         temp++;
//         break;
//       }
//     }
//     if(temp==0)
//     {
//       document.write("Search not found");
//     }
//   })
// }


//function to search using elasticsearch
function search()
{
  var searchValue=prompt("enter what you want to search");
  var promise = $.ajax({
      url:'/elasticSearch',
      type:'POST',
      data: {
        search: searchValue
      }
    }).done(function(result){
      //document.write(result.details[0]);
      for(var i=0;i<result.details.length;i++)
      {
        console.log(i);
        if(result.details!=null)
        {
          document.write(result.details[i]+"    "+"<br>");
        }
      }
    });
}




//function to edit
function edit()
{
  //var update=prompt("Enter your phone number");
  var doUpdate1=prompt("enter your first name");
  var doUpdate2=prompt("enter your last name");
  var doUpdate3=prompt("enter your address");
  var doUpdate4=prompt("enter your city");
  var doUpdate5=prompt("enter your state");
  var doUpdate6=prompt("enter your zip code");
  var doUpdate7=prompt("enter your phone number");
  $.ajax({
    url:'/editing',
    type:'POST',
    data: {
           //verifyPhone:update,

           firstName:doUpdate1,


           lastName:doUpdate2,


           address:doUpdate3,


           city:doUpdate4,


           state:doUpdate5,


           zip:doUpdate6,


           phoneNumber:doUpdate7
    },
    sucess: function(data)
    {
      alert("sucess");
    }
  });
}
