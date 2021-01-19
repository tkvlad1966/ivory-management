import moment from 'moment';

export const getYear = (dateString) => moment(dateString).format('YYYY');

export const getMonth = (dateString) => moment(dateString).format('MMM');

export const handleClickExit = () => {
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('token');
  return window.location.replace('/login');
};

export const IsErrorField = ({ errors, touched, index, nameForm, nameField }) =>
  errors &&
  errors[nameForm] &&
  errors[nameForm][index] &&
  //@ts-ignore
  errors[nameForm][index][nameField] &&
  touched &&
  touched[nameForm] &&
  touched[nameForm][index] &&
  touched[nameForm][index][nameField] && (
    //@ts-ignore
    <div> {errors[nameForm][index][nameField]}</div>
  );
