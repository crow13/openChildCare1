var mapOnPage,
    winHeight = $(window).outerHeight(),
    navHeight = $(".navbar").outerHeight(),
    jumboHeight = $(document.getElementById("missionStatement")).outerHeight(),
    mapSize = winHeight - navHeight - jumboHeight,
    markers = [],
    myLocation = null;

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
            //loadXMLFile();
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

function loadXMLFile() {
    var input = $(document.getElementById('zipInput')).val(),
        filename = '/Hackathon/public/db/getByZip.php';
        //filename = './sample_xml_results3.xml';
		//alert(input);
    $.ajax({
        type: "POST",
        //type:"GET",
        url: filename+"?"+input,
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
                pos = new google.maps.LatLng($(this).attr("lat"),$(this).attr("lng"));

            var newMarker = new google.maps.Marker({
                map: mapOnPage,
                animation: google.maps.Animation.DROP,
                position: pos,
                title: name,
                icon: './public/location_icon.png',
                name: name,
                phone: phone,
                address: address,
                city: city,
                state: state,
                zip: zip
            });

            google.maps.event.addListener(newMarker, 'click', function() {
                var options = {
                    "name":name,
                    "phone": phone,
                    "address": address,
                    "city": city,
                    "state": state,
                    "zip": zip,
                    "rating":starRating,
                    "expireDate":expireDate
                };

                $(document.getElementById('myModalLabel')).text(name);
                $(document.getElementById('myModalPhone')).text(phone).attr("href","tel:"+phone);
                $(document.getElementById('myModalAddress')).text(address);
                $(document.getElementById('myModalCity')).text(city);
                $(document.getElementById('myModalState')).text(state);
                $(document.getElementById('myModalZip')).text(zip);
                $(document.getElementById('myModal')).modal('show');
                $(document.getElementById('ratingStars')).empty();
                var star = "<img src='./public/images/check_box.png' height='32px' class='dInline'>";
                for(var index=0; index<starRating;index++){
                    $(document.getElementById('ratingStars')).append(star);
                }
                $(document.getElementById('ratingText')).empty();
                $(document.getElementById('ratingText')).append("<span>"+starRating+"\/5</span>");
                $(document.getElementById('expire')).text(expireDate);
            });
            markers.push(newMarker);

            if (myLocation!=null)myLocation.setMap(mapOnPage);
            setAllMap(mapOnPage);
        });
    }
    function setAllMap(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }
}

$('.btn-success').click(function(e) {
    e.preventDefault();
    loadXMLFile();
});


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