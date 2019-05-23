import React, { Component } from 'react'
import ListItem from '../ListItem';

export class Form extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      listItems: [
        { body: 'asdfasdf',
          id: 1 }
      ]
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
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
      </div>
    )
  }
}

export default Form
