/*
 *
 * HomePage actions
 *
 */

import {
  DEFAULT_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setFormData(formData) {
  console.log(formData);
  return {
    type: 'nasa-app/HomePage/SET_FORM_DATA',
    formData
  }
}
