﻿ 
function myMap() {
        var mapProp = {
        center: new google.maps.LatLng(40.737209, -73.819660),
    zoom: 12,
};
var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}


$("#btSearch").click(function () {
    var addressFrom = $("#iptFrom").val();
    var addressTo = $("#iptTo").val();
    alert(addressFrom);
    alert(addressTo);
    https://maps.googleapis.com/maps/api/geocode/json?&address=Queens%20college
});