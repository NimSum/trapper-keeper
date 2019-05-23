export const notesReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_NOTES':
      return [...action.notes]
    case 'ADD_NOTE':
      return [...action.note, ...state ]
    default: 
    return state;
  }
}