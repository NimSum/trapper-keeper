import React, { Component } from 'react'
import ListItem from '../../containers/ListItem';
import { Link } from 'react-router-dom'
import { updateNote } from '../../actions/index';
import { connect } from 'react-redux';
import {deleteNote} from '../../actions';
import {deleteNoteFetch} from '../../utils/apiFetches/deleteNote';
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
      < ListItem updateListItems={ this.updateListItems } item={ item } />
      // <p className={ item.completed ? 'completed-item list-item' : 'list-item'}>
      //   { item.body }
      // </p>
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
  updateNote: note => dispatch(updateNote(note)),
  removeNote: id=> dispatch(deleteNote(id))
})

export default connect(null, mapDispatchToProps)(NoteCard);
