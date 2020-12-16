export type AuthToken = {
  token: string;
  refreshToken: string;
};

export type Company = {
  _id: string;
  name: string;
};

export type Role = 'superAdmin' | 'admin' | 'employee';

export interface Admin {
  _id: string;
  name: null | string;
  email: string;
  company: Company;
  avatar: File;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface EmployeeType {
  skills: [];
  _id: string;
  name: null | string;
  email: string;
  company: Company;
  firstDay: string;
  avatar: any;
  role: Role;
  accumulatedVacation: number;
  usedVacation: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  hoursPerWeek: number;
  rate: number;
  status: string;
}

export interface companies {
  _id: string;
  name: string;
  annualLeave: number;
  createdAt: Date;
  updateAt: Date;
}

export interface ServerError {
  message: string;
  success: boolean;
}

export type Token = string;
export type RefreshToken = { refreshToken: string };
export type Password = string;

export type RegisterRequestBody = {
  email: string;
  username: string;
  lastName: string;
  phone: string;
  govId: string;
  password: string;
  buyerType: 'PUBLIC' | 'PRIVATE' | string; // TODO check it and remove 'or string'
};
