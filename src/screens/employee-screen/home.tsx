import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import History from '../../components/History/history';
import Portfolio from '../../components/Portfolio/portfolio';
import Profile from '../../components/Profile/profile';
import DText, { TEXT_CLASSES } from '../../components/Text/text';
import Vacation from '../../components/Vacation/vacation';
import { RootState } from '../../redux';
import { profileActionCreators } from '../../redux/profile';
import { userActionCreators } from '../../redux/user';

const SvgIcon = styled.span`
  display: block;
  font-size: 30px;
  color: black;
  margin: 20px;
  float: right;
`;

const Container = styled.div`
  font-size: 15px;
  display: flex;
  flex-direction: row;
  color: black;
`;

const ContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 8%;
  width: 37%;
  text-align: left;
`;

const ContainerTitle = styled.div`
  margin-top: 6%;
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
`;

const Home: FC<CombinedProps> = (props) => {
  const { getAuthToken, getEmployeeAccount } = props;
  useEffect(() => {
    getAuthToken(refreshTokenLS);
    getEmployeeAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const refreshTokenLS = localStorage.refreshToken;
  // const tokenLS = localStorage.token;
  // const { employeeAccount } = props;
  // const handleClickAccount = () => props.getEmployeeAccount();
  // const handleClickToken = () => props.getAuthToken(refreshTokenLS);
  const handleClickExit = () => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('token');
    return window.location.replace('/login');
  };

  return (
    <>
      <div style={{ float: 'right' }}>
        <SvgIcon className={'icon-settings'} />
      </div>
      <Container>
        <ContainerColumn>
          <ContainerTitle>
            <DText className={TEXT_CLASSES.TITLE} size={30}>
              vacation
            </DText>
          </ContainerTitle>
          <Vacation />
          <ContainerTitle>
            <DText className={TEXT_CLASSES.TITLE} size={30}>
              history
            </DText>
          </ContainerTitle>
          <History />
        </ContainerColumn>
        <ContainerColumn>
          <ContainerTitle>
            <DText className={TEXT_CLASSES.TITLE} size={30}>
              profile
            </DText>
          </ContainerTitle>
          <Profile />
          <ContainerTitle>
            <DText className={TEXT_CLASSES.TITLE} size={30}>
              portfolio
            </DText>
          </ContainerTitle>
          <Portfolio />
        </ContainerColumn>
      </Container>
      {/* <h1>Home {employeeAccount?.name} </h1>
      <button onClick={handleClickAccount}> {employeeAccount?.name} </button>
      <button onClick={handleClickToken}> {tokenLS} </button> */}
      <SvgIcon onClick={handleClickExit} className={'icon-logout'} />
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
  getEmployeeAccount: () => dispatch(profileActionCreators.getEmployeeAccount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
