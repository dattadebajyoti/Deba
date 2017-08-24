function readArray()
{
  //read the string from user input into a variable string
  var string=document.getElementById("i1").value;
  document.write("All the possible permutations are: "+"<br>"+permut(string));
}
//function to permutate the string
function permut(string) {
  //check whether thee sting contains only 1 character or not
  if (string.length < 2) return string;
  //declare an array permutations for storing the permutated string
  var permutations = [];
  //using a variable i to iterate through the whole string
  for (var i=0; i<string.length; i++) {
      var char = string[i];
  if (string.indexOf(char) != i)
          continue;
  //slice the string
  var remainingString = string.slice(0,i) + string.slice(i+1,string.length);
  for (var subPermutation of permut(remainingString))
          permutations.push(char + subPermutation);
   }
  return permutations;
}
