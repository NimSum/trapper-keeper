import { addNote } from '../actions';
import { postNewNote } from '../utils/apiFetches/postNewNote';

export const addNewNote = note => {
  return async dispatch => {
    try {
      const response = await postNewNote(note);
      dispatch(addNote(response));
    } catch(error) {
      console.log(error)
    }
  }
}