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
  ProfileType,
  UpdateProfile,
  SignUpRequestBody,
  SignUpResponse,
  CompanyType,
} from './api.types';

class Api {
  private client: ApisauceInstance;

  constructor(baseURL = 'https://api-management.ivorysoft.co/') {
    this.client = apisauce.create({
      baseURL,
      timeout: 1000,
    });
  }

  setAuthHeader = (token: string) => {
    return this.client.setHeader('Authorization', `Bearer ${token}`);
  };

  getAuthToken = (refreshToken: RefreshToken) => {
    return this.client.post<AuthToken>('auth/refresh', refreshToken);
  };

  loginUser = (data: AuthRequestBody) => {
    try {
      const responseData = this.client.post<UserType, AuthToken>('auth/login', data);
      return responseData;
    } catch (error) {
      return error;
    }
  };

  signUpSuperAdmin = (data: SignUpRequestBody) => {
    try {
      const responseData = this.client.post<UserType, SignUpResponse>('admins/signup', data);
      return responseData;
    } catch (error) {
      return error;
    }
  };

  getAccount = (userId: string) => {
    try {
      const responseData = this.client.get<UserType, string>(`Users/${userId}`);
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

  getProfile = (userId: string) => {
    try {
      const responseData = this.client.get<ProfileType>(`users/${userId}/profile`);
      return responseData;
    } catch (error) {
      return error;
    }
  };

  updateProfile = (data: UpdateProfile) => {
    const { updateProfile, profileId } = data;
    try {
      const responseData = this.client.put<ProfileType>(`profiles/${profileId}`, updateProfile);
      return responseData;
    } catch (error) {
      return error;
    }
  };

  getCompany = (companyId: string) => {
    try {
      const responseData = this.client.get<CompanyType>(`companies/${companyId}`);
      return responseData;
    } catch (error) {
      return error;
    }
  };
}

const api = new Api(); // TODO: create instance in another place

export default api;
