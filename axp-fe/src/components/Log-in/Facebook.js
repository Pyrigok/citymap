import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import {Redirect} from "react-router-dom";
import axios from 'axios';

export default class Facebook extends Component {
	state = {
		isLogged: false,
		userID: '',
		name: '',
		email: '',
		picture: ''
	}

	responseFacebook = response => {
        axios.post('http://localhost:8000/auth/facebook/', { access_token: response.accessToken }).then(
        	(r) => { 
        		localStorage.setItem('token', r.data.token); 
        		this.setState({ isLogged: true }) }
        	)
		this.setState({
			userID: response.userID,
			name: response.name,
			email: response.email,
		})
		localStorage.setItem('userID', response.userID);
	}
	
	render() {
		const {isLogged} = this.state;
		if (isLogged) {
			return <Redirect to='/'/>;
		}
		return(
	  		<div className="container">
	  			<FacebookLogin
				    appId="404898726985924"
				    autoLoad={false}
				    fields="name,email,picture"
				    callback={this.responseFacebook} 
				/>
		  	</div>
  		)
	}
}