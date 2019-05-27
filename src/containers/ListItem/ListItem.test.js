import React from 'react';
import ReactDOM from 'react-dom';
import  { ListItem }  from './index.js';
import { shallow, mount } from 'enzyme';
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

  it('should update state of body', () => {
    const mockEvent = {target: {value:"Clean Room"}}
    wrapper.instance().handleChange(mockEvent)
    expect(wrapper.state('body')).toBe('Clean Room')
  })

  // it('should update state of body when a user is editing ListItem', () => {
  //   const spy = spyOn(wrapper.instance(), 'handleChange')
  //   wrapper.instance().forceUpdate()
  //   const mockEvent = {target: {value:"Clean Room"}}
    
  //   wrapper.find('.list-item-input').simulate('change', mockEvent)

  //   expect(spy).toHaveBeenCalled()
  // })

  it('should set state of editable to false on handleSubmit', () => {
    const mockEvent = {target: {value: false}}
    wrapper.instance().handleChange(mockEvent)
    expect(wrapper.state('editable')).toBe(false)
  })


  it('should call updateListItems on handleSubmit', () => {
    const mockEvent = {preventDefault: jest.fn()}
    wrapper.instance().handleSubmit(mockEvent)
    expect(mockUpdateListItems).toHaveBeenCalled()
  })

  it('should call updateListItems on checkItem', () => {
    wrapper.instance().checkItem()
    expect(mockUpdateListItems).toHaveBeenCalled()
  })





})


