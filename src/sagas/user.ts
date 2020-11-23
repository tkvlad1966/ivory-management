import { ApiResponse } from 'apisauce';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AuthToken, EmployeeType } from '../services/api/api.types';
import api from '../services/api';
import {
  GetAuthTokenAction,
  GetEmployeeAccountAction,
  LoginUserAction,
  userActionCreators,
  userActionTypes,
} from '../redux/user/actions';

// TODO error handling

function* getAuthToken(action: GetAuthTokenAction) {
  const refreshTokenObj = { refreshToken: action.refreshToken };
  try {
    api.setAuthHeader(action.refreshToken);
    const response: ApiResponse<AuthToken> = yield call(api.getAuthToken, refreshTokenObj);

    if (response.ok && response.data) {
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
    console.log('response.data.employee:', response.data.employee);
    yield put(userActionCreators.loginUserSuccess(response.data.employee));
    yield put(
      userActionCreators.getAuthTokenSuccess(response.data.token, response.data.refreshToken),
    );
    if (response.ok && response.data) {
      console.log('response:', response);
      api.setAuthHeader(response.data.token);
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
  const response: ApiResponse<EmployeeType, string> = yield call(api.getAccount);
  if (response.ok && response.data) {
    yield put(userActionCreators.getEmployeeAccountSuccess(response.data));
  } else if (!response.ok) {
    yield put(userActionCreators.getEmployeeAccountFailure('getUserAccount error'));
  }
}

export function* userSaga() {
  yield takeLatest<LoginUserAction>(userActionTypes.LOGIN_USER, loginUser);
  yield takeLatest<GetAuthTokenAction>(userActionTypes.GET_AUTH_TOKEN, getAuthToken);
  yield takeLatest<GetEmployeeAccountAction>(
    userActionTypes.GET_EMPLOYEE_ACCOUNT,
    getEmployeeAccount,
  );
}
