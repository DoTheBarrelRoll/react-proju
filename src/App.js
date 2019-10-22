import React, { Component } from 'react';
import Weather from './Weather';
import Movie from './Movie';
import Location from './Location';
import SearchBar from './SearchBar';
import './css/bulma-0.7.5/css/bulma.css';
import './css/custom.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true, position: null, location: null};
  }

  fetchCoords = (pos) => {
    this.setState({ position: pos});
  }

  fetchLocation = (weather) => {
   this.setState({location: weather})
  }

  render() {
    return (
      <div className='container skyblue rounded'>
        <div className='columns'>
          <div className='column is-half'>
            <SearchBar location={this.state.location}/>
          </div>
          <div>
            <Location locationData= { this.fetchCoords.bind(this) } />
          </div>
          <div className='column'>
            <button onClick={this.onClick} className="button is-fullwidth is-success" >Search</button>
          </div>
        </div>

        <div className='skyblue'>
          <Movie /><Weather position={this.state.position} getLocation={this.fetchLocation.bind(this)}/>
        </div>
      </div>
    )
  }
}


export default App;

/*
http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
Key: 4ab2152ab8763e7e54aae7d10515dc07

TMDB key: 79d3c1eee6d11a1dad4fefb18da19ce8
*/