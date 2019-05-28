import React from 'react'
import { shallow } from 'enzyme';
import { CardContainer, mapStateToProps } from './index.js';
import { NoteCard } from '../../containers/NoteCard/index'


describe('CardContainer', () => {
  let wrapper;
  let mockNotes;

  beforeEach(()=> {
    mockNotes= [
      {
        title: "randomnote",
        id: "1",
        listItems: [
          {
            id: "1",
            body: "asdf",
            completed: false
          }
        ]
      },
      {
        title: "randomnoteTWO",
        id: "2",
        listItems: [
          {
            id: "2",
            body: "asdf",
            completed: false
          }
        ]
      },
      {
        id: "21f67edd-ec5a-4ab4-8b9e-18fa1326a70e",
        title: "Angry Man",
        listItems: [
          {
            id: "92f3600b-00e5-4551-82c3-a1c7b409d9d2",
            body: "Yelling in a coffee shop",
            completed: false
          }
        ]
      }
    ];
    wrapper = shallow(<CardContainer notes={mockNotes}/>)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })


describe('mapStateToProps', ()=> {
  it('should return an array of notes', () => { 
    const mockState = {notes: mockNotes}
    const expected = {notes: mockNotes}
    const mappedProps = mapStateToProps(mockState)
    expect(mappedProps).toEqual(expected)
   })
 })


})
