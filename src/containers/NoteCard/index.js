import React, { Component } from 'react'
import ListItem from '../../containers/ListItem';
import { Link } from 'react-router-dom'
import { updateNote } from '../../actions/index';
import { connect } from 'react-redux';
export class NoteCard extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount() {
    this.setState({ ...this.props.note })
  }

  updateListItems = (newItem, remove) => {
    // make updated note with list item
    let updateListItems;
    if (remove) {
      updateListItems = [...this.state.listItems].filter(listItem => listItem.id !== newItem.id);
    } else {
      updateListItems = [...this.state.listItems].map(listItem => {
        if (listItem.id === newItem.id) {
          return newItem;
        } else return listItem;
      })
    } 

    this.setState({ listItems: updateListItems }, () => 
      this.props.updateNote({...this.state})
    );
  }

  deleteNote = () => {
    
  }

  render() {
    const listItems = this.props.note.listItems.map(item => (
      < ListItem 
        item={ item }
        updateListItems={ this.updateListItems } />
    ))

    return (
      <Link to={`/notes/${this.props.note.id}`} style={{ textDecoration: 'none'}}>
        <article className='note-card'>
          <h3>{this.props.note.title}</h3>
          <ul className='note-items'>
            { listItems }
          </ul>
          <button className="delete-card" onClick={this.deleteNote}>X</button>
        </article>
      </Link>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateNote: note => dispatch(updateNote(note))
})

export default connect(null, mapDispatchToProps)(NoteCard);
