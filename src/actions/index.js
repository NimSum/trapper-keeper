export const addNotes = notes => ({
  type: 'ADD_NOTES',
  notes
});

export const addNote = note => ({
  type: 'ADD_NOTE',
  note
})

export const updateListItem = listItem => ({
  type: 'UPDATE_LIST_ITEM',
  listItem
})
