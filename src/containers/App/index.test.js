import React from "react";
import { App } from "./index";
import { shallow } from "enzyme";
import { mapStateToProps, mapDispatchToProps } from "../App";
import { addNotes } from "../../actions/index";

describe("App", () => {
  let wrapper;
  let mockNotes;
  let mockSetNotes = jest.fn();
  
  beforeEach(() => {
    wrapper = shallow(
      < App 
        setNotes={ mockSetNotes } />
    );
    mockNotes = [
      {
        title: "randomnote",
        id: "1",
        listItems: [
          {
            id: "1",
            body: "asdf",
            completed: false
          }
        ]
      },
      {
        title: "randomnoteTWO",
        id: "2",
        listItems: [
          {
            id: "2",
            body: "asdf",
            completed: false
          }
        ]
      },
      {
        id: "21f67edd-ec5a-4ab4-8b9e-18fa1326a70e",
        title: "Angry Man",
        listItems: [
          {
            id: "92f3600b-00e5-4551-82c3-a1c7b409d9d2",
            body: "Yelling in a coffee shop",
            completed: false
          }
        ]
      }
    ];
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('componentDidMount', () => {

    it("should invoke setNotes when fetch is successful", async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockNotes)
      }))
      const expected = mockNotes.notes;
      await wrapper.instance().componentDidMount();
      expect(mockSetNotes).toHaveBeenCalledWith(expected);
    })
  
    it("should setState error when fetch fails", async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: false,
      }))
      const expected = { error: Error('Failed to get notes') };
      await wrapper.instance().componentDidMount();
      expect(wrapper.state()).toEqual(expected);
    })
  })

  describe("mapStateToProps", () => {
    it("should return an array or notes", () => {
      const mockState = { notes: mockNotes };
      const expected = { notes: mockNotes };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe("mapDispatchToProps", () => {
    it("should call dispatch with a note action on componentDidMount", () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = addNotes(mockNotes);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setNotes(mockNotes);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});
