import { createReducer } from 'reduxsauce';
import { EmployeeType } from '../../services/api/api.types';
import {
  profileActionTypes,
  GetEmployeeAccountAction,
  GetEmployeeAccountSuccessAction,
  GetEmployeeAccountFailureAction,
} from './actions';

export interface ProfileState {
  isLoading: boolean;
  employeeAccount: EmployeeType | null;
  error: string | null;
}

const INITIAL_STATE: ProfileState = {
  isLoading: false,
  error: null,
  employeeAccount: null,
};

type Handler<A> = (state: ProfileState, action: A) => ProfileState;

const getEmployeeAccount: Handler<GetEmployeeAccountAction> = (state) => ({
  ...state,
  isLoading: true,
});

const getEmployeeAccountSuccess: Handler<GetEmployeeAccountSuccessAction> = (
  state,
  { employeeAccount },
) => ({
  ...state,
  isLoading: false,
  employeeAccount,
});

const getEmployeeAccountFailure: Handler<GetEmployeeAccountFailureAction> = (state, { error }) => ({
  ...state,
  isLoading: false,
  error,
});

export const profileReducer = createReducer<ProfileState>(INITIAL_STATE, {
  [profileActionTypes.GET_EMPLOYEE_ACCOUNT]: getEmployeeAccount,
  [profileActionTypes.GET_EMPLOYEE_ACCOUNT_SUCCESS]: getEmployeeAccountSuccess,
  [profileActionTypes.GET_EMPLOYEE_ACCOUNT_FAILURE]: getEmployeeAccountFailure,
});
