import { ApiResponse } from 'apisauce';
import { call, put, takeLatest } from 'redux-saga/effects';
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
  try {
    const userInfo = yield call(api.loginUser, { email, password });
    console.log('userInfo: ', userInfo);
  } catch (error) {
    console.log('loginError: ', error);
  }
}

export function* userSaga() {
  yield takeLatest<LoginUserAction>(userActionTypes.LOGIN_USER, loginUser);
  yield takeLatest<GetAuthTokenAction>(userActionTypes.GET_AUTH_TOKEN, getAuthToken);
}
