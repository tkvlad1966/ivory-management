export type AuthToken = {
  token: string;
  refreshToken: string;
};

export type AuthRequestBody = {
  email: string;
  password: string;
};

export type SignUpRequestBody = {
  name: string;
  email: string;
  company: string;
  firstDay: string;
};

export type SignUpResponse = {
  user: UserType;
  token: string;
  refreshToken: string;
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
}

export type WorkExperienceType = WorkExperience[];

export interface Education {
  name: string;
  speciality: string;
  degree: string;
  firstDay: string;
  lastDay: string;
}

export type EducationsType = Education[];

export interface ProfileType {
  skills: SkillsType;
  _id: string;
  workExperience: WorkExperienceType | null;
  education: EducationsType | null;
  hoursPerWeek: number;
  rate: number;
}

export type UpdateProfile = {
  updateProfile: ProfileType | {};
  profileId: string;
};

export type ProfileTypeObj = { profile: ProfileType };

export interface UserIdProfileType {
  [key: string]: ProfileType;
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
  status: string;
  profile: ProfileType;
  // portfolio: string;
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
