import React, { Component } from 'react';
import Weather from './Weather';
import SearchBar from './SearchBar';
import Footer from './Footer';
import './css/bulma-0.7.5/css/bulma.css';
import './css/custom.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true, position: null, location: null, searchString: null };
  }

  // Callback function to fetch location data from SearchBar component
  fetchCoords = (pos) => {
    this.setState({ position: pos });
  }

  // Callback function to fetch search string from SearchBar component
  fetchSearchString = (name) => {
    this.setState({ searchString: name })
  }

  // Callback function to fetch location from weather API query to be then displayed on the page
  fetchLocation = (weather) => {
    this.setState({ location: weather })
  }

  render() {
    return (

      <div className="">

        <SearchBar locationData={this.fetchCoords.bind(this)} locationName={this.fetchSearchString.bind(this)} />

        <div className='container'>
          <Weather position={this.state.position} searchString={this.state.searchString} getLocation={this.fetchLocation.bind(this)} />
        </div>
        <Footer />
      </div>
    )
  }
}


export default App;