/**
 * Journal Body
 */
import React from 'react';

class JournalBody extends React.Component {

  createEntry() {
    let entry = {text: this.refs.text.value, date: this.refs.date.value}

    this.props.addEntry(entry);
  }

  render() {
    let journal = this.props.journal;
    let entries = this.props.entries;
    let entry   = {};

    if (entries[journal]) {
      entry = entries[journal]
    } else {
      let date = new Date;
      date     = date.toDateString();
      entry    = {text: "", date: date};
    }

    return (
      <div className="journal__body">
        <form className="journal__form" onChange={this.createEntry.bind(this)}>
          <textarea ref="text" placeholder={entry.text} value={entry.text}></textarea>
          <input type="hidden" ref="date" value={entry.date}/>
        </form>
      </div>
    )
  }
}

export default JournalBody;