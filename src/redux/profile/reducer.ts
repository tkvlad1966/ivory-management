import { createReducer } from 'reduxsauce';

export interface ProfileState {
  //   name: string | null;
  status: null | string;
  rate: number | null;
  hoursePerWeek: number | null;
  skills: string;
}

const INITIAL_STATE: ProfileState = {
  //   name: null,
  status: 'junior',
  rate: 5,
  hoursePerWeek: 30,
  skills: 'javaScript/React',
};

export const profileReducer = createReducer<ProfileState>(INITIAL_STATE, {});
