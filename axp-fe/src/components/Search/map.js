import React from 'react';
import InitMap from './init-map';
import axios from 'axios';

class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			markerPosition: { lat: 49.8407, lng: 24.0305 },
			isLoaded: false,
			reload: false
		};
	}

	componentDidMount() {
		/*Firstly we take pos by IP. If something wrong - use default pos*/
		axios.get('ipinfo.io/json').then(res => {
			const loc = res.data.loc.split(",");
			this.setState({ 
				markerPosition: { lat: loc[0], lng: loc[1] },
				isLoaded: true,
				reload: true
			});
			this.props.pos('markerPosition', this.state.markerPosition);
		}).catch(err => {
			this.setState({ 
				markerPosition: { lat: 49.8407, lng: 24.0305 },
				isLoaded: true,
			});
		})
	};

	getLocation = () => {
		/*Get position from browser when User click button*/
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.showPosition);
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	}

	showPosition = (position) => {
		this.setState({
			markerPosition: {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			}
		})
	}

	render() {
		const { type, radius, res } = this.props;
		const { markerPosition, isLoaded, reload } = this.state;
		if (isLoaded) {
			return (
				<div>
					<InitMap markerPosition={markerPosition} type={type} radius={radius} res={res}/>
					<button onClick={this.getLocation} className="btn_without_frame col-md-offset-5">
					Get current position
					</button>
				</div>
				); }
			else {
				return <div>Map loading...</div>;
			}
		}
	}

	export default Map;