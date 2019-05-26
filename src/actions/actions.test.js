import * as actions from '../actions';

describe('actions', () => {
    let mockNotes

    beforeEach(() => {
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
    describe('ADD_NOTES', () => {
        it('should create an action object with a type of ADD_NOTES',() => {
            const expected = 'ADD_NOTES';
            const results = actions.addNotes(mockNotes)
            expect(results.type).toBe(expected);
        });
    
        it('should should have a property of notes', () => {
            const expected = mockNotes;
            const results = actions.addNotes(mockNotes);
            expect(results.notes).toBe(expected);
        });
    })

    describe('ADD_NOTE', () => {
        it('should create an action object with a type of ADD_NOTE', () => {
            const expected = 'ADD_NOTE';
            const results = actions.addNote(mockNotes[0]);
            expect(results.type).toBe(expected);
            
        });


    })







})