var dataSet = [];
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
        dataSet = [];
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

        var fromlong, fromlat, tolong, tolat;
       
        var googleFromURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+addressFrom+"&key=AIzaSyDZ2b3ucOfoCQrm3eqU8qC-1EKP_P2Sh2M";

        $.ajax({
            type: 'GET',
            url: googleFromURL,
            dataType: 'json',
            success: function (data) {
                fromlat = data.results[0].geometry.location.lat;
                fromlong = data.results[0].geometry.location.lng;
            },
            async: false
        });

        
         

        var googleToURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addressTo + "&key=AIzaSyDZ2b3ucOfoCQrm3eqU8qC-1EKP_P2Sh2M";

        $.ajax({
            type: 'GET',
            url: googleToURL,
            dataType: 'json',
            success: function (data) {
                tolat = data.results[0].geometry.location.lat;
                tolong = data.results[0].geometry.location.lng;
            },
            async: false
        });




        var Uberurl = "https://api.uber.com/v1/estimates/price?start_latitude="+fromlat+"&start_longitude="+fromlong+"&end_latitude="+tolat+"&end_longitude="+tolong+"&server_token=tv52A1T0X3I6osqh7zX4b76O_Usvmth6HQI5QWkp";
        var Uberlist
        $.ajax({
            type: 'GET',
            url: Uberurl,
            dataType: 'json',
            success: function (data) {
                //colsole.log('============');
                //console.log(data);
                //console.log(data.length);
                //console.log(data);
                //for (i = 0; i < data.length; i++)
                //{
                //    var displayname = data[i].display_name;
                //    var type = 'Uber';
                //    var price = data[i].estimate;
                //    var dataitem = { Name: displayname, Type: type, Price: price };
                //    console.log(data[i]);
                //    dataSet.push(dataitem);
                //}
                //colsole.log('============');
                Uberlist = data.prices;
            },
            async: false
        });


        for (i = 0; i < Uberlist.length; i++)
        {
            var Name = Uberlist[i].display_name;
            var Type = 'Uber';
            var Price = Uberlist[i].estimate;
             
            
            
            dataSet.push({
                Name,
                Type,
                Price
            });
        }

 
        console.log(dataSet);
        $('#tbSearchResult').DataTable({
            data: dataSet,
            columns: [
                { data: 'Name' },
                { data: 'Type' },
                { data: 'Price' },
                 
                {
                    "data": "first_name", // can be null or undefined
                    "defaultContent": "<div class='btn-group'> <button type='button' class='btn btn-info btn-xs dt-view' style='margin - right: 16px; '><span class='glyphicon glyphicon-eye - open glyphicon-info - sign' aria-hidden='true'></span></button>  </div>'"
                }
                
            ]

             
        });
    });
    // END----------calculate route
   
    
});



