var num=+process.argv[2];
console.log(numToBit(num));
function numToBit(num){
    var number = num;
    var result = [];
    while(number >= 1 ){
        result.unshift(Math.floor(number%2));
        number = number/2;
    }
    return result;
}
