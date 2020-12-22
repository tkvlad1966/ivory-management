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

// TODO error handling

function* vacationRequest(action: PostVacationRequestAction) {
  const request = action.request;
  console.log('request', request);
  try {
    const response: ApiResponse<VacationType> = yield call(api.postVacationRequest, request);

    if (response.ok && response.data) {
      yield put(vacationActionCreators.postVacationRequestSuccess(response.data));
      console.log('response', response.data);
    } else if (!response.ok) {
      yield put(vacationActionCreators.postVacationRequestFailure('request error'));
    }
  } catch (error) {
    yield put(vacationActionCreators.postVacationRequestFailure(error));
  }
}

// type

function* getVacationRequestsMe(action: GetVacationRequestsMeAction) {
  try {
    const response: ApiResponse<{ vacationRequests: VacationRequestsType }> = yield call(
      api.getVacationRequestsMe,
    );

    if (response.ok && response.data) {
      yield put(
        vacationActionCreators.getVacationRequestsMeSuccess(response.data.vacationRequests),
      );
      console.log('response', response.data);
    } else if (!response.ok) {
      yield put(vacationActionCreators.getVacationRequestsMeFailure('request error'));
    }
  } catch (error) {
    yield put(vacationActionCreators.getVacationRequestsMeFailure(error));
  }
}

export function* vacationSaga() {
  yield takeLatest<PostVacationRequestAction>(
    vacationActionTypes.POST_VACATION_REQUEST,
    vacationRequest,
  );
  yield takeLatest<GetVacationRequestsMeAction>(
    vacationActionTypes.GET_VACATION_REQUESTS_ME,
    getVacationRequestsMe,
  );
}
