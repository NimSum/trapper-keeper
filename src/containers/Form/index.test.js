import React from 'react';
import { Form, mapDispatchToProps } from './index';
import { shallow } from 'enzyme';
import { addNewNote } from '../../thunks/addNewNote';
import { putNote } from '../../utils/apiFetches/putNote';
import  uuidv4 from 'uuid/v4';
import { jsxText } from '@babel/types';

jest.mock('uuid/v4', () => {
  return jest.fn(() => "1")
});
jest.mock('../../utils/apiFetches/putNote');
jest.mock('../../thunks/addNewNote');

describe('Form Container', () => {
  const initialState = {
    title: '',
    listItemText: '',
    listItems: [],
    editing: false,
    id: '',
    redirect: false,
    error: ''
  }
  const mockNoteCard = {
    title: "Mock Note",
    id: "1",
    listItems: [
      { id: "1", body: "nimsum", completed: false },
      { id: "2", body: "dimsum", completed: false }
    ]
  }
  const mockStateWithNotecard = {
    title: 'Mock Note',
    listItemText: '',
    listItems: [
      { id: "1", body: "nimsum", completed: false },
      { id: "2", body: "dimsum", completed: false }
    ],
    editing: true,
    id: '1',
    redirect: false,
    error: ''
  }
  const mockUpdateExistingNote = jest.fn();
  const mockAddNewNote = jest.fn();

  let wrapper;
  beforeEach(() => {
    wrapper = shallow( <Form 
      updateExistingNote={ mockUpdateExistingNote }
      addNewNote={ mockAddNewNote }
    /> )
  })

  it('should match snapshot with no props passed', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should match snapshot with notecard prop', () => {
    wrapper = shallow( 
      < Form 
        foundNote={ mockNoteCard }
      />
    )
    expect(wrapper).toMatchSnapshot();
  })

  it('should have initial state', () => {
    expect(wrapper.state()).toEqual(initialState);
  })

  it('should set state notecard properties if recieving notecard prop(initial mount)', () => {
    wrapper = shallow( 
      < Form 
        foundNote={ mockNoteCard }
      />
    )
    expect(wrapper.state()).toEqual(mockStateWithNotecard);
  })

  it('should set state notecard passed in (already mounted)', () => {
    wrapper.setProps({ foundNote: mockNoteCard})
    expect(wrapper.state()).toEqual(mockStateWithNotecard);
  })

  it('should not update state if there is no recieved notecard prop', () => {
    wrapper.setProps({});
    expect(wrapper.state()).toEqual(initialState); 
  })

  it('should set state user input for notecard title', () => {
    const mockTitleEvent = {
      target: {
        name: 'title',
        value: 'To do list'
      }
    }
    wrapper.instance().handleChange(mockTitleEvent);
    expect(wrapper.state().title).toEqual('To do list')
  })

  it('should set state user input for notecard list item', () => {
    const mockTitleEvent = {
      target: {
        name: 'listItemText',
        value: 'Take out the trash'
      }
    }
    wrapper.instance().handleChange(mockTitleEvent);
    expect(wrapper.state().listItemText).toEqual('Take out the trash')
  })

  it('should generate a new list item on handlesubmit', () => {
    const mockSubmitEvent = {
      preventDefault: () => {}
    }
    const mockExpected = [{ 
      id: "1", 
      body: "Take out the trash", 
      completed: false 
    }]
    const mockState = {
      listItemText: 'Take out the trash'
    }
    wrapper.setState(mockState);
    wrapper.instance().handleSubmit(mockSubmitEvent);
    expect(wrapper.state().listItems).toEqual(mockExpected);
    expect(wrapper.state().listItemText).toEqual('')
  })

  it('should putNote when editNote invoked', async () => {
    wrapper.setState(mockStateWithNotecard);
    const mockExpected = {
      id: '1',
      title: 'Mock Note',
      listItems: [
        { id: "1", body: "nimsum", completed: false },
        { id: "2", body: "dimsum", completed: false }
      ],
    }
    await wrapper.instance().editNote();
    expect(putNote).toHaveBeenCalledWith(mockExpected);
    expect(mockUpdateExistingNote).toHaveBeenCalledTimes(1);
  })

  it('should reset state after editing existing note', async () => {
    wrapper.setState(mockStateWithNotecard);
    const expected = {
      title: '',
      listItemText: '',
      listItems: [],
      editing: false,
      id: '',
      redirect: true,
      error: ''
    }
    await wrapper.instance().editNote();
    expect(wrapper.state()).toEqual(expected);
  })

  it('should set state error if put request fails', async () => {
    putNote.mockImplementation(() => Promise.reject('Failed to edit note'));
    await wrapper.instance().editNote();
    expect(wrapper.state().error).toEqual('Failed to edit note')
  })

  it('should post new note when addNote method invoked', () => {
    wrapper.setState(mockNoteCard);
    const expected = {
      title: 'Mock Note',
      listItems: [
        { id: "1", body: "nimsum", completed: false },
        { id: "2", body: "dimsum", completed: false }
      ]
    }
    wrapper.instance().addNote();
    expect(mockAddNewNote).toHaveBeenCalledWith(expected);
  })




})