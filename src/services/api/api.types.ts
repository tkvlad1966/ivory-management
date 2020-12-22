export type AuthToken = {
  token: string;
  refreshToken: string;
};

export type AuthRequestBody = {
  email: string;
  password: string;
};

export type Company = {
  _id: string;
  name: string;
};

export type VacationRequest = {
  beginDate: string;
  endDate: string;
  nationalHolidays: Array<string> | [];
};

export type Role = 'superAdmin' | 'admin' | 'employee';

export interface UserType {
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

export type UserTypeObj = { employee: UserType };

export type EmployeeType = {
  _id: string;
  name: string;
  role: string;
};

export interface VacationType {
  nationalHolidays: Array<string>;
  status: string;
  _id: string;
  currentAccumulatedVacation: number;
  currentUsedVacation: number;
  numWorkDays: number;
  beginVacationDate: string;
  endVacationDate: string;
  employee: EmployeeType;
}

export type VacationRequestsType = Array<VacationType>;

export interface CompaniesType {
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
