import { take, call, put, select, takeEvery } from 'redux-saga/effects';

import { makeSelectSearchQuery } from './selectors';

import { error, searchLoaded, assetsLoaded } from 'containers/App/actions';

import request from 'utils/request';


export function* search() {

  let URL;

  try {
    URL = yield select(makeSelectSearchQuery());
  } catch (err) {
    return yield put(error(err));
  }

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, URL);
    yield put(searchLoaded(data));
  } catch (err) {
    yield put(error(err));
  }

}

export function* getAssets(action) {
  const { nasa_id } = action;
  const URL = 'https://images-api.nasa.gov/asset/' + nasa_id;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, URL);
    console.log(data);

    let metadata_url = null;
    let items = [];
    data.collection.items.forEach((item) => {
      if (item.href.match(/(metadata\.json)$/)) {
        metadata_url = item.href;
      } else {
        items.push(item.href);
      }
    });

    if ( ! metadata_url ) {
      return yield put(error('There was no metadata attached to the image!'));
    }

    let metadata = false;
    try {
      metadata = yield call(request, metadata_url);
    } catch (err) {
      put(error('Something went wrong in the request to fetch the metadata'));
    }

    yield put(assetsLoaded({
      collection: {
        items,
        metadata
      }
    }));

  } catch (err) {
    yield put(error(err));
  }
}

export function* navigate(action) {
  const { URL } = action;
  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, URL);
    yield put(searchLoaded(data));
  } catch (err) {
    yield put(error(err));
  }
}

export function* defaultSaga() {
  yield takeEvery('nasa-app/App/SEARCH', search);
  yield takeEvery('nasa-app/App/GET_ASSETS', getAssets);
  yield takeEvery('nasa-app/App/NAVIGATE', navigate);
}

export default [
  defaultSaga,
];
