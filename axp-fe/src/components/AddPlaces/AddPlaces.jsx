import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import t from "./locale-for-list-of-categories";

/**
 * Component for listing categories in which user can add new place on map.
 */
class AddPlaces extends Component {
    render() {
        if (localStorage.getItem('token')) {
            return (
                <div>
                    <article>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <h1 className="text-center">{t('heading')}</h1>
                                    <hr></hr>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-left">
                                        <ul className="list-group">
                                            <li className="list-group-item"><Link
                                                to="/add-places/add-hotel">{t('hotel')}</Link>
                                            </li>
                                            <li className="list-group-item"><Link
                                                to="/add-places/add-foodplace">{t('restaurant')}</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            );
        } else {
            return <Redirect to='/sign-in'/>
        }
    }
}

export default AddPlaces;
