import React, { FC } from 'react';
import styled from 'styled-components';
import Login from './screens/auth-screen/login';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Employee from './screens/user-screen/RootNavigation';
import './utils/translation/i18n';
import { useInitialized } from './redux/user';

const App: FC = () => {
  const token: string = localStorage.token;
  const initialized = useInitialized();
  console.log('initialized:', initialized);
  return (
    <BrowserRouter>
      <Container>
        {!token ? <Redirect to={'/login'} /> : <Redirect to={'/employee/home'} />}
        <Route path="/login" render={() => <Login />} />
        <Route path="/employee/home" render={() => <Employee />} />
      </Container>
    </BrowserRouter>
  );
};

const Container = styled.div``;

export default App;
