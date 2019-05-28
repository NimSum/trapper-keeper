import React from 'react';
import { connect } from 'react-redux';
import NoteCard from '../../containers/NoteCard';
import PropTypes from 'prop-types';


export const CardContainer = ({ notes }) => (
  <section className="notes-container">
    { notes.map(note => {
      return < NoteCard 
        note={ note } 
        key={note.id} />
    })}
    
  </section>
)

export const mapStateToProps = (state) => ({
  notes: state.notes
})

CardContainer.propTypes = {
  dispatch: PropTypes.func, 
  notes: PropTypes.array
}

export default connect(mapStateToProps)(CardContainer);