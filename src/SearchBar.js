import React, { Component } from 'react';
import './App.css';
import { FontAwesomeIcon } from '../node_modules/@fortawesome/react-fontawesome';
import { faTimes, faExclamationTriangle, faMapMarkerAlt } from '../node_modules/@fortawesome/free-solid-svg-icons';
import { whileStatement } from '@babel/types';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            buttonStatus: <FontAwesomeIcon icon={faMapMarkerAlt} />,
            buttonClose: <FontAwesomeIcon icon={faTimes} />,
            notificationIcon: <FontAwesomeIcon icon={faExclamationTriangle} />,
            buttonStyling: 'button is-medium locateButton solidwhite',
            geoData: null,
            searchString: null,
            divIdMain: 'container centered column is-half',
            divIdCenterBox: 'centerBox solidwhite has-shadow',
            divIdInfoBox: ' centerBox solidwhite has-shadow',
            divIdCenterToNav: 'field is-grouped container is-padded',
            divIdErrorBar: 'is-hidden',
            divIdNavbar: 'warningyellow',
            divIdInput: "input is-medium"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Transition animation delay
    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    // Send geolocation data to be used in the weather api query and display an error if geolocation is denied
    handleClick = () => {
        let self = this;
        const geo = navigator.geolocation;

        if (!geo) {
            this.setState({ buttonStyling: "button is-medium locateButton" })
        } else {
            geo.getCurrentPosition(function (position) {
                self.setState({ buttonStyling: "button is-medium locatedButton" });
                self.props.locationData(position);
                self.checkPosition();
            }, function (error) {
                self.setState({ buttonStyling: "button is-medium locateButton" })
                self.setState({ divIdErrorBar: "is-shown warningyellow" })
            })
        }
    }

    // Save the written location to state
    handleChange = (event) => {
        this.setState({ searchString: event.target.value })
    }

    handleSubmit = (event) => {
        if (!this.state.searchString) {
            this.setState({ divIdInput: "input is-medium is-danger" })
            event.preventDefault();
        } else {
            this.props.locationName(this.state.searchString);
            this.setState({ divIdErrorBar: "is-hidden" });
            this.setState({ buttonStyling: "button is-medium locateButton" })
            this.setState({ divIdInput: "input is-medium" })
            this.checkPosition();
            event.preventDefault();
        }
    }

    changeStyle = () => {
        this.setState({ divIdMain: "container centered column is-half fade-out",
                        divIdInfoBox: "centerBox solidwhite has-shadow fade-out"})
        this.sleep(500)
            .then(() => this.setState({ divIdCenterBox: "hero solidwhite fade-in has-shadow-small", divIdMain: "fade-in"})
            )
    }

    closeError = () => {
        this.setState({ divIdErrorBar: "is-hidden" })
    }

    checkPosition = () => {
        if (this.state.divIdMain === "fade-in") {
        } else {
            this.changeStyle()
        }
    }

    render() {
        return (
            <div>
                
              

                {/* Top-page error bar if user disables location */}
                <form className={this.state.divIdErrorBar}> 

                    {/*This makes the items within the error message to be grouped together*/}
                    <div className='field is-grouped container is-padded'>
                    
                        <div className="navbar-item is-big-icon">{this.state.notificationIcon}</div>

                        <h1 className="navbar-item overrideh1">You have disabled location services.</h1>

                        <div className='navbar-item navbar-end is-big-icon is-clickable' onClick={this.closeError}>
                            {this.state.buttonClose}
                        </div>
                    </div>
                </form>
                {/* Error bar ends here */}

                {/* Full-page div to (initially) center the searchbox on the page */}
                <div className={this.state.divIdMain} id="Main">

                    <div>
                        {/* Searchbox content: location, input, button */}
                        <div className={this.state.divIdCenterBox} id="CenterBox">  

                        <div>
                              
                <i className="fas fa-cloud onTop text-is-large"></i>
                <i className="fas fa-ticket-alt onBottom text-is-large"></i>
                        </div>

                            {/* This is to make the items within the CenterBox on the same level and keep the block together*/}
                            <div className={this.state.divIdCenterToNav}>

                                {/* Locate-button; outside of the form-field to keep input/submit from triggering it */}
                                <button className={this.state.buttonStyling} onClick={this.handleClick}>{this.state.buttonStatus}</button>

                                {/* Form-field; includes input-field and submit-button*/}
                                <form className="field is-grouped padded-left container" onSubmit={this.handleSubmit}>
                                    {/* Input-field */}
                                    <input type="text"
                                        className={this.state.divIdInput}
                                        placeholder="Where are you?"
                                        value={this.state.value}
                                        onChange={this.handleChange}>
                                    </input>
                                    {/* Search-button */}
                                    <input className="button searchButton is-medium has-margin-left" id="search" type="submit" value="Search"
                                     onClick={this.handleSubmit}></input>
                                </form>
                            </div>
                        </div>

                        {/* This is the info box below the input screen */}
                        <div className={this.state.divIdInfoBox} id="InfoBox">
                            <p className="subtitle"> This is <strong> Sääkino™</strong>. <br></br> It recommends movies based on the weather observed at the given location. Type in your city to see what you should be watching now!</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBar;