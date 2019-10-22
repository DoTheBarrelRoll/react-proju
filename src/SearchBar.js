import React, { Component } from 'react';
import './App.css';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    render() {
        return (
            <div>
                <input type="text" className="input is-large padded-right" placeholder="Where are you?" value={(this.props.location) ? (this.props.location.name) : ('')}/>
            </div>
        )
    }    
}

export default SearchBar;