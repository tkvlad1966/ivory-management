import { all } from 'redux-saga/effects';
import { profileSaga } from './profile';
import { userSaga } from './user';
import { vacationSaga } from './vacation';

export default function* rootSaga() {
  yield all([userSaga(), profileSaga(), vacationSaga()]);
}
