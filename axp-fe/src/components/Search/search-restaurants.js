import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import t from './locale';


const type_options = [
  { value: 'restourants', label: 'Restourants' },
  { value: 'cafes', label: 'Cafes' },
  { value: 'coffe', label: 'Coffe breaks' },
  { value: 'bakeries', label: 'Bakeries' },
  { value: 'bars', label: 'Bars' }
];

const rest_name = [];

axios.get('http://127.0.0.1:8000/search/restaurant/').then(res => {
  res.data.results.forEach( (obj) => {
	rest_name.push({value: obj.name, label: obj.name});
  } );
});


class Restaurants extends React.Component {
	state = {
    	keywords: null,
    	type: null,
    	radius: null
  	}

  	handleChange = (obj, selectedOption) => {
  		const name = selectedOption.name
  		this.setState({ [name]:obj.value})
  		this.props.handleSearch(name, obj.value)
	}

	handleSubmit = (event) => {
    	event.preventDefault();

		// axios.post('http://localhost:8000/search/restaurant/', {
  //     		keywords: this.state.keywords,
  //     		type: this.state.type,
  //   		radius: this.state.radius,
  //   		user_position: this.props.markerPosition
		// })
		// .then(res => { 
		// 	console.log(res.data);
  //     	})
  			  // <button type="submit" className="btn_without_frame">{t('find')}</button>
	}

	render() {
		return(
			<form onSubmit={this.handleSubmit}>
			  <div className="form-group row">
			  	<div className="col-md-5">
			  		<label htmlFor="keywords">{t('name_or_keywords')}:</label>
			  	</div>
			    <div className="col-md-7">
			    	<Select
			    		name="keywords"
				        onChange={this.handleChange}
				        options={rest_name}
				    />
			    </div>	
			  </div>
			  <div className="form-group row">
			  	<div className="col-md-5">
			    	<label htmlFor="radius">{t('radius')}:</label>
			  	</div>
			    <div className="col-md-7">
			    	<input type="number" defaultValue="1" name="radius" min="1" className="form-control" id="radius" onChange={
			    		(e) => {
				    		this.props.handleSearch(e.target.name, e.target.value);
				    		this.setState({ [e.target.name]:e.target.value});
			    		}
			    	}/>
			    </div>	
			  </div>

			  <div className="form-group row">
			  	<div className="col-md-5">
			    	<label htmlFor="radius">{t('type')}:</label>
			  	</div>
			  	<div className="col-md-7">
				  	<Select
				  		name='type'
				        onChange={this.handleChange}
				        options={type_options}
				        isMulti
				    />
			    </div>	
			  </div>
			  <div className='col-md-1 col-md-offset-4'>
		  			<button onClick={() => {this.props.handleReset(); this.refs.radius.value="";}} 
					className="btn_without_frame">Reset</button>
	  		  </div>
	  		  <br/>
	  		  <hr style={{ backgroundColor: "black", borderTopWidth: 0, height: 2 }} />
			</form>
  	) };
}

export default Restaurants;