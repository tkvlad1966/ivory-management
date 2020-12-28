import { createReducer } from 'reduxsauce';
import { VacationRequestsType, VacationType } from '../../services/api/api.types';
import {
  vacationActionTypes,
  PostVacationRequestSuccessAction,
  PostVacationRequestFailureAction,
  GetVacationRequestsMeSuccessAction,
  GetVacationRequestsMeFailureAction,
} from './actions';

export interface VacationState {
  isLoading: boolean;
  vacation: VacationType | null;
  vacationRequests: VacationRequestsType | null;
  error: string | null;
}

const INITIAL_STATE: VacationState = {
  isLoading: false,
  error: null,
  vacation: null,
  vacationRequests: [],
};

type Handler<A> = (state: VacationState, action: A) => VacationState;

const postVacationRequestSuccess: Handler<PostVacationRequestSuccessAction> = (
  state,
  { vacation },
) => ({
  ...state,
  isLoading: false,
  vacation,
});

const postVacationRequestFailure: Handler<PostVacationRequestFailureAction> = (
  state,
  { error },
) => ({
  ...state,
  isLoading: false,
  error,
});

const getVacationRequestsMeSuccess: Handler<GetVacationRequestsMeSuccessAction> = (
  state,
  { vacationRequests },
) => ({
  ...state,
  isLoading: false,
  vacationRequests,
});

const getVacationRequestsMeFailure: Handler<GetVacationRequestsMeFailureAction> = (
  state,
  { error },
) => ({
  ...state,
  isLoading: false,
  error,
});

export const vacationReducer = createReducer<VacationState>(INITIAL_STATE, {
  [vacationActionTypes.POST_VACATION_REQUEST_SUCCESS]: postVacationRequestSuccess,
  [vacationActionTypes.POST_VACATION_REQUEST_FAILURE]: postVacationRequestFailure,
  [vacationActionTypes.GET_VACATION_REQUESTS_ME_SUCCESS]: getVacationRequestsMeSuccess,
  [vacationActionTypes.GET_VACATION_REQUESTS_ME_FAILURE]: getVacationRequestsMeFailure,
});
