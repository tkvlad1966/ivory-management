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
import {
  GetEmployeeAccountAction,
  profileActionCreators,
  profileActionTypes,
} from '../redux/profile';
import { withRefreshTokenHandler } from './refreshToken';

// TODO error handling

// function* apiSaga(saga, action) {
//   const resp = yield call(saga, action);

//   // if 401 error -> refresh tocken and repeat action
//   if (resp && resp.status === 401) {
//     // yield resresh token
//     const refreshToken = localStorage.refreshToken;
//     const refreshTokenObj = { refreshToken: refreshToken };
//     const response = yield call(api.getAuthToken, refreshTokenObj);

//     if (response.status === 401) {
//       localStorage.removeItem('refreshToken');
//       localStorage.removeItem('token');
//       return window.location.replace('/login');
//     } else {
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('refreshToken', response.data.refreshToken);
//       api.setAuthHeader(response.data.token);
//       yield call(saga, action);
//     }
//   }
// }

function* getAuthToken(action: GetAuthTokenAction) {
  const refreshTokenObj = { refreshToken: action.refreshToken };
  try {
    api.setAuthHeader(action.refreshToken);
    const response: ApiResponse<AuthToken> = yield call(api.getAuthToken, refreshTokenObj);

    if (response.ok && response.data) {
      console.log('response', response.data);
      yield localStorage.setItem('token', response.data.token);
      yield localStorage.setItem('refreshToken', response.data.refreshToken);
      yield api.setAuthHeader(response.data.token);
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
      // api.setAuthHeader(response.data.token);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      window.location.replace('/employee');
    } else {
      if (!response.ok) {
        yield put(userActionCreators.loginUserFailure(response.data || 'error login or password'));
      }
    }
  } catch (error) {
    yield put(userActionCreators.loginUserFailure(error));
  }
}

function* getEmployeeAccount() {
  const token = localStorage.getItem('token');
  api.setAuthHeader(token);
  const response: ApiResponse<UserTypeObj, string> = yield call(api.getAccount); // TODO: typing

  if (response.ok && response.data) {
    yield put(profileActionCreators.getEmployeeAccountSuccess(response.data.employee));
  } else if (!response.ok) {
    yield put(profileActionCreators.getEmployeeAccountFailure('getUserAccount error'));
  }
  return response;
}

export function* userSaga() {
  yield takeLatest<LoginUserAction>(userActionTypes.LOGIN_USER, loginUser);
  yield takeLatest<GetAuthTokenAction>(userActionTypes.GET_AUTH_TOKEN, getAuthToken);
  yield takeLatest<GetEmployeeAccountAction>(
    profileActionTypes.GET_EMPLOYEE_ACCOUNT,
    withRefreshTokenHandler(getEmployeeAccount),
  );
}
