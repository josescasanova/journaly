/**
 * Journal
 */
import React from 'react';
import JournalHead from './JournalHead';
import JournalBody from './JournalBody';

class Journal extends React.Component {
  render() {
    return (
      <div className="journal">
        <JournalHead userName={this.props.userName} journal={this.props.journal} entries={this.props.entries}/>
        <JournalBody addEntry={this.props.addEntry} journal={this.props.journal} entries={this.props.entries} />
      </div>
    )
  }
}

export default Journal;