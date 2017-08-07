function anagram()
{
  var string1=document.getElementById("i1").value;
  var string2=document.getElementById("i2").value;
  if(string1.length!=string2.length)
  {
    document.write(string1+" and "+string2+" are not anagram of each other");
    return;
  }
  var count=0;
  for(j=0;j<string2.length;j++)
  {

    for(var i=0;i<string1.length;i++)
    {
      if(string1[i]==string2[j])
      {
        count++;
        break;
      }
    }
  }
  if(count==string1.length)
    {
        document.write(string1+" and "+string2+" are anagram of each other");
    }
  else
    {
        document.write(string1+" and "+string2+" are not anagram of each other");
    }
}
