import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, useLocation } from 'react-router-dom';
import { companyActionCreators } from '../../redux/company/actions';
import { useCompany } from '../../redux/company/hooks';
import { useError } from '../../redux/error';
import Login from './login';
import SignUp from './signUp';

const RootAuthorization = () => {
  let role: string;
  const pathname = useLocation().pathname;
  console.log('pathname:', pathname);
  const companyId = useQuery().get('companyId');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(companyActionCreators.getCompany(companyId));
  }, [companyId, dispatch]);
  const error1 = useError()?.getCompanyError;
  const error2 = useError()?.signUpSuperAdminError;
  const error = error1 || error2;
  const nameCompany = useCompany()?.company?.name;

  nameCompany ? (role = 'superAdmin') : (role = 'admin');

  return (
    <BrowserRouter>
      {pathname === '/signUp' ? (
        !error ? (
          <Redirect to={`/signUp/${nameCompany}`} />
        ) : (
          <Redirect to={'/error'} />
        )
      ) : (
        <Redirect to={'/login'} />
      )}

      <Route path="/login" render={() => <Login />} />
      <Route path={`/signUp/${nameCompany}`}>
        <SignUp role={role} companyId={companyId} />
      </Route>
      <Route path="/error" render={() => <ErrorCompany error={error} />} />
    </BrowserRouter>
  );
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ErrorCompany = ({ error }) => {
  return <div>{error}</div>;
};

export default RootAuthorization;
