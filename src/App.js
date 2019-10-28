import React, { Component } from 'react';
import Weather from './Weather';
import Movie from './Movie';
import SearchBar from './SearchBar';
import './css/bulma-0.7.5/css/bulma.css';
import './css/custom.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true, position: null, location: null, searchString: null };
  }

  fetchCoords = (pos) => {
    this.setState({ position: pos });
  }

  fetchLocation = (weather) => {
    this.setState({ location: weather })
  }

  render() {
    return (

      <div className=''>

        <div className='container centered'>
          <div className='centerBox skyblue'>
            <SearchBar locationData={this.fetchCoords.bind(this)} />
          </div>
        </div>
        <div className='skyblue'>
          <Movie /><Weather position={this.state.position} searchString={this.state.searchString} getLocation={this.fetchLocation.bind(this)} />
        </div>
      </div>
    )
  }
}


export default App;