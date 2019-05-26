import { notesReducer } from './notesReducer.js';
import * as actions from '../actions';


describe('notesReducer', () => {
    let mockNotes

    beforeEach(()=>{
        mockNotes = [
            {
                "title": "randomnote",
                "id": "1",
                "listItems": [
                    {
                        "id": "1",
                        "body": "asdf",
                        "completed": false
                    }
                ]
            },
            {
                "title": "randomnoteTWO",
                "id": "2",
                "listItems": [
                    {
                        "id": "2",
                        "body": "asdf",
                        "completed": false
                    }
                ]
            },
            {
                "id": "21f67edd-ec5a-4ab4-8b9e-18fa1326a70e",
                "title": "Angry Man",
                "listItems": [
                    {
                        "id": "92f3600b-00e5-4551-82c3-a1c7b409d9d2",
                        "body": "Yelling in a coffee shop",
                        "completed": false
                    }
                ]
            }
        ]
    });

it('should return a default state', () => {
    const expected = [];
    const result = notesReducer(undefined, {})
    expect(result).toEqual(expected);
});

it('should be able to add notes', () => {
    const expected = mockNotes;
    const result = notesReducer(undefined, actions.addNotes(mockNotes));
    expect(result).toEqual(expected);    
});

it('should be able to add a single note', () => {
    const expected = [mockNotes[0], ...mockNotes];
    const result = notesReducer(mockNotes, actions.addNote(mockNotes[0]));
    expect(result).toEqual(expected);
});

it('should be able to delete a single note', () => {
    const expected = [{...mockNotes[1]}, {...mockNotes[2]}]
    const result = notesReducer(mockNotes, actions.deleteNote('1'))
    expect(result).toEqual(expected);
});

it('should be able to update a note', () => {
    const mockNote =  {
        "title": "randomnote",
        "id": "1",
        "listItems": [
            {
                "id": "1",
                "body": "Brennan!",
                "completed": false
            }
        ]
    }

    const expected = mockNote
    const result= notesReducer(mockNotes, actions.updateNote(mockNote));
    expect(result[0]).toEqual(expected);
})

})