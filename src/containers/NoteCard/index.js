import React, { Component } from 'react'
import ListItem from '../../containers/ListItem';
import { Link } from 'react-router-dom'
import { updateNote } from '../../actions/index';
import { connect } from 'react-redux';
import { deleteNote } from '../../actions';
import { deleteNoteFetch } from '../../utils/apiFetches/deleteNote';
import { putNote } from '../../utils/apiFetches/putNote';

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
    this.updateStateAndDatabase(updateListItems);
  }

  updateStateAndDatabase(updatedItems) {
    this.setState({ listItems: updatedItems }, async () => {
      this.props.updateExistingNote({...this.state})
      try {
        await putNote({ ...this.state })
      } catch(error) {
        console.log(error);
      }
    });
  }

  deleteNote = async() => {
    const {id} = this.props.note
    console.log(id, 'Testing delete')
    try{
      deleteNoteFetch(id);
      this.props.removeNote(id)
    }catch(error){
      console.log('deleteNote', error)
    }
  }

  render() {
    const listItems = this.props.note.listItems.map(item => (
      < ListItem 
        updateListItems={ this.updateListItems } 
        item={ item } />
    ))

    return (
      <Link exact to={`/notes/${this.props.note.id}`} style={{ textDecoration: 'none'}}>
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
  updateExistingNote: note => dispatch(updateNote(note)),
  removeNote: id=> dispatch(deleteNote(id))
})

export default connect(null, mapDispatchToProps)(NoteCard);
