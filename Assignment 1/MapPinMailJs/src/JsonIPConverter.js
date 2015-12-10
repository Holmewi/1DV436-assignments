/**
*	API that gets a json from a html call
*	Json contains information about an ip address
*	This "class" is not used in the app at the moment
*/

var xmlhttp = new XMLHttpRequest();
var key = '6a6d43b72de343f633fe5c4f763ab94754d261986dfcec7ac5069b272b6e2a34';
var ip = '198.2.129.166';
var url = 'http://api.ipinfodb.com/v3/ip-city/?key='+key+'&ip='+ip+'&format=json';

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

    for(var i = 0; i < arr.length; i++) {
        out += '<a href="' + arr[i].url + '">' + 
        arr[i].display + '</a><br>';
    }
}