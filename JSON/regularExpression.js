var message="Hello <<name>>, We have your full name  as <<full name>> in our system. your contact number is 91­-xxxxxxxxxx Please,let us know in case of any clarification Thank you BridgeLabz XX-XX-XXXX";
var pattern1=message.replace(/<<full name>>/i, "Debajyoti Datta");
var pattern2=pattern1.replace(/<<name>>/i, "Debajyoti Datta");
var pattern3=pattern2.replace(/91­-xxxxxxxxxx/i,"91-9436331967");
var pattern4=pattern3.replace(/XX-XX-XXXX/i,"20-01-2017");
console.log(pattern4);
