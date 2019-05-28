import React, { Component } from 'react'
import ListItem from '../../components/ListItem';
import { NavLink } from 'react-router-dom'
import { updateNote, deleteNote } from '../../actions/';
import { connect } from 'react-redux';
import { deleteNoteFetch } from '../../utils/apiFetches/deleteNote';
import { putNote } from '../../utils/apiFetches/putNote';
import { PropTypes } from 'prop-types';

export class NoteCard extends Component {
  constructor() {
    super();
    this.state = {
      color: 'white',
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

  colorChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let color = e.target.getAttribute('data-color')
    this.setState({ color })
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
    try{
      await deleteNoteFetch(id);
      this.props.removeNote(id);
    }catch(error) {
      this.setState({ error });
    }
  }

  render() {
    const completedListItems = this.props.note.listItems.filter(item => {
      return item.completed }).map(filteredItem => 
      (<ListItem updateListItems={ this.updateListItems } key={ filteredItem.id } item={ filteredItem } />)
    )

    const uncompletedListItems = this.props.note.listItems.filter(item => {
      return !item.completed}).map(filteredItem => 

      (<ListItem 
        updateListItems={ this.updateListItems }
        item={ filteredItem }
        key={ filteredItem.id } 
      />)
    )

    let lineBreak;
    let completedText;
    if (completedListItems !== []) {
      completedText = <p>Completed</p>
      lineBreak = <hr />
    }

    return (
      <NavLink exact to={`/notes/${this.props.note.id}`} style={{ textDecoration: 'none'}} activeClassName='active'>
        <article className='note-card' style={{background: this.state.color}}>
          <h3>{this.props.note.title}</h3>
          <ul className='note-items'>
            { uncompletedListItems }
            { completedText }
            { lineBreak }
            { completedListItems }
          </ul>
          <div className="svg-container"> 
            <div className='color-svgs'>
              <i data-color='white' className="fas fa-circle white" onClick={ (e) => { this.colorChange(e) }}></i>
              <i data-color='#40c3ff' className="fas fa-circle blue" onClick={ (e) => { this.colorChange(e) }}></i>
              <i data-color='#ff6d3f' className="fas fa-circle red" onClick={ (e) => { this.colorChange(e) }}></i>
              <i data-color='#fcf296'className="fas fa-circle yellow" onClick={ (e) => { this.colorChange(e) }}></i>
            </div>
            <div> 
              <i className="fas fa-trash-alt" onClick={this.deleteNote}></i>
            </div>
          </div>
        </article>

      </NavLink>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  updateExistingNote: note => dispatch(updateNote(note)),
  removeNote: id=> dispatch(deleteNote(id))
})

NoteCard.propTypes = {
  note: PropTypes.object,
  removeNote: PropTypes.func,
  updateExistingNote: PropTypes.func
}

export default connect(null, mapDispatchToProps)(NoteCard);

