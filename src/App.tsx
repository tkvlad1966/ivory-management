import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import styled from 'styled-components';
import Login from './screens/login-screen/login';
import Register from './screens/login-screen/register';

function App() {
  return (
    <BrowserRouter>
      <Login />
      {/* <Route path="/login" render={() => <Login />} /> */}
      <Route path="/register" render={() => <Register />} />
    </BrowserRouter>
  );
}

export default App;
