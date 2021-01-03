import { ApiResponse } from 'apisauce';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AuthToken, UserTypeObj } from '../services/api/api.types';
import api from '../services/api';
import {
  GetAuthTokenAction,
  LoginUserAction,
  userActionCreators,
  userActionTypes,
} from '../redux/user/actions';
import { GetUserAccountAction, profileActionCreators, profileActionTypes } from '../redux/profile';
import { withRefreshTokenHandler } from './refreshToken';

function* getAuthToken(action: GetAuthTokenAction) {
  const refreshTokenObj = { refreshToken: action.refreshToken };
  try {
    api.setAuthHeader(action.refreshToken);
    const response: ApiResponse<AuthToken> = yield call(api.getAuthToken, refreshTokenObj);

    if (response.ok && response.data) {
      console.log('response', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      api.setAuthHeader(response.data.token);
      yield put(
        userActionCreators.getAuthTokenSuccess(response.data.token, response.data.refreshToken),
      );
    } else if (!response.ok) {
      yield put(userActionCreators.getAuthTokenFailure('getAuthToken error'));
    }
  } catch (error) {
    yield put(userActionCreators.getAuthTokenFailure(error));
  }
}

function* loginUser(action: LoginUserAction) {
  const { email, password } = action;

  try {
    const response = yield call(api.loginUser, { email, password });

    yield put(userActionCreators.loginUserSuccess(response.data.employee));
    yield put(
      userActionCreators.getAuthTokenSuccess(response.data.token, response.data.refreshToken),
    );
    if (response.ok && response.data) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      window.location.replace('/employee');
    } else {
      if (!response.ok) {
        yield put(userActionCreators.loginUserFailure(response.data || 'error login or password'));
        window.location.replace('/login');
      }
    }
  } catch (error) {
    yield put(userActionCreators.loginUserFailure(error));
  }
}

function* getUserAccount() {
  const token = localStorage.getItem('token');
  api.setAuthHeader(token);
  const response: ApiResponse<UserTypeObj, string> = yield call(api.getAccount); // TODO: typing

  if (response.ok && response.data) {
    console.log('response.data', response.data);
    yield put(profileActionCreators.getUserAccountSuccess(response.data.user));
  } else if (!response.ok) {
    yield put(profileActionCreators.getUserAccountFailure('getUserAccount error'));
  }
  return response;
}

export function* userSaga() {
  yield takeLatest<LoginUserAction>(userActionTypes.LOGIN_USER, loginUser);
  yield takeLatest<GetAuthTokenAction>(userActionTypes.GET_AUTH_TOKEN, getAuthToken);
  yield takeLatest<GetUserAccountAction>(
    profileActionTypes.GET_USER_ACCOUNT,
    withRefreshTokenHandler(getUserAccount),
  );
}
