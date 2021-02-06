import { ApiResponse } from 'apisauce';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  AuthToken,
  LoginUserResponse,
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
import { errorActionCreators } from '../redux/error';

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
      yield put(
        errorActionCreators.handleError('getAuthTokenError', response.data || 'getAuthToken error'),
      );
      yield put(userActionCreators.getAuthTokenFailure('getAuthToken error'));
    }
  } catch (error) {
    yield put(errorActionCreators.handleError('getAuthTokenError', error));
    yield put(userActionCreators.getAuthTokenFailure(error));
  }
}

function* loginUser(action: LoginUserAction) {
  const { email, password } = action;

  const response: ApiResponse<LoginUserResponse, string> = yield call(api.loginUser, {
    email,
    password,
  });
  try {
    if (response.ok && response.data) {
      yield put(userActionCreators.loginUserSuccess(response.data.user._id));
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      window.location.replace('/employee/home');
    } else {
      if (!response.ok) {
        yield put(
          errorActionCreators.handleError(
            'getAuthTokenError',
            response.data || 'error login or password',
          ),
        );
        yield put(userActionCreators.loginUserFailure(response.data || 'error login or password'));
        window.location.replace('/login');
      }
    }
  } catch (error) {
    yield put(errorActionCreators.handleError('getAuthTokenError', error));
    yield put(userActionCreators.loginUserFailure(error));
  }
}

function* userLogout() {
  try {
    yield put(userActionCreators.userLogoutSuccess());
  } catch (error) {
    yield put(errorActionCreators.handleError('userLogout', error));
    console.log('error:', error);
  }
}

function* signUpSuperAdmin(action: SignUpRequestBody) {
  const { name, email, company, firstDay } = action;
  console.log('action:', action);

  const response: ApiResponse<SignUpResponse, string> = yield call(api.signUpSuperAdmin, {
    name,
    email,
    company,
    firstDay,
  });
  try {
    if (response.ok && response.data) {
      yield put(userActionCreators.signUpSuperAdminSuccess(response.data.user));
    } else {
      if (!response.ok) {
        yield put(errorActionCreators.handleError('signUpSuperAdminError', 'error registration'));
        yield put(userActionCreators.signUpSuperAdminFailure('error login or password'));
      }
    }
  } catch (error) {
    yield put(errorActionCreators.handleError('signUpSuperAdminError', error));
    yield put(userActionCreators.signUpSuperAdminFailure(error));
  }
}

function* getUserAccount(action: GetUserAccountAction) {
  const { userId } = action;

  const token = localStorage.getItem('token');
  api.setAuthHeader(token);
  const response: ApiResponse<UserTypeObj> = yield call(api.getAccount, userId);
  try {
    if (response.ok && response.data) {
      yield put(userActionCreators.getUserAccountSuccess(response.data.user));
    } else if (!response.ok) {
      yield put(errorActionCreators.handleError('getUserAccountError', 'getUserAccount error'));
      yield put(userActionCreators.getUserAccountFailure('getUserAccount error'));
    }
  } catch (error) {
    yield put(errorActionCreators.handleError('getUserAccountError', error));
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
