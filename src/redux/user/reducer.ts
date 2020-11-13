import { createReducer } from 'reduxsauce';
// import { Account } from '../../services/api/api.types';
import {
  UserAction,
  userActionTypes,
  GetAuthTokenSuccessAction,
  GetAuthTokenFailureAction,
} from './actions';

export interface UserState {
  isLoading: boolean;
  // account: Account | null;
  error: string | null;
  token: string | null;
}

const INITIAL_STATE: UserState = {
  isLoading: false,
  error: null,
  // account: null,
  token: null,
};

type Handler<A> = (state: UserState, action: A) => UserState;

const getAuthSuccess: Handler<GetAuthTokenSuccessAction> = (state, { token }) => ({
  ...state,
  token,
});

const getAuthFailure: Handler<GetAuthTokenFailureAction> = (state, { error }) => ({
  ...state,
  isLoading: false,
  error,
});

export const userReducer = createReducer<UserState, UserAction>(INITIAL_STATE, {
  [userActionTypes.GET_AUTH_TOKEN_SUCCESS]: getAuthSuccess,
  [userActionTypes.GET_AUTH_TOKEN_FAILURE]: getAuthFailure,
});
