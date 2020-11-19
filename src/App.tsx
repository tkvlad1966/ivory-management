import React, { FC } from 'react';
import styled from 'styled-components';
import Login from './screens/login-screen/login';
import { RootState } from './redux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Employee from './screens/employee-screen/employee';
import { EmployeeType } from './services/api/api.types';

interface AppProps {
  initialized: EmployeeType;
}

const App: FC<AppProps> = ({ initialized }) => {
  console.log('initialized:', initialized);

  return (
    <BrowserRouter>
      <Container>
        {!initialized ? <Redirect to={'/login'} /> : <Redirect to={'/employee'} />}
        <Route path="/login" render={() => <Login />} />
        <Route path="/employee" render={() => <Employee />} />
      </Container>
    </BrowserRouter>
  );
};

const Container = styled.div`
  font-family: HelveticaNowDisplay;
  font-style: normal;
`;

const mapStateToProps = (state: RootState) => ({ initialized: state.user.employeeAccount });

export default compose(connect(mapStateToProps, null))(App);
