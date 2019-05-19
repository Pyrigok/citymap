import React from 'react';
import axios from 'axios';
import Select from 'react-select';

const hotels_name = [];

const fourStar = <span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>(Extraordinary)</span>
const threeStar = <span><span>☆</span><span>☆</span><span>☆</span>(Excellent)</span>
const twoStar = <span><span>☆</span><span>☆</span>(Very Good)</span>
const oneStar = <span><span>☆</span>(Good)</span>

const rating_options = [
	{ label: fourStar, value: 5 },
	{ label: threeStar, value: 4 },
	{ label: twoStar, value: 3 },
	{ label: oneStar, value: 2 },
	{ label: "All", value: null },
]

axios.get('http://127.0.0.1:8000/search/hotels/').then(res => {
  res.data.results.forEach( (obj) => {
	hotels_name.push({value: obj.name, label: obj.name});
  } );
},
error => { console.log(error) }
);

class Hotels extends React.Component {
  	handleChange = (obj, selectedOption) => {
  		const name = selectedOption.name
  		this.props.handleSearch(name, obj.value)

  		this.setState({
  			[name]:obj.value
  		})
	}

	render() {
		return(
			<div>
				<div className="form-group">
			    	<Select
			    		name="keywords"
			    		placeholder="Keywords"
				        onChange={this.handleChange}
				        options={hotels_name}
				    />
				</div>
				<div className="form-group row">
				  <div className="col-md-6">
			    	<input type="number" placeholder="Radius" name="radius" min="1" className="form-control" id="radius" ref="radius"
			    	onChange={(e) => {
			    		this.props.handleSearch(e.target.name, e.target.value);
			    	}}/>
				  </div>
				  <div className="col-md-6">
				  	<Select
				  		name="stars"
				  		placeholder="Rating"
						onChange={this.handleChange}
			    		options={rating_options}
			    	/>
			      </div>
			  	</div>
	  			<div className='col-md-1 col-md-offset-4'>
		  			<button onClick={() => {this.props.handleReset(); this.refs.radius.value="";}} 
					className="btn_without_frame">Reset</button>
	  			</div>
	  			<br/>
	  			<hr style={{ backgroundColor: "black", borderTopWidth: 0, height: 2 }} />
			</div>
  	) };
}

export default Hotels;