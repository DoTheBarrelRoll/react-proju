import React, { Component } from 'react';
import { FontAwesomeIcon } from '../node_modules/@fortawesome/react-fontawesome';
import { faSearchLocation } from '../node_modules/@fortawesome/free-solid-svg-icons';

class Location extends Component {

    constructor(props) {
        super(props);
        this.state = { buttonStatus: <FontAwesomeIcon icon={faSearchLocation} />, buttonStyling: 'button is-medium inactiveText locateButton',
                        geoData: null};
    }

    handleClick = () => {
        let self = this;
        const geo = navigator.geolocation;

        if(!geo) {
            this.setState({ buttonStyling: "button is-medium inactiveText locateButton"})
        } else {
            geo.getCurrentPosition(function (position) {
                self.setState({ buttonStyling: "button is-medium superActiveText locateButton"});
                self.props.locationData(position);
            })
        }
    }

    render() {
        return(
            <div className='column is-one-quarter'>

                <button className={this.state.buttonStyling} onClick={this.handleClick}>{this.state.buttonStatus}</button>
            </div>
        )
    }

}


export default Location;

/*
http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
Key: 4ab2152ab8763e7e54aae7d10515dc07

TMDB key: 79d3c1eee6d11a1dad4fefb18da19ce8
*/