var n=+process.argv[2];
//take input from user how many number he wants to store in a variable n
var m=[];
// m is an array for storing the coupon the coupon numbers
   var i;
   var count=0;
   //count is to count the total number of coupons generated
   var distinct=0;
   //distinct is to count the number of distinct coupons
   for(i=0;i<n;i++)
   {
      var t= Math.random()*n;
      //for every value from 0 to n-1, generate a random() to generate a value and store it in the variable t
      m[i]=t;
      //for every t store it in an array m
      console.log(t);
   }
   for(var j=0; j<m.length;j++)
   {
     //logic for comparing the distinct coupon numbers
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
