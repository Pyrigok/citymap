import React, {Component} from 'react'
import './Reset-password.css'
import Error from '../Alert_error';
import t from './locale';


class ResetPassword extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({ email: event.target.value })
    }

    handleSubmit(event){
        event.preventDefault();
        const email = this.state.email;
        const endpoint = "http://localhost:8000/user/reset-password-api/";
        if (email === ''){
            Error(event, 'Please, enter your email');
            return
        }
        fetch(endpoint,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email}),

        })
        .then(function(data) {
            if (data.status===200) {
                this.props.history.push('/reset-password-done')
            }
            else {
                Error(event, 'Sorry, but we don`t have account with this email:(');
            }
        }.bind(this))
        .catch(function(error) {
            Error(event, '!!! '+ error);
        })

    }

    render() {
        return (
            <div class="container">
		        <div class="jumbotron">
			        <div class="text-center">
				        <form method="POST" onSubmit={this.handleSubmit}>

				            <input type="email"
				                   class="email"
				                   placeholder={t('enter_your_email')}
				                   value={this.state.email}
                                   onChange={this.handleChange}/>

				            <button type="submit" class="btn_without_frame">{t('reset_password')}</button>
				        </form>
			        </div>
		        </div>
	        </div>
        )
    }
}

export default ResetPassword