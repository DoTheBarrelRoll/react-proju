import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
            <footer className="footer has-text-centered" style={{marginTop: "3em"}}>
                <div className="column" style={{}}>

                    <a className="card linear-gradient has-margin" href="https://github.com/DoTheBarrelRoll/react-proju" alt="Project page link">
                        <div className="card-content">
                            <div className="media">
                                <div className="media-left">
                                    <figure className="image is-48x48">
                                        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="Avatar" className="fa-github is-rounded"></img>
                                    </figure>
                                </div>
                                <div className="media-content">
                                    <p className="title is-5 has-text-white">Sääkino project page</p>
                                    <p className="subtitle is-7 has-text-white">&copy; 2019 us two</p>
                                </div>
                            </div>
                        </div>
                    </a>
                    
                    <a className="card has-margin" href="https://github.com/DoTheBarrelRoll">
                        <div className="card-content">
                            <div className="media">
                                <div className="media-left">
                                    <figure className="image is-48x48">
                                        <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/e9/e93f26070176cf4382d4dfee01db3371bccb1c7b_full.jpg" alt="Avatar"></img>
                                    </figure>
                                </div>
                                <div className="media-content">
                                    <p className="title is-5">Miikka Niemeläinen</p>
                                    <p className="subtitle is-7">@github/DoTheBarrelRoll</p>
                                </div>
                            </div>
                        </div>
                    </a>

                    <a className="card has-margin" href="https://github.com/kissakalae">
                        <div className="card-content">
                            <div className="media">
                                <div className="media-left">
                                    <figure className="image is-48x48">
                                        <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ec/ec40da7eedc242c1f9302dcdd1829441aed367e1_full.jpg" alt="Avatar"></img>
                                    </figure>
                                </div>
                                <div className="media-content">
                                    <p className="title is-5">Nader Gam</p>
                                    <p className="subtitle is-7">@github/kissakalae</p>
                                </div>
                            </div>
                        </div>
                    </a>

                </div>
            </footer>
        )
    }
}

export default Footer;