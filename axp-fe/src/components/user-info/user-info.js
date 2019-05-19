import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

import Error from '../Alert_error';
import Success from '../Alert_success';

import './user-info.css';
import t from './locale';


const current_user_endpoint = 'http://localhost:8000/user/current_user/';
const update_user_endpoint = 'http://localhost:8000/user/user-info-api/update/';


export class UserInfo extends Component {
    /* Component for updating user data    */

    constructor(props) {
        super(props);

        this.state = {
            logged_in: localStorage.getItem('token') ? true : false,
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            id: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    //  method for get current user info and set this data in state
    async componentDidMount() {
        if (this.state.logged_in) {
            fetch(current_user_endpoint, {
                headers: {
                    Authorization: "JWT " + localStorage.getItem('token')
                }
            })
                .then(Response => Response.json())
                .then(json => {
                    this.setState({
                        id: json.id,
                        username: json.username,
                        first_name: json.first_name,
                        last_name: json.last_name,
                        email: json.email
                    });
                })
                .catch(console.error);
        }
    }

    handleInputChange = event => {
        event.persist();

        const name = event.target.name;
        const value = event.target.value;

        this.setState(prevstate => {
            const newState = {...prevstate};
            newState[name] = value;
            return newState;
        });
    };

    handleFormSubmit = (event, data) => {
        event.preventDefault();

        //  variable for sending user data in fetch
        const userInfo = {
            username: this.state.username,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email
        }

        const update_data_endpoint = update_user_endpoint + this.state.id;

        fetch(update_data_endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
            .then(Response => Response.json())
            .then(Response => {
                Success(event, 'Data Updated!')

                //  reset all form fields
                this.setState({
                    username: '',
                    first_name: '',
                    last_name: '',
                    email: ''
                });
            })
            .catch(
                function (error) {
                    Error(event, 'Server Error!');
                });
    };

    //  show saved places handler
    handleClick = event => {
        this.props.history.push('/saved-places')
    }

    render() {
        if (localStorage.getItem('token')) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2 text-center">
                            <h1>{t('user_profile')}
                                <hr/>
                            </h1>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-4 col-md-offset-2'>
                            <form onSubmit={event => this.handleFormSubmit(event)} className='update-user-form'>

                                <input
                                    type="text"
                                    name="username"
                                    placeholder={t('username')}
                                    value={this.state.username}
                                    onChange={event => this.handleInputChange(event)}
                                />

                                <input
                                    type="text"
                                    name="first_name"
                                    placeholder={t('first_name')}
                                    value={this.state.first_name}
                                    onChange={this.handleInputChange}
                                />

                                <input
                                    type="text"
                                    name="last_name"
                                    placeholder={t('last_name')}
                                    value={this.state.last_name}
                                    onChange={this.handleInputChange}
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder={t('email')}
                                    value={this.state.email}
                                    onChange={this.handleInputChange}
                                />

                                <div className='row'>
                                    <div className='col-md-2 col-md-offset-6'>
                                        <button className='btn_without_frame' type="submit">{t('save')}</button>
                                    </div>
                                </div>

                            </form>
                        </div>

                        <div className='col-md-6'>
                            <div className='row'>
                                <div style={{marginLeft:"40px"}}>
                                    <img src={"https://graph.facebook.com/"+localStorage.getItem('userID')+"/picture?width=180&height=160"}
                                    alt="You don't have any photo"></img>
                                </div>
                                <div className='col-md-12'>
                                    <button className='btn_without_frame' style={{margin:"20px 50px"}}
                                            type="submit"
                                            onClick={this.handleClick}>{t('saved_places')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Redirect to='/sign-in'/>
        }
    }
}