import { createActions } from 'reduxsauce';
import { EmployeeType } from '../../services/api/api.types';

interface UserActionTypes {
  LOGIN_USER: 'LOGIN_USER';
  LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS';
  LOGIN_USER_FAILURE: 'LOGIN_USER_FAILURE';

  GET_EMPLOYEE_ACCOUNT: 'GET_EMPLOYEE_ACCOUNT';
  GET_EMPLOYEE_ACCOUNT_SUCCESS: 'GET_EMPLOYEE_ACCOUNT_SUCCESS';
  GET_EMPLOYEE_ACCOUNT_FAILURE: 'GET_EMPLOYEE_ACCOUNT_FAILURE';

  GET_AUTH_TOKEN: 'GET_AUTH_TOKEN';
  GET_AUTH_TOKEN_SUCCESS: 'GET_AUTH_TOKEN_SUCCESS';
  GET_AUTH_TOKEN_FAILURE: 'GET_AUTH_TOKEN_FAILURE';
}

export interface LoginUserAction {
  type: UserActionTypes['LOGIN_USER'];
  email: string;
  password: string;
}

export interface LoginUserSuccessAction {
  type: UserActionTypes['LOGIN_USER_SUCCESS'];
  employeeAccount: EmployeeType;
}

export interface LoginUserFailureAction {
  type: UserActionTypes['LOGIN_USER_FAILURE'];
  error: string;
}

export interface GetUserAccountAction {
  type: UserActionTypes['GET_EMPLOYEE_ACCOUNT'];
}

export interface GetUserAccountSuccessAction {
  type: UserActionTypes['GET_EMPLOYEE_ACCOUNT_SUCCESS'];
  employeeAccount: EmployeeType;
}

export interface GetUserAccountFailureAction {
  type: UserActionTypes['GET_EMPLOYEE_ACCOUNT_FAILURE'];
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
  loginUserSuccess(employeeAccount: EmployeeType): LoginUserSuccessAction;
  loginUserFailure(error: string): LoginUserFailureAction;

  getUserAccount(): GetUserAccountAction;
  getUserAccountSuccess(employeeAccount: EmployeeType): GetUserAccountSuccessAction;
  getUserAccountFailure(error: string): GetUserAccountFailureAction;

  getAuthToken(refreshToken: string): GetAuthTokenAction;
  getAuthTokenSuccess(token: string, refreshToken: string): GetAuthTokenSuccessAction;
  getAuthTokenFailure(error: string): GetAuthTokenFailureAction;
}

export type UserAction =
  | LoginUserAction
  | LoginUserSuccessAction
  | LoginUserFailureAction
  | GetUserAccountAction
  | GetUserAccountSuccessAction
  | GetUserAccountFailureAction
  | GetAuthTokenAction
  | GetAuthTokenSuccessAction
  | GetAuthTokenFailureAction;

const { Types, Creators } = createActions<UserActionTypes, UserActionCreators>(
  {
    loginUser: ['email', 'password'],
    loginUserSuccess: ['employeeAccount'],
    loginUserFailure: ['error'],

    getUserAccount: null,
    getUserAccountSuccess: ['employeeAccount'],
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
