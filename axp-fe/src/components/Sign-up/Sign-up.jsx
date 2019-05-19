import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import './Sign-up.css';
import '../Base/Base.css'
import user from '../../assets/img/user.jpg';
import Error from '../Alert_error';
import t from './locale';

class SignUp extends Component {
    state = {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: '',
        message: '',
        redirect: false,
    };

    /**
     * handle change event at input form
     * @param {SyntheticEvent} e
     */
    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = {...prevstate};
            newState[name] = value;
            return newState;
        });
    };

    /**
     * handle submit form event
     * @param {SyntheticEvent} e
     */
    handleSubmit = e => {
        e.preventDefault();
        const {username, first_name, last_name, email, password, password2} = this.state;
        const lead = {username, first_name, last_name, email, password, password2};
        const conf = {
            method: "post",
            body: JSON.stringify(lead),
            headers: new Headers({"Content-Type": "application/json"})
        };
        fetch('http://127.0.0.1:8000/user/users/', conf)
            .then(Response => {
                    if (Response.status === 201) {
                        this.setState({redirect: true});
                    } else {
                        return Response.json()
                            .then(Response => {this.setState({message: Response});
                            Error(e, this.state.message)})

                    }
                }
            );

    };


    render() {
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='/sign-in'/>;
        }
        if (!localStorage.getItem('token')) {
            return (
                <form method="POST" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <h1 className="login_head">{t('sign_up')}
                            <hr/>
                        </h1>
                        <div className="col-md-4 col-md-offset-2 login_block">
                            <input type="text" name="username" value={this.state.username}
                                   onChange={this.handle_change} id="username" placeholder={t('username')}/>
                            <input type="text" name="first_name" id="first_name" value={this.state.first_name}
                                   onChange={this.handle_change} placeholder={t('first_name')}/>
                            <input type="text" name="last_name" id="last_name" value={this.state.last_name}
                                   onChange={this.handle_change} placeholder={t('last_name')}/>
                            <input type="email" name="email" id="email" value={this.state.email}
                                   onChange={this.handle_change} placeholder={t('email')}/>
                            <input type="password" name="password" value={this.state.password}
                                   onChange={this.handle_change} id="password" placeholder={t('password')}/>
                            <input type="password" name="password2" value={this.state.password2}
                                   onChange={this.handle_change} id="password2" placeholder={t('confirm_password')}
                                   pattern=".{8,}"/>
                        </div>
                        <div className="login_block2">
                            <div className="bubble">
                                <label htmlFor="prof_form">{t('add_photo')}:)</label>
                            </div>
                            <img id={'user_photo'} src={user} className="user_img" alt=""/>
                            <input type='file' name="prof_form"
                                   id="prof_form" accept=".jpg, .jpeg, .png" className="input_txt"/>
                        </div>
                        <div className="col-md-2 col-md-offset-5">
                            <button type="submit" className="btn_without_frame" value="Login">{t('register')}</button>
                        </div>
                    </div>
                </form>
            );
        } else {
            return <Redirect to='/'/>;
        }
    }
}

export default SignUp;
