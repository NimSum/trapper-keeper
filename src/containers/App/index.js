import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNotes } from '../../actions/'
export class App extends Component {


  render() {
    return (
      <div>
        <h1>Trapper Keeper</h1>
      </div>
    )
  }
}

export default App