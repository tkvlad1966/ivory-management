import { createReducer } from 'reduxsauce';
import { UserType } from '../../services/api/api.types';
import {
  profileActionTypes,
  GetUserAccountAction,
  GetUserAccountSuccessAction,
  GetUserAccountFailureAction,
} from './actions';

export interface ProfileState {
  isLoading: boolean;
  userAccount: UserType | null;
  error: string | null;
}

const INITIAL_STATE: ProfileState = {
  isLoading: false,
  error: null,
  userAccount: null,
};

type Handler<A> = (state: ProfileState, action: A) => ProfileState;

const getUserAccount: Handler<GetUserAccountAction> = (state) => ({
  ...state,
  isLoading: true,
});

const getUserAccountSuccess: Handler<GetUserAccountSuccessAction> = (state, { userAccount }) => ({
  ...state,
  isLoading: false,
  userAccount,
});

const getUserAccountFailure: Handler<GetUserAccountFailureAction> = (state, { error }) => ({
  ...state,
  isLoading: false,
  error,
});

export const profileReducer = createReducer<ProfileState>(INITIAL_STATE, {
  [profileActionTypes.GET_USER_ACCOUNT]: getUserAccount,
  [profileActionTypes.GET_USER_ACCOUNT_SUCCESS]: getUserAccountSuccess,
  [profileActionTypes.GET_USER_ACCOUNT_FAILURE]: getUserAccountFailure,
});
