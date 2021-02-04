import { ApiResponse } from 'apisauce';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  AuthToken,
  SignUpRequestBody,
  SignUpResponse,
  UserTypeObj,
} from '../services/api/api.types';
import api from '../services/api';
import {
  GetAuthTokenAction,
  GetUserAccountAction,
  LoginUserAction,
  SignUpSuperAdminAction,
  userActionCreators,
  userActionTypes,
  UserLogoutAction,
} from '../redux/user/actions';
import { withRefreshTokenHandler } from './refreshToken';

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

    if (response.ok && response.data) {
      yield put(userActionCreators.loginUserSuccess(response.data.user._id));
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      window.location.replace('/employee/home');
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

function* userLogout() {
  try {
    yield put(userActionCreators.userLogoutSuccess());
  } catch (error) {
    console.log('error:', error);
  }
}

function* signUpSuperAdmin(action: SignUpRequestBody) {
  const { name, email, company, firstDay } = action;
  console.log('action:', action);
  try {
    const response: ApiResponse<SignUpResponse, string> = yield call(api.signUpSuperAdmin, {
      name,
      email,
      company,
      firstDay,
    });

    if (response.ok && response.data) {
      console.log('response:', response);
      yield put(userActionCreators.signUpSuperAdminSuccess(response.data.user));
    } else {
      if (!response.ok) {
        console.log('response:', response);

        yield put(userActionCreators.signUpSuperAdminFailure('error login or password'));
      }
    }
  } catch (error) {
    yield put(userActionCreators.signUpSuperAdminFailure(error));
  }
}

function* getUserAccount(action: GetUserAccountAction) {
  const { userId } = action;

  const token = localStorage.getItem('token');
  api.setAuthHeader(token);
  const response: ApiResponse<UserTypeObj> = yield call(api.getAccount, userId); // TODO: typing

  if (response.ok && response.data) {
    yield put(userActionCreators.getUserAccountSuccess(response.data.user));
  } else if (!response.ok) {
    yield put(userActionCreators.getUserAccountFailure('getUserAccount error'));
  }
  return response;
}

export function* userSaga() {
  yield takeLatest<LoginUserAction>(userActionTypes.LOGIN_USER, loginUser);
  yield takeLatest<SignUpSuperAdminAction>(userActionTypes.SIGN_UP_SUPER_ADMIN, signUpSuperAdmin);
  yield takeLatest<GetAuthTokenAction>(userActionTypes.GET_AUTH_TOKEN, getAuthToken);
  yield takeLatest<GetUserAccountAction>(
    userActionTypes.GET_USER_ACCOUNT,
    withRefreshTokenHandler(getUserAccount),
  );
  yield takeLatest<UserLogoutAction>(userActionTypes.USER_LOGOUT, userLogout);
}
