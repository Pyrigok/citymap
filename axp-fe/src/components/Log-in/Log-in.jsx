import React, {Component} from 'react'
import './Log-in.css'
import {Link, Redirect} from "react-router-dom";
import Facebook from './Facebook';
import Error from '../Alert_error'
import t from './locale';

class LogIn extends Component {
    state = {
        username: '',
        password: '',
        redirect: false
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
        const {username, password} = this.state;
        const lead = {username, password};
        const conf = {
            method: "POST",
            body: JSON.stringify(lead),
            headers: new Headers({"Content-Type": "application/json"})
        };
        fetch('http://127.0.0.1:8000/token-auth/', conf)
            .then(Response => Response.json())
            .then(Response => {
                if (Response.token) {
                    localStorage.setItem('token', Response.token);
                    this.setState({redirect: true})
                } else {
                    Error(e, 'Your username or password is wrong')
                }
            });
    };

    render() {
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/'/>;
        }
        if (!localStorage.getItem('token')) {
            return (
                <form onSubmit={this.handleSubmit} className='login-form'>
                    <div className="container">
                        <div className="row">
                            <h1 className="text-center">{t('sign_in')}</h1>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-6 horizontal_line">
                                    <div className="form-group row">

                                        <div className="col-sm-6 col-sm-offset-2">
                                            <input type="text" name="username" value={this.state.username}
                                                   onChange={this.handle_change}
                                                   placeholder={t('username')}
                                                   id="username"/>
                                        </div>
                                    </div>
                                    <div className="form-group row">

                                        <div className="col-sm-6 col-sm-offset-2">
                                            <input type="password" name="password" value={this.state.password}
                                                   onChange={this.handle_change}
                                                   placeholder={t('password')}
                                                   id="password"/>
                                        </div>
                                    </div>
                                    <div className="form-check">
                                        <div className="col-sm-4"></div>
                                        <div className="col-sm-8">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                            <label className="form-check-label"
                                                   htmlFor="exampleCheck1">{t('remember_me')}</label>
                                        </div>
                                    </div>
                                    <div className="row text-center row_gap">
                                        <Link to="/reset-password">{t('forgot_password')}?</Link>
                                    </div>
                                    <div className="row text-center">
                                        <button type="submit" className="btn_without_frame" value="Login">{t('login')}
                                        </button>
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <Facebook/>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )
        } else {
            return <Redirect to='/'/>
        }
    }
}

export default LogIn

