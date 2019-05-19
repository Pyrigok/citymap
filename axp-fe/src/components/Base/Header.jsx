import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";

import './Base.css';
import t from './locale';


class Header extends Component {

    state ={
        username: '',
        status: true
    }

    /**
     * get current log in user
     */
    getCurrentUser = () => {
        this.setState({status: false})
        fetch('http://127.0.0.1:8000/user/current_user/', {
            headers: {
                Authorization: "JWT " + localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    username: json.username,
                });
            })
            .catch(console.error);
    }

    /**
     * remove JWT token from localStorage
     */
    handle_logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        this.setState({status: true})
        return <Redirect to='sign-in'/>
    };

    /**
     * refresh JWT token
     */
    refreshJWTToken = () => {
        if (localStorage.getItem('token')) {
            const lead = {token: localStorage.getItem('token')};
            const conf = {
                method: "POST",
                body: JSON.stringify(lead),
                headers: new Headers({"Content-Type": "application/json"})
            };
            fetch('http://127.0.0.1:8000/token-refresh/', conf)
                .then(Response => {
                    if (Response.status === 400) {
                        this.handle_logout()
                    } else {
                        return Response.json()
                            .then(Response => {
                                if (Response.token) {
                                    localStorage.setItem('token', Response.token);
                                }
                            })
                    }
                })
            if (this.state.status===true){
            this.getCurrentUser()}
        }
    };


    render() {
        this.refreshJWTToken();

        let log_out;
        let sign_up;
        let sign_in;
        let user;
        if (localStorage.getItem('token')) {
            console.log(localStorage.getItem('token'))
            user = <Link to="/user-info">{t('profile')} {this.state.username}</Link>;
            log_out = <Link to="/">{t('logout')}</Link>;
        } else {
            sign_up = <Link to="/sign-up">{t('sign_up')}</Link>;
            sign_in = <Link to="/sign-in">{t('sign_in')}</Link>;
        }
        return (
            <div className='row'>
                <div className="top1-wrapper">
                    <nav className="navbar navbar-default navbar-static-top">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                        data-target="#navbar"
                                        aria-expanded="false" aria-controls="navbar">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <Link to='/' className="navbar-brand top1-brand main_font">CityMap</Link>

                            </div>

                            <div id="navbar" className="navbar-collapse collapse">
                                <ul className="nav navbar-nav navbar-right">

                                    <li>{sign_up}</li>
                                    <li>{sign_in}</li>
                                    <li>{user}</li>
                                    <li onClick={this.handle_logout}>{log_out}</li>

                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

export default Header;