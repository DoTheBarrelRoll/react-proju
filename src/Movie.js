import React, { Component } from 'react';
import './App.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './TmdbGenres.js';
import { Palette } from 'react-palette';
const genreList = require('./TmdbGenres.js');

class Movie extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true, movies: [], weather: null, error: null, palette: null };
    }

    // Get TMDB genres from the TmdbGenres file and and them to a string to be used in the TMDB query
    getGenres() {
        let weather = this.props.weather.weather[0].main;
        let genres = genreList.getName(weather);
        let genresString = "";
        genres.forEach(genre => {
            genresString += genre + "|"
        });
        return (genresString)
    }
    
    // Conctruct the TMDB query with the correct genres from the getGenres function when the user has entered their location and the Movie component is called
    // When the movie query is done, add the movies to a state variable
    componentDidMount = () => {
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
        // React-slick carousel settings
        const settings = {
            infinite: true,
            autoplay: true,
            autoplaySpeed: 10000,
            speed: 700,
            cssEase: "ease-in-out",
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnHover: 1,
            arrows: false
        };

        // When the movies are loaded, render the content by mapping through the movie state variable and rendering them to the carousel
        if (this.state.movies) {
            return (
                <div className="has-shadow not-rounded notification">
                    <Slider {...settings}>
                        {
                            this.state.movies.map(((movie, i) =>
                                <div className="tile is-12 not-rounded" key={i}>
                                    <div className="tile is-12 is-horizontal">
                                        <div className="tile is-child is-4 rounded is-padded" style={{ minWidth: "300px" }}>
                                            <img alt="Movie poster" src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}></img>
                                        </div>
                                        <Palette src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}>
                                            {({ data, loading }) => (

                                                <div className="tile is-child is-8 movieInfoContainer is-padded">
                                                    <div className="title has-text-white has-text-centered is-padded cyan" style={{ backgroundColor: data.vibrant, display: "border-box" }}>{this.state.movies[i].title}</div>
                                                    <div className="is-size-7 has-text-white has-text-centered not-rounded padded-y" style={{ backgroundColor: data.darkMuted }}>Original title: "{this.state.movies[i].original_title}"</div>

                                                    <p className="has-text-centered is-size-6 is-padded" style={{ paddingLeft: "40px", paddingRight: "40px", backgroundColor: data.muted, color: "white" }}>"{this.state.movies[i].overview}"</p>

                                                    <div className="tile padded-top">
                                                        <table>
                                                            <tbody>

                                                                <tr>
                                                                    <td className="padded-right">Stars:</td>
                                                                    <td className="has-text-centered"> <i className="fas fa-star"></i> </td>
                                                                    <td className="padded-left"> <strong>{this.state.movies[i].vote_average}/10</strong> ({this.state.movies[i].vote_count} votes)</td>
                                                                </tr>
                                                                
                                                                <tr>
                                                                    <td className="padded-right">Release date:</td>
                                                                    <td className="has-text-centered"> <i className="fas fa-calendar-check"></i></td>
                                                                    <td className="padded-left"><strong>{movie.release_date}</strong></td>
                                                                </tr>

                                                                <tr>
                                                                    <td className="padded-right">Original language: </td>
                                                                    <td className="has-text-centered"> <i className="fas fa-language"></i></td>
                                                                    <td className="padded-left" style={{textTransform: "capitalize"}}>{movie.original_language}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>


                                                    <a className="movie-button button" href={"https://www.themoviedb.org/movie/" + movie.id} target="_blank" rel="noopener noreferrer" style={{backgroundColor: data.vibrant}}>
                                                        <p className="padded-right">TMDB page</p>
                                                        <span className="fas fa-external-link-alt"></span>
                                                    </a>
                                                </div>
                                            )}

                                        </Palette>

                                    </div>

                                </div>))
                        }
                    </Slider>
                </div>

            );
        }
    }
}


export default Movie;