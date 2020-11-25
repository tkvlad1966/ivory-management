import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../redux';
import { userActionCreators } from '../../redux/user';

const Home: FC<CombinedProps> = (props) => {
  useEffect(() => {
    props.getAuthToken(refreshTokenLS);
    props.getEmployeeAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const refreshTokenLS = localStorage.refreshToken;
  const tokenLS = localStorage.token;
  const { employeeAccount } = props;
  const handleClickAccount = () => props.getEmployeeAccount();
  const handleClickToken = () => props.getAuthToken(refreshTokenLS);
  const handleClickExit = () => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('token');
    return window.location.replace('/login');
  };

  return (
    <>
      <h1>Home {employeeAccount?.name} </h1>
      <button onClick={handleClickAccount}> {employeeAccount?.name} </button>
      <button onClick={handleClickToken}> {tokenLS} </button>
      <button onClick={handleClickExit}> Exit </button>
    </>
  );
};

type CombinedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: RootState) => ({
  employeeAccount: state.user.employeeAccount,
  token: state.user.token,
  refreshToken: state.user.refreshToken,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getAuthToken: (refreshToken: string) => dispatch(userActionCreators.getAuthToken(refreshToken)),
  getEmployeeAccount: () => dispatch(userActionCreators.getEmployeeAccount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
