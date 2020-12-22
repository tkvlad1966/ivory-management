import { createActions } from 'reduxsauce';
import { VacationRequest, VacationRequestsType, VacationType } from '../../services/api/api.types';

interface VacationActionTypes {
  POST_VACATION_REQUEST: 'POST_VACATION_REQUEST';
  POST_VACATION_REQUEST_SUCCESS: 'POST_VACATION_REQUEST_SUCCESS';
  POST_VACATION_REQUEST_FAILURE: 'POST_VACATION_REQUEST_FAILURE';
  GET_VACATION_REQUESTS_ME: 'GET_VACATION_REQUESTS_ME';
  GET_VACATION_REQUESTS_ME_SUCCESS: 'GET_VACATION_REQUESTS_ME_SUCCESS';
  GET_VACATION_REQUESTS_ME_FAILURE: 'GET_VACATION_REQUESTS_ME_FAILURE';
}

export interface PostVacationRequestAction {
  type: VacationActionTypes['POST_VACATION_REQUEST'];
  request: VacationRequest;
}

export interface PostVacationRequestSuccessAction {
  type: VacationActionTypes['POST_VACATION_REQUEST_SUCCESS'];
  vacation: VacationType;
}

export interface PostVacationRequestFailureAction {
  type: VacationActionTypes['POST_VACATION_REQUEST_FAILURE'];
  error: string;
}

export interface GetVacationRequestsMeAction {
  type: VacationActionTypes['GET_VACATION_REQUESTS_ME'];
}

export interface GetVacationRequestsMeSuccessAction {
  type: VacationActionTypes['GET_VACATION_REQUESTS_ME_SUCCESS'];
  vacationRequests: VacationRequestsType;
}

export interface GetVacationRequestsMeFailureAction {
  type: VacationActionTypes['GET_VACATION_REQUESTS_ME_FAILURE'];
  error: string;
}

interface VacationActionCreators {
  postVacationRequest(request: VacationRequest): PostVacationRequestAction;
  postVacationRequestSuccess(vacation: VacationType): PostVacationRequestSuccessAction;
  postVacationRequestFailure(error: string): PostVacationRequestFailureAction;
  getVacationRequestsMe(): GetVacationRequestsMeAction;
  getVacationRequestsMeSuccess(
    vacationRequests: VacationRequestsType,
  ): GetVacationRequestsMeSuccessAction;
  getVacationRequestsMeFailure(error: string): GetVacationRequestsMeFailureAction;
}

export type VacationAction =
  | PostVacationRequestAction
  | PostVacationRequestSuccessAction
  | PostVacationRequestFailureAction
  | GetVacationRequestsMeAction
  | GetVacationRequestsMeSuccessAction
  | GetVacationRequestsMeFailureAction;

const { Types, Creators } = createActions<VacationActionTypes, VacationActionCreators>(
  {
    postVacationRequest: ['request'],
    postVacationRequestSuccess: ['vacation'],
    postVacationRequestFailure: ['error'],
    getVacationRequestsMe: null,
    getVacationRequestsMeSuccess: ['vacationRequests'],
    getVacationRequestsMeFailure: ['error'],
  },
  {
    prefix: 'VACATION/',
  },
);

export const vacationActionTypes = Types;

export const vacationActionCreators = Creators;
