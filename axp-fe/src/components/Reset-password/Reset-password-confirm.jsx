import React, {Component} from 'react'
import './Reset-password.css'
import t from './locale';


class ResetPasswordConfirm extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password1: '',
            password2: ''        
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        const name = event.target.name
        this.setState({ [name]:  event.target.value})

    }

    handleSubmit(event){
        event.preventDefault();
        const password1 = this.state.password1;
        const password2 = this.state.password2;
        const minLength = 8;
        const endpoint = "http://localhost:8000/user/reset-password-confirm-api/";
        const data = {
            email: this.props.match.params.email,
            password1: this.state.password1,
            password2: this.state.password2
        }
        if (password1 !== password2){
            alert('Error: One password is not equal to password two');
            return
        } else{
            if (password1.length < minLength){
                alert('Error: Password length is less than the number of characters allowed');
                return
            }
        }
        fetch(endpoint,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),

            })
            .then(function(response) {
                if (response.status===200) {
                    this.props.history.push('/reset-password-complete')
                }
                else {
                    alert(response);
                }
            }.bind(this))
            .catch(function(error) {
                alert('!!! '+ error);
            })

    }

    render() {
        return (
            <div class="container">
                <div class="jumbotron">
                    <h3 class="text-center">{t('enter_and_confirm_new_password')}:</h3>
                    <div class="row ">
                        <div class="col-sm-6 col-sm-offset-3">
                            <form method="post" id="PasswordConfirmForm" onSubmit={this.handleSubmit}>
                                <input type="password" class="input-lg form-control"
                                                    id="password1"
                                                       placeholder={t('new_password')}
                                                       autocomplete="off"
                                                       name='password1'
                                                       onChange={this.handleChange}/>
                                <hr />
                                <input type="password" class="input-lg form-control" id="password2"
                                                       placeholder={t('repeat_password')}
                                                       autocomplete="off"
                                                       name='password2'
                                                       onChange={this.handleChange}/>
                                <button type="submit" class="col-xs-12 btn_without_frame btn-load btn-lg">{t('change_password')}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default ResetPasswordConfirm