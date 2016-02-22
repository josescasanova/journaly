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
    let logoutButton = <button onClick={this.props.logout}>Log Out!</button>

    return (
      <div className="entries">
        <ul>
          <li>{logoutButton}</li>
          {Object.keys(this.props.entries).map(this.renderEntry.bind(this))}
        </ul>
      </div>
    )
  }
}

export default Entries;