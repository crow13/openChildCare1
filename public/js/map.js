var mapOnPage,
    winHeight = $(window).outerHeight(),
    navHeight = $(".navbar").outerHeight(),
    jumboHeight = $(document.getElementById("missionStatement")).outerHeight(),
    mapSize = winHeight - navHeight - jumboHeight;

function initialize() {

    var mapOptions = {
        zoom: 16
    };
    mapOnPage = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    // Try HTML5 geolocation
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);

            new google.maps.Marker({
                map: mapOnPage,
                position: pos,
                title: 'You',
                icon: './public/you_R_here_icon.png'
            });

            mapOnPage.setCenter(pos);

        }, function() {
            handleNoGeolocation(true);
        });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }

    google.maps.event.addListenerOnce(mapOnPage, 'tilesloaded', function(){
        google.maps.event.addListenerOnce(mapOnPage, 'tilesloaded', function(){
            loadXMLFile();
        });
    });
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
    } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
        map: mapOnPage,
        position: new google.maps.LatLng(60, 105),
        content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    mapOnPage.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);

$().ready(function(){
    google.maps.event.addDomListener(window, 'load', initialize);
    $(".hFull").height(mapSize);
});
$( window ).resize(function() {
    var winHeight = $(window).outerHeight(),
        navHeight = $(".navbar").outerHeight(),
        jumboHeight = $(document.getElementById("missionStatement")).outerHeight(),
        mapSize = winHeight - navHeight - jumboHeight;
    $(".hFull").height(mapSize);
});

function loadXMLFile() {
    var filename = './sample_xml_results3.xml';
    $.ajax({
        type: "GET",
        url: filename,
        dataType: "xml",
        success: parseXML,
        error: onXMLLoadFailed
    });

    function onXMLLoadFailed() {
        alert("An Error has occurred.");
    }

    function parseXML(xml) {
        $(xml).find("marker").each(function(){
            var name = $(this).attr("name"),
                address = $(this).attr("address"),
                city = $(this).attr("city"),
                state = $(this).attr("state"),
                zip = $(this).attr("zip"),
                phone = $(this).attr("phone"),
                starRating = $(this).attr("starRating"),
                expireDate = $(this).attr("expireDate"),
                lat = $(this).attr("lat"),
                lng = $(this).attr("lng"),
                pos = new google.maps.LatLng(lat,lng);

            var newMarker = new google.maps.Marker({
                map: mapOnPage,
                animation: google.maps.Animation.DROP,
                position: pos,
                title: name,
                icon: './public/location_icon.png',
                name: name,
                phone: name,
                address: name,
                city: city,
                state: state,
                zip: zip
            });

            google.maps.event.addListener(newMarker, 'click', function() {
                alert("name: "+this.name+"\naddress: "+address+"\ncity: "+city+"\nstate: "+state+"\nphone: "+phone+"\nstarRating: "+starRating+"\nexpireDate: "+expireDate);
            });
        });
    }
}

$(".btn-success").click(function(){
    var zip =   $(document.getElementById("zipInput"));
});