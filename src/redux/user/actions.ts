import { createActions } from 'reduxsauce';
import { UserType } from '../../services/api/api.types';

interface UserActionTypes {
  LOGIN_USER: 'LOGIN_USER';
  LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS';
  LOGIN_USER_FAILURE: 'LOGIN_USER_FAILURE';

  SIGN_UP_SUPER_ADMIN: 'SIGN_UP_SUPER_ADMIN';
  SIGN_UP_SUPER_ADMIN_SUCCESS: 'SIGN_UP_SUPER_ADMIN_SUCCESS';
  SIGN_UP_SUPER_ADMIN_FAILURE: 'SIGN_UP_SUPER_ADMIN_FAILURE';

  USER_LOGOUT: 'USER_LOGOUT';
  USER_LOGOUT_SUCCESS: 'USER_LOGOUT_SUCCESS';

  GET_AUTH_TOKEN: 'GET_AUTH_TOKEN';
  GET_AUTH_TOKEN_SUCCESS: 'GET_AUTH_TOKEN_SUCCESS';
  GET_AUTH_TOKEN_FAILURE: 'GET_AUTH_TOKEN_FAILURE';

  GET_USER_ACCOUNT: 'GET_USER_ACCOUNT';
  GET_USER_ACCOUNT_SUCCESS: 'GET_USER_ACCOUNT_SUCCESS';
  GET_USER_ACCOUNT_FAILURE: 'GET_USER_ACCOUNT_FAILURE';
}

export interface UserLogoutAction {
  type: UserActionTypes['USER_LOGOUT'];
}

export interface UserLogoutSuccessAction {
  type: UserActionTypes['USER_LOGOUT'];
}

export interface LoginUserAction {
  type: UserActionTypes['LOGIN_USER'];
  email: string;
  password: string;
}

export interface LoginUserSuccessAction {
  type: UserActionTypes['LOGIN_USER_SUCCESS'];
  userId: string;
}

export interface LoginUserFailureAction {
  type: UserActionTypes['LOGIN_USER_FAILURE'];
  error: string;
}

export interface SignUpSuperAdminAction {
  type: UserActionTypes['SIGN_UP_SUPER_ADMIN'];
  name: string;
  email: string;
  company: string;
  firstDay: string;
}

export interface SignUpSuperAdminSuccessAction {
  type: UserActionTypes['SIGN_UP_SUPER_ADMIN_SUCCESS'];
  userAccount: UserType;
}

export interface SignUpSuperAdminFailureAction {
  type: UserActionTypes['SIGN_UP_SUPER_ADMIN_FAILURE'];
  error: string;
}

export interface GetUserAccountAction {
  type: UserActionTypes['GET_USER_ACCOUNT'];
  userId: string;
}

export interface GetUserAccountSuccessAction {
  type: UserActionTypes['GET_USER_ACCOUNT_SUCCESS'];
  userAccount: UserType;
}

export interface GetUserAccountFailureAction {
  type: UserActionTypes['GET_USER_ACCOUNT_FAILURE'];
  error: string;
}

export interface GetAuthTokenAction {
  type: UserActionTypes['GET_AUTH_TOKEN'];
  refreshToken: string;
}

export interface GetAuthTokenSuccessAction {
  type: UserActionTypes['GET_AUTH_TOKEN_SUCCESS'];
  token: string;
  refreshToken: string;
}

export interface GetAuthTokenFailureAction {
  type: UserActionTypes['GET_AUTH_TOKEN_FAILURE'];
  error: string;
}

interface UserActionCreators {
  loginUser(email: string, password: string): LoginUserAction;
  loginUserSuccess(userId: string): LoginUserSuccessAction;
  loginUserFailure(error: string): LoginUserFailureAction;

  userLogout(): UserLogoutAction;
  userLogoutSuccess(): UserLogoutSuccessAction;

  signUpSuperAdmin(
    name: string,
    email: string,
    company: string,
    firstDay: string,
  ): SignUpSuperAdminAction;
  signUpSuperAdminSuccess(userAccount: UserType): SignUpSuperAdminSuccessAction;
  signUpSuperAdminFailure(error: string): SignUpSuperAdminFailureAction;

  getUserAccount(userId: string): GetUserAccountAction;
  getUserAccountSuccess(userAccount: UserType): GetUserAccountSuccessAction;
  getUserAccountFailure(error: string): GetUserAccountFailureAction;

  getAuthToken(refreshToken: string): GetAuthTokenAction;
  getAuthTokenSuccess(token: string, refreshToken: string): GetAuthTokenSuccessAction;
  getAuthTokenFailure(error: string): GetAuthTokenFailureAction;
}

export type UserAction =
  | LoginUserAction
  | LoginUserSuccessAction
  | LoginUserFailureAction
  | UserLogoutAction
  | UserLogoutSuccessAction
  | SignUpSuperAdminAction
  | SignUpSuperAdminSuccessAction
  | SignUpSuperAdminFailureAction
  | GetAuthTokenAction
  | GetAuthTokenSuccessAction
  | GetAuthTokenFailureAction
  | GetUserAccountAction
  | GetUserAccountSuccessAction
  | GetUserAccountFailureAction;

const { Types, Creators } = createActions<UserActionTypes, UserActionCreators>(
  {
    loginUser: ['email', 'password'],
    loginUserSuccess: ['userId'],
    loginUserFailure: ['error'],

    userLogout: null,
    userLogoutSuccess: null,

    signUpSuperAdmin: ['name', 'email', 'company', 'firstDay'],
    signUpSuperAdminSuccess: ['userAccount'],
    signUpSuperAdminFailure: ['error'],

    getUserAccount: ['userId'],
    getUserAccountSuccess: ['userAccount'],
    getUserAccountFailure: ['error'],

    getAuthToken: ['refreshToken'],
    getAuthTokenSuccess: ['token', 'refreshToken'],
    getAuthTokenFailure: ['error'],
  },
  {
    prefix: 'USER/',
  },
);

export const userActionTypes = Types;

export const userActionCreators = Creators;
