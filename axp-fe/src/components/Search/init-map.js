import React from "react";
import L from "leaflet";
import markerClusterGroup from "leaflet.markercluster";

const style = {
    width: "820px",
    height: "600px"
};

class InitMap extends React.Component {
    componentDidMount() {
        this.markers = new L.FeatureGroup();
        this.circle = new L.FeatureGroup();
        this.users = new L.FeatureGroup();
        this.map = L.map("map", {
            center: this.props.markerPosition,
            zoom: 14,
            layers: [
                L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                })]
        });
        this.changeMap(this.props.type)
    }

    changeMap = (type) => {
        let address = type === "hotels" ? "hotel_address" : "foodplace_address"
        this.map.removeLayer(this.markers);
        this.map.removeLayer(this.circle);
        this.map.removeLayer(this.users)
        this.markers = L.markerClusterGroup({disableClusteringAtZoom: 16});
        this.circle = new L.FeatureGroup();
        this.users = new L.FeatureGroup();
        let user_icon = L.icon({
            iconUrl: 'user.png',
            iconSize: [35, 65],
        });

        this.props.res.forEach((obj) => {
            const location = {lat: obj[address][0].latitude, lon: obj[address][0].longitude};
            let marker_color = (obj.mark >= 4.5) ? 'marker_blue.png' :
                (obj.mark >= 4) ? './marker_green.png' :
                    (obj.mark >= 3) ? './marker_orange.png' :
                        (obj.mark >= 2) ? 'marker_red.png' :
                            'marker_brown.png';
            let marker_icon = L.icon({
                iconUrl: marker_color,
                iconSize: [30, 50],
            });
            this.marker = L.marker(location, {icon: marker_icon}).bindPopup("<b>" + obj.name + "</b><br>" + obj.address_raw_line)
                .addTo(this.markers);
        })

        this.user_marker = L.marker(this.props.markerPosition, {icon: user_icon})
            .bindPopup("Current User position: lat: " + this.props.markerPosition.lat + " lng: " + this.props.markerPosition.lng)
            .addTo(this.users);
        this.map.panTo([this.props.markerPosition.lat, this.props.markerPosition.lng])

        L.circle([this.props.markerPosition.lat, this.props.markerPosition.lng], {radius: this.props.radius * 1000 || 1000}).addTo(this.circle);
        this.circle.addTo(this.map);
        this.markers.addTo(this.map);
        this.users.addTo(this.map)

    }

    componentDidUpdate({markerPosition}) {
        this.changeMap(this.props.type)
        if (this.props.markerPosition !== markerPosition) {
            let latLng = L.latLng(parseFloat(this.props.markerPosition.lat), parseFloat(this.props.markerPosition.lng))
            this.marker.setLatLng(latLng);
        }
        if (this.props.reload) {
            this.changeMap(this.props.type)
        }
    }

    render() {
        return <div id="map" style={style}/>;
    }
}

export default InitMap;
