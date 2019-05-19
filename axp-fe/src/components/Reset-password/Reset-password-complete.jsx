import React, {Component} from 'react'
import './Reset-password.css'
import {Link} from "react-router-dom";
import t from './locale';

class ResetPasswordComplete extends Component {
    render() {
        return (
            <div class="container">
                <div class="jumbotron">
                    <h1>{t('the_password_has_been_changed')}!</h1>
                    <Link to="/sign-in">{t('sign_in_again')}?</Link>
                </div>
            </div>
        )
    }
}

export default ResetPasswordComplete