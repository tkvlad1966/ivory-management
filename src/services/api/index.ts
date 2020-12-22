// import humps from 'humps';
import apisauce, { ApisauceInstance } from 'apisauce';
// import config from '../config/env';
import {
  AuthRequestBody,
  AuthToken,
  UserType,
  RefreshToken,
  VacationRequest,
  VacationType,
  VacationRequestsType,
} from './api.types';

class Api {
  private client: ApisauceInstance;

  constructor(baseURL = 'https://api-management.ivorysoft.co/') {
    this.client = apisauce.create({
      baseURL,
      timeout: 10000,
      // headers: { 'Cache-Control': 'no-cache' },
    });
  }

  setAuthHeader = (token: string) => {
    return this.client.setHeader('Authorization', `Bearer ${token}`);
  };

  getAuthToken = (refreshToken: RefreshToken) => {
    return this.client.post<AuthToken, string>('auth/refresh', refreshToken);
  };

  loginUser = (data: AuthRequestBody) => {
    try {
      const responseData = this.client.post<UserType, AuthToken>('auth/login', data);
      return responseData;
    } catch (error) {
      return error;
    }
  };

  getAccount = () => {
    try {
      const responseData = this.client.get<UserType, string>('employees/me');
      return responseData;
    } catch (error) {
      return error;
    }
  };

  postVacationRequest = (request: VacationRequest) => {
    try {
      const responseData = this.client.post<VacationType>('employees/vacationRequests', request);
      return responseData;
    } catch (error) {
      return error;
    }
  };

  getVacationRequestsMe = () => {
    try {
      const responseData = this.client.get<VacationRequestsType>('employees/vacationRequests/me');
      return responseData;
    } catch (error) {
      return error;
    }
  };
}

const api = new Api(); // TODO: create instance in another place

export default api;
