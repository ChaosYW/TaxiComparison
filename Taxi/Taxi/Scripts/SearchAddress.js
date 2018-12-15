﻿
$(document).ready(function () {
     
  
    // Start----------Initial Map function
    var dataSet = [];

    var AddressFrom;
    var AddressTo;
    var FromLong, FromLat, ToLong, ToLat;
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var defaultCenterMap = new google.maps.LatLng(40.737209, -73.819660);

    var mapOptions = {
        zoom: 12,
        center: defaultCenterMap,
    }

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);



    var lyftdata;

    // Calculate Route
    $("#btSearch").click(function () {
        clearDataTable();

        dataSet = [];
        AddressFrom = $("#iptFrom").val();
        AddressTo = $("#iptTo").val();

        var request = {
            origin: AddressFrom,
            destination: AddressTo,
            travelMode: 'DRIVING'
        };

        directionsService.route(request, function (result, status) {
            if (status == 'OK') {
                directionsDisplay.setDirections(result);
            }
        });


        //get goolge longitute and latitude
        var googleFromURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + AddressFrom + "&key=AIzaSyDZ2b3ucOfoCQrm3eqU8qC-1EKP_P2Sh2M";

        $.ajax({
            type: 'GET',
            url: googleFromURL,
            dataType: 'json',
            success: function (data) {
                FromLat = data.results[0].geometry.location.lat;
                FromLong = data.results[0].geometry.location.lng;
            },
            async: false
        });




        var googleToURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + AddressTo + "&key=AIzaSyDZ2b3ucOfoCQrm3eqU8qC-1EKP_P2Sh2M";

        $.ajax({
            type: 'GET',
            url: googleToURL,
            dataType: 'json',
            success: function (data) {
                ToLat = data.results[0].geometry.location.lat;
                ToLong = data.results[0].geometry.location.lng;
            },
            async: false
        });


        var googleFromURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + AddressFrom + "&key=AIzaSyDZ2b3ucOfoCQrm3eqU8qC-1EKP_P2Sh2M";

        $.ajax({
            type: 'GET',
            url: googleFromURL,
            dataType: 'json',
            success: function (data) {
                FromLat = data.results[0].geometry.location.lat;
                FromLong = data.results[0].geometry.location.lng;
            },
            async: false
        });




        var googleToURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + AddressTo + "&key=AIzaSyDZ2b3ucOfoCQrm3eqU8qC-1EKP_P2Sh2M";

        $.ajax({
            type: 'GET',
            url: googleToURL,
            dataType: 'json',
            success: function (data) {
                ToLat = data.results[0].geometry.location.lat;
                ToLong = data.results[0].geometry.location.lng;
            },
            async: false
        });

        // call lyft api to get estimatioon price
        var lyftlist;
        var url = "https://api.allorigins.ml/get?url=" + encodeURIComponent("https://api.lyft.com/v1/cost?start_lat=" + FromLat + "&start_lng=" + FromLong + "&end_lat=" + ToLat + "&end_lng=" + ToLong + "") + "&callback=?";
        //var url = "https://api.allorigins.ml/get?url=" + encodeURIComponent("https://api.lyft.com/v1/cost?start_lat=37.7763&start_lng=-122.3918&end_lat=37.7972&end_lng=-122.4533") + "&callback=?";
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: function (data) {

                lyftlist = JSON.parse(data.contents);
                

                
                //Call Uber API to get Uber estimation price
                var Uberurl = "https://api.uber.com/v1/estimates/price?start_latitude=" + FromLat + "&start_longitude=" + FromLong + "&end_latitude=" + ToLat + "&end_longitude=" + ToLong + "&server_token=tv52A1T0X3I6osqh7zX4b76O_Usvmth6HQI5QWkp";
                var Uberlist;
                $.ajax({
                    type: 'GET',
                    url: Uberurl,
                    dataType: 'json',
                    success: function (data) {
                        Uberlist = data.prices;
                         
                        for (i = 0; i < Uberlist.length; i++) {
                            var CarType = Uberlist[i].display_name;
                            var ServiceName = 'Uber';
                            var Price = Uberlist[i].estimate;
                            var Distance = Uberlist[i].distance;
                            var Product_id = Uberlist[i].product_id;
                            var HighPrice = Uberlist[i].high_estimate;
                            var LowPrice = Uberlist[i].low_estimate;

                            dataSet.push({
                                CarType,
                                ServiceName,
                                Price,
                                Distance,
                                Product_id,
                                HighPrice,
                                LowPrice,
                                AddressFrom,
                                AddressTo,
                                FromLat,
                                FromLong,
                                ToLat,
                                ToLong
                            });
                        }
                         
                        for (i = 0; i < lyftlist.cost_estimates.length; i++) {
                            var CarType = lyftlist.cost_estimates[i].display_name;
                            var ServiceName = 'Lyft';
                            var Distance = lyftlist.cost_estimates[i].estimated_distance_miles;
                            var HighPrice = lyftlist.cost_estimates[i].estimated_cost_cents_max / 100;
                            var LowPrice = lyftlist.cost_estimates[i].estimated_cost_cents_min / 100;
                            var Product_id = lyftlist.cost_estimates[i].price_quote_id;
                            var Price = '$' + LowPrice+ ' - ' + HighPrice;
                            dataSet.push({
                                CarType,
                                ServiceName,
                                Price,
                                Distance,
                                Product_id,
                                HighPrice,
                                LowPrice,
                                AddressFrom,
                                AddressTo,
                                FromLat,
                                FromLong,
                                ToLat,
                                ToLong
                            });
 
                        }
                        console.log(dataSet);
                        // bind table from two API calls
                        var searchtable = $('#tbSearchResult').DataTable({
                            data: dataSet,
                            columns: [
                                { data: 'CarType' },
                                { data: 'ServiceName' },
                                { data: 'Price', "visible": false },
                                { data: 'Distance', "visible": false },
                                { data: 'Product_id', "visible": false },
                                { data: 'HighPrice' },
                                { data: 'LowPrice' },
                                {
                                    "data": null, // can be null or undefined
                                    "defaultContent": "<button>Click to Order</button>"
                                }

                            ]


                        });

                        //call backedn code to save order
                        $('#tbSearchResult tbody').on('click', 'button', function () {
                            

                            var data = searchtable.row($(this).parents('tr')).data();
                            console.log(JSON.stringify(data));
                            $.ajax({
                                url: "SearchAddress/saveTaxiOrder",
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                data: JSON.stringify(data),
                                success: function (response) {
                                    alert("Successfully saved");
                                }
                            });
                        });

                        
                    },
                    async: false
                });

               
            },
            async: false
        });
        
         
    });

    //$("#btSearch").click(function () {

        

        


       
    //    debugger;
        
        



    //    var Uberurl = "https://api.uber.com/v1/estimates/price?start_latitude="+FromLat+"&start_longitude="+FromLong+"&end_latitude="+ToLat+"&end_longitude="+ToLong+"&server_token=tv52A1T0X3I6osqh7zX4b76O_Usvmth6HQI5QWkp";
    //    var Uberlist;
    //    $.ajax({
    //        type: 'GET',
    //        url: Uberurl,
    //        dataType: 'json',
    //        success: function (data) {
    //            Uberlist = data.prices;
    //        },
    //        async: false
    //    });

    //    console.log(Uberlist);

    //    //var uberEstimation = { ServiceName: "Uber", Black: 0.00, BlackSUV: 0.00, CarSeat: 0.00, UberX: 0.00, UberXL: 0.00, Distance:0.000};
        

 
    //    console.log(dataSet);
       
        


        
    //});

    
    // END----------calculate route
   
    
});




function clearDataTable() {
     
    var table = $('#tbSearchResult').DataTable();

    //clear datatable
    table.clear().draw();

    //destroy datatable
    table.destroy();
}