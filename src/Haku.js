import React, { Component } from 'react';
import './App.css';
import Weather from './Weather';
import Movie from './Movie';

class Haku extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true };
    }


    render() {
        return (
            <div className='container'><Movie /><Weather /></div>
        )
    }
}


export default App;

/*
http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
Key: 4ab2152ab8763e7e54aae7d10515dc07

TMDB key: 79d3c1eee6d11a1dad4fefb18da19ce8
*/