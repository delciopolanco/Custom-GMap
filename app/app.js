var myMarkers = [],
    myLocations = [{
            x: 18.497373,
            y: -69.965020,
            title: 'Home'
        },

        {
            x: 18.494050,
            y: -69.906033,
            title: 'Mommys Home'
        },

    ],
    map = {},
    loader = $('.loader'),
    title = $('#title'),
    altitude = $('#altitude'),
    longitude = $('#logitude'),
    marker;




function initMap() {
    var latency = new google.maps.LatLng(18.497373, -69.965020);

    options = {
        center: latency,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map'), options);

    _.each(myLocations, function (location) {
        addMarker(new google.maps.LatLng(location.x, location.y), location.title);
    });


    map.addListener('click', function (e) {
        addMarker(e.latLng);
    });

    loader.fadeOut(2000);
}

function addMarker(position, title) {
    marker = new google.maps.Marker({
        position: position,
        draggable: true,
        title: title || '',
        map: map
    });
    map.panTo(position);
    google.maps.event.addListener(marker, 'rightclick', function (point) {
        deleteMarker(marker);
    });

    google.maps.event.addListener(marker, 'click', function (point) {
        setData(marker);
    });
}

function deleteMarker(marker) {
    marker.setMap(null);
}

function setData(marker) {
    title.val(marker.title);
    altitude.val(marker.position.lat());
    longitude.val(marker.position.lng());
    title.focus();
}

$(document).ready(function () {
    $('#title').on('keyup', function (e) {
        e.preventDefault();
        if (altitude && longitude && marker) {
            marker.title = e.currentTarget.value;
            marker.setMap(map);
        }
    });
});