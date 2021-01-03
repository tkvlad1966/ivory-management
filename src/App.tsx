import React, { FC } from 'react';
import styled from 'styled-components';
import Login from './screens/login-screen/login';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Employee from './screens/user-screen/employee';
import './utils/translation/i18n';

const App: FC = () => {
  const refreshTokenLS: string = localStorage.refreshToken;

  return (
    <BrowserRouter>
      <Container>
        {!refreshTokenLS ? <Redirect to={'/login'} /> : <Redirect to={'/employee/home'} />}
        <Route path="/login" render={() => <Login />} />
        <Route path="/employee/home" render={() => <Employee />} />
      </Container>
    </BrowserRouter>
  );
};

const Container = styled.div``;

export default App;
