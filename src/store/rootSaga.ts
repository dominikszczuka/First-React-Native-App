import { all } from 'redux-saga/effects';

import userSaga from './user/userSaga';

export default function* rootSagas() {
  yield all([...userSaga]);
}
