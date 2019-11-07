import { FontAwesomeIcon } from '../node_modules/@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faBolt, faSnowflake, faSmog } from '../node_modules/@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';

class WeatherIcon extends Component {
    constructor(props) {
        super(props);
        this.state = { icons : {
            "Rain" : <FontAwesomeIcon icon={faCloudRain} />,
            "Thunderstorm" : <FontAwesomeIcon icon={faBolt} />,
            "Drizzle" : <FontAwesomeIcon icon={faCloudRain} />,
            "Snow" : <FontAwesomeIcon icon={faSnowflake} />,
            "Mist" : <FontAwesomeIcon icon={faSmog} />,
            "Smoke" : <FontAwesomeIcon icon={faSmog} />,
            "Haze" : <FontAwesomeIcon icon={faSmog} />,
            "Dust" : <FontAwesomeIcon icon={faSmog} />,
            "Fog" : <FontAwesomeIcon icon={faSmog} />,
            "Sand" : <FontAwesomeIcon icon={faSmog} />,
            "Ash" : <FontAwesomeIcon icon={faSmog} />,
            "Squall" : <FontAwesomeIcon icon={faSmog} />,
            "Tornado" : <FontAwesomeIcon icon={faSmog} />,
            "Clear" : <FontAwesomeIcon icon={faSun} />,
            "Clouds" : <FontAwesomeIcon icon={faCloud} />
        } }

        
    }
    
    render() { 
        return (
            <p className="subtitle text-is-large">{this.state.icons[this.props.iconCode]}</p>
        );
    }
}
 
export default WeatherIcon;