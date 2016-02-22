/**
 * JournalHead
 */
import React from 'react';

class JournalHead extends React.Component {

  render() {
    let journal   = this.props.journal;
    let entries   = this.props.entries;
    let entryDate = "";

    if (entries[journal]) {
      entryDate = entries[journal].date;
    } else {
      let date  = new Date;
      entryDate = date.toDateString();
    }

    return (
      <div className="journal__header">
        <h1>{entryDate}</h1>
      </div>
    )
  }
}

export default JournalHead;