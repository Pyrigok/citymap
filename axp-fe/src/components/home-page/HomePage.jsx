import React, {Component} from "react";
import './home-page.css';
import lvivimage from '../../assets/img/lviv-view.jpg';
import t from './locale';
import TopHotels from './top-hotels';
import TopRestaurant from './top-restaurant';


class HomePage extends Component {
    render() {
        return (
            <div>
                <article>
                    <div className="intro-part">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="page-header">
                                        <h1>{t('welcome')} CityMap!</h1>
                                    </div>
                                    <h2>
                                        {t('find')} <code>{t('your_perfect')}</code> {t('place')}</h2>
                                    <p className="text-justify lead">
                                       {t('question')}
                                    </p>
                                    <h3 className="lead">
                                        {t('we_help_you')}!
                                    </h3>
                                </div>
                                <div className="col-md-6">
                                    <div id="map">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1819.4570217808553!2d24.031288208437463!3d49.840563559874994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add6dae655555%3A0xa71a5e1b2bbc4d64!2sLviv+city+council!5e0!3m2!1sen!2sua!4v1546479723266"
                                            width="560" height="380" frameBorder="0" style={{
                                            border: '0'
                                        }} allowFullScreen="allowfullscreen" title="This is a CityMap"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
                <div>
                    <article className="top-places text-justify">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="lviv-view-wrapper">
                                        <img src={lvivimage} className="img-responsive img-thumbnail" alt=""/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h2>{t('top_10')}</h2>
                                    <p className="lead">
                                       {t('if_you_are_stopping')}
                                        <a href="http://lviv.travel/en/index/what_to_do/architecturelviv/top10places"
                                           target="_blank" rel="noopener noreferrer"> {t('top_10_link')} </a>
                                        {t('you_must_see')}.
                                    </p>
                                    <p className="lead">
                                        {t('if_you_are_looking')}!
                                    </p>
                                    <p className="lead">
                                        {t('already_know')}
                                        <a href="http://localhost:3000/add-places"> {t('here_link')}!</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <TopHotels />
                <TopRestaurant />
            </div>
        );
    }
}

export default HomePage;
