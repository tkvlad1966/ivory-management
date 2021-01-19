import { createReducer } from 'reduxsauce';
import { UserType } from '../../services/api/api.types';
import {
  UserAction,
  userActionTypes,
  LoginUserSuccessAction,
  LoginUserFailureAction,
  GetAuthTokenSuccessAction,
  GetAuthTokenFailureAction,
  GetUserAccountSuccessAction,
  GetUserAccountFailureAction,
} from './actions';

export interface UserState {
  isLoading: boolean;
  userId: string;
  userAccount: UserType | null;
  error: string | null;
  token: string | null;
  refreshToken: string | null;
  initialized: boolean;
}

const INITIAL_STATE: UserState = {
  isLoading: false,
  error: null,
  userId: null,
  userAccount: null,
  token: null,
  refreshToken: null,
  initialized: false,
};

type Handler<A> = (state: UserState, action: A) => UserState;

const loginUserSuccess: Handler<LoginUserSuccessAction> = (state, { userId }) => {
  return {
    ...state,
    isLoading: false,
    userId: userId,
    initialized: true,
  };
};

const loginUserFailure: Handler<LoginUserFailureAction> = (state, { error }) => ({
  ...state,
  isLoading: false,
  error,
  initialized: false,
});

const getUserAccountSuccess: Handler<GetUserAccountSuccessAction> = (state, { userAccount }) => ({
  ...state,
  isLoading: false,
  userAccount: userAccount,
  initialized: true,
});

const getUserAccountFailure: Handler<GetUserAccountFailureAction> = (state, { error }) => ({
  ...state,
  isLoading: false,
  error,
  initialized: false,
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

  [userActionTypes.GET_USER_ACCOUNT_SUCCESS]: getUserAccountSuccess,
  [userActionTypes.GET_USER_ACCOUNT_FAILURE]: getUserAccountFailure,

  [userActionTypes.GET_AUTH_TOKEN_SUCCESS]: getAuthTokenSuccess,
  [userActionTypes.GET_AUTH_TOKEN_FAILURE]: getAuthTokenFailure,
});
