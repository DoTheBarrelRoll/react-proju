import React, { Component } from 'react';
import './App.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Movie extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true, movies: [], weather: null };
    }

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/search/movie?api_key=79d3c1eee6d11a1dad4fefb18da19ce8&language=en-US&query=Rain&page=1&include_adult=false', {
            method: 'get'
        })
            .then(result => result.json())
            //.then(movie => this.setState({movies: movie.map(movie => movie.title)}))
            
            
    }



    render() {
        return(
        //    <div>{this.state.movies}</div>
        <div></div>
        )
        
    }
}


export default Movie;

/*
http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
Key: 4ab2152ab8763e7e54aae7d10515dc07

TMDB key: 79d3c1eee6d11a1dad4fefb18da19ce8
*/