export const notesReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_NOTES':
      return [...action.notes ]
    case 'ADD_NOTE':
      return [ {...action.note }, ...state ]
    case 'UPDATE_LIST_ITEM_BODY':
      const updated = [...state].map(note => {
        
        return note;
      })
      return updated;
    default: 
    return state;
  }
}