/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  searchResults: false,
  assets: false
});

function appReducer(state = initialState, action) {
  switch (action.type) {

    /* generic loading message and generic error message */
    case 'nasa-app/App/ERROR':
      return state
        .set('loading', false)
        .set('error', action.error);
    case 'nasa-app/App/LOADING':
      return state
        .set('loading', true)
        .set('error', false);

    case 'nasa-app/App/SEARCH':
      return state
        .set('loading', true)
        .set('error', false);

    case 'nasa-app/App/NAVIGATE':
      return state
        .set('loading', true)
        .set('error', false);

    case 'nasa-app/App/SEARCH_SUCCESS':
      return state
        .set('loading', false)
        .set('error', false)
        .set('searchResults', action.collection);
    case 'nasa-app/App/SEARCH_ERROR':
      return state
        .set('loading', false)
        .set('error', action.error);

    case 'nasa-app/App/GET_ASSETS':
      return state
        .set('loading', true)
        .set('error', false);
    case 'nasa-app/App/GET_ASSETS_SUCCESS':
      return state
        .set('loading', false)
        .set('assets', action.collection);
    case 'nasa-app/App/GET_ASSETS_ERROR':
      return state
        .set('loading', false)
        .set('error', action.error);

    case DEFAULT_ACTION:
      return state;

    default:
      return state;
  }
}

export default appReducer;
