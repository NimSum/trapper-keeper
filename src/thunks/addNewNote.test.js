import {addNewNote} from './addNewNote';
import * as actions from '../actions';


describe("addNewNote Thunk", () => {
    let mockDispatch
    let mockNotes

    beforeEach(() => {
        mockDispatch = jest.fn()
      
        mockNotes = [
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
        })

    it("should check if dispatch is ", async() => {
        window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve(
              mockNotes[0]
            )
        })
      );
        const thunk = addNewNote(mockNotes[0])
        await thunk(mockDispatch);
        expect(mockDispatch).toHaveBeenCalledWith(actions.addNote(mockNotes[0]));
    })
})