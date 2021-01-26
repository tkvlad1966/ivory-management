import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import Login from './login';
import SignUp from './signUp';

const RootAuthorization = (props) => {
  const {
    location: { pathname },
  } = props;
  const link: string = pathname;
  const linking: boolean = 'signUp' === link.split('/')[1];
  const role = 'superAdmin';

  return (
    <>
      {linking ? <Redirect to={'/signUp'} /> : <Redirect to={'/login'} />}
      <Route path="/login" render={() => <Login />} />
      <Route path="/signUp" render={() => <SignUp role={role} />} />
    </>
  );
};

export default withRouter(RootAuthorization);
