import { Action } from 'redux';
import { Saga } from 'redux-saga';
import { call, delay, put } from 'redux-saga/effects';

import { userActionCreators } from '../redux/user/actions';

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
      console.log('tokensResponse', tokensResponse);
      yield delay(500);
      yield call(saga, action);
    }
  }
}

export const withRefreshTokenHandler = (saga: Saga) => (action: Action) =>
  handleRefreshToken(saga, action);
