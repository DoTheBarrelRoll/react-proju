import React, { Component } from 'react';
import './App.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Movie extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true, movies: [], weather: null, error: null };
    }

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=79d3c1eee6d11a1dad4fefb18da19ce8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28', {
            method: 'get'
        })
            .then(result => result.json())
            .then(movie => this.setState({ movies: movie.results }))


    }



    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        if (this.state.movies) {
            return (
                <div className="movie-container">
                    <Slider {...settings}>
                        {
                            this.state.movies.map((movie => <div className="movie-item"><h3>{movie.title}</h3><img src={"http://image.tmdb.org/t/p/w500/" + movie.poster_path}></img></div>))
                        }
                    </Slider>
                </div>
            );
        }
    }
}


export default Movie;

/*
http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
Key: 4ab2152ab8763e7e54aae7d10515dc07

TMDB key: 79d3c1eee6d11a1dad4fefb18da19ce8
*/