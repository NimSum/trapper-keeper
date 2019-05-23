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
      listItems: [
        { 
          body: 'asdfasdf',
          id: 1,
          completed: false
        }
      ]
    };
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
    //console.log(newItem);
    let updatedListItems;
    if (remove) {
      updatedListItems = this.state.listItems.filter(listItem => {
        console.log(listItem.id, newItem.id)
        return listItem.id !== newItem.id
      });
    } else {
      updatedListItems = [...this.state.listItems].map(listItem => {
        if (listItem.id === newItem.id) {
          return newItem;
        } else return listItem;
      })
    } 
    // console.log(updatedListItems);
    this.setState({ listItems: updatedListItems }, () => console.log(this.state.listItems));
  }

  render() {
    return (
      <div>
        <div>
          <input 
            placeholder='Title' 
            type='text'
            name='title'
            onChange={ this.handleChange } /> 
        </div>
        <div>
          {this.state.listItems.map(item => {
            console.log(item.body)
            return (
            < ListItem 
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
