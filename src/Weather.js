import React, { Component } from 'react';
import './App.css';
import './Countrycodes'
import WeatherIcon from './WeatherIcon'
const Countrynames = require('./Countrycodes');

class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "Waiting for weather...", weather: null, countryname: null, error: null, degrees: null,
            divIdWeatherMain: "is-padded",
            divIdAlternative: "is-hidden centered"
        };
    }

    // Handle search string fetch errors
    handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        } else {
            return response;
        }
    }

    // Fetch the weather by coordinates received from Geolocation
    getWeatherCoords() {
        this.setState({ weather: null })
        fetch('https://api.openweathermap.org/data/2.5/weather?lat='
            + this.props.position.coords.latitude
            + '&lon='
            + this.props.position.coords.longitude
            + '&units=metric&appid=4ab2152ab8763e7e54aae7d10515dc07', {
            method: 'get'
        })
            .then(result => result.json())
            .then(weather => this.setState({ weather: weather, status: "", countryname: Countrynames.getName(weather.sys.country), divIdWeatherMain: "is-padded has-shadow" }))
    }

    // Fetch the weather by using the search string supplied by the user
    // and handle errors if specified location is not found
    getWeatherString() {
        this.setState({ weather: null })
        fetch('https://api.openweathermap.org/data/2.5/weather?q='
            + this.props.searchString
            + '&units=metric&appid=4ab2152ab8763e7e54aae7d10515dc07')
            .then(response => this.handleErrors(response))
            .then(result => result.json())
            .then(weather => this.setState({ weather: weather, status: "", countryname: Countrynames.getName(weather.sys.country) }))
            .catch(error => this.setState({ status: "Something went wrong, try a different location", divIdAlternative: "centered is-shown"}))
    }

    // If the props update, execute the correct API query
    componentDidUpdate(prevProps) {
        if (prevProps.position !== this.props.position) {
            this.getWeatherCoords()
        } else if (prevProps.searchString !== this.props.searchString) {
            this.getWeatherString()
        }
    }


    render() {

        if (this.state.weather) {

            return (
                <div className={this.state.divIdWeatherMain}>
                    <div className="tile is-ancestor is-padded">
                        <div className="tile is-horizontal is-12">
                            <div className="tile">
                                <div className="tile is-parent is-horizontal not-padded-right">
                                    <article className="tile is-child notification MilkWhite rounded-left">
                                        <p className="title">{this.state.weather.name + ", " + this.state.countryname}</p>
                                        <p className="subtitle is-spaced text-is-small">{this.state.weather.weather[0].description}</p>
                                        <div className="field is-grouped">
                                            <WeatherIcon iconCode={this.state.weather.weather[0].main} />
                                            <strong><p className="padded-left text-is-large">{this.state.weather.main.temp + " °C"}</p></strong>

                                        </div>

                                    </article>
                                </div>
                                <div className="tile is-parent is-horizontal is-8 not-padded-left">
                                    <article className="tile is-child notification is-info rounded-right">
                                        <p>fdsafdasfdsgafdafdjhbdfjgfdsgfdsgfdghdfsgf gdsfg sdfg fdsg fdsg dfsg fdsgfdshgfsfadfgdggsgfdsgfdgfdsgfdsg</p>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (<div className={this.state.divIdAlternative}>Damn :( We did not seem to find anything with that search word.</div>)
        }
    }
}


export default Weather;