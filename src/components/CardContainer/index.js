import React from 'react';
import { connect } from 'react-redux';

export const CardContainer = ({ notes }) => (

)

const mapStateToProps = (state) => ({
  notes: state.notes
})
export default connect(mapStateToProps)(CardContainer);