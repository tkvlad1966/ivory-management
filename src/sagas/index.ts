import { all } from 'redux-saga/effects';
import { userSaga } from './user';
import { vacationSaga } from './vacation';

export default function* rootSaga() {
  yield all([userSaga(), vacationSaga()]);
}
