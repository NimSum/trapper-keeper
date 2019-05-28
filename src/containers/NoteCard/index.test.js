import React from 'react';
import { NoteCard, mapDispatchToProps } from './index';
import { shallow } from 'enzyme';
import { updateNote, deleteNote } from '../../actions/';
import { deleteNoteFetch } from '../../utils/apiFetches/deleteNote';
import { putNote } from '../../utils/apiFetches/putNote';

jest.mock('../../utils/apiFetches/putNote');

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
    };

    it('should update listItem within local state', () => {
      const expected = [
        updatedListItem,
        { id: "2", body: "wash dishes", completed: false }      
      ];
      wrapper.instance().updateListItems(updatedListItem);
      expect(wrapper.state().listItems).toEqual(expected);
    })

    it('should delete list item if remove param is true', () => {
      const expected = [
        { id: "2", body: "wash dishes", completed: false }      
      ];
      wrapper.instance().updateListItems(updatedListItem, true);
      expect(wrapper.state().listItems).toEqual(expected);
    })

    it('should call updateStateAndDatabase', () => {
      const spy = jest.spyOn(wrapper.instance(), 'updateStateAndDatabase');
      wrapper.instance().updateListItems(updatedListItem);

      expect(spy).toHaveBeenCalledTimes(1);
    })
  })

  describe('updateStateAndDatabase', () => {
    const mockUpdatedListItems = [
      { id: "1", body: "take out trash", completed: true },
      { id: "2", body: "wash dishes", completed: true }
    ]

    it('should set state updated list items', () => {
      wrapper.instance().updateStateAndDatabase(mockUpdatedListItems);
      expect(wrapper.state().listItems).toEqual(mockUpdatedListItems);
    })

    it('should set invoke updateExistingNote after setting state', () => {
      wrapper.instance().updateStateAndDatabase(mockUpdatedListItems);
      const expected = {
        title: "Mock Note",
        id: "1",
        listItems: [
          { id: "1", body: "take out trash", completed: true },
          { id: "2", body: "wash dishes", completed: true }
        ]
      }
      expect(mockUpdateExistingNote).toHaveBeenCalledWith(expected);
    })


  })
})