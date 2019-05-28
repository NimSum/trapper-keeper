import React from 'react';
import { NoteCard, mapDispatchToProps } from './index';
import { shallow } from 'enzyme';
import { updateNote, deleteNote } from '../../actions/';
import { deleteNoteFetch } from '../../utils/apiFetches/deleteNote';
import { putNote } from '../../utils/apiFetches/putNote';

describe('Notecard container', () => {
  const mockNoteCard = {
    title: "Mock Note",
    id: "1",
    listItems: [
      { id: "1", body: "take out trash", completed: false },
      { id: "2", body: "wash dishes", completed: false }
    ]
  }
  let mockUpdateExistingNote = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      < NoteCard 
        note={ mockNoteCard }
        updateExistingNote={ mockUpdateExistingNote }/>
    )
  })

  it('should have default state', () => {
    expect(wrapper.state()).toHaveProperty('id');
    expect(wrapper.state()).toHaveProperty('listItems');
    expect(wrapper.state()).toHaveProperty('title');
  })

  it('should match component snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('updateListItems', () => {
    const updatedListItem = { 
      id: "1", 
      body: "take out trash in kitchen", 
      completed: true 
    }
    const expected = [
      updatedListItem,
      { id: "2", body: "wash dishes", completed: false }      
    ]
    it('should update listItem within local state', () => {
      wrapper.instance().updateListItems(updatedListItem);
      expect(wrapper.state().listItems).toEqual(expected);
    })
  })
})