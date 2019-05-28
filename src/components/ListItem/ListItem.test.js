import React from "react";
import ReactDOM from "react-dom";
import { ListItem } from "./index.js";
import { shallow, mount } from "enzyme";
import { mapDispatchToProps } from "../../containers/App";
import { addNotes } from "../../actions/index";

describe("ListItem", () => {
  let wrapper;
  let mockNotes;
  let mockItem;
  let mockEditing = false;
  let mockUpdateListItems = jest.fn();
  let mockDefaultState = {
    editable: false,
    body: ""
  };

  beforeEach(() => {
    mockItem = {
      id: 4,
      body: "Hello",
      completed: false
    };
    wrapper = shallow(
      <ListItem
        item={mockItem}
        editing={mockEditing}
        updateListItems={mockUpdateListItems}
      />,
      { disableLifecycleMethods: true }
    );
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should match snapshot when editable state is true", () => {
    wrapper.setState({ editable: true });
    expect(wrapper).toMatchSnapshot();
  })

  it("should have a default state", () => {
    expect(wrapper.state()).toEqual(mockDefaultState);
  });

  it("should set the editable property to true", () => {
    wrapper.editItem = jest.fn();
    wrapper.instance().editItem();
    expect(wrapper.state()).toEqual({ body: "", editable: true });
  });

  it("should update state of body on handleChange", () => {
    const mockEvent = { target: { value: "Clean Room" } };
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state("body")).toBe("Clean Room");
  });

  it("should set state of editable to false on handleSubmit", () => {
    const mockEvent = { target: { value: false } };
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state("editable")).toBe(false);
  });

  it("should call updateListItems on handleSubmit", () => {
    const mockEvent = { preventDefault: jest.fn() };
    wrapper.instance().handleSubmit(mockEvent);
    expect(mockUpdateListItems).toHaveBeenCalled();
  });

  it("should call updateListItems on checkItem", () => {
    wrapper.instance().checkItem();
    expect(mockUpdateListItems).toHaveBeenCalled();
  });

  it("should call updateListItems on deleteItem", () => {
    wrapper.instance().deleteItem();
    expect(mockUpdateListItems).toHaveBeenCalled();
  });

  it("should match snapshot when isEditing is true", () => {
    wrapper = shallow(
      <ListItem
        item={mockItem}
        editing={!mockEditing}
        updateListItems={mockUpdateListItems}
      />,
      { disableLifecycleMethods: true }
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should match snapshot when completed is set to true", () => {
    mockItem = {
      id: 4,
      body: "Hello",
      completed: true
    };
    wrapper = shallow(
      <ListItem
        item={mockItem}
        editing={!mockEditing}
        updateListItems={mockUpdateListItems}
      />,
      { disableLifecycleMethods: true }
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should invoke editing when list item is clicked', () => {
    wrapper.setProps({ editing: true })
    wrapper.find('p.list-item').simulate('click');
    expect(wrapper.state().editable).toBe(true);
  })

  it('should delete item on click', () => {
    wrapper.find('i.fas').simulate('click');
    const expectedFirstArg = { "body": "Hello", "completed": false, "id": 4 };
    expect(mockUpdateListItems).toHaveBeenCalledWith(expectedFirstArg, true)
  })

  it('should check item on click', () => {
    wrapper.find('i.far').simulate('click');
    const expected = { "body": "Hello", "completed": true, "id": 4 };
    expect(mockUpdateListItems).toHaveBeenCalledWith(expected);
  })
});
