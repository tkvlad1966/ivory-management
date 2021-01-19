import { createReducer } from 'reduxsauce';
import { UserIdProfileType } from '../../services/api/api.types';
import {
  GetUserProfileAction,
  GetUserProfileFailureAction,
  GetUserProfileSuccessAction,
  profileActionTypes,
  UpdateUserProfileAction,
  UpdateUserProfileFailureAction,
  UpdateUserProfileSuccessAction,
} from './actions';

export interface ProfileState {
  isLoading: boolean;
  error: string | null;
  // userProfile: ProfileType;
  userProfiles: UserIdProfileType | null;
}

// const userProfiles = {'3': {skills: 'sdf', _id: 'gk', workExperience: null, education: null, hoursPerWeek: 8, rate: 3 }}

const INITIAL_STATE: ProfileState = {
  isLoading: false,
  error: null,
  userProfiles: null,
};

type Handler<A> = (state: ProfileState, action: A) => ProfileState;

const getUserProfile: Handler<GetUserProfileAction> = (state) => ({
  ...state,
  isLoading: true,
});

const getUserProfileSuccess: Handler<GetUserProfileSuccessAction> = (
  state,
  { userId, profile },
) => {
  return {
    ...state,
    isLoading: false,
    userProfiles: { ...state.userProfiles, [userId]: profile },
  };
};

const getUserProfileFailure: Handler<GetUserProfileFailureAction> = (state, { error }) => ({
  ...state,
  isLoading: false,
  error: error,
});

const updateUserProfile: Handler<UpdateUserProfileAction> = (state) => ({
  ...state,
  isLoading: true,
});

const updateUserProfileSuccess: Handler<UpdateUserProfileSuccessAction> = (
  state,
  { userProfile },
) => ({
  ...state,
  isLoading: false,
  userProfile: userProfile,
});

const updateUserProfileFailure: Handler<UpdateUserProfileFailureAction> = (state, { error }) => ({
  ...state,
  isLoading: false,
  error,
});

export const profileReducer = createReducer<ProfileState>(INITIAL_STATE, {
  [profileActionTypes.GET_USER_PROFILE]: getUserProfile,
  [profileActionTypes.GET_USER_PROFILE_SUCCESS]: getUserProfileSuccess,
  [profileActionTypes.GET_USER_PROFILE]: getUserProfileFailure,
  [profileActionTypes.UPDATE_USER_PROFILE]: updateUserProfile,
  [profileActionTypes.UPDATE_USER_PROFILE_SUCCESS]: updateUserProfileSuccess,
  [profileActionTypes.UPDATE_USER_PROFILE_FAILURE]: updateUserProfileFailure,
});
