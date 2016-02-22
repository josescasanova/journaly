/**
 * Entries
 */
import React from 'react';
import Entry from './Entry';

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

export default Entries;