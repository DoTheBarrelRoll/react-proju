import React, { Component } from 'react';
import './App.css';

class Movie extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true, movie: null, weather: null };
    }

    componentDidMount() {
        /*fetch('https://api.themoviedb.org/3/movie/550?api_key=79d3c1eee6d11a1dad4fefb18da19ce8', {
            method: 'get'
        })
            .then(result => result.json())
            .then(movie => this.setState({ movie: movie, loading: false }))
            */
    }



    render() {
        return (
            <div>{this.state.loading ?
                (<div>Loading movies</div>) :
                (<div>{this.state.movie.original_title}</div>)}
            </div>
        )
    }
}


export default Movie;

/*
http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
Key: 4ab2152ab8763e7e54aae7d10515dc07

TMDB key: 79d3c1eee6d11a1dad4fefb18da19ce8
*/