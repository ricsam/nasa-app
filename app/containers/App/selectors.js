import { createSelector } from 'reselect';

/**
 * Direct selector to the app state domain
 */
const selectGlobal = (state) => state.get('app');
/**
 * Other specific selectors
 */

const makeSelectLoading = () => createSelector(selectGlobal, s => s.get('loading'));
const makeSelectError = () => createSelector(selectGlobal, s => s.get('error'));
const makeSelectSearchResults = () => createSelector(selectGlobal, s => s.get('searchResults'));
const makeSelectAssets = () => createSelector(selectGlobal, s => s.get('assets'));


/**
 * Default selector used by App
 */

const makeSelectApp = () => createSelector(
  selectGlobal,
  (substate) => {return substate.toJS()}
);


const makeSelectLocationState = () => {


  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {

    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  makeSelectLocationState,

  makeSelectApp,
  makeSelectLoading,
  makeSelectError,
  makeSelectSearchResults,
  makeSelectAssets
};
