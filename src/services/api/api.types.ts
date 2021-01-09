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

export type Skill = {
  _id: string;
  name: string;
};

export type SkillsType = Skill[];

export interface WorkExperience {
  name: string;
  status: string;
  firstDay: string;
  lastDay: string;
  createdAt: string;
  updateAt: string;
}

export type WorkExperienceType = WorkExperience[];

export interface Education {
  name: string;
  speciality: string;
  degree: string;
  firstDay: string;
  lastDay: string;
  createdAt: string;
  updateAt: string;
}

export type EducationType = Education[];

export interface ProfileType {
  skills: SkillsType;
  _id: string;
  workExperience: WorkExperienceType;
  education: EducationType;
  hoursPerWeek: number;
  rate: number;
  createdAt: string;
  updateAt: string;
  __v: number;
}

export type Role = 'superAdmin' | 'admin' | 'employee';

export interface UserType {
  // skills: [];
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
  status: string;
  profile: ProfileType;
}

export type UserTypeObj = { user: UserType };

export type UserVacationType = {
  _id: string;
  name: string;
  role: string;
};

export type VacationRequest = {
  beginDate: string;
  endDate: string;
  nationalHolidays: Array<string> | [];
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
  employee: UserVacationType;
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
