import { createReducer } from 'reduxsauce';
import { EmployeeType } from '../../services/api/api.types';
// import { Account } from '../../services/api/api.types';
import {
  UserAction,
  userActionTypes,
  LoginUserSuccessAction,
  LoginUserFailureAction,
  //GetUserAccountAction,
  // GetUserAccountSuccessAction,
  // GetUserAccountFailureAction,
  GetAuthTokenSuccessAction,
  GetAuthTokenFailureAction,
} from './actions';

export interface UserState {
  isLoading: boolean;
  employeeAccount: EmployeeType | null;
  error: string | null;
  token: string | null;
  refreshToken: string | null;
}

const INITIAL_STATE: UserState = {
  isLoading: false,
  error: null,
  employeeAccount: null,
  token: null,
  refreshToken: null,
};

type Handler<A> = (state: UserState, action: A) => UserState;

const loginUserSuccess: Handler<LoginUserSuccessAction> = (state, { employeeAccount }) => ({
  ...state,
  isLoading: false,
  employeeAccount: employeeAccount,
});

const loginUserFailure: Handler<LoginUserFailureAction> = (state, { error }) => ({
  ...state,
  isLoading: false,
  error,
});

// const getUserAccount: Handler<GetUserAccountAction> = (state) => ({
// ...state,
// isLoading: true,
// });

// const getUserAccountSuccess: Handler<GetUserAccountSuccessAction> = (
//   state,
//   { employeeAccount },
// ) => ({
//   ...state,
//   isLoading: false,
//   employeeAccount,
// });

// const getUserAccountFailure: Handler<GetUserAccountFailureAction> = (state, { error }) => ({
//   ...state,
//   isLoading: false,
//   error,
// });

const getAuthSuccess: Handler<GetAuthTokenSuccessAction> = (state, { token, refreshToken }) => ({
  ...state,
  token,
  refreshToken,
});

const getAuthFailure: Handler<GetAuthTokenFailureAction> = (state, { error }) => ({
  ...state,
  isLoading: false,
  error,
});

export const userReducer = createReducer<UserState, UserAction>(INITIAL_STATE, {
  [userActionTypes.LOGIN_USER_SUCCESS]: loginUserSuccess,
  [userActionTypes.LOGIN_USER_FAILURE]: loginUserFailure,

  //[userActionTypes.GET_EMPLOYEE_ACCOUNT]: getUserAccount,
  // [userActionTypes.GET_EMPLOYEE_ACCOUNT_SUCCESS]: getUserAccountSuccess,
  // [userActionTypes.GET_EMPLOYEE_ACCOUNT_FAILURE]: getUserAccountFailure,
  [userActionTypes.GET_AUTH_TOKEN_SUCCESS]: getAuthSuccess,
  [userActionTypes.GET_AUTH_TOKEN_FAILURE]: getAuthFailure,
});
