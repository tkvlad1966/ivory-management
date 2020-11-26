import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import Vacation from '../../components/Vacation/vacation';
// import View from '../../components/calendar/calendar';
import { RootState } from '../../redux';
import { userActionCreators } from '../../redux/user';

const Container = styled.div`
  font-size: 15px;
  display: flex;
  flex-direction: row;
  text-align: left;
  /* font-weight: 500; */
  /* width: 100%; */
  color: black;
`;

const ContainerColumn = styled.div`
  margin-left: 10rem;
`;

const Title = styled.div`
  font-size: 30px;
  line-height: 44px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-top: 4rem;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
`;

const Home: FC<CombinedProps> = (props) => {
  useEffect(() => {
    props.getAuthToken(refreshTokenLS);
    props.getEmployeeAccount();
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
      <Container>
        <ContainerColumn>
          <Title>vacation</Title>
          <Vacation></Vacation>
          <Title>history</Title>
        </ContainerColumn>
        <ContainerColumn>
          <Title>profile</Title>
          <Title>portfolio</Title>
        </ContainerColumn>
      </Container>
      {/* <h1>Home {employeeAccount?.name} </h1>
      <button onClick={handleClickAccount}> {employeeAccount?.name} </button>
      <button onClick={handleClickToken}> {tokenLS} </button> */}
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
