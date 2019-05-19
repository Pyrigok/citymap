import React, {Component} from 'react'
import './Saved-places.css'
import {Redirect} from "react-router-dom";
import t from './locale';
import Success from '../Alert_success';
import Error from '../Alert_error';


const current_user_endpoint = 'http://localhost:8000/user/current_user/';

class SavedPlaces extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_info: localStorage.getItem('token') ? true : false,
            id: '',
            username: '',
            places: []
        };


    }

    async componentWillMount(event) {
        if (this.state.user_info) {
            await fetch(current_user_endpoint, {
                headers: {
                    Authorization: "JWT " + localStorage.getItem('token')
                }
            })
            .then(res => res.json())
            .then(json => {
                this.setState({ id: json.id,
                                username: json.username,
                });
            })
            .catch(console.error);
        }
        const endpoint = "http://localhost:8000/saved-place/saved-places-view-api/";
        const user_name = this.state.username;
        fetch(endpoint,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({user_name}),

        })
        .then(response => response.json())
        .then(data => this.setState({ places: data }));


    }


    render() {
        const { places } = this.state;
        if (localStorage.getItem('token')) {
            return (
                <section>
                {this.state.places.map(item => (
                    <div className="col-md-8  col-md-offset-2">
                        <div class="row">
                            <div class="col-md-4">
                                <img src={item.img_url} alt="img" width="100%"/>
                            </div>
                            <div class="col-md-8">
                                <h3>
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
            </section>
            )
        } else {
            return <Redirect to='/sign-in'/>
        }
    }
}

export default SavedPlaces