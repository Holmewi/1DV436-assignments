var xmlhttp = new XMLHttpRequest();
var url = 'http://api.ipinfodb.com/v3/ip-city/?key=6a6d43b72de343f633fe5c4f763ab94754d261986dfcec7ac5069b272b6e2a34&ip=198.2.129.166&format=json';

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = JSON.parse(xmlhttp.responseText);
        myFunction(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
    var out = "";
    console.log(arr);
    console.log(arr.latitude);
    console.log(arr.longitude);
    console.log(arr.cityName);
    var i;
    for(i = 0; i < arr.length; i++) {
        out += '<a href="' + arr[i].url + '">' + 
        arr[i].display + '</a><br>';

    }
    document.getElementById("id01").innerHTML = out;
}