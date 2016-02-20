import React  from 'react';
import ReactDOM  from 'react-dom';

import { Router, Route } from 'react-router';
import { createHistory } from 'history';

/**
 * App
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: {}
    }
  }

  addEntry(entry) {
    let date = new Date;
    date     = date.toDateString();
    date     = date.replace(/\s+/g, '-').toLowerCase();

    this.state.entries['entry-' + date] = entry;
    this.setState({entries: this.state.entries});
  }

  render() {
    let { userName } = this.props.params;

    return (
      <div className="journal">
        <JournalHead userName={userName}/>
        <JournalBody addEntry={this.addEntry.bind(this)}/>
      </div>
    )
  }
}

/**
 * JournalHead
 */
class JournalHead extends React.Component {
  render() {
    let todaysDate = new Date;
    return (
      <div className="journal__header">
        <h1>Hi {this.props.userName}! - {todaysDate.toDateString()}</h1>
      </div>
    )
  }
}

/**
 * Journal Body
 */
class JournalBody extends React.Component {

  createEntry(event) {
    event.preventDefault();
    var date = new Date;
    date     = date.toDateString();

    let entry = {
      text: this.refs.text.value,
      date: date
    }

    this.props.addEntry(entry);
  }

  render() {
    return (
      <div className="journal__body">
        <form className="journal__form" onSubmit={this.createEntry.bind(this)}>
          <textarea input="type" ref="text" placeholder="Dear Journal..."></textarea>
          <button type="submit">Save Entry</button>
        </form>
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
