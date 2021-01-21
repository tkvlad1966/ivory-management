import { createActions } from 'reduxsauce';
import { ProfileType, UpdateProfile } from '../../services/api/api.types';

interface ProfileActionTypes {
  GET_USER_PROFILE: 'GET_USER_PROFILE';
  GET_USER_PROFILE_SUCCESS: 'GET_USER_PROFILE_SUCCESS';
  GET_USER_PROFILE_FAILURE: 'GET_USER_PROFILE_FAILURE';
  UPDATE_USER_PROFILE: 'UPDATE_USER_PROFILE';
  UPDATE_USER_PROFILE_SUCCESS: 'UPDATE_USER_PROFILE_SUCCESS';
  UPDATE_USER_PROFILE_FAILURE: 'UPDATE_USER_PROFILE_FAILURE';
}

export interface GetUserProfileAction {
  type: ProfileActionTypes['GET_USER_PROFILE'];
  userId: string;
}

export interface GetUserProfileSuccessAction {
  type: ProfileActionTypes['GET_USER_PROFILE_SUCCESS'];
  userId: string;
  profile: ProfileType;
}

export interface GetUserProfileFailureAction {
  type: ProfileActionTypes['GET_USER_PROFILE_FAILURE'];
  error: string;
}

export interface UpdateUserProfileAction {
  type: ProfileActionTypes['UPDATE_USER_PROFILE'];
  profileUpdate: UpdateProfile;
}

export interface UpdateUserProfileSuccessAction {
  type: ProfileActionTypes['UPDATE_USER_PROFILE_SUCCESS'];
  userProfile: ProfileType;
}

export interface UpdateUserProfileFailureAction {
  type: ProfileActionTypes['UPDATE_USER_PROFILE_FAILURE'];
  error: string;
}

interface ProfileActionCreators {
  getUserProfile(userId: string): GetUserProfileAction;
  getUserProfileSuccess(profile: ProfileType, userId: string): GetUserProfileSuccessAction;
  getUserProfileFailure(error: string): GetUserProfileFailureAction;
  updateUserProfile(profileUpdate: UpdateProfile): UpdateUserProfileAction;
  updateUserProfileSuccess(userProfile: ProfileType): UpdateUserProfileSuccessAction;
  updateUserProfileFailure(error: string): UpdateUserProfileFailureAction;
}

export type ProfileAction =
  | GetUserProfileAction
  | GetUserProfileSuccessAction
  | GetUserProfileFailureAction
  | UpdateUserProfileAction
  | UpdateUserProfileSuccessAction
  | UpdateUserProfileFailureAction;

const { Types, Creators } = createActions<ProfileActionTypes, ProfileActionCreators>(
  {
    getUserProfile: ['userId'],
    getUserProfileSuccess: ['profile', 'userId'],
    getUserProfileFailure: ['error'],
    updateUserProfile: ['profileUpdate'],
    updateUserProfileSuccess: ['userProfile'],
    updateUserProfileFailure: ['error'],
  },
  {
    prefix: 'PROFILE/',
  },
);

export const profileActionTypes = Types;

export const profileActionCreators = Creators;
