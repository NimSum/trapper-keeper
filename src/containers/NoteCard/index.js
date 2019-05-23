import React, { Component } from 'react'
import ListItem from '../../containers/ListItem';
import { Link } from 'react-router-dom'

export class NoteCard extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount() {
    this.setState({ ...this.props.note })
  }

  updateNoteCard = () => {

  }

  render() {
    const listItems = this.props.note.listItems.map(item => (
      < ListItem 
        item={ item }
        updateNoteCard={ this.updateNoteCard } />
    ))

    return (
      <Link to={`/notes/${this.props.note.id}`} style={{ textDecoration: 'none'}}>
        <article className='note-card'>
          <h3>{this.props.note.title}</h3>
          <ul className='note-items'>
            { listItems }
          </ul>
        </article>
      </Link>
    )
  }
}

export default NoteCard;
