
$(document).ready(function () {
     

    // Start----------Initial Map function

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var defaultCenterMap = new google.maps.LatLng(40.737209, -73.819660);

    var mapOptions = {
        zoom: 12,
        center: defaultCenterMap,
    }

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);

    // END----------Initial Map function

    // Calculate Route
    $("#btTest").click(function () {
        console.log("Start");
        var url = "https://api.uber.com/v1/estimates/price?start_latitude=8.969145&start_longitude=-79.5177675&end_latitude=8.984104&end_longitude=-79.517467&server_token=tv52A1T0X3I6osqh7zX4b76O_Usvmth6HQI5QWkp";

        $.getJSON(url, function (data) {
            console.log(data);
        });
        console.log("Hello");
    });
    $("#btSearch").click(function () {
        var addressFrom = $("#iptFrom").val();
        var addressTo = $("#iptTo").val();

        var request = {
            origin: addressFrom,
            destination: addressTo,
            travelMode: 'DRIVING'
        };

        directionsService.route(request, function (result, status) {
            if (status == 'OK') {
                directionsDisplay.setDirections(result);
            }
        });
         
    });
    // END----------calculate route
    var dataSet = [
        ["Uber", "SUV", "$20.00"],
        ["Lyft", "Sedan", "$30.00"],
        ["Uber", "Car Pool", "$10.00"],

    ];
    $('#tbSearchResult').DataTable({
        data: dataSet,
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "defaultContent": "<button>Click!</button>"
        }]
    });
});



