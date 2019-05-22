import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNotes } from '../../actions/';
import CardContainer from '../../components/CardContainer';
import { Route } from 'react-router-dom'
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
        < CardContainer />
        <Route path='/new-note' component={Form} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  setNotes: (notes) => dispatch(addNotes(notes))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
