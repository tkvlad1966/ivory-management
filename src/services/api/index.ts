// import humps from 'humps';
import apisauce, { ApisauceInstance } from 'apisauce';
// import config from '../config/env';
import { AuthToken, EmployeeType, RefreshToken } from './api.types';

type AuthRequestBody = {
  email: string;
  password: string;
};

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
    return this.client.post<AuthToken, string>('employees/refresh', refreshToken);
  };

  loginUser = (data: AuthRequestBody) => {
    try {
      const responseData = this.client.post('employees/login', data);
      return responseData;
    } catch (error) {
      return error;
    }
  };

  getAccount = () => {
    try {
      const responseData = this.client.get<EmployeeType, string>('employees/me');
      return responseData;
    } catch (error) {
      return error;
    }
  };

  // getEventDetails

  // getItemDetails
}

const api = new Api(); // TODO: create instance in another place

export default api;
