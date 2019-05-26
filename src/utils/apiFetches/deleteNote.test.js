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
        Promise.resolve({ ok:true, statusText: 204}))
    });

    it("should be called with correct URL", async() => {
        await deleteNoteFetch('1');
        expect(window.fetch).toHaveBeenCalledWith(mockURL, mockInit);
    });

    it("should return a response with a status of 204", async() => {
        const result = await deleteNoteFetch('1');
        expect(result.statusText).toBe(204)
    });

    it("should return a response of with a status of 404 or and error message of no notes found", async() => {
        window.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({ ok:false, statusText:'No notes found'}))
        const expected = Error('No notes found')
        const result = await deleteNoteFetch('1');
    
        expect(result).toEqual(expected);
    });
})