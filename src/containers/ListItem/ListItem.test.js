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

  beforeEach(()=> {
    wrapper = shallow(
    <ListItem
      item={ mockItem }
      editing={ mockEditing }
      updateListItems={ mockUpdateListItems }
    />)
  })

  it('should match the snapshot' , () => {
    expect(wrapper).toMatchSnapshot();
  })
})