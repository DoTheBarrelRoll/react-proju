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
            autoplaySpeed: 10000,
            speed: 700,
            cssEase: "ease-in-out",
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnHover: 1,
            arrows: false
        };
        console.log(this.state.movies)

        if (this.state.movies) {
            return (
                <div>
                    <Slider {...settings}>
                        {
                            this.state.movies.map(((movie, i) =>
                                <div className="tile is-12 notification not-rounded is-padded has-shadow" key={i}>
                                    <div className="tile is-12 is-horizontal">
                                        <div className="tile is-child is-4 rounded padded-x" style={{ minWidth: "300px" }}>
                                            <img alt="Movie poster" src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}></img>
                                        </div>

                                        <div className="tile is-child is-8 movieInfoContainer">
                                            <p className="title has-text-white has-text-centered is-padded red rounded">{this.state.movies[i].title}</p>
                                            <p className="subtitle is-7 has-text-centered" style={{ padding: ".2em 0" }}>(Original title: {this.state.movies[i].original_title})</p>
                                            <p className="has-text-centered is-size-7 padded-x is-dark">Description: "{this.state.movies[i].overview}"</p>

                                            <div className="tile-is 4">
                                                <table>
                                                    <tbody>

                                                        <tr>
                                                            <td className="padded-right">Stars:</td>
                                                            <td className="padded-left"> <strong>{this.state.movies[i].vote_average}/10</strong> ({this.state.movies[i].vote_count} votes)</td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>

                                                <div className="tile-is 4">
                                                   
                                                </div>
                                            </div>
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