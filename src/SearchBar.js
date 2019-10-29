import React, { Component } from 'react';
import './App.css';
import { FontAwesomeIcon } from '../node_modules/@fortawesome/react-fontawesome';
import { faSearchLocation } from '../node_modules/@fortawesome/free-solid-svg-icons';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true, buttonStatus: <FontAwesomeIcon icon={faSearchLocation} />, buttonStyling: 'button is-medium inactiveText locateButton',
            geoData: null,
            searchString: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick = () => {
        let self = this;
        const geo = navigator.geolocation;

        if (!geo) {
            this.setState({ buttonStyling: "button is-medium locateButton" })
        } else {
            geo.getCurrentPosition(function (position) {
                self.setState({ buttonStyling: "button is-medium locatedButton" });
                self.props.locationData(position);
            }, function (error) {
                self.setState({ buttonStyling: "button is-medium locateButton" })
            })
        }
    }

    handleChange = (event) => {
        this.setState({ searchString: event.target.value })
    }

    handleSubmit = (event) => {
        this.props.locationName(this.state.searchString);    
        event.preventDefault();
    }

    render() {
        return (

            <div className='field is-grouped is-padded'>
                <div className=''>
                    <button className={this.state.buttonStyling}
                        onClick={this.handleClick}>{this.state.buttonStatus}</button>
                </div>
                <div className="">
                    <form onSubmit={this.handleSubmit}>
                        <div className="field is-grouped padded-left">
                            <div className=''>
                                <input type="text"
                                    className="input is-medium rounded-left"
                                    placeholder="Where are you?"
                                    value={this.state.value}
                                    onChange={this.handleChange}>
                                </input>
                            </div>
                            <div className="">
                                <input className="button is-dark is-medium rounded-right" type="submit"></input>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SearchBar;