/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

const initialState = fromJS({
  formData: false
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case 'nasa-app/HomePage/SET_FORM_DATA':
      return state.set('formData', action.formData);
    default:
      return state;
  }
}

export default homePageReducer;
