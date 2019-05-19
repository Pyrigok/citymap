import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

import {LetterSentMessage} from './letter-sent';
import {ContactUsForm} from './contact-form';

import Error from '../Alert_error';
import Success from '../Alert_success';
import './contact-us.css';

//  const for fetch request for sending letter to admin
const contact_us_endpoint = "http://localhost:8000/contact/contact-us/";
const current_user_endpoint = 'http://localhost:8000/user/current_user/';


export class ContactUs extends Component {
    /*    Component for sending letter to admin    */

    constructor(props) {
        super(props);

        this.state = {
            logged_in: localStorage.getItem('token') ? true : false,
            email: '',
            username: '',
            subject: '',
            message: '',
            letter_status: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.oneMoreLetterButtonClick = this.oneMoreLetterButtonClick.bind(this)
    }

    async componentDidMount() {
        if (this.state.logged_in) {
                 fetch(current_user_endpoint, {
                    headers: {
                      Authorization: "JWT " + localStorage.getItem('token')
                    }
                 })
                 .then(res => res.json())
                 .then(json  => {
                      this.setState({username: json.username,
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
    }

    handleFormSubmit(event){
        event.preventDefault();

        //  variable for sending user data and letter content in fetch
        const data = {
            message: this.state.message,
            subject: this.state.subject,
            email: this.state.email,
            username: this.state.username
        }

        fetch(contact_us_endpoint, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
        )
            .then(Response => Response.json())
            .then(Response => {
                if (Response === 'Letter sent successfully!') {
                    Success(event, Response);
                    this.setState({
                        letter_status: true
                    })
                } else {
                    Error(event, Response);
                }
            })
            .catch(function (error) {
                Error(event, 'Server Error. Try again later.');
            });
    }

    //    letter_status change button handler
    oneMoreLetterButtonClick() {
        this.setState({
            letter_status: false
        })
    }

    render() {
        if (localStorage.getItem('token')) {
            return (
                this.state.letter_status
                    ?
                    <LetterSentMessage oneMoreLetterButtonClick={this.oneMoreLetterButtonClick}
                                       className="btn_without_frame"/>
                    :
                    <ContactUsForm handleFormSubmit={this.handleFormSubmit} handleInputChange={this.handleInputChange}/>
            );
        } else {
            return <Redirect to='/sign-in'/>
        }
    };
}