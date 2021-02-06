import { createReducer } from 'reduxsauce';
import { ErrorAction, errorActionTypes, HandleErrorAction } from './actions';

export interface ErrorState {
  loginUserError: string;
  signUpSuperAdminError: string;
  getUserAccountError: string;
  getAuthTokenError: string;
  getUserProfileError: string;
  updateUserProfileError: string;
  postVacationRequest: string;
  getVacationRequestsMe: string;
  getCompanyError: string;
}

const INITIAL_STATE: ErrorState = {
  loginUserError: null,
  signUpSuperAdminError: null,
  getUserAccountError: null,
  getAuthTokenError: null,
  getUserProfileError: null,
  updateUserProfileError: null,
  postVacationRequest: null,
  getVacationRequestsMe: null,
  getCompanyError: null,
};

type Handler<A> = (state: ErrorState, action: A) => ErrorState;

const handleError: Handler<HandleErrorAction> = (state, { key, error }) => ({
  ...state,
  [key]: error,
});

export const errorReducer = createReducer<ErrorState, ErrorAction>(INITIAL_STATE, {
  [errorActionTypes.HANDLE_ERROR]: handleError,
});
