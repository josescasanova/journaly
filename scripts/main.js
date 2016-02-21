import React  from 'react';
import ReactDOM  from 'react-dom';

import { Router, Route } from 'react-router';
import { createHistory } from 'history';
var Rebase  = require('re-base');
var base = Rebase.createClass('https://journaly.firebaseio.com/');

/**
 * App
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: {},
      journal: ''
    }
  }

  componentDidMount(){
    base.syncState('user/' + this.props.params.userName, {
      context : this,
      state : 'entries'
    });
  }

  addEntry(entry) {
    let date      = entry.date;
    date          = date.replace(/\s+/g, '-').toLowerCase();

    console.log(entry);
    let entryName = 'entry-' + date;

    if ( this.state.entries[entryName] ) {
      this.state.entries[entryName].text = entry.text;
    } else {
      this.state.entries[entryName] = entry;
    }

    this.setState({entries: this.state.entries});

    this.updateJournal(entryName);
  }

  updateJournal(entry) {
    this.state.journal = entry;
    this.setState({journal: this.state.journal});
  }

  render() {
    let userName  = this.props.params.userName;
    let entry     = this.state.journal;
    let entries   = this.state.entries;

    return (
      <div className="app__container">
        <Entries entries={this.state.entries} updateJournal={this.updateJournal.bind(this)}/>
        <Journal userName={userName} entry={entry} addEntry={this.addEntry.bind(this)} entries={entries}/>
      </div>
    )
  }
}

/**
 * Entries
 */
class Entries extends React.Component {

  renderEntry(key) {
    let entries = this.props.entries;
    return (
      <Entry entry={key} key={key} index={key} details={entries[key]} updateJournal={this.props.updateJournal}/>
    )
  }

  render() {
    return (
      <div className="entries">
        <ul>
          {Object.keys(this.props.entries).map(this.renderEntry.bind(this))}
        </ul>
      </div>
    )
  }
}

/**
 * Entry
 */
class Entry extends React.Component {
  onEntryClick() {
    let key = this.props.index;
    this.props.updateJournal(key);
  }

  render() {
    return (
      <div className="entry">
        <li onClick={this.onEntryClick.bind(this)} type="text">
          {this.props.details.date}
       </li>
      </div>
    )
  }
}

/**
 * Journal
 */
class Journal extends React.Component {
  render() {
    return (
      <div className="journal">
        <JournalHead userName={this.props.userName} entry={this.props.entry} entries={this.props.entries}/>
        <JournalBody addEntry={this.props.addEntry} entry={this.props.entry} entries={this.props.entries} />
      </div>
    )
  }
}

/**
 * JournalHead
 */
class JournalHead extends React.Component {
  render() {
    var entry     = this.props.entry;
    let date      = new Date;
    let entryDate = date.toDateString();

    return (
      <div className="journal__header">
        <h1>Hi {this.props.userName}! - {entryDate}</h1>
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

    let entry = {text: this.refs.text.value, date: this.refs.date.value}

    this.props.addEntry(entry);
  }

  render() {
    let entry   = this.props.entry;
    let entries = this.props.entries;

    if (entry === "") {
      let date = new Date;
      date     = date.toDateString();
      entry    = {text: "", date: date};
    } else {
      entry = entries[entry]
    }

    return (
      <div className="journal__body">
        <form className="journal__form" onChange={this.createEntry.bind(this)}>
          <textarea ref="text" placeholder={entry.text}></textarea>
          <input type="hidden" ref="date" value={entry.date}/>
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
