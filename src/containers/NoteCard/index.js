import React, { Component } from 'react'
import ListItem from '../../containers/ListItem';
import { Link } from 'react-router-dom'

export class NoteCard extends Component {

  render() {
    const listItems = this.props.listItems.map(item => (
      < ListItem item={ item } />
    ))

    return (
      <Link to={`/notes/${this.props.id}`}>
        <article>
          <h3>{this.props.title}</h3>
          <ul>
            { listItems }
          </ul>
        </article>
      </Link>
    )
  }
}

export default NoteCard;
