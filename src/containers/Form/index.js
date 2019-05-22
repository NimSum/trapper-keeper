import React, { Component } from 'react'
import ListItem from '../ListItem';

export class Form extends Component {
  constructor() {
    super();
    this.state = {
      listItems: [
        {body: 'asdfasdf'}
      ]
    }
  }

  

  render() {
    return (
      <div>
        <div>
          <input placeholder='Title' type= 'text'/> 
        </div>
        <div>
         {this.state.listItems.map(item => (
           <input value={item.body} />
         ))}
        </div>
      </div>
    )
  }
}

export default Form
