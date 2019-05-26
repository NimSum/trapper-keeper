export const putNote = async (id, note) => {
  const url = `http://localhost:3000/api/v1/notes/${id}`;
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