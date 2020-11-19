// import humps from 'humps';
import apisauce, { ApisauceInstance } from 'apisauce';
// import config from '../config/env';
import { AuthToken, RefreshToken } from './api.types';

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

    // this.client.addResponseTransform((response) => {
    //   response.data = humps.camelizeKeys(response.data);
    // });

    // this.client.addRequestTransform((request) => {
    //   request.data = humps.decamelizeKeys(request.data);
    //   request.params = humps.decamelizeKeys(request.params);
    // });
  }

  setAuthHeader = (token: string) => {
    console.log('token:', token);
    return this.client.setHeader('Authorization', `Bearer ${token}`);
  };

  getAuthToken = (refreshToken: RefreshToken) => {
    console.log('refreshApi', refreshToken);
    return this.client.post<AuthToken, string>('/employees/refresh', refreshToken);
  };

  loginUser = (data: AuthRequestBody) => {
    try {
      console.log('data', data);
      const responseData = this.client.post('employees/login', data);

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
