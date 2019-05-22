export const notesReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_NOTES':
      return [...action.notes]
    default: 
    return state;
  }
}