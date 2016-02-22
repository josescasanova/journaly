/**
 * App
 */
import React from 'react';
import Journal from './Journal';
import Entries from './Entries';

import Rebase  from 're-base';
var base = Rebase.createClass('https://journaly.firebaseio.com/');

import Firebase from 'firebase';
const ref = new Firebase('https://journaly.firebaseio.com/');

class App extends React.Component {

  constructor(props) {
    super(props);

    var date      = new Date;
    date          = date.toDateString();
    let journalId = 'entry-' + date.replace(/\s+/g, '-').toLowerCase();
    let uid       = localStorage.getItem('uid');

    this.state = {
      entries: {},
      journal: journalId,
      uid: uid
    }
  }

  componentDidMount(){
    base.syncState('user/' + this.props.params.uid, {
      context : this,
      state : 'entries'
    });

    let localStorageRef = localStorage.getItem('journaly-' + this.props.params.uid);

    if ( localStorageRef ) {
      this.setState({
        journal : localStorageRef
      })
    }

    var token = localStorage.getItem('token');

    if(!token) {
      window.location = '/';
    }

    if (token && this.state.uid !== this.props.params.uid) {
      console.log('Not allowed');
      window.location = '/user/' + this.state.uid;
    }
  }

  componentWillUpdate(nextProps, nextState){
    localStorage.setItem('journaly-' + this.props.params.uid, nextState.journal)
  }

  addEntry(entry) {
    let date      = entry.date;
    date          = date.replace(/\s+/g, '-').toLowerCase();

    let entryName = 'entry-' + date;

    if ( this.state.entries[entryName] ) {
      this.state.entries[entryName].text = entry.text;
    } else {
      this.state.entries[entryName] = entry;
    }

    this.setState({entries: this.state.entries});

    this.updateJournal(entryName);
  }

  updateJournal(journal) {
    this.state.journal = journal;
    this.setState({journal: this.state.journal});
  }

  logout() {
    ref.unauth();
    localStorage.removeItem('token');
    this.setState({
      uid : null
    });
  }

  render() {
    let uid       = this.state.uid;
    let journal   = this.state.journal;
    let entries   = this.state.entries;

    if ( !this.state.uid ) {
      window.location = '/';
    }

    return (
      <div className="app__container">
        <Entries entries={this.state.entries} updateJournal={this.updateJournal.bind(this)} logout={this.logout.bind(this)}/>
        <Journal uid={uid} journal={journal} addEntry={this.addEntry.bind(this)} entries={entries}/>
      </div>
    )
  }
}

export default App;