import React, { Component } from 'react'

export class ListItem extends Component {
  constructor() {
    super();
    this.state = {
      body: ''
    }
  }

  componentDidMount() {
    this.setState({ body: this.props.item.body })
  }

  render() {
    const { id } = this.props.item;

    return (
      <li key={ id }>
        {this.state.body}
      </li>
    )
  }
}

export default ListItem
