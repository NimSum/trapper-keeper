export const deleteNoteFetch = async(id)=>{
    try{
        const url = `http://localhost:3000/api/v1/notes/${id}`;
        const response = await fetch(url, {
            method: 'DELETE'
        })

        if(!response.ok){
            throw Error (response.statusText)
        }

        return response;
        
    } catch (error) {
        return error
    }
   
}