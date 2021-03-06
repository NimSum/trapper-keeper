export const addNotes = notes => ({
  type: 'ADD_NOTES',
  notes
});

export const addNote = note => ({
  type: 'ADD_NOTE',
  note
})

export const updateNote = note => ({
  type: 'UPDATE_NOTE',
  note
})

export const deleteNote = id => ({
  type: 'DELETE_NOTE',
  id
})