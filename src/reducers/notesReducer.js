export const notesReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_NOTES':
      return [...action.notes ]
    case 'ADD_NOTE':
      return [ {...action.note }, ...state ]
    case 'DELETE_NOTE': 
      return [...state].filter(note => 
        note.id !== action.id
      )
    case 'UPDATE_NOTE':
      console.log(action.note);
      const updated = [...state].map(note => {
        if (note.id === action.note.id) {
          return action.note;
        }
        return note;
      })
      return updated;
    default: 
    return state;
  }
}