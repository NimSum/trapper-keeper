import {deleteNoteFetch} from './deleteNote';
import { exportAllDeclaration } from '@babel/types';

describe('deleteNote fetch', () => {
    let mockURL
    let mockInit
    beforeEach(() => {
        mockURL = 'http://localhost:3000/api/v1/notes/1'
        mockInit = {
            method: 'DELETE'
        }
        window.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({ ok:true}))
    })
    it("should be called with correct URL", async() => {
        await deleteNoteFetch('1');
        expect(window.fetch).toHaveBeenCalledWith(mockURL, mockInit);
        
    })


})