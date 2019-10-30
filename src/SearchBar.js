import React, { Component } from 'react';
import './App.css';
import { FontAwesomeIcon } from '../node_modules/@fortawesome/react-fontawesome';
import { faSearchLocation } from '../node_modules/@fortawesome/free-solid-svg-icons';
import { faTimes } from '../node_modules/@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '../node_modules/@fortawesome/free-solid-svg-icons';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true, buttonStatus: <FontAwesomeIcon icon={faSearchLocation} />,
            buttonClose: <FontAwesomeIcon icon={faTimes} />,
            notificationIcon: <FontAwesomeIcon icon={faExclamationTriangle} />,
            buttonStyling: 'button is-medium inactiveText locateButton',
            geoData: null,
            searchString: null,
            divStylingIdMain: 'container centered',
           // divStylingTop: '',
            divStylingIdCenterBox: 'centerBox skyblue has-shadow',
            divStylingIdCenterToNav: 'navbar-end field is-grouped container is-padded',
            divStylingIdErrorBar: 'is-hidden',
            divStylingIdNavbar: 'warningyellow'
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
                self.setState({ divStylingIdErrorBar: "is-shown warningyellow"})
            })
        }
    }

    // Save the written location to state
    handleChange = (event) => {
        this.setState({ searchString: event.target.value })
    }

    handleSubmit = (event) => {
        if(!this.state.searchString) {
            this.setState({ divStylingIdErrorBar: "is-shown warningyellow" })
            event.preventDefault();
        } else {
            this.props.locationName(this.state.searchString);
            this.setState({ divStylingIdErrorBar: "is-hidden" });
            this.setState({ buttonStyling: "button is-medium locateButton"})
            this.checkPosition();
            event.preventDefault();
        }    
    }

    changeStyle = () => {
        this.setState({ divStylingIdMain: "container centered fade-out" })
        this.sleep(500)
           .then(() => this.setState({ divStylingIdCenterBox: "hero skyblue fade-in padded-left-more", divStylingIdMain: "fade-in" })
            )
    }

    closeError = () => {
        this.setState({divStylingIdErrorBar: "is-hidden"})
    }

    checkPosition = () => {
        if(this.state.divStylingIdMain === "fade-in") { 
        } else {
            this.changeStyle()
        }
    }

    render() {
        return (
        <div>

        {/* Top-page error bar if user disables location */}
            <form className={this.state.divStylingIdErrorBar}>

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
        <div className={this.state.divStylingIdMain} id="Main">

        {/* Searchbox content: location, input, button */}
          <div className={this.state.divStylingIdCenterBox} id="CenterBox">

        {/* This is to make the items within the CenterBox on the same level and keep the block together*/}
            <div className={this.state.divStylingIdCenterToNav}>

                {/* Locate-button; outside of the form-field to keep input/submit from triggering it */}
                    <button className={this.state.buttonStyling}
                        onClick={this.handleClick}>{this.state.buttonStatus}</button>  

                 {/* Form-field; includes input-field and submit-button*/}
                    <form className="field is-grouped padded-left" onSubmit={this.handleSubmit}>
                            {/* Input-field */}
                                <input type="text"
                                    className="input is-medium rounded-left"
                                    placeholder="Where are you?"
                                    value={this.state.value}
                                    onChange={this.handleChange}>
                                </input>
                            {/* Submit-button */}
                                <input className="button is-dark is-medium rounded-right" id="main" type="submit" value="Search"
                                onClick={this.handleSubmit}></input>
                    </form>  
            </div>
        </div>
       </div>

       </div>
        )
    }
}

export default SearchBar;