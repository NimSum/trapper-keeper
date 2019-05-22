import React, { Component } from 'react'
import ListItem from '../../containers/ListItem';

export class NoteCard extends Component {
  render() {
    return (
      <article>
        <h3>{this.props.title}</h3>
        < ListItem items={this.props.listItems} />
      </article>
    )
  }
}

export default NoteCard;
