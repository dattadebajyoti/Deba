var n=+process.argv[2];
var m=[];
   var i;
   var count=0;
   var distinct=0;
   for(i=0;i<n;i++)
   {
      var t= Math.random()*n;
      m[i]=t;
      console.log(t);
   }
   for(var j=0; j<m.length;j++)
   {  
      if(m[j]!=m[j+1])
      { 
          distinct++;
          console.log(m[j]);
      }
      else
      {
          count++;
          console.log(m[j]+"coupon already exists");
      }
    }

