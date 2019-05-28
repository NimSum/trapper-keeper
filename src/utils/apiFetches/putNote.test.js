import { putNote } from "./putNote";

describe("putNote fetch", () => {
  let mockURL;
  let mockInit;
  let mockNote;

  beforeEach(() => {
    mockURL = `http://localhost:3000/api/v1/notes/21f67edd-ec5a-4ab4-8b9e-18fa1326a70e`;

    mockNote = {
      id: "21f67edd-ec5a-4ab4-8b9e-18fa1326a70e",
      title: "Angry Man",
      listItems: [
        {
          id: "92f3600b-00e5-4551-82c3-a1c7b409d9d2",
          body: "Yelling in a coffee shop",
          completed: false
        }
      ]
    };

    mockInit = {
      method: "PUT",
      body: JSON.stringify(mockNote),
      headers: {
        "Content-type": "application/json"
      }
    };

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            statusCode: 202,
            newNote: mockNote
          })
      })
    );
  });

  it("should call fetch with the correct param", async () => {
    await putNote(mockNote);
    expect(window.fetch).toHaveBeenCalledWith(mockURL, mockInit);
  });

  it("should return a response object with a status 202 and will also returns a new updated note", async () => {
    const result = await putNote(mockNote);
    expect(result.statusCode).toBe(202);
  });
});
