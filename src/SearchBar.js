import React, { Component } from 'react';
import './App.css';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true};
    }

  /*  handleChange(event) {
        this.setState({value: this.props.location.name});
    } */

    render() {
        return (
                <input type="text" className="input is-medium padded-right" placeholder="Where are you?" value={(this.props.location) ? (this.props.location.name + ', ' + this.props.location.sys.country) : ('')}/>
        )
    }    
}

export default SearchBar;