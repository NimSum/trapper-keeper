import React, { Component } from 'react'
import ListItem from '../ListItem';
import { addNewNote } from '../../thunks/addNewNote';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import  uuidv4 from 'uuid/v4';

export class Form extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      listItemText: '',
      listItems: [],
      editing: false,
      id: ''
    };
  }

  componentDidMount() {
    if(this.props.foundNote) {
      const { id, title, listItems } = this.props.foundNote;
      this.setState({ id, title, listItems, editing: true })
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }
  
  handleSubmit = e => {
    e.preventDefault();
    const { listItemText } = this.state;
    const newItem = { id: uuidv4(), body: listItemText, completed: false }
      listItemText.length && this.setState({ 
      listItems: [...this.state.listItems, newItem],
      listItemText: ''
    })
  }

  addNote = () => {
    const { title, listItems } = this.state;
    const newNote = {
      title,
      listItems
    }
    this.props.addNewNote(newNote);
  }

  updateListItems = (newItem, remove) => {
    let updatedListItems;
    if (remove) {
      updatedListItems = this.state.listItems.filter(listItem => {
        return listItem.id !== newItem.id
      });
    } else {
      updatedListItems = [...this.state.listItems].map(listItem => {
        if (listItem.id === newItem.id) {
          return newItem;
        } else return listItem;
      })
    } 
    this.setState({ listItems: updatedListItems });
  }

  render() {
    return (
      <div className='form-container'>
        <div className='title-form'>
          <input 
            placeholder='Title' 
            type='text'
            name='title'
            onChange={ this.handleChange } 
            className='title'
          /> 
        </div>
        <div>
          {this.state.listItems.map(item => {
            return (
            <ListItem 
              item={ item }
              updateListItems={ this.updateListItems } />
          )})}
        </div>
        <form onSubmit={ this.handleSubmit }>
          <input 
            type="text" 
            name="listItemText"
            value={this.state.listItemText}
            onChange={ this.handleChange }
            onBlur={ this.handleSubmit }
            autoFocus />
        </form>
        <button onClick={ this.addNote }>Save</button>
      </div>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  addNewNote: (note) => dispatch(addNewNote(note))
})

export default connect(null, mapDispatchToProps)(Form);
