import { ApiResponse } from 'apisauce';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { VacationRequestsType, VacationType } from '../services/api/api.types';
import api from '../services/api';
import {
  GetVacationRequestsMeAction,
  PostVacationRequestAction,
  vacationActionCreators,
  vacationActionTypes,
} from '../redux/vacation';
import { withRefreshTokenHandler } from './refreshToken';

function* vacationRequest(action: PostVacationRequestAction) {
  const request = action.request;
  const response: ApiResponse<VacationType> = yield call(api.postVacationRequest, request);

  yield delay(500);

  if (response.ok && response.data) {
    yield put(vacationActionCreators.postVacationRequestSuccess(response.data));
    yield put(vacationActionCreators.getVacationRequestsMe());
  } else if (!response.ok) {
    console.log('responseVacationRequest:', response.status);
    yield put(vacationActionCreators.postVacationRequestFailure('request error'));
  }
  return response;
}

function* getVacationRequestsMe(action: GetVacationRequestsMeAction) {
  try {
    yield delay(500);
    const response: ApiResponse<{ vacationRequests: VacationRequestsType }> = yield call(
      api.getVacationRequestsMe,
    );

    if (response.ok && response.data) {
      yield put(
        vacationActionCreators.getVacationRequestsMeSuccess(
          response.data.vacationRequests.sort(
            (a, b) =>
              new Date(b.beginVacationDate).getTime() - new Date(a.beginVacationDate).getTime(),
          ),
        ),
      );
      console.log('response', response.data);
    } else if (!response.ok) {
      yield put(vacationActionCreators.getVacationRequestsMeFailure('request error'));
    }
    return response;
  } catch (error) {
    yield put(vacationActionCreators.getVacationRequestsMeFailure(error));
  }
}

export function* vacationSaga() {
  yield takeLatest<PostVacationRequestAction>(
    vacationActionTypes.POST_VACATION_REQUEST,
    withRefreshTokenHandler(vacationRequest),
  );
  yield takeLatest<GetVacationRequestsMeAction>(
    vacationActionTypes.GET_VACATION_REQUESTS_ME,
    withRefreshTokenHandler(getVacationRequestsMe),
  );
}
