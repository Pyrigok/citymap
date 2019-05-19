import React, {Component} from 'react';
import {Link} from "react-router-dom";

import t from './locale';
import './contact-us.css';


export class ContactUsForm extends Component {
    /*    Contact Admin Form    */
    
    render() {
        return (         
            <div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3 text-center">
                        <h1>{t('write_us')}<hr /></h1>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-5 col-md-offset-3'>

                        <form onSubmit={this.props.handleFormSubmit} className='contact-us-form'>
                            <div>
                                 <input className=''
                                    type='text'
                                    name='subject'
                                    maxlength="70"
                                    placeholder = {t('subject')}
                                    onChange={this.props.handleInputChange}
                                    required />

                                 <textarea
                                    className=''
                                    type='text'
                                    name='message'
                                    maxlength="2560"
                                    placeholder = {t('message')}
                                    onChange={this.props.handleInputChange}
                                    required />
                            </div>

                            <div className='class="col-md-3 col-md-offset-7'>
                                <button type='submit' className='btn_without_frame'>{t('send')}</button>
                                <Link to='/' className='btn_without_frame_link'>{t('cancel')}</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
         );
    };
}