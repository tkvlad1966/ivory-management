import { ApiResponse } from 'apisauce';
import { Action } from 'redux';
import { Saga } from 'redux-saga';
import { call, delay } from 'redux-saga/effects';

// import { userActionCreators } from '../redux/user/actions';
import api from '../services/api';
import { AuthToken } from '../services/api/api.types';

export function* handleRefreshToken(saga: Saga, action: Action) {
  // Initial saga call
  const response = yield call(saga, action);

  // 401 "UNAUTHORIZED" error: refresh token and repeat action
  if (response?.status === 401) {
    const refreshToken: string = localStorage.refreshToken;
    const refreshTokenObj = { refreshToken: refreshToken };
    const tokensResponse: ApiResponse<AuthToken> = yield call(api.getAuthToken, refreshTokenObj);

    // 401 "UNAUTHORIZED" error on refresh call
    if (tokensResponse?.status === 401) {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('token');
      return window.location.replace('/login');
    } else {
      localStorage.setItem('token', tokensResponse.data.token);
      localStorage.setItem('refreshToken', tokensResponse.data.refreshToken);
      api.setAuthHeader(tokensResponse.data.token);
      yield delay(500);
      yield call(saga, action);
    }
  }
}

export const withRefreshTokenHandler = (saga: Saga) => (action: Action) =>
  handleRefreshToken(saga, action);
