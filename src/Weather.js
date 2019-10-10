import React, { Component } from 'react';
import './App.css';

class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true, weather: null };
    }

    // If props update, execute this
    componentDidUpdate(prevProps) {
        // If position prop from parent updates, fetch the weather on that position
        if (this.props.position !== prevProps.position) {
            fetch('https://api.openweathermap.org/data/2.5/weather?lat='
                + this.props.position.coords.latitude
                + '&lon='
                + this.props.position.coords.longitude
                + '&units=metric&appid=4ab2152ab8763e7e54aae7d10515dc07', {
                method: 'get'
            })
                .then(result => result.json())
                .then(weather => this.setState({ weather: weather, loading: false }))
        }
    }

    render() {
        return (
            <div>
                <div>{this.state.loading ?
                    (<div>Waiting for weather...</div>) :
                    (<div>In {this.state.weather.name}, currently it's {this.state.weather.main.temp} °C</div>)}
                </div>
            </div>
        )
    }

}


export default Weather;

/*
http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
Key: 4ab2152ab8763e7e54aae7d10515dc07

TMDB key: 79d3c1eee6d11a1dad4fefb18da19ce8
*/