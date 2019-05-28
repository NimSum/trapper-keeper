export const deleteNoteFetch = async id => {
  const url = `http://localhost:3000/api/v1/notes/${id}`;
  const response = await fetch(url, {
    method: "DELETE"
  });
  if (!response.ok) {
    return new Error(response.statusText);
  }
  return response;
};
