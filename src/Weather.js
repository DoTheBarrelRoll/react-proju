import React, { Component } from 'react';
import './App.css';

class Weather extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true, weather: null };
    }

    shouldComponentUpdate() {
        if (this.state.weather) {
            return(false)
        } else {
            return(true)
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
                .then(weather => this.setState({ weather: weather, loading: false}))
                
        } else {
            self.props.getLocation(self.state.weather)
        }

        
    }

    render() {
        return (
            <div>
                <div>{this.state.loading ?
                    (<div>Waiting for weather...</div>) :
                    (<div>In {this.state.weather.name}, {this.state.weather.sys.country} currently it's {this.state.weather.main.temp} °C</div>)}
                </div>
            </div>
        )
    }
}


export default Weather;