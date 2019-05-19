import React from 'react';
import Map from './map';
import Hotels from './search-hotels';
import Restaurants from './search-restaurants';
import axios from 'axios';

class Search extends React.Component {
	state = {
		value: "Hotels",
		keywords: "",
		radius: null,
		stars: null,
		markerPosition: { lat: 49.8407, lng: 24.0305 },
		res: []
	}

	handleChangeCategory = (event) => {
		this.setState({
			value: event.target.value,
			keywords: "",
			radius: null,
			stars: null,
			res: []
		})
	}

	handleSearchForm = (name, val) => {
		this.setState({ [name] : val }, () => {
			axios.post('http://127.0.0.1:8000/search/'+this.state.value.toLowerCase()+'/', {
				radius: this.state.radius || 100,
				user_position: this.state.markerPosition,
				keywords: this.state.keywords || "",
				mark: this.state.stars || 0
			}).then(res => { this.setState({ 
				res: res["data"],
				[name] : val
			}) }).catch(
				err => { console.log(err) } )
		} );
	}

	handleReset = () => {
		this.setState({
			radius: undefined,
			keywords: undefined,
			stars: null,
			res: []
		})
	}

	render() {
		const { value, radius, res } = this.state;
  		return(
	  		<div className="container">
	  			<h1 className="text-center">Search</h1>
	  			<hr></hr>
		  		<div className="row">
		  			<div className="col-md-4">
				  		<div className="sticky" style={{ position: "sticky", top: "0px", padding: "10px", backgroundColor: "white", zIndex: 1 }}>
					  		<div className="form-group">
				                <select className="form-control" id="category" onChange={this.handleChangeCategory}>
				                    <option>Hotels</option>
				                    <option>Restaurant</option>
				                </select>
				            </div>
				            { value === "Hotels" && <Hotels handleSearch = {this.handleSearchForm} handleReset = {this.handleReset}/> }
				  			{ value === "Restaurant" && <Restaurants handleSearch = {this.handleSearchForm} handleReset = {this.handleReset}/> }
			  			</div>
			  			<div>
			  				{res.map(element => (
			  					<div style={{height: "200px"}}>
			  						<h3 className="text-center"><b> {element["name"]}</b></h3>
				  					<div className="col-md-6">
				  						<img src={element["img_url"]} alt="place_img" style={{height: "130px", width: "165px", borderRadius: "12%"}}/>															
				  					</div>
				  					<div className="col-md-6">
				  						<p><b>Адреса:</b> {element["address_raw_line"]}</p>
				  					</div>
				  					<div className="col-md-6">
				  						<p><b>Рейтинг:</b> {element["mark"]}</p>
				  					</div>
			  					</div>
			  				))}
			  			</div>
					</div>
					<div className="col-md-8" id="map-container" style={{ position: "sticky", top: 0 }}>
						<Map type={value.toLowerCase()} radius={radius} res = {res}/>
					</div>
		  		</div>

		  	</div>
  		) }
	}

export default Search;