import React, { Component } from 'react';
import './App.css';

class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true, weather: null };
    }

    componentDidMount() {
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&units=metric&appid=4ab2152ab8763e7e54aae7d10515dc07', {
            method: 'get'
        })
            .then(result => result.json())
            .then(weather => this.setState({ weather: weather, loading: false}))
    }


    render() {
        return (
            <div>
                <div>{this.state.loading ?
                    (<div>Loading data...</div>) :
                    (<div>{this.state.weather.main.temp}</div>)}
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