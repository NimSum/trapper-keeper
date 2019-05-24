export const postNewNote = async (note) => {
  const url = 'http://localhost:3000/api/v1/notes';
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(note),
    headers: {
      "Content-type": "application/json"
    }
  });

  if (!response.ok) {
    throw Error('Failed to post new note');
  }

  const result = await response.json();
  return result;
}