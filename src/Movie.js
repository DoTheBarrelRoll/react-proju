import React, { Component } from 'react';
import './App.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './TmdbGenres.js';
const genreList = require('./TmdbGenres.js');


class Movie extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true, movies: [], weather: null, error: null };
    }

    getGenres() {
        let weather = this.props.weather.weather[0].main;
        let genres = genreList.getName(weather);
        let genresString = "";
        genres.forEach(genre => {
            genresString += genre + "|"
        });
        return (genresString)
    }

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key='
            + process.env.REACT_APP_TMDBKEY
            + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres="
            + this.getGenres(), {
            method: 'get'
        })
            .then(result => result.json())
            .then(movie => this.setState({ movies: movie.results }))
    }



    render() {
        const settings = {
            infinite: true,
            autoplay: true,
            speed: 700,
            cssEase: "ease-in-out",
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        if (this.state.movies) {
            return (
                <div className="movie-container">
                    <Slider {...settings}>
                        {
                            this.state.movies.map(((movie, i) => <div className="movie-item" key={i}><h2>{movie.title}</h2><img alt="Movie poster" src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}></img></div>))
                        }
                    </Slider>
                </div>
            );
        }
    }
}


export default Movie;