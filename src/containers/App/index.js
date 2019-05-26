import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom'
import { addNotes } from '../../actions/';
import CardContainer from '../../components/CardContainer';
import Form from '../Form'
export class App extends Component {

  async componentDidMount() {
    const response = await fetch('http://localhost:3000/api/v1/notes');
    const notes = await response.json();
    this.props.setNotes(notes.notes)
  } 

  render() {
    return (
      <div>
        <h1>Trapper Keeper</h1>
        <Route path='/new-note' component={Form} />
        <Route path='/notes/:id' render={({ match }) => {
          const { id } = match.params;
          const foundNote = this.props.notes.find(note => note.id === id);
          return < Form foundNote={foundNote} />
        }} />
        < CardContainer />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  notes: state.notes
})

const mapDispatchToProps = (dispatch) => ({
  setNotes: (notes) => dispatch(addNotes(notes))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
