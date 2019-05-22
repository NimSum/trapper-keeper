import React from 'react';
import { connect } from 'react-redux';

export const CardContainer = ({ notes }) => (
  <section className="notes-container">
    { notes.map(note => {
      return <h2>{note.title}</h2>
    })}
  </section>
)

const mapStateToProps = (state) => ({
  notes: state.notes
})
export default connect(mapStateToProps)(CardContainer);