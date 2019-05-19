import React, {Component} from 'react';
import '../language-choice/languageChoice.css';

export const LanguageChoice = class LanguageChoice extends Component {
	constructor(props) {
		super(props);

		this.handleUa = this.handleUa.bind(this);
		this.handleEn = this.handleEn.bind(this);

	}

	// 	Ukraine language choice handler
	handleUa = event => {
        localStorage.setItem('locale', 'ua')
        window.location.reload()
    }

    //	English language choice handler
    handleEn = event => {
        localStorage.setItem('locale', 'en')
        window.location.reload()
    }

    render() {
    	return (
    	    <div className='col-md-2'>
                <ul id="language-buttons" className="nav navbar-nav navbar-left top2-menu">
                    <li>
                        <button onClick={this.handleEn} className='languageButton' id="en">En</button>
                    </li>
                    <li>
                        <button onClick={this.handleUa} className='languageButton' id="ua">Укр</button>
                    </li>
                </ul>
            </div>
    	);
    }
}