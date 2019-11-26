import React, { Component } from 'react';
import './App.css';
import './Countrycodes'
import WeatherIcon from './WeatherIcon';
import Movie from './Movie';
import { FontAwesomeIcon } from '../node_modules/@fortawesome/react-fontawesome';
import { faLongArrowAltUp } from '../node_modules/@fortawesome/free-solid-svg-icons';

const Countrynames = require('./Countrycodes');

class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "Waiting for weather...", weather: null, countryname: null, error: null,
            divIdWeatherMain: "has-margin-top",
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
            .then(weather => this.setState({ weather: weather, status: "", countryname: Countrynames.getName(weather.sys.country), divIdWeatherMain: "" }))
            .catch(error => this.setState({ error: "We couldn't find you :(" }))
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
            .catch(error => this.setState({ status: "Something went wrong, try a different location", divIdAlternative: "centered is-shown" }))
    }

    // If the props update, execute the correct API query
    componentDidUpdate(prevProps) {
        if (prevProps.position !== this.props.position) {
            this.getWeatherCoords()
        } else if (prevProps.searchString !== this.props.searchString) {
            this.getWeatherString()
        }
    }

    degToCompass() {
        var val = Math.floor((this.state.weather.wind.deg / 45) + 0.5);
        var compass = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        return compass[(val % 8)];
    }

    doTemp() {
        if (this.state.weather.main.temp < -20) {
            return (<i class="fas fa-thermometer-empty"></i>)
        } else if (this.state.weather.main.temp < -10 && this.state.weather.main.temp > -20) {
            return (<i className="fas fa-thermometer-quarter"></i>)
        } else if (this.state.weather.main.temp < 10 && this.state.weather.main.temp > -10) {
            return (<i className="fas fa-thermometer-half"></i>)
        } else if (this.state.weather.main.temp < 20 && this.state.weather.main.temp > 10) {
            return (<i className="fas fa-thermometer-three-quarters"></i>)
        } else {
            return (<i className="fas fa-thermometer-full"></i>)
        }
    }

    render() {
        if (this.state.weather) {

            let windDirection = this.state.weather.wind.deg;
            if (windDirection === "undefined") {
                let windDirection = "Wind direction not available";
            }

            let windRotate = "rotate(" + windDirection + "deg)";



            return (
                <div className={this.state.divIdWeatherMain}>
                    <div className="tile">
                        <div className="tile is-vertical is-12">
                            <div className="tile padded-top-more">
                                <div className="tile is-parent is-horizontal is-padded solidwhite has-shadow not-rounded ">
                                    <div className="tile is-child is-3 notification solidwhite">
                                        <p className="title">{this.state.weather.name + ", " + this.state.countryname}</p>
                                        <p className="subtitle is-spaced text-is-small">{this.state.weather.weather[0].description}</p>

                                        <div className="field is-grouped">
                                            <p className="title"><WeatherIcon iconCode={this.state.weather.weather[0].main}/> </p>
                                            <strong><p className="padded-left title">{Math.round((this.state.weather.main.temp * 10)) / 10 + " °C"}</p></strong>
                                        </div>
                                    </div>

                                    <div className="tile is-child notification solidwhite">
                                        <table>
                                            <tbody>

                                                <tr>
                                                    <td className="padded-right">Temperature:</td>
                                                    <td> {this.doTemp()} </td>
                                                    <td className="padded-left"> {this.state.weather.main.temp} °C {"(" + Math.round((this.state.weather.main.temp * 1.8) + 32) + " °F)"}</td>
                                                </tr>

                                                <tr>
                                                    <td className="padded-right">Wind: </td>
                                                    <td> <FontAwesomeIcon style={{ transform: windRotate }} icon={faLongArrowAltUp} className="text-is-large" /> </td>
                                                    <td className="padded-left"> <strong>{this.state.weather.wind.speed}</strong> m/s due <strong>{this.degToCompass()}</strong> ({windDirection}°) </td>
                                                </tr>

                                                

                                                <tr>
                                                    <td className="padded-right">Humidity:</td>
                                                    <td> <i className="fas fa-tint"></i> </td>
                                                    <td className="padded-left"> {this.state.weather.main.humidity} %</td>
                                                </tr>
{console.log(this.state.weather)}
                                                <tr>
                                                    <td className="padded-right">Status:</td>
                                                    <td> <WeatherIcon iconCode={this.state.weather.weather[0].main}/> </td>
                                                    <td className="padded-left"> {this.state.weather.weather[0].description} (cloud coverage {this.state.weather.clouds.all}%)</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>

                                </div>

                            </div>
                            <div className="tile is-parent not-padded is-horizontal is-12">
                                <div className="tile is-child notification cyan has-shadow not-rounded movie-container">
                                    <Movie />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
        } else {
            return (<div className={this.state.divIdAlternative}>Well shucks. :( According to our sources that place does not exist.</div>)
        }
    }
}


export default Weather;