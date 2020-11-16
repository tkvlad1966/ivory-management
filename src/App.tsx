import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import styled from 'styled-components';
import Login from './screens/login-screen/login';
import NavBar from './screens/employee-screen/NavBar';
import { RootState } from './redux';
import { compose } from 'redux';
import { connect } from 'react-redux';

function App(props) {
  const { initialized } = props;

  return (
    <BrowserRouter>
      {!initialized && <Login />}

      {initialized && <Route render={() => <NavBar />} />}
    </BrowserRouter>
  );
}

const mapStateToProps = (state: RootState) => ({ initialized: state.user.employeeAccount });

export default compose(connect(mapStateToProps, null))(App);
