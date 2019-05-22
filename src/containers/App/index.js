import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNotes } from '../../actions/'
export class App extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h1>Trapper Keeper</h1>
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
