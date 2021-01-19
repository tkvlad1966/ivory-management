import { ApiResponse } from 'apisauce';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { GetUserProfileAction, profileActionCreators, profileActionTypes } from '../redux/profile';
import { selectUserId } from '../redux/user/hooks';
import api from '../services/api';
import { ProfileTypeObj } from '../services/api/api.types';
// import { ProfileType } from '../services/api/api.types';

function* getUserProfile(action: GetUserProfileAction) {
  const { profileId } = action;
  const userId = yield select(selectUserId);
  const response: ApiResponse<ProfileTypeObj> = yield call(api.getProfile, profileId);

  if (response.ok && response.data) {
    yield put(profileActionCreators.getUserProfileSuccess(response.data.profile, userId));
  } else if (!response.ok) {
    yield put(profileActionCreators.getUserProfileFailure('getUserProfile error'));
  }
  return response;
}

export function* profileSaga() {
  yield takeLatest<GetUserProfileAction>(profileActionTypes.GET_USER_PROFILE, getUserProfile);
}
