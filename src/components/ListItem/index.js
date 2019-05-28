import React, { Component } from 'react'
import  PropTypes from 'prop-types'

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
  }

  handleChange = ({ target }) => {
    this.setState({ body: target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ editable: false });
    const { id, completed } = this.props.item;
    const { body } = this.state;
    this.props.updateListItems({
      id,
      completed,
      body
    })
  }

  checkItem = () => {
    const { id, completed, body } = this.props.item;
    this.props.updateListItems({
      id,
      completed: !completed,
      body
    })
  }
  
  deleteItem =  () => {
    this.props.updateListItems({...this.props.item}, true)
  }
  
  render() {
    const { id, completed } = this.props.item;
    let checkBox;
    if (completed) {
      checkBox = <i className="far fa-check-square" onClick={this.checkItem}></i>
    } else {
      checkBox = <i className="far fa-square" onClick={this.checkItem}></i>
    }
    const form = (
      <form onSubmit={ this.handleSubmit }>
        <input
          className= 'list-item-input' 
          type="text" 
          value={this.state.body}
          onChange={ this.handleChange }
          onBlur={ this.handleSubmit }
          autoFocus />
      </form>)
    return (
      <li 
        className='list-item'
        key={ id }>
        { this.state.editable 
            ? form
            : (
              <div className="item-container">
                {checkBox}
                <p 
                  onClick={ this.props.editing && this.editItem }
                  className={ completed 
                    ? 'completed-item list-item' 
                    : 'list-item'}>    
                    {this.props.item.body || this.state.body }
                </p>
                <i className="fas fa-times" onClick={ this.deleteItem }></i>
              </div>
              )
        }
      </li>
    )
  }
}


ListItem.propTypes = {
  item: PropTypes.object, 
  updateListItems: PropTypes.func
}


export default ListItem;