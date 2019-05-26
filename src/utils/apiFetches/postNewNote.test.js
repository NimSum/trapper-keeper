import {postNewNote} from './postNewNote';
import * as actions from '../../actions';

describe("postNewNote fetch", () => {
    let mockNote
    let mockURL
    let mockInit

    beforeEach(() => {
        mockURL = 'http://localhost:3000/api/v1/notes';  
  
        mockNote = {
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
          mockInit = {
            method: "POST",
            body: JSON.stringify(mockNote),
            headers: {
              "Content-Type": "application/json"
            }
          };      
        window.fetch = jest.fn().mockImplementation(()=> Promise.resolve({
            ok:true,
            json: () => Promise.resolve({
                newNote: mockNote
            })
        }))
    });


    it('should be called with the correct param', async () => {
        await postNewNote(mockNote);
        expect(window.fetch).toHaveBeenCalledWith(mockURL, mockInit);
      });

    it('should return the new note after posting', async () => {
        const result = await postNewNote(mockNote)
        expect(result.newNote).toEqual(mockNote)
    });

    it('should throw an error if it failed to post a new note', async () => {
        window.fetch = () => Promise.resolve({ ok: false })
        const expected = Error('Failed to post new note')
        const result = await postNewNote(mockNote);
        expect(result).toEqual(expected);

    })


    });






