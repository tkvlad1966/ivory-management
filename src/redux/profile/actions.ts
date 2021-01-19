import { createActions } from 'reduxsauce';
import { EducationsType, ProfileType, WorkExperienceType } from '../../services/api/api.types';

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
  profileId: string;
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
  workExperience: WorkExperienceType;
  educations: EducationsType;
  rate: number;
  hoursPerWeek: number;
  skills: string[];
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
  getUserProfile(profileId: string): GetUserProfileAction;
  getUserProfileSuccess(profile: ProfileType, userId: string): GetUserProfileSuccessAction;
  getUserProfileFailure(error: string): GetUserProfileFailureAction;
  updateUserProfile(
    workExperience: WorkExperienceType,
    educations: EducationsType,
    rate: number,
    hoursPerWeek: number,
    skills: string[],
  ): UpdateUserProfileAction;
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
    getUserProfile: ['profileId'],
    getUserProfileSuccess: ['profile', 'userId'],
    getUserProfileFailure: ['error'],
    updateUserProfile: ['workExperience', 'educations', 'rate', 'hoursPerWeek', 'skills'],
    updateUserProfileSuccess: ['userProfile'],
    updateUserProfileFailure: ['error'],
  },
  {
    prefix: 'PROFILE/',
  },
);

export const profileActionTypes = Types;

export const profileActionCreators = Creators;
