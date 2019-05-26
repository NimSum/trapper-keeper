export const putNote = async (note) => {
  const url = `http://localhost:3000/api/v1/notes/${note.id}`;
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(note),
    headers: {
      "Content-type": "application/json"
    }
  })

  if (!response.ok) {
    throw Error('Failed to update note');
  }

  return response;
}