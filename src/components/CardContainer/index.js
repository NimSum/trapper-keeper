import React from 'react';
import { connect } from 'react-redux';
import NoteCard from '../../containers/NoteCard';
import { Route, Link } from 'react-router-dom'

export const CardContainer = ({ notes }) => (
  <section className="notes-container">
    { notes.map(note => {
      return < NoteCard 
        note={ note } 
        key={note.id} />
    })}
    < Link exact to='/new-note'> New Note </Link>
  </section>
)

const mapStateToProps = (state) => ({
  notes: state.notes
})

export default connect(mapStateToProps)(CardContainer);