var map;

function initialize() {

    var mapOptions = {
        zoom: 16
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    // Try HTML5 geolocation
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);
            var pos = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);

            var infowindow = new google.maps.Marker({
                map: map,
                position: pos,
                title: 'You',
                icon: './public/you_R_here_icon.png'
            });

            map.setCenter(pos);
        }, function() {
            handleNoGeolocation(true);
        });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
    } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);
$(".jumbotron").css("margin-bottom",0);
var winHeight = $(window).outerHeight(),
    navHeight = $(".navbar").outerHeight(),
    jumboHeight = $(document.getElementById("missionStatement")).outerHeight(),
    mapSize = winHeight - navHeight - jumboHeight;

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

$(".btn-success").click(function(){
    var zip = $(document.getElementById("zipInput"));
});