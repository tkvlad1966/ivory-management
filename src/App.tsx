import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import User from './screens/user-screen/RootNavigation';
import './utils/translation/i18n';
import RootAuthorization from './screens/auth-screen/RootAuthorization';

const App: FC = () => {
  const token: string = localStorage.token;

  return <BrowserRouter>{token ? <User /> : <RootAuthorization />}</BrowserRouter>;
};

export default App;
