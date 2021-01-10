import moment from 'moment';

// export const GetYear = (dateString) => new Date(Date.parse(dateString)).getFullYear();
export const getYear = (dateString) => moment(dateString).format('YYYY');

export const getMonth = (dateString) => moment(dateString).format('MMM');

export const handleClickExit = () => {
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('token');
  return window.location.replace('/login');
};
