var markers = new L.FeatureGroup();

function AddMarker(lat, lon, obj_name, category) {
    window.addEventListener("map:init", function (e) {
    	var detail = e.detail;
    	var marker =L.marker([lat, lon], {
    		title:obj_name
    	}).bindPopup("<b>"+obj_name+"</b><br>" + category + " in the Lviv.");
    	marker.addTo(markers);
    	markers.addTo(detail.map);
	}, false);
}