function add(x, y, callback) {
    console.log("take value");
    callback(x+y);
}
add(10, 20, function(res) {
    console.log("x" + "+" +"y"+"="+res);
});
