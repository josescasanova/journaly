/**
 * Landing Page
 */
import React from 'react';

class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };

    this.handleUserChange = this.handleUserChange.bind(this);
  }

  handleUserChange() {
    this.setState({userName: this.refs.userName.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let userName = this.refs.userName.value;
    window.location = '/user/' + userName;
  }

  render() {
    return (
      <form className="form__name" onSubmit={this.handleSubmit.bind(this)}>
        <h1>What is your first name?</h1>
        <input type="text" onChange={this.handleUserChange} ref="userName" required />
        <input type="submit" />
      </form>
    )
  }
}

export default LandingPage;