import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import t from './locale';
import {LanguageChoice} from '../language-choice/languageChoice';


class MainMenuNavbar extends Component {
    render() {
        let contact_us;
        if (localStorage.getItem('token')) {
            contact_us = <li><Link to="/contact-us">{t('contact_us')}</Link></li>
        }
        return (
            <div className="top2-wrapper">
                <div className="container">
                    <div className="row">
                        <LanguageChoice />
                        <div className="col-md-9 col-md-offset-1">
                           <ul id="main" className="nav navbar-nav navbar-right top2-menu">
                                <li><Link to="/search">{t('search')}</Link></li>
                                <li><Link to="/about-us">{t('about_us')}</Link></li>
                                <li className='main-places'><Link to="#">{t('places')}</Link>
                                    <ul className="drop">
                                        <div>
                                            <li className='drop-li'><Link to="/hotels">{t('hotels')}</Link></li>
                                            <li className='drop-li'><Link to="/cafes">{t('cafes')}</Link></li>

                                        </div>
                                    </ul>
                                </li>
                               <li><Link to="/add-places">{t('add_a_new_place')}</Link></li>
                               {contact_us}
                                <div id="marker"></div>
                           </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainMenuNavbar;
