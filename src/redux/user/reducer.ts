import { createReducer } from 'reduxsauce';
// import { Account } from '../../services/api/api.types';
import { UserAction, userActionTypes } from './actions';

export interface UserState {
  isLoading: boolean;
  // account: Account | null;
  error: string | null;
  token: string | null;
}

const INITIAL_STATE: UserState = {
  isLoading: false,
  error: null,
  profile: Response.data.admin,
  tokens: {
    token: response.data.token,
    refreshToken: Response.data.refreshToken,
  },
};

type Handler<A> = (state: UserState, action: A) => UserState;

export const userReducer = createReducer<UserState, UserAction>(INITIAL_STATE, {});
