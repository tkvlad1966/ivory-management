import { ApiResponse } from 'apisauce';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  CompanyAction,
  companyActionCreators,
  companyActionTypes,
  GetCompanyAction,
} from '../redux/company/actions';
import { errorActionCreators } from '../redux/error';
import api from '../services/api';
import { CompanyType } from '../services/api/api.types';

interface getCompanyResponse {
  company: CompanyType;
}

function* getCompany(action: GetCompanyAction) {
  const { companyId } = action;

  try {
    const response: ApiResponse<getCompanyResponse> = yield call(api.getCompany, companyId);
    if (response.data && response.ok) {
      console.log('response.data ', response.data);
      yield put(companyActionCreators.getCompanySuccess(response.data.company));
    } else if (!response.ok) {
      yield put(companyActionCreators.getCompanyFailure('company Error'));
      yield put(
        errorActionCreators.handleError('getCompanyError', response.data || 'company Error'),
      );
    }
  } catch (error) {
    yield put(errorActionCreators.handleError('getCompanyError', error));
    yield put(companyActionCreators.getCompanyFailure(error));
  }
}

export function* companySaga() {
  yield takeLatest<CompanyAction>(companyActionTypes.GET_COMPANY, getCompany);
}
