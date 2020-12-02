import React, { FC } from 'react';
import styled from 'styled-components';
import Login from './screens/login-screen/login';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Employee from './screens/employee-screen/employee';

const App: FC = () => {
  const refreshTokenLS: string = localStorage.refreshToken;

  return (
    <BrowserRouter>
      <Container>
        {!refreshTokenLS ? <Redirect to={'/login'} /> : <Redirect to={'/employee'} />}
        <Route path="/login" render={() => <Login />} />
        <Route path="/employee" render={() => <Employee />} />
      </Container>
    </BrowserRouter>
  );
};

const Container = styled.div`
  font-family: HelveticaNowDisplay;
  font-style: normal;
  font-size: 15px;
  line-height: 22px;
  color: black;
`;

// const mapStateToProps = (state: RootState) => ({ initialized: state.user.initialized });

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   getAuthToken: (refreshToken: string) => dispatch(userActionCreators.getAuthToken(refreshToken)),
// });

export default App;
