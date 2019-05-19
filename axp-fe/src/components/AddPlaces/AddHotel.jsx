import React, {Component} from "react";
import ImagePreview from "./ImagePreview";
import {Redirect} from "react-router-dom";

const API_URL = 'http://127.0.0.1:8000/places/add-new/api/hotel';

/**
 * Component for adding hotel.
 */
class AddHotel extends Component {
    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
        /**
         * @type {object}
         * @property {string} name form fields
         */
        this.state = {
            name: "",
            website: "",
            phone: "",
            stars: "",
            mark: "",
            children_allowed: "",
            pets_allowed: "",
            has_restaurant: "",
            has_pool: "",
            has_spa: "",
            shuttle: "",
            description: "",
            image_uploaded_by_user: "",
            city: "",
            street: "",
            building_number: "",
            postal_code: "",
        };

    }

    /**
     * handle change event at input form
     * @param {SyntheticEvent} e
     */
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    /**
     * handle submit form event
     * @param {SyntheticEvent} event
     */
    handleSubmit = e => {
        e.preventDefault();

        const data = new FormData(e.target);

        fetch(API_URL, {
            method: "post",
            crossdomain: true,
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS, POST, PUT",
                "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, type"
            },
            data: JSON.stringify(data)
        })
            .then(response => response.setHeader("Access-Control-Allow-Origin", "*"))
            .then(response => response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT"))
            .then(response => response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"))
            .catch(error => {
                console.log(error)
            })
    }


    /**
     * render
     * @return {AddHotel} form markup
     */
    render() {
        console.log("If you see this message in console than at least something I've done OK")

        if (localStorage.getItem("token")) {
            return (
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="text-center">
                                    Add new hotel, motel or hostel <hr/>
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <form encType="multipart/form-data"
                                  className="form-horizontal"
                                  onSubmit={this.handleSubmit}>
                                <div className="col-md-6">

                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-5 text-right">
                                                <label htmlFor="name">Name:*</label>
                                            </div>
                                            <div className="col-sm-7">
                                                <input className=""
                                                       type="text"
                                                       name="name"
                                                       onChange={this.handleChange}
                                                       value={this.state.name}
                                                       required/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-5 text-right">
                                                <label htmlFor="website">Website:</label>
                                            </div>
                                            <div className="col-sm-7">
                                                <input className=""
                                                       type="text"
                                                       name="website"
                                                       onChange={this.handleChange}
                                                       value={this.state.website}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-5 text-right">
                                                <label htmlFor="phone">Phone:</label>
                                            </div>
                                            <div className="col-sm-7">
                                                <input className=""
                                                       type="number"
                                                       name="phone"
                                                       onChange={this.handleChange}
                                                       value={this.state.phone}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-5 text-right">
                                                <label htmlFor="stars">Stars 1 to 5:*</label>
                                            </div>
                                            <div className="col-sm-7">
                                                <input className=""
                                                       type="number"
                                                       name="stars"
                                                       onChange={this.handleChange}
                                                       value={this.state.stars}
                                                       required/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-5 text-right">
                                                <label htmlFor="mark">Mark:*</label>
                                            </div>
                                            <div className="col-sm-7">
                                                <input className=""
                                                       type="number"
                                                       name="mark"
                                                       onChange={this.handleChange}
                                                       value={this.state.mark}
                                                       required/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-5 text-right">
                                                <label htmlFor="children_allowed">Children allowed:</label>
                                            </div>
                                            <div className="col-sm-7">
                                                <input className=""
                                                       type="checkbox"
                                                       name="children_allowed"
                                                       onChange={this.handleChange}
                                                       value={this.state.children_allowed}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-5 text-right">
                                                <label htmlFor="pets_allowed">Pets allowed:</label>
                                            </div>
                                            <div className="col-sm-7">
                                                <input className=""
                                                       type="checkbox"
                                                       name="pets_allowed"
                                                       onChange={this.handleChange}
                                                       value={this.state.pets_allowed}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-5 text-right">
                                                <label htmlFor="has_restaurant">Has restaurant:</label>
                                            </div>
                                            <div className="col-sm-7">
                                                <input className=""
                                                       type="checkbox"
                                                       name="has_restaurant"
                                                       onChange={this.handleChange}
                                                       value={this.state.has_restaurant}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-5 text-right">
                                                <label htmlFor="has_pool">Has pool:</label>
                                            </div>
                                            <div className="col-sm-7">
                                                <input className=""
                                                       type="checkbox"
                                                       name="has_pool"
                                                       onChange={this.handleChange}
                                                       value={this.state.has_pool}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-5 text-right">
                                                <label htmlFor="has_spa">Has spa:</label>
                                            </div>
                                            <div className="col-sm-7">
                                                <input className=""
                                                       type="checkbox"
                                                       name="has_spa"
                                                       onChange={this.handleChange}
                                                       value={this.state.has_spa}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-5 text-right">
                                                <label htmlFor="shuttle">Shuttle:</label>
                                            </div>
                                            <div className="col-sm-7">
                                                <input className=""
                                                       type="text"
                                                       name="shuttle"
                                                       onChange={this.handleChange}
                                                       value={this.state.shuttle}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-5 text-right">
                                                <label htmlFor="description">Description:</label>
                                            </div>
                                            <div className="col-sm-7">
                                                <input className=""
                                                       type="textarea"
                                                       name="description"
                                                       onChange={this.handleChange}
                                                       value={this.state.description}
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-5 text-right">
                                                <label htmlFor="city">City:</label>
                                            </div>
                                            <div className="col-sm-7">
                                                <input className=""
                                                       type="text"
                                                       name="city"
                                                       onChange={this.handleChange}
                                                       value={this.state.city}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-5 text-right">
                                                <label htmlFor="street">Street:</label>
                                            </div>
                                            <div className="col-sm-7">
                                                <input className=""
                                                       type="text"
                                                       name="street"
                                                       onChange={this.handleChange}
                                                       value={this.state.street}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-5 text-right">
                                                <label htmlFor="building_number">Building number:</label>
                                            </div>
                                            <div className="col-sm-7">
                                                <input className=""
                                                       type="text"
                                                       name="building_number"
                                                       onChange={this.handleChange}
                                                       value={this.state.building_number}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-5 text-right">
                                                <label htmlFor="postal_code">Postal code:</label>
                                            </div>
                                            <div className="col-sm-7">
                                                <input className=""
                                                       type="text"
                                                       name="postal_code"
                                                       onChange={this.handleChange}
                                                       value={this.state.postal_code}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-5 text-right">
                                                <label htmlFor="image_uploaded_by_user">Choose Photo:</label>
                                            </div>
                                            <ImagePreview/>
                                        </div>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-md-4 col-md-offset-4">
                                        <button type="submit" className="btn_without_frame" value="Submit">
                                            Add Place
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Redirect to="/sign-in"/>
        }
    }
}


export default AddHotel;
