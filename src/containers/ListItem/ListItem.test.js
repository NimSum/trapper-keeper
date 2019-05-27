import React from 'react';
import ReactDOM from 'react-dom';
import  { ListItem }  from './index.js';
import { shallow } from 'enzyme';
import { mapDispatchToProps} from '../App'
import { addNotes } from '../../actions/index'

describe('ListItem', () => {
  let wrapper;
  let mockNotes;
  let mockItem = {
     id: 4,
     body: 'Hello', 
     completed: false
  }
  let mockEditing = false;
  let mockUpdateListItems = jest.fn()
  let mockDefaultState = {
    editable: false,
    body: ''
  } 

  beforeEach(()=> {
    wrapper = shallow(
    <ListItem
      item={ mockItem }
      editing={ mockEditing }
      updateListItems={ mockUpdateListItems }
    />, {disableLifecycleMethods: true})
  })

  it('should match the snapshot' , () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should have a default state', () => {
    expect(wrapper.state()).toEqual(mockDefaultState)
  })

  it('should set the editable property to true', () => {
    wrapper.editItem = jest.fn()
    wrapper.instance().editItem()
    expect(wrapper.state()).toEqual({ body: "", editable: true })
  })

})


