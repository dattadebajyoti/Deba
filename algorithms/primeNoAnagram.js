var arr = [];
var arr2 = [];
prime_start_end(0, 1000);

function prime_start_end(s, e) {
  var start = s;
  var end = e;
  var flag = 0;
  for (i = start; i <= end; i++) {
    flag = 0;
    for (j = 2; j <= i / 2; j++) {
      if (i % j == 0) {
        flag = 1;
        break;
      }
    }
    if (flag == 0) {
      arr.push(i);
    }
  }
}
var size = arr.length;
anagram(arr, size);
var x, y;

function anagram(arr, size) {
  var flag;
  for (i = 0; i < size; i++) {
    if (arr[i] > 10) {
      var no1 = arr[i];
      var a = Math.floor(no1 / 10);
      var b = no1 - a * 10;
      for (j = i + 1; j < size; j++) {
        var no2 = arr[j];
        var c = Math.floor(no2 / 10);
        var d = no2 - c * 10;
        if (a == d && b == c) {

          console.log(no2 + " is a anagram of " + no1);
          break;

        } else {
          continue;
        }
      }
    }
    if (arr[i] > 100) {
      var no1 = arr[i];
      var a = Math.floor(no1 / 100);
      var b = no1 - a * 100;
      var c = Math.floor(b / 10);
      var d = b - c * 10;
      for (j = i + 1; j < size; j++) {

        var no2 = arr[j];
        var e = Math.floor(no2 / 100);
        var f = no2 - e * 100;
        var g = Math.floor(f / 10);
        var h = f - g * 10;
        arr2.push(e);
        arr2.push(g);
        arr2.push(h);
        arr2.sort();

        var a1 = arr2[0];
        var a2 = arr2[1];
        var a3 = arr2[2];
        arr2 = [];
        if ((a == a1) && (c == a2) && (d == a3)) {
          console.log(no2 + " is a anagram of " + no1);
          break;
        } else {
          continue;
        }
      }
    }


  }
}
