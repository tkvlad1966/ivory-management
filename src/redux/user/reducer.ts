import { createReducer } from 'reduxsauce';
import { EmployeeType } from '../../services/api/api.types';
import {
  UserAction,
  userActionTypes,
  LoginUserSuccessAction,
  LoginUserFailureAction,
  GetEmployeeAccountAction,
  GetEmployeeAccountSuccessAction,
  GetEmployeeAccountFailureAction,
  GetAuthTokenSuccessAction,
  GetAuthTokenFailureAction,
} from './actions';

export interface UserState {
  isLoading: boolean;
  employeeAccount: EmployeeType | null;
  error: string | null;
  token: string | null;
  refreshToken: string | null;
  initialized: boolean;
}

const INITIAL_STATE: UserState = {
  isLoading: false,
  error: null,
  employeeAccount: null,
  token: null,
  refreshToken: null,
  initialized: false,
};

type Handler<A> = (state: UserState, action: A) => UserState;

const loginUserSuccess: Handler<LoginUserSuccessAction> = (state, { employeeAccount }) => ({
  ...state,
  isLoading: false,
  employeeAccount: employeeAccount,
  initialized: true,
});

const loginUserFailure: Handler<LoginUserFailureAction> = (state, { error }) => ({
  ...state,
  isLoading: false,
  error,
  initialized: false,
});

const getEmployeeAccount: Handler<GetEmployeeAccountAction> = (state) => ({
  ...state,
  isLoading: true,
});

const getEmployeeAccountSuccess: Handler<GetEmployeeAccountSuccessAction> = (
  state,
  { employeeAccount },
) => ({
  ...state,
  isLoading: false,
  employeeAccount,
});

const getEmployeeAccountFailure: Handler<GetEmployeeAccountFailureAction> = (state, { error }) => ({
  ...state,
  isLoading: false,
  error,
});

const getAuthTokenSuccess: Handler<GetAuthTokenSuccessAction> = (
  state,
  { token, refreshToken },
) => ({
  ...state,
  token,
  refreshToken,
  initialized: true,
});

const getAuthTokenFailure: Handler<GetAuthTokenFailureAction> = (state, { error }) => ({
  ...state,
  isLoading: false,
  error,
  initialized: false,
});

export const userReducer = createReducer<UserState, UserAction>(INITIAL_STATE, {
  [userActionTypes.LOGIN_USER_SUCCESS]: loginUserSuccess,
  [userActionTypes.LOGIN_USER_FAILURE]: loginUserFailure,

  [userActionTypes.GET_EMPLOYEE_ACCOUNT]: getEmployeeAccount,
  [userActionTypes.GET_EMPLOYEE_ACCOUNT_SUCCESS]: getEmployeeAccountSuccess,
  [userActionTypes.GET_EMPLOYEE_ACCOUNT_FAILURE]: getEmployeeAccountFailure,
  [userActionTypes.GET_AUTH_TOKEN_SUCCESS]: getAuthTokenSuccess,
  [userActionTypes.GET_AUTH_TOKEN_FAILURE]: getAuthTokenFailure,
});
