import { createActions } from 'reduxsauce';
import { EmployeeType } from '../../services/api/api.types';

interface ProfileActionTypes {
  GET_EMPLOYEE_ACCOUNT: 'GET_EMPLOYEE_ACCOUNT';
  GET_EMPLOYEE_ACCOUNT_SUCCESS: 'GET_EMPLOYEE_ACCOUNT_SUCCESS';
  GET_EMPLOYEE_ACCOUNT_FAILURE: 'GET_EMPLOYEE_ACCOUNT_FAILURE';
}

export interface GetEmployeeAccountAction {
  type: ProfileActionTypes['GET_EMPLOYEE_ACCOUNT'];
}

export interface GetEmployeeAccountSuccessAction {
  type: ProfileActionTypes['GET_EMPLOYEE_ACCOUNT_SUCCESS'];
  employeeAccount: EmployeeType;
}

export interface GetEmployeeAccountFailureAction {
  type: ProfileActionTypes['GET_EMPLOYEE_ACCOUNT_FAILURE'];
  error: string;
}

interface ProfileActionCreators {
  getEmployeeAccount(): GetEmployeeAccountAction;
  getEmployeeAccountSuccess(employeeAccount: EmployeeType): GetEmployeeAccountSuccessAction;
  getEmployeeAccountFailure(error: string): GetEmployeeAccountFailureAction;
}

export type ProfileAction =
  | GetEmployeeAccountAction
  | GetEmployeeAccountSuccessAction
  | GetEmployeeAccountFailureAction;

const { Types, Creators } = createActions<ProfileActionTypes, ProfileActionCreators>(
  {
    getEmployeeAccount: null,
    getEmployeeAccountSuccess: ['employeeAccount'],
    getEmployeeAccountFailure: ['error'],
  },
  {
    prefix: 'PROFILE/',
  },
);

export const profileActionTypes = Types;

export const profileActionCreators = Creators;
