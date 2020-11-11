// import humps from 'humps';
import apisauce, { ApisauceInstance } from 'apisauce';
// import config from '../config/env';
import { AuthToken } from './api.types';

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
      headers: { 'Cache-Control': 'no-cache' },
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
    return this.client.setHeader('Authorization', `jwt ${token}`);
  };

  getAuthToken = (data: AuthRequestBody) => {
    return this.client.post<AuthToken, string>('/auth/login-jwt', data);
  };

  // getEventDetails

  // getItemDetails
}

const api = new Api(); // TODO: create instance in another place

export default api;
