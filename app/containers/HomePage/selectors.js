import { createSelector } from 'reselect';

/**
 * Direct selector to the homePage state domain
 */
const selectHomePageDomain = () => (state) => {return state.get('homePage');}

/**
 * Other specific selectors
 */


/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () => createSelector(
  selectHomePageDomain(),
  (substate) => substate.toJS()
);

function makeURLFromParams(actions) {
  if (actions === false) {
    throw new Error('Not enough params');
  }
  let query = '';
  for (let param in actions) {
    if (actions.hasOwnProperty(param) && actions[param]) {
      query += `&${param}=${actions[param]}`;
    }
  }
  return 'https://images-api.nasa.gov/search?' + query.slice(1); /* remove & from the beginning and replace by ? as in /search?query=param1&query2=param2 */
}

function makeSelectSearchQuery(state) {
  return (state) => {
    const result = makeURLFromParams(state.get('homePage').get('formData'));
    console.log(result);
    return result;
  }
}

export default makeSelectHomePage;
export {
  selectHomePageDomain,
  makeSelectSearchQuery
};
