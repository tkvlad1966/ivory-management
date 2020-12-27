// import { ApiResponse } from 'apisauce';
import { Action } from 'redux';
import { Saga } from 'redux-saga';
import { call, delay, put } from 'redux-saga/effects';

import { userActionCreators } from '../redux/user/actions';
// import { AuthToken } from '../services/api/api.types';

export function* handleRefreshToken(saga: Saga, action: Action) {
  // Initial saga call
  const response = yield call(saga, action);

  // 401 "UNAUTHORIZED" error: refresh token and repeat action
  if (response?.status === 401) {
    const refreshToken: string = localStorage.refreshToken;
    const tokensResponse = yield put(userActionCreators.getAuthToken(refreshToken));

    // 401 "UNAUTHORIZED" error on refresh call
    if (tokensResponse?.status === 401) {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('token');
      return window.location.replace('/login');
    } else {
      // Parse tokens to FE definitions
      // const parsedTokens = parseResponseWithToken(tokensResponse.data);
      console.log('tokensResponse', tokensResponse);
      yield delay(700);
      yield call(saga, action);

      // Save parsed tokens
      // yield put(userActionCreators.getAuthToken(tokensResponse.refreshToken));
      // Repeat saga
    }
  }
}

export const withRefreshTokenHandler = (saga: Saga) => (action: Action) =>
  handleRefreshToken(saga, action);
