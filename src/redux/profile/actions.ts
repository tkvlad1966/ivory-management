import { createActions } from 'reduxsauce';
import { UserType } from '../../services/api/api.types';

interface ProfileActionTypes {
  GET_USER_ACCOUNT: 'GET_USER_ACCOUNT';
  GET_USER_ACCOUNT_SUCCESS: 'GET_USER_ACCOUNT_SUCCESS';
  GET_USER_ACCOUNT_FAILURE: 'GET_USER_ACCOUNT_FAILURE';
}

export interface GetUserAccountAction {
  type: ProfileActionTypes['GET_USER_ACCOUNT'];
}

export interface GetUserAccountSuccessAction {
  type: ProfileActionTypes['GET_USER_ACCOUNT_SUCCESS'];
  userAccount: UserType;
}

export interface GetUserAccountFailureAction {
  type: ProfileActionTypes['GET_USER_ACCOUNT_FAILURE'];
  error: string;
}

interface ProfileActionCreators {
  getUserAccount(): GetUserAccountAction;
  getUserAccountSuccess(userAccount: UserType): GetUserAccountSuccessAction;
  getUserAccountFailure(error: string): GetUserAccountFailureAction;
}

export type ProfileAction =
  | GetUserAccountAction
  | GetUserAccountSuccessAction
  | GetUserAccountFailureAction;

const { Types, Creators } = createActions<ProfileActionTypes, ProfileActionCreators>(
  {
    getUserAccount: null,
    getUserAccountSuccess: ['userAccount'],
    getUserAccountFailure: ['error'],
  },
  {
    prefix: 'PROFILE/',
  },
);

export const profileActionTypes = Types;

export const profileActionCreators = Creators;
