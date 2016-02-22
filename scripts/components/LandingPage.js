/**
 * Landing Page
 */
import React from 'react';

import Firebase from 'firebase';
const ref = new Firebase('https://journaly.firebaseio.com/');

class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uid: '',
    };
  }

  componentWillMount() {
    var token = localStorage.getItem('token');

    if(token) {
      ref.authWithCustomToken(token, this.authHandler.bind(this));
    }
  }

  authenticate(provider) {
    ref.authWithOAuthPopup(provider, this.authHandler.bind(this));
  }

  authHandler(err, authData) {
    if(err) {
      console.error(err);
      return;
    }

    // save the login token in the browser
    localStorage.setItem('token', authData.token);

    localStorage.setItem('uid', authData.uid);

    this.setState({
      uid: authData.uid
    });
  }

  renderLogin() {
    return (
      <nav className="login">
        <h1>Journaly</h1>
        <button className="twitter"onClick={this.authenticate.bind(this, 'twitter')} >Log In with Twitter</button>
      </nav>
    )
  }

  render() {

    if ( this.state.uid ) {

      let uid = this.state.uid;
      window.location = '/user/' + uid;

    } else {

      return (
        <div>
          {this.renderLogin()}
        </div>
      )
    }
  }
}

export default LandingPage;