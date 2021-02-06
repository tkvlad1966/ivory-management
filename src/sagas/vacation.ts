import { ApiResponse } from 'apisauce';
import { call, put, takeLatest } from 'redux-saga/effects';
import { VacationRequestsType, VacationType } from '../services/api/api.types';
import api from '../services/api';
import {
  GetVacationRequestsMeAction,
  PostVacationRequestAction,
  vacationActionCreators,
  vacationActionTypes,
} from '../redux/vacation';
import { withRefreshTokenHandler } from './refreshToken';
import { errorActionCreators } from '../redux/error';

function* vacationRequest(action: PostVacationRequestAction) {
  const request = action.request;
  const response: ApiResponse<VacationType> = yield call(api.postVacationRequest, request);
  try {
    if (response.ok && response.data) {
      yield put(vacationActionCreators.postVacationRequestSuccess(response.data));
      yield put(vacationActionCreators.getVacationRequestsMe());
    } else if (!response.ok) {
      yield put(errorActionCreators.handleError('postVacationRequest', 'request error'));
      yield put(vacationActionCreators.postVacationRequestFailure('request error'));
    }
  } catch (error) {
    yield put(errorActionCreators.handleError('postVacationRequest', error));
  }
  return response;
}

function* getVacationRequestsMe(action: GetVacationRequestsMeAction) {
  const response: ApiResponse<{ vacationRequests: VacationRequestsType }> = yield call(
    api.getVacationRequestsMe,
  );
  try {
    if (response.ok && response.data) {
      yield put(
        vacationActionCreators.getVacationRequestsMeSuccess(
          response.data.vacationRequests.sort(
            (a, b) =>
              new Date(b.beginVacationDate).getTime() - new Date(a.beginVacationDate).getTime(),
          ),
        ),
      );
    } else if (!response.ok) {
      yield put(errorActionCreators.handleError('getVacationRequestsMeError', 'request error'));
      yield put(vacationActionCreators.getVacationRequestsMeFailure('request error'));
    }
  } catch (error) {
    yield put(errorActionCreators.handleError('getVacationRequestsMeError', error));
    yield put(vacationActionCreators.getVacationRequestsMeFailure(error));
  }
  return response;
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
