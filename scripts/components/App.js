/**
 * App
 */
import React from 'react';
import Journal from './Journal';
import Entries from './Entries';

import Rebase  from 're-base';
var base = Rebase.createClass('https://journaly.firebaseio.com/');

class App extends React.Component {

  constructor(props) {
    super(props);

    var date      = new Date;
    date          = date.toDateString();
    let journalId = 'entry-' + date.replace(/\s+/g, '-').toLowerCase();

    this.state = {
      entries: {},
      journal: journalId
    }
  }

  componentDidMount(){
    base.syncState('user/' + this.props.params.userName, {
      context : this,
      state : 'entries'
    });

    let localStorageRef = localStorage.getItem('journaly-' + this.props.params.userName);

    if ( localStorageRef ) {
      this.setState({
        journal : localStorageRef
      })
    }
  }

  componentWillUpdate(nextProps, nextState){
    localStorage.setItem('journaly-' + this.props.params.userName, nextState.journal)
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

  render() {
    let userName  = this.props.params.userName;
    let journal   = this.state.journal;
    let entries   = this.state.entries;

    return (
      <div className="app__container">
        <Entries entries={this.state.entries} updateJournal={this.updateJournal.bind(this)}/>
        <Journal userName={userName} journal={journal} addEntry={this.addEntry.bind(this)} entries={entries}/>
      </div>
    )
  }
}

export default App;