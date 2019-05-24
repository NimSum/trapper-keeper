export const deleteNote = async(id)=>{
    const url = `http://localhost:3000/api/v1/notes/${id}`;
    const response = await fetch(url, {
        method: 'DELETE'
    })
    return response;
}