import React, {Component} from 'react';

import t from './locale';
import './contact-us.css';


export class LetterSentMessage extends Component {
    /*      Letter sent message    */

    render() {
        return (
            <div className='row'>
                <div className="col-md-6 col-md-offset-3 text-center">
                        <h1>{t('write_us')} <hr /></h1>
                </div>

                <div class="col-md-4 col-md-offset-4 text-center">
                    <h3>{t('letter_sent_successfully')}!</h3><hr />
                    <button onClick={this.props.oneMoreLetterButtonClick} className="btn_without_frame">{t('one_more_letter')}</button>
                </div>
            </div>
			)
	}
} 