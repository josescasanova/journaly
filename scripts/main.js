import React  from 'react';
import ReactDOM  from 'react-dom';

import { Router, Route } from 'react-router';
import { createHistory } from 'history';

/**
 * App
 */
class App extends React.Component {

  render() {
    let { userName } = this.props.params;

    return (
      <div className="journal__main">
      <AppBar
        title="Title"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
        <JournalHead userName={userName}/>
        <JournalBody/>
        <JournalFooter/>
      </div>
    )
  }
}

/**
 * JournalHead
 */
class JournalHead extends React.Component {
  render() {
    return (
      <div className="journal__header">
        <h1>Hi {this.props.userName}!</h1>
      </div>
    )
  }
}

/**
 * Journal Body
 */
class JournalBody extends React.Component {
  render() {
    return (
      <div className="journal__body">
      </div>
    )
  }
}

/**
 * Journal Footer
 */
class JournalFooter extends React.Component {
  render() {
    return (
      <div className="journal__footer">
      </div>
    )
  }
}

/**
 * Landing Page
 */
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

/**
 * Not Found
 */
class NotFound extends React.Component {
  render() {
    return <h1>Not Found!</h1>
  }
}

/*
  Routes
*/
var routes = (
  <Router history={createHistory()}>
    <Route path="/" component={LandingPage}/>
    <Route path="/user/:userName" component={App}/>
    <Route path="*" component={NotFound} />
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
