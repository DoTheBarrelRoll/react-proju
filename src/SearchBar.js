import React, { Component } from 'react';
import './App.css';
import { FontAwesomeIcon } from '../node_modules/@fortawesome/react-fontawesome';
import { faSearchLocation } from '../node_modules/@fortawesome/free-solid-svg-icons';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true, buttonStatus: <FontAwesomeIcon icon={faSearchLocation} />, buttonStyling: 'button is-medium inactiveText locateButton',
            geoData: null
        };
    }

    handleClick = () => {
        let self = this;
        const geo = navigator.geolocation;

        if (!geo) {
            this.setState({ buttonStyling: "button is-medium locateButton" })
        } else {
            geo.getCurrentPosition(function (position) {
                self.setState({ buttonStyling: "button is-medium locatedButton" });
                self.props.locationData(position);
            }, function (error) {
                self.setState({ buttonStyling: "button is-medium locateButton" })
            })
        }
    }

    /*  handleChange(event) {
          this.setState({value: this.props.location.name});
      } */

    render() {
        return (
                <div className='columns'>
                    <div className='column is-half'>
                        <input type="text" className="input is-medium padded-right" placeholder="Where are you?" />
                    </div>
                    <div className='column'>
                        <button className={this.state.buttonStyling} onClick={this.handleClick}>{this.state.buttonStatus}</button>
                    </div>
                    <div className='column'>
                        <button onClick={this.onClick} className="button is-medium is-dark" >Search</button>
                    </div>
                </div>
        )
    }
}

export default SearchBar;