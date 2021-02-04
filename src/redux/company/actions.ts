import { createActions } from 'reduxsauce';
import { CompanyType } from '../../services/api/api.types';

interface CompanyActionTypes {
  GET_COMPANY: 'GET_COMPANY';
  GET_COMPANY_SUCCESS: 'GET_COMPANY_SUCCESS';
  GET_COMPANY_FAILURE: 'GET_COMPANY_FAILURE';
}

export interface GetCompanyAction {
  type: CompanyActionTypes['GET_COMPANY'];
  companyId: string;
}

export interface GetCompanySuccessAction {
  type: CompanyActionTypes['GET_COMPANY_SUCCESS'];
  company: CompanyType;
}

export interface GetCompanyFailureAction {
  type: CompanyActionTypes['GET_COMPANY_FAILURE'];
  error: string;
}

interface CompanyActionCreators {
  getCompany(companyId: string): GetCompanyAction;
  getCompanySuccess(company: CompanyType): GetCompanySuccessAction;
  getCompanyFailure(error: string): GetCompanyFailureAction;
}

export type CompanyAction = GetCompanyAction | GetCompanySuccessAction | GetCompanyFailureAction;

const { Types, Creators } = createActions<CompanyActionTypes, CompanyActionCreators>(
  {
    getCompany: ['companyId'],
    getCompanySuccess: ['company'],
    getCompanyFailure: ['error'],
  },
  {
    prefix: 'COMPANY/',
  },
);

export const companyActionTypes = Types;

export const companyActionCreators = Creators;
