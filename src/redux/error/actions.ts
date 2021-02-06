import { createActions } from 'reduxsauce';

interface ErrorActionTypes {
  HANDLE_ERROR: 'HANDLE_ERROR';
}

export interface HandleErrorAction {
  type: ErrorActionTypes['HANDLE_ERROR'];
  key: string;
  error: Object;
}

interface ErrorActionCreators {
  handleError(key: string, error: Object): HandleErrorAction;
}

export type ErrorAction = HandleErrorAction;

const { Types, Creators } = createActions<ErrorActionTypes, ErrorActionCreators>(
  {
    handleError: ['key', 'error'],
  },
  {
    prefix: 'ERROR/',
  },
);

export const errorActionTypes = Types;

export const errorActionCreators = Creators;
