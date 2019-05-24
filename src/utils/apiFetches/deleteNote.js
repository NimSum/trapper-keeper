export const deleteNote = async(id)=>{
    const url = `http://localhost:3000/api/v1/notes/${id}`;
    const response = await fetch(url, {
        method: 'DELETE', 
        headers: {
            "Content-type": "application/json"
        }
    })
    if(!response.ok) {
        throw Error('Failed to delete note');
    }
    const result = await response.json()
    return result;
}