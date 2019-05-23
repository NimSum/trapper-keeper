import React, { Component } from 'react'

export class ListItem extends Component {
  constructor() {
    super();
    this.state = {
      editable: false,
      body: ''
    }
  }

  componentDidMount() {
    this.setState({ body: this.props.item.body })
  }

  editItem = () => {
    this.setState({ editable: true })
    console.log(this.state)
  }

  handleChange = ({ target }) => {
    this.setState({ body: target.value })
  }


  render() {
    const { id } = this.props.item;
    const form = (
      <form onSubmit={ this.handleSubmit }>
        <input 
          type="text" 
          value={this.state.body}
          onChange={ this.handleChange }
          onBlur={ this.handleSubmit }
          autoFocus />
      </form>)
    return (
      <li 
        key={ id }
        onClick={ this.editItem }>
        { this.state.editable 
            ? form
            : this.state.body
        }
      </li>
    )
  }
}

export default ListItem
