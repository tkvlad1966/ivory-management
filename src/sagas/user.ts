import { ApiResponse } from 'apisauce';
import { call, put, race, take, takeLatest } from 'redux-saga/effects';
import { AuthToken } from '../services/api/api.types';
import api from '../services/api';
import {
  GetAuthTokenAction,
  LoginUserAction,
  userActionCreators,
  userActionTypes,
} from '../redux/user/actions';

// TODO error handling

function* getAuthToken(action: GetAuthTokenAction) {
  const { email, password } = action;
  const body = { email, password };

  const response: ApiResponse<AuthToken, string> = yield call(api.getAuthToken, body);
  if (response.ok && response.data) {
    api.setAuthHeader(response.data);
    yield put(userActionCreators.getAuthTokenSuccess(response.data));
  } else if (!response.ok) {
    yield put(userActionCreators.getAuthTokenFailure(response.data || 'getAuthToken error'));
  }
}

function* loginUser(action: LoginUserAction) {
  const { email, password } = action;
  yield put(userActionCreators.getAuthToken(email, password));

  const userTokenRace = yield race({
    success: take(userActionTypes.GET_AUTH_TOKEN_SUCCESS),
    error: take(userActionTypes.GET_AUTH_TOKEN_FAILURE),
  });

  if (userTokenRace.error) {
    return yield put(userActionCreators.loginUserFailure(userTokenRace.error));
  }

  yield put(userActionCreators.loginUserSucces());

  // navigator.ref?.navigate('home');
}

export function* userSaga() {
  yield takeLatest<LoginUserAction>(userActionTypes.LOGIN_USER, loginUser);
  yield takeLatest<GetAuthTokenAction>(userActionTypes.GET_AUTH_TOKEN, getAuthToken);
}
