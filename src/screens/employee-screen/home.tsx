import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../redux';
import { userActionCreators } from '../../redux/user';

const Home: FC<CombinedProps> = (props) => {
  console.log('props:', props);
  const refreshTokenLS = localStorage.refreshToken;
  const tokenLS = localStorage.token;
  const { name } = props;
  const handleClickToken = () => props.getEmployeeAccount();
  const handleClickAccount = () => props.getAuthToken(refreshTokenLS);
  const handleClickExit = () => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('token');
    return window.location.replace('/login');
  };

  return (
    <>
      <h1>Home {name} </h1>
      <button onClick={handleClickAccount}> {name} </button>
      <button onClick={handleClickToken}> {tokenLS} </button>
      <button onClick={handleClickExit}> Exit </button>
    </>
  );
};

type CombinedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: RootState) => ({
  name: state.user.employeeAccount?.name,
  token: state.user.token,
  refreshToken: state.user.refreshToken,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getAuthToken: (refreshToken: string) => dispatch(userActionCreators.getAuthToken(refreshToken)),
  getEmployeeAccount: () => dispatch(userActionCreators.getEmployeeAccount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
