import React from 'react';
import { NoteCard, mapDispatchToProps } from './index';
import { shallow } from 'enzyme';
import { updateNote, deleteNote } from '../../actions/';
import { deleteNoteFetch } from '../../utils/apiFetches/deleteNote';
import { putNote } from '../../utils/apiFetches/putNote';


