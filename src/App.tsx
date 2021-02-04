import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RootNavigation from './screens/user-screen/RootNavigation';
import './utils/translation/i18n';
import RootAuthorization from './screens/auth-screen/RootAuthorization';

const App: FC = () => {
  const token: string = localStorage.token;

  return <BrowserRouter>{token ? <RootNavigation /> : <RootAuthorization />}</BrowserRouter>;
};

export default App;
