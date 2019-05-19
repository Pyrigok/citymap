function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}


function showPosition(position) {
	// var latlon = position.coords.latitude + "," + position.coords.longitude;
	let user_lat = position.coords.latitude
	let user_lon = position.coords.longitude

	$.ajax({
		type: 'POST',
		url: 'nearest-places/',
        data: {
          'csrfmiddlewaretoken': csrftoken,
          'category': $("#category").val(),
          'lat': user_lat,
          'lon': user_lon
        },
        dataType: 'json',
        success: function (data) {
        	BuildMap(data, user_lat, user_lon)
        }
    });
}


function BuildMap(data, user_lat, user_lon) {
	document.getElementById('map').innerHTML = "";
	document.getElementById('mapholder').innerHTML = "<div id='mapholder' style='width: 100%; height: 100%;'></div>";
	var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
	osmAttribution = 'Map data В© <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
                        ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    osmLayer = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttribution});
    var map = new L.Map('mapholder');
    map.setView(new L.LatLng(user_lat, user_lon), 15 );
    map.addLayer(osmLayer);
    var circle = L.circle([user_lat, user_lon], {
	    color: 'red',
	    fillColor: '#f03',
	    fillOpacity: 0.2,
	    radius: 500
	}).addTo(map);
    for (let i = 0; i < data.features.length; i++) {
		lat = data.features[i].properties.latitude
		lon = data.features[i].properties.longitude
		rest_name = data.features[i].properties.name
    	L.marker([lat, lon], {
    		title:rest_name
    	}).addTo(map)
    	.bindPopup("<b>"+rest_name+"</b><br>Restautant in the Lviv.");
	}
}