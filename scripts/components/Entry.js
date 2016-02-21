/**
 * Entry
 */
import React from 'react';

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

export default Entry;