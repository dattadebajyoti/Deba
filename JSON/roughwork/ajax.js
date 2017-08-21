$(document).ready(function(){
    $("button").click(function(){
      //var myfile=JSON.stringify(personalData.json);
        $.get("demo_test.asp", function(data, status){
            document.write("Data: " + data + "\nStatus: " + status);
        });
    });
});
