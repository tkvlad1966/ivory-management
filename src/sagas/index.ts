import { all } from 'redux-saga/effects';
import { companySaga } from './company';
import { profileSaga } from './profile';
import { userSaga } from './user';
import { vacationSaga } from './vacation';

export default function* rootSaga() {
  yield all([userSaga(), profileSaga(), companySaga(), vacationSaga()]);
}
