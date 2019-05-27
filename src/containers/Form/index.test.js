import React from 'react';
import { Form, mapDispatchToProps } from './index';
import { shallow } from 'enzyme';
import { addNewNote } from '../../thunks/addNewNote';
import { putNote } from '../../utils/apiFetches/putNote';
import  uuidv4 from 'uuid/v4';

describe('Form Container', () => {
  const initialState = {
    title: '',
    listItemText: '',
    listItems: [],
    editing: false,
    id: '',
    redirect: false
  }

  let wrapper;
  beforeEach(() => {
    wrapper = shallow( <Form /> )
  })

  it('should have initial state', () => {
    expect(wrapper.state()).toEqual(initialState);
  })

})