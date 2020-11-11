import React, { FC } from 'react';
import Logotype from '../../components/logotype/logotype';
import { ivoryLogo } from '../../utils/images/index';
import styled from 'styled-components';
// import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import COLORS from '../../utils/colors';
import LoginForm from './login-form';

// import { useTranslation } from 'react-i18next';

const Container = styled.div`
  font-family: HelveticaNowDisplay;
  font-style: normal;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  text-align: left;
  font-weight: 300;
  width: 50%;
  margin: 15em 25% 0 25%;
`;

const Title = styled.div`
  font-weight: 100;
  font-size: 30px;
  line-height: 44px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-top: 0.7em;
`;

const RegisterLink = styled.div`
  margin: 1em 0 2em 0;
  line-height: 22px;
`;

const NavLinkStyle = styled.span`
  margin-left: 0.2em;
  color: ${COLORS.Punch};
`;

type LoginProps = {};

const Login: FC<LoginProps> = () => {
  // const { t } = useTranslation();
  return (
    <Container>
      <Logotype name={ivoryLogo.standart} />
      <Title>welcome to ivory</Title>
      <RegisterLink>
        New here?
        <NavLinkStyle>
          <Link to="/register" style={{ color: COLORS.Punch }}>
            Create an account
          </Link>
        </NavLinkStyle>
      </RegisterLink>
      <LoginForm />
    </Container>
  );
};

export default Login;
