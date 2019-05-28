import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import { addNotes } from "../../actions/";
import CardContainer from "../../containers/CardContainer";
import Form from "../Form";
import PropTypes from "prop-types";

export class App extends Component {
  async componentDidMount() {
    const response = await fetch("http://localhost:3000/api/v1/notes");
    const notes = await response.json();
    this.props.setNotes(notes.notes);
  }

  render() {
    return (
      <main>
        <h1>Trapper Keeper</h1>
        <hr className="header-break" />
        <Link exact to="/new-note">
          <h2>
            {" "}
            Add a New Note <i className="fas fa-plus-square" />{" "}
          </h2>
        </Link>
        <Route path="/new-note" component={Form} />
        <Route
          path="/notes/:id"
          render={({ match }) => {
            const { id } = match.params;
            const foundNote = this.props.notes.find(note => note.id === id);
            if (foundNote) {
              return <Form foundNote={foundNote} />;
            }
          }}
        />
        <CardContainer />
      </main>
    );
  }
}

export const mapStateToProps = state => ({
  notes: state.notes
});

export const mapDispatchToProps = dispatch => ({
  setNotes: notes => dispatch(addNotes(notes))
});

App.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  notes: PropTypes.array,
  setNotes: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
