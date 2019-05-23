import React, { Component } from 'react'
import ListItem from '../ListItem';

export class Form extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      listItemText: '',
      listItems: [
        { body: 'asdfasdf',
          id: 1 }
      ]
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }
  
  handleSubmit = e => {
    e.preventDefault();
    const { title, listItemText } = this.state;
    const newItem = { title, id: Date.now(), body: listItemText }
      listItemText.length && this.setState({ 
      listItems: [...this.state.listItems, newItem],
      listItemText: ''
    })
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
          {this.state.listItems.map(item => (
            < ListItem item={ item } />
          ))}
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
      </div>
    )
  }
}

export default Form
