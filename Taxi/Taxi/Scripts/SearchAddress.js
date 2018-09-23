
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

