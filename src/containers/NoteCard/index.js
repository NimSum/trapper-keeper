import React, { Component } from 'react'
import ListItem from '../../containers/ListItem';
import { NavLink, Link } from 'react-router-dom'
import { updateNote, deleteNote } from '../../actions/';
import { connect } from 'react-redux';
import { deleteNoteFetch } from '../../utils/apiFetches/deleteNote';
import { putNote } from '../../utils/apiFetches/putNote';

export class NoteCard extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      listItems: [],
      title: '',
      error: ''
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
        this.setState({ error })
      }
    });
  }

  deleteNote = async () => {
    const {id} = this.props.note
    console.log(id, 'Testing delete')
    try{
      deleteNoteFetch(id);
      this.props.removeNote(id);
    }catch(error){
      this.setState({ error });
    }
  }

  render() {
    const completedListItems = this.props.note.listItems.filter(item => {
      return item.completed }).map(filteredItem => 
      (<ListItem updateListItems={ this.updateListItems } item={ filteredItem } />)
    )

    const uncompletedListItems = this.props.note.listItems.filter(item => {
      return !item.completed}).map(filteredItem => 
      (<ListItem 
        updateListItems={ this.updateListItems }
        item={ filteredItem }
        key={ filteredItem.id } 
      />)
    )

    return (
      <NavLink exact to={`/notes/${this.props.note.id}`} style={{ textDecoration: 'none'}} activeClassName='active'>
        <article className='note-card'>
          <h3>{this.props.note.title}</h3>
          <ul className='note-items'>
            { uncompletedListItems }
            { <hr /> && completedListItems }
          </ul>
          <button className="delete-card" onClick={this.deleteNote}>X</button>
        </article>
      </NavLink>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateExistingNote: note => dispatch(updateNote(note)),
  removeNote: id=> dispatch(deleteNote(id))
})

export default connect(null, mapDispatchToProps)(NoteCard);
