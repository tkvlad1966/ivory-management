import { all } from 'redux-saga/effects';
import { userSaga } from './user';
//  import { dashboardSaga } from './dashboard';

export default function* rootSaga() {
  yield all([userSaga()]);
}
