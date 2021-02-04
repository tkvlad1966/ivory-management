import { createReducer } from 'reduxsauce';
import { CompanyType } from '../../services/api/api.types';
import { GetUserAccountFailureAction } from '../user';
import { CompanyAction, companyActionTypes, GetCompanySuccessAction } from './actions';

export interface CompanyState {
  isLoading: boolean;
  companyId: string;
  company: CompanyType | null;
  companies: CompanyType[] | null;
  error: string | null;
}

const INITIAL_STATE: CompanyState = {
  isLoading: false,
  error: null,
  companyId: null,
  company: null,
  companies: null,
};

type Handler<A> = (state: CompanyState, action: A) => CompanyState;

const getCompanySuccess: Handler<GetCompanySuccessAction> = (state, { company }) => {
  console.log('company', company);
  return {
    ...state,
    isLoading: false,
    company: company,
  };
};

const getCompanyFailure: Handler<GetUserAccountFailureAction> = (state, { error }) => {
  return {
    ...state,
    isLoading: false,
    error: error,
  };
};

export const companyReducer = createReducer<CompanyState, CompanyAction>(INITIAL_STATE, {
  [companyActionTypes.GET_COMPANY_SUCCESS]: getCompanySuccess,
  [companyActionTypes.GET_COMPANY_FAILURE]: getCompanyFailure,
});
