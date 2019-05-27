import React, { Component } from 'react'
import ListItem from '../ListItem';
import { addNewNote } from '../../thunks/addNewNote';
import { connect } from 'react-redux';
import { updateNote } from '../../actions/index';
import { PropTypes } from 'prop-types';
import  uuidv4 from 'uuid/v4';
import { putNote } from '../../utils/apiFetches/putNote';
import {Redirect} from 'react-router-dom';

export class Form extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      listItemText: '',
      listItems: [],
      editing: false,
      id: '',
      redirect: false,
      error: ''
    };
  }

  componentDidMount() {
    if(this.props.foundNote) {
      const { id, title, listItems } = this.props.foundNote;
      this.setState({ id, title, listItems, editing: true })
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.foundNote) return null;
    if (props.foundNote.id !== state.id) {
      const { id, title, listItems } = props.foundNote;
      return { id, title, listItems, editing: true }
    } else return null;
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

  editNote = async () => {
    const { id, listItems, title} = this.state;
    try {
      await putNote({ id, listItems, title });
      this.props.updateExistingNote({ id, listItems, title });
    } catch(error) {
      this.setState({ error })
    }
    await this.setState({ editing: false, id: '', title: '', listItems: [], redirect: true })
  }
  
  addNote = () => {
    const { title, listItems } = this.state;
    const newNote = {
      title,
      listItems
    }
    this.props.addNewNote(newNote);
    this.setState({
      title: '',
      listItemText: '',
      listItems: [],
      editing: false,
      id: ''
    })
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
    if (this.state.redirect) {
      return <Redirect to='/' />
    }

    return (
      <div className='form-container'>
        <div className='title-form'>
          <input 
            placeholder='Title' 
            type='text'
            name='title'
            value={ this.state.title }
            onChange={ this.handleChange } 
            className='title'
          /> 
        </div>
        <div>
          {this.state.listItems.map(item => {
            return (
            <ListItem 
              key={ item.id}
              item={ item }
              editing={ this.state.editing }
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
          <button onClick={ () => this.state.editing ? this.editNote() : this.addNote() }>Save</button>      
      </div>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  addNewNote: (note) => dispatch(addNewNote(note)),
  updateExistingNote: (note) => dispatch(updateNote(note))
})

Form.propTypes = {
  addNewNote: PropTypes.func,
  updateExistingNote: PropTypes.func,
  foundNote: PropTypes.object
}

export default connect(null, mapDispatchToProps)(Form);
