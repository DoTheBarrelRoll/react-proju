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
            + '&units=metric&appid='
            + process.env.REACT_APP_WEATHERKEY, {
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

    // Assigns cardinal directions (N, NE, etc) for the wind direction (response)
    degToCompass() {
        var val = Math.floor((this.state.weather.wind.deg / 45) + 0.5);
        var compass = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        return compass[(val % 8)];
    }

    // Assigns the corresponding icon for the temperature (response)
    doTemps() {
        var temps = Math.round((this.state.weather.main.temp + 25) / 15)
        if (temps > 4) {
            temps = 4;
        } else if (temps < 0) {
            temps = 0;
        }
        var tempsIcon = ["empty", "quarter", "half", "three-quarters", "full"];
        return <i className={"fas fa-thermometer-" + tempsIcon[Math.round(temps)]}></i>
    }

    checkPressure() {
        var baroPressure = this.state.weather.main.pressure;
        if (!baroPressure) {
            return baroPressure = "Not available at this time"
        } else if (baroPressure > 1013) {
            return baroPressure = "above average";
        } else {
            return baroPressure = "below average";
        }
    }

    render() {
        if (this.state.weather) {

            let timeZ = this.state.weather.timezone;

            let dateObj = new Date(this.state.weather.dt * 1000);
            let utcString = dateObj.toString();
            let userTime = utcString.slice(16, 21);
            let userGmtDiff = utcString.slice(28, 33) / 100 * 3600;

            let localTime = this.state.weather.dt + timeZ - userGmtDiff;
            let localtimeObj = new Date(localTime * 1000);
            let localString = localtimeObj.toString();
            let localtimeString = localString.slice(16, 21);

            let windDirection = this.state.weather.wind.deg;
            let windRotate = "rotate(" + windDirection + "deg)";


            let dayStart = (Math.floor((this.state.weather.dt + timeZ) / 86400)) * 86400 + (this.state.weather.dt - localTime);
            let dayEnd = (Math.floor((this.state.weather.dt + timeZ) / 86400) * 86400 + 86399) + (this.state.weather.dt - localTime);
            let dayStartPerc = Math.round((this.state.weather.sys.sunrise + userGmtDiff - dayStart) / (dayEnd - dayStart) * 100);
            let dayEndPerc = Math.round((this.state.weather.sys.sunset + userGmtDiff - dayStart) / (dayEnd - dayStart) * 100);
            let localTimePerc = Math.round((this.state.weather.dt + userGmtDiff - dayStart) / (dayEnd - dayStart) * 100);

            let sunriseTimeObj = new Date((this.state.weather.sys.sunrise + timeZ - userGmtDiff) * 1000);
            let riseString = sunriseTimeObj.toString();
            let sunriseString = riseString.slice(16, 21);

            let sunsetTimeObj = new Date((this.state.weather.sys.sunset + timeZ - userGmtDiff) * 1000);
            let setString = sunsetTimeObj.toString();
            let sunsetString = setString.slice(16, 21);

            let daylightTimeObj = new Date((this.state.weather.sys.sunset - this.state.weather.sys.sunrise - 7200) * 1000);
            let dayString = daylightTimeObj.toString();
            let daylightString = dayString.slice(16, 21);



            return (
                <div className={this.state.divIdWeatherMain}>
                    <div className="tile">
                        <div className="tile is-vertical is-12">
                            <div className="tile padded-top-more">
                                <div className="tile is-parent is-horizontal is-padded solidwhite has-shadow not-rounded ">
                                    <div className="tile is-child is-4 notification solidwhite">
                                        <p className="title">{this.state.weather.name + ", " + this.state.countryname}</p>
                                        <p className="subtitle is-spaced text-is-small">{this.state.weather.weather[0].description}</p>

                                        <div className="field is-grouped">
                                            <p className="title"><WeatherIcon iconCode={this.state.weather.weather[0].main} /> </p>
                                            <strong><p className="padded-left title">{Math.round((this.state.weather.main.temp * 10)) / 10 + " °C"}</p></strong>
                                        </div>
                                    </div>

                                    <div className="tile is-vertical is-child notification solidwhite">
                                        <div className="padded-bottom"><p className="title is-size-5">Measurements at {userTime} (+{userGmtDiff / 3600}GMT)</p>
                                            <table>
                                                <tbody>

                                                    <tr>
                                                        <td className="padded-right">Temperature:</td>
                                                        <td> {this.doTemps()} </td>
                                                        <td className="padded-left"> <strong>{this.state.weather.main.temp}</strong> °C {"(" + Math.round((this.state.weather.main.temp * 1.8) + 32) + " °F)"}</td>
                                                    </tr>

                                                    <tr>
                                                        <td className="padded-right">Wind: </td>
                                                        <td> <FontAwesomeIcon style={{ transform: windRotate }} icon={faLongArrowAltUp} /> </td>
                                                        <td className="padded-left"> <strong>{this.state.weather.wind.speed}</strong> m/s due <strong>{this.degToCompass()}</strong> ({windDirection}°) </td>
                                                    </tr>

                                                    <tr>
                                                        <td className="padded-right">Humidity:</td>
                                                        <td> <i className="fas fa-tint"></i> </td>
                                                        <td className="padded-left"> <strong>{this.state.weather.main.humidity}</strong> %</td>
                                                    </tr>

                                                    <tr>
                                                        <td className="padded-right">Sky:</td>
                                                        <td> <WeatherIcon iconCode={this.state.weather.weather[0].main} /> </td>
                                                        <td className="padded-left"> {this.state.weather.weather[0].description} (cloud coverage {this.state.weather.clouds.all}%)</td>
                                                    </tr>

                                                    <tr>
                                                        <td className="padded right">Pressure:</td>
                                                        <td> <i className="fas fa-weight"></i></td>
                                                        <td className="padded-left"> <strong>{this.state.weather.main.pressure}</strong> hPa/mb ({this.checkPressure()}) </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="tile is-child padded-top">
                                            <div className="tooltipTop" style={{ width: "105%", paddingLeft: localTimePerc + "%", marginLeft: "-2%" }}>
                                                <i className="fas fa-location-arrow fa-lg" style={{ transform: "rotate(135deg)" }}><div className="tooltip"></div></i>
                                                <span className="tooltiptext">Observation @ {localtimeString} <br></br> (local time)</span>
                                            </div>
                                            <div className="riseSetBar has-margin-top" style={{
                                                background: "linear-gradient(90deg, #860f44 "
                                                    + (dayStartPerc - 2)
                                                    + "%, #dda700 "
                                                    + (dayStartPerc + 2)
                                                    + "%, #dda700 "
                                                    + (dayEndPerc - 2)
                                                    + "%, #522222 "
                                                    + (dayEndPerc + 2)
                                                    + "%)"
                                            }}></div>

                                            <div className="field is-grouped padded-bottom has-text-white" style={{ marginTop: "-1.47em" }}>
                                                <div className="tooltipBot" style={{ width: (dayStartPerc + "%"), borderRight: "1px solid black", textAlign: "center" }}>
                                                    <i className="fas fa-moon fa-lg"></i>
                                                    <span className="tooltiptext">Sunrise {sunriseString}</span>
                                                </div>

                                                <div className="tooltipBot" style={{ width: (dayEndPerc - dayStartPerc + "%"), borderRight: "1px solid black", textAlign: "center" }}>
                                                    <i className="fas fa-sun fa-lg" style={{ overflow: "hidden" }}></i>
                                                    <span className="tooltiptext">Daylight for {daylightString}</span>
                                                </div>

                                                <div className="tooltipBot" style={{ width: (100 - dayEndPerc + "%"), textAlign: "center" }}>
                                                    <i className="fas fa-moon fa-lg" style={{ overflow: "hidden" }}></i>
                                                    <span className="tooltiptext">Sunset {sunsetString}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className="tile padded-top">
                        <div className="tile is-child has-shadow not-rounded movie-container red">
                            <Movie weather={this.state.weather} />
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