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
  console.log('action:', action);

  const refreshTokenObj = { refreshToken: action.refreshToken };
  try {
    const response: ApiResponse<AuthToken> = yield call(api.getAuthToken, refreshTokenObj);
    if (response.ok && response.data) {
      api.setAuthHeader(response.data.token);
      yield put(
        userActionCreators.getAuthTokenSuccess(response.data.token, response.data.refreshToken),
      );
    }
  } catch (error) {
    yield put(userActionCreators.getAuthTokenFailure(error));
  }
}

function* loginUser(action: LoginUserAction) {
  const { email, password } = action;
  try {
    const userInfo = yield call(api.loginUser, { email, password });
    yield put(userActionCreators.loginUserSuccess(userInfo.data.employee));
    yield put(
      userActionCreators.getAuthTokenSuccess(userInfo.data.token, userInfo.data.refreshToken),
    );

    if (userInfo.ok && userInfo.data) {
      api.setAuthHeader(userInfo.data.token);
    }
  } catch (error) {
    console.log('loginError: ', error);
    yield put(userActionCreators.loginUserFailure(error));
  }
}

export function* userSaga() {
  yield takeLatest<LoginUserAction>(userActionTypes.LOGIN_USER, loginUser);
  yield takeLatest<GetAuthTokenAction>(userActionTypes.GET_AUTH_TOKEN, getAuthToken);
}
