var str=[];
var items=[];
str="(5+6)∗(7+8)/(4+3)(5+6)∗(7+8)/(4+3)";
function stack()
{
  this.push=function(element)
  {
    items.push(element);
  };
  this.pop=function()
  {
    return items.pop();
  };
  this.peek=function()
  {
    return items.length-1;
  };
  this.top=function()
  {
    return items.length;
  };
  this.clear=function()
  {
    items=[];
    return items;
  };
  this.isEmpty=function()
  {
    return items.length==0;
  };
  this.print=function()
  {
    console.log(items.toString());
  };
}

var stack=new stack();

for(var i=0;i<str.length;i++)
{
  stack.push(str[i]);
}
stack.print();

for(i=0;i<str.length;i++)
{
  if(str[i]=='(')
  {
    for(var j=1;j<str.length;j++)
    {
      if(str[j]==')')
      {
        for(var k=0;k<=j;k++)
        stack.pop();
      }
    }
  }
}

var t=stack.isEmpty();
if(t==1)
console.log("the given expression is balanced");
else
console.log("the given expression is not balanced");
