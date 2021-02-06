import { ApiResponse } from 'apisauce';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { errorActionCreators } from '../redux/error';
import {
  GetUserProfileAction,
  profileActionCreators,
  profileActionTypes,
  UpdateUserProfileAction,
} from '../redux/profile';
import { userActionCreators } from '../redux/user';
import { selectUserId } from '../redux/user/hooks';
import api from '../services/api';
import { ProfileType, ProfileTypeObj } from '../services/api/api.types';
import { withRefreshTokenHandler } from './refreshToken';
// import { ProfileType } from '../services/api/api.types';

function* getUserProfile(action: GetUserProfileAction) {
  const userId = yield select(selectUserId);
  const response: ApiResponse<ProfileTypeObj> = yield call(api.getProfile, userId);
  try {
    if (response.ok && response.data) {
      yield put(profileActionCreators.getUserProfileSuccess(response.data.profile, userId));
    } else if (!response.ok) {
      yield put(profileActionCreators.getUserProfileFailure('getUserProfile error'));
      yield put(
        errorActionCreators.handleError(
          'getUserProfileError',
          response.data || 'getUserProfile error',
        ),
      );
    }
  } catch (error) {
    yield put(errorActionCreators.handleError('getUserProfileError', error));
  }
  return response;
}

function* updateUserProfile(action: UpdateUserProfileAction) {
  const { updateProfile, profileId } = action.profileUpdate;
  const token = localStorage.getItem('token');
  api.setAuthHeader(token);

  const response: ApiResponse<ProfileType> = yield call(api.updateProfile, {
    updateProfile,
    profileId,
  });
  try {
    if (response.ok && response.data) {
      yield put(profileActionCreators.updateUserProfileSuccess(response.data));
      const userId = yield select(selectUserId);
      yield put(userActionCreators.getUserAccount(userId));
    } else {
      if (!response.ok) {
        yield put(profileActionCreators.updateUserProfileFailure('error update profile'));
        yield put(
          errorActionCreators.handleError(
            'updateUserProfileError',
            response.data || 'error update profile',
          ),
        );
      }
    }
  } catch (error) {
    yield put(errorActionCreators.handleError('updateUserProfileError', error));
  }
  return response;
}

export function* profileSaga() {
  yield takeLatest<GetUserProfileAction>(profileActionTypes.GET_USER_PROFILE, getUserProfile);
  yield takeLatest<UpdateUserProfileAction>(
    profileActionTypes.UPDATE_USER_PROFILE,
    withRefreshTokenHandler(updateUserProfile),
  );
}
