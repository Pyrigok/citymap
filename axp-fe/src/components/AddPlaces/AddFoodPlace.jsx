import React, {Component} from "react";
import {Redirect} from "react-router-dom";

/**
 * Component for adding place where to eat.
 */
class AddFoodPlace extends Component {

    render() {
        console.log("If you see this message in console than at least something I've done OK")
        if (localStorage.getItem('token')) {
            return (
                <div>

                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="text-center">
                                    Add new place where to eat and drink <hr/>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Redirect to="/sign-in"/>
        }
    }
}

export default AddFoodPlace;
