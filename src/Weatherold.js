import React, { Component } from 'react';
import './App.css';

class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = { status: "Waiting for weather...", weather: null, error: null };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.weather) {
            return (false)
        } else {
            return (true)
        }
    }


    handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        } else {
            return response;
        }
    }

    // If props update, execute this
    componentDidUpdate(prevProps) {
        // If position prop from parent updates, fetch the weather on that position
        let self = this;
        if (this.props.position !== prevProps.position) {
            fetch('https://api.openweathermap.org/data/2.5/weather?lat='
                + this.props.position.coords.latitude
                + '&lon='
                + this.props.position.coords.longitude
                + '&units=metric&appid=4ab2152ab8763e7e54aae7d10515dc07', {
                method: 'get'
            })
                .then(result => result.json())
                .then(weather => this.setState({ weather: weather, status: "" }))

        } else if (this.props.searchString !== prevProps.searchString) {
            fetch('https://api.openweathermap.org/data/2.5/weather?q='
                + this.props.searchString
                + '&units=metric&appid=4ab2152ab8763e7e54aae7d10515dc07')
                .then(response => this.handleErrors(response))
                .then(result => result.json())
                .then(weather => this.setState({ weather: weather, status: "" }))
                .catch(error => this.setState({ status: error.toString()}))

        } else {
            self.props.getLocation(self.state.weather)
            console.log(this.state.weather)
        }


    }

    render() {
        return (
            <div>
                <div>{this.state.weather ?
                    (<div>In {this.state.weather.name}, {this.state.weather.sys.country} currently it's {this.state.weather.main.temp} °C</div>)
                     :
                    (<div>{this.state.status}</div>)
                    }
                </div>
            </div>
        )
    }
}


export default Weather;