import React, { Component } from 'react';
import Weather from './Weather';
import Movie from './Movie';
import './css/custom.css';
import './css/bulma-0.7.5/css/bulma.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }


  render() {
    return (
      <div className='container'>
        <div className='columns'>
          <div className='column auto'>
            <input type="text" className="input is-tiny" placeholder="Where are you?" />
          </div>
          <div className='column is-one-quarter'>
            <button className="button is-fullwidth is-success" >Button</button>
          </div>

        </div>
        <div className='skyblue'><Movie /><Weather />
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