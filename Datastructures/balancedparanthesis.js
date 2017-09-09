//function to check balanced expression
function checkBalanced() {
  //creating a stack array so that the characters are pushed and popped
  var stack = new Array();
  var input = document.getElementById('exp').value;
  var inputStr = input.toString();
  var top = 0;

  //pushing the character in stack
  function pushing(top, exp) {
    if (exp != null) {
      stack[top] = exp;
    }
  }

  //deleting the last element from the stack
  function popping(top, exp) {
    if (stack[top] == exp) {
      stack.splice(top, 1);
      return true;
    } else return false
  }
  for (i = 0; i < inputStr.length; i++) {
    //checking for opening paranthesis
    if (inputStr[i] == "{" || inputStr[i] == "[" || inputStr[i] == "(") {
      top++;
      pushing(top, inputStr[i]);
    }
    //checking for closing paranthesis
    else if (inputStr[i] == "}") {
      var check = "{";
      if (popping(top, check) == true) {
        top--;
      }
    } else if (inputStr[i] == "]") {
      var check = "[";
      if (popping(top, check) == true) {
        top--;
      }
    } else if (inputStr[i] == ")") {
      var check = "(";
      if (popping(top, check) == true) {
        top--;
      }
    }
  }
  if (top != 0) {
    document.write("user input:" + inputStr + "<br>");
    document.write("the given arithmetic expression is not balanced");

  }
  if (top == 0) {
    document.write("user input:" + inputStr + "<br>");
    document.write("the given arithmetic expression is balanced");
  }
}
