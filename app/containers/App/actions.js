/*
 *
 * App actions
 *
 */

import {
  DEFAULT_ACTION,
} from './constants';

export function search() {
  return {
    type: 'nasa-app/App/SEARCH',
  }
}
export function getAssets(nasa_id) {
  return {
    type: 'nasa-app/App/GET_ASSETS',
    nasa_id
  }
}

export function loading() {
  return {
    type: 'nasa-app/App/LOADING',
  }
}
export function error(err) {
  return {
    type: 'nasa-app/App/ERROR',
    error: err
  }
}

export function searchLoaded(data) {
  return {
    type: 'nasa-app/App/SEARCH_SUCCESS',
    collection: data.collection
  }
}

export function assetsLoaded(data) {
  return {
    type: 'nasa-app/App/GET_ASSETS_SUCCESS',
    collection: data.collection
  }
}

export function navigate(URL) {
  return {
    type: 'nasa-app/App/NAVIGATE',
    URL
  }
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
