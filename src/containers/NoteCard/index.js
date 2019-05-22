import React, { Component } from 'react'
import ListItem from '../../containers/ListItem';
import { Link } from 'react-router-dom'

export class NoteCard extends Component {
  render() {
    return (
      <Link to={`/notes/${this.props.id}`}>
        <article>
          <h3>{this.props.title}</h3>
          < ListItem items={this.props.listItems} />
        </article>
      </Link>
    )
  }
}

export default NoteCard;
