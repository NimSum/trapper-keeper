import React, { Component } from 'react'

export class ListItem extends Component {
  render() {
    return (
      <ul>
        { this.props.items.map(item =>(
          <li key={item.id}>
            {item}
          </li>
        ))}
      </ul>
    )
  }
}

export default ListItem
