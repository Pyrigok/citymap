import React from 'react';
import axios from 'axios';
import t from './locale';

class TopRestaurants extends React.Component {
  state = {
    restaurant: [],
    count: 3
  }

  componentWillMount() {
    axios.post('http://127.0.0.1:8000/search/restaurant/', { top: this.state.count }).then(res => {
      this.setState({restaurant: res.data})})
  }

  handleMore() {
    let count_value = this.state.count < 9 ? this.state.count + 3 : this.state.count
    this.setState({count: count_value})
    axios.post('http://127.0.0.1:8000/search/restaurant/', { top: count_value }).then(res => {
      this.setState({restaurant: res.data})})
  }

  render() {
    return(
      <div className="text-center">
        <h2>Top Restaurants in Lviv</h2>
        {this.state.restaurant.map(element => (
          <div className="col-md-4" style={{height: "100%", minHeight: "400px"}}>
            <img src={element["img_url"]} alt="place_img" style={{height: "260px", width: "390px"}}/>                             
            <h3><b>{element.name}</b></h3>
            <p>Рейтинг: {element["mark"]}</p>
          </div>
        ))}
        <button onClick={this.handleMore.bind(this)} className='btn_without_frame'>{t('show_more')}</button>
      </div>
    ) };
}

export default TopRestaurants;