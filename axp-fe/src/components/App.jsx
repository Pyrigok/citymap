import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./Base/Header";
import HomePage from './home-page/HomePage';
import MainMenuNavbar from "./Base/MainMenuNavbar";
import LogIn from "./Log-in/Log-in";
import SignUp from "./Sign-up/Sign-up";
import {UserInfo} from './user-info/user-info';
import ResetPassword from "./Reset-password/Reset-password";
import ResetPasswordComplete from "./Reset-password/Reset-password-complete";
import ResetPasswordConfirm from "./Reset-password/Reset-password-confirm";
import ResetPasswordDone from "./Reset-password/Reset-password-done";
import Footer from "./Base/Footer";
import Search from "./Search/search";
import AboutUs from "./AboutUs/AboutUs";
import AddPlaces from "./AddPlaces/AddPlaces";
import AddHotel from "./AddPlaces/AddHotel";
import AddFoodPlace from "./AddPlaces/AddFoodPlace";
import {ContactUs} from './contact-us/contact-us';
import Hotels from './Hotels/Hotels';
import Cafes from './Cafes/Cafes';
import SavedPlaces from './Saved-places/Saved-places';
import Alert from 'react-s-alert';

class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <MainMenuNavbar/>

                    <Route exact path="/" component={HomePage}/>
                    <Route path="/sign-up" component={SignUp}/>
                    <Route path="/sign-in" component={LogIn}/>
                    <Route path="/reset-password" component={ResetPassword}/>
                    <Route path="/reset-password-complete" component={ResetPasswordComplete}/>
                    <Route path="/reset-password-confirm/:uid/:token/:email" component={ResetPasswordConfirm}/>
                    <Route path="/reset-password-done" component={ResetPasswordDone}/>
                    <Route exact path="/search" component={Search}/>
                    <Route exact path="/about-us" component={AboutUs}/>
                    <Route exact path="/add-places" component={AddPlaces}/>
                    <Route exact path="/hotels" component={Hotels}/>
                    <Route exact path="/cafes" component={Cafes}/>
                    <Route exact path="/contact-us" component={ContactUs}/>
                    <Route exact path="/add-places/add-hotel" component={AddHotel}/>
                    <Route exact path="/add-places/add-foodplace" component={AddFoodPlace}/>
                    <Route path="/saved-places" component={SavedPlaces}/>
                    <Route path="/user-info" component={UserInfo}/>

                    {/*{user_info}*/}
                    {/*{add_hotel}*/}
                    {/*{add_foodplace}*/}
                    {/*{save_place}*/}
                    {/*{saved_place}*/}
                    <Footer/>
                    <Alert/>
                </div>
            </Router>
        );
    }
}

export default App;
