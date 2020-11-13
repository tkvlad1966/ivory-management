export type AuthToken = string;

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
  updateAt: Date;
  __v: number;
}

export interface Employee {
  _id: string;
  name: null | string;
  email: string;
  company: Company;
  firstDay: Date;
  avatar: File;
  role: Role;
  accumulatedVacation: number;
  usedVacation: number;
  createdAt: Date;
  updateAt: Date;
  __v: number;
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
export type RefreshToken = string;
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
