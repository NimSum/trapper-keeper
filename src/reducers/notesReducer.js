export const notesReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_NOTES':
      return [...action.notes ]
    case 'ADD_NOTE':
      return [ {...action.note }, ...state ]
    case 'UPDATE_LIST_ITEM':
      const updated = [...state].map(note => {
        note.listItems.map(listItem => {
          if (listItem.id === action.listItem.id) {
            listItem = action.listItem
          }
          return listItem;
        })
        return note;
      })
      return updated;
    default: 
    return state;
  }
}