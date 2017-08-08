function mergesort()
{
  var myarray=new Array();
  var n1=document.getElementById("i1").value;
  for(var i=0;i<n1;i++)
  {
    var a=parseInt(prompt("enter integer value"));
    myarray.push(a);
  }
  document.write(mergeSort(myarray));
}




function mergeSort(arr)
{

    if (arr.length < 2)
        return arr;
    var middle = parseInt(arr.length / 2);
    var left   = arr.slice(0, middle);
    var right  = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right)
{
    var result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}
