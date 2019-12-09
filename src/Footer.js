import React, { Component } from 'react';

class Footer extends Component {

render(){
    return(
        <footer className="footer highlight" style={{marginTop: "4em"}}>
            <a style={{ marginBottom: "8px", color: "none"}} href="https://github.com/DoTheBarrelRoll/react-proju"><p className="fab fa-github fa-4x"></p></a>
            <p className="">&copy; 2019 Nader Gam ja Miikka Niemeläinen</p>
        </footer>
    )}       
}

export default Footer;