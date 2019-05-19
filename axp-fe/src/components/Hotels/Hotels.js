import React, {Component} from "react";
import axios from 'axios'
import './hotel_api_style.css'
import Success from '../Alert_success';
import Error from '../Alert_error';
import {Redirect} from "react-router-dom";

const current_user_endpoint = 'http://localhost:8000/user/current_user/';
/*
 * Component to get hotels and display information about them
 */
class Hotels extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hotels: [],
            selected: '',
            showHotels: true,
            selected_comments: [],
            user_info: localStorage.getItem('token') ? true : false,
            id: '',
            username: ''
        }
        this.showInfo = this.showInfo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveOneMore = this.saveOneMore.bind(this);
        this.getHotelsList = this.getHotelsList.bind(this);
    }
    /*
     * Post Comment data to BE and save it
     */
    async handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/places/hotel-info-api/',
            data: data,
            config: { headers: {'Content-Type': 'multipart/form-data'}},
        })
        this.showInfo(this.state.selected, false);
    }

    async saveOneMore(event) {
        event.preventDefault();
        await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/places/get-places/hotels/',
            config: { headers: {'Content-Type': 'application/json' }},
        })
    }

    async getHotelsList() {
        try {
            const response = await fetch('http://127.0.0.1:8000/places/hotel-info-api/');
            const data = await response.json();
            this.setState({
                hotels: data.results
            });
        } catch (e) {
            console.log(e);
        }
    }
    /*
     * Show information about selected hotel
     */
    async showInfo(item, showStatus) {
        this.setState({
            selected: item,
            showHotels: showStatus,
        });
        const pk = this.state.hotels.findIndex(obj => obj.name === item.name) + 1;
        try {
            const response = await fetch(`http://127.0.0.1:8000/places/hotel-info-api/${pk}`); // change this
            const data = await response.json();
            this.setState({
                selected_comments: data
            });
        } catch (e) {
            console.log(e);
        }
    }

    componentWillMount() {
        this.getHotelsList()
    }

    async componentDidMount() {
        if (this.state.user_info) {
            fetch(current_user_endpoint, {
                headers: {
                    Authorization: "JWT " + localStorage.getItem('token')
                }
            })
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        id: json.id,
                        username: json.username,
                    });
                })
                .catch(console.error);
        }
    }

    handleClick = event => {
        const selected_hotel = this.state.selected;
        const endpoint = "http://localhost:8000/saved-place/saved-places-api/";
        const data = {
            place_name: selected_hotel['name'],
            user_name: this.state.username
        }
        fetch(endpoint, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),

        })
        .then(function(response) {
            if (response.status===200) {
                Success(event, 'This hotel was saved!')
            }
            else {
                if (response.status===400){
                    Error(event, 'You have already saved this hotel!');
                } else {
                    Error(event,'Sorry, but we cannot save:(');
                  }
            }
        })
        .catch(function(error) {
            Error(event, '!!! '+ error);
        })

    }


    render() {
        const body = this.state.showHotels &&
            <section>
                {this.state.hotels.map(item => (
                    <div className="col-md-8  col-md-offset-2">
                        <div class="row">
                            <div class="col-md-4">
                                <img src={item.img_url} alt="img" width="100%"/>
                            </div>
                            <div class="col-md-8">
                                <h3 onClick={this.showInfo.bind(this, item, false)}>
                                    {item.name}
                                    <span class="text-primary"> {item.mark}</span>
                                </h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                        <hr/>
                    </div>
                ))
                }
                <form onSubmit={this.saveOneMore} className='hotel-form'>
                    <input type="submit" value="save one more"/>
                </form>
            </section>

        const selected_hotel = !this.state.showHotels &&
            <div className="col-md-10 col-md-offset-1">
                <h2 onClick={this.showInfo.bind(this, this.state.selected, true)}>
                    {this.state.selected.name}
                    <span class="text-primary"> {this.state.selected.mark}</span>
                </h2>
                <p><span class="badge badge-dark">Description:</span> {this.state.selected.description}</p>

                <form onSubmit={this.handleSubmit} className='hotel-form'>
                    <input id="hotel" name="hotel" type="text" value={this.state.selected.name}/>
                    <input id="author" name="author" type="text" placeholder="Author"/>
                    <input id="text" name="text" type="text" placeholder="Comment"/>
                    <input type="submit"/>
                    <button className='btn_saved_places' type="submit"
                            onClick={this.handleClick}>Save place
                    </button>
                </form>

                {this.state.selected_comments.map(item => (
                    <div key={item.created_date}>
                        <p>{item.author}: {item.text}</p>
                    </div>
                ))
                }
            </div>

        const media = !this.state.showHotels &&
            <div>
                <img src={this.state.selected.img_url} alt="img"  width="80%"/>
            </div>
        if (localStorage.getItem('token')) {
            return (
                <div>
                    {body}
                    <div class="row">
                        <div class="col-md-6">
                            {selected_hotel}
                        </div>
                        <div class="col-md-6">
                            {media}
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Redirect to='/sign-in'/>
        }
    }
}

export default Hotels;
