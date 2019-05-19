import React, {Component} from 'react'
import './Reset-password.css'
import t from './locale';

class ResetPasswordDone extends Component {
    render() {
        return (
            <div class="container">
                <div class="alert alert-info">
                   {t('we_send_instruction')}
                </div>
            </div>
        )
    }
}

export default ResetPasswordDone