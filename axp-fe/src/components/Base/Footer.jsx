import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './Base.css';

class Footer extends Component {
    render() {
        return (
           <footer className="text-center bottom-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <ul className="list-inline">
                                <li>
                                    <Link to="https://www.facebook.com/AcademyXHub/" className="fb-ic" role="button"><i
                                        className="fab fa-2x fa-facebook-f icon_spacing"></i></Link>
                                </li>
                                <li>
                                    <Link to="#" className="gp-ic"><i
                                        className="fab fa-2x fa-google-plus icon_spacing"></i></Link>
                                </li>
                                <li>
                                    <Link to="#" className="ins-ic" role="button"><i
                                        className="fab fa-2x fa-instagram icon_spacing"></i></Link>
                                </li>
                                <li>
                                    <Link to="#" className="tw-ic" role="button"><i
                                        className="fab fa-2x fa-twitter icon_spacing"></i></Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-12">
                            <p className="text-muted copyright-text"> &copy; 2019 CityMap</p>
                        </div>
                    </div>
                </div>
            </footer>

        );
    }

}

export default Footer;

