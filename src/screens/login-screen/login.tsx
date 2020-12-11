import React, { FC } from 'react';
import Logotype from '../../components/logotype/logotype';
import { ivoryLogo } from '../../utils/images/index';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import COLORS from '../../utils/constants';
import LoginForm from './login-form';
import { font } from '../../assets/fonts/HelveticaNowDisplay';
import DText, { TEXT_CLASSES } from '../../components/Text/text';

// import { useTranslation } from 'react-i18next';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 50%;
  margin: 10% 25% 0 25%;
`;

const Title = styled.div`
  margin-top: 30px;
`;

const RegisterLink = styled.div`
  margin: 1em 0 2em 0;
  line-height: 22px;
`;

const NavLinkStyle = styled.span`
  margin-left: 10px;
  color: ${COLORS.Punch};
`;

type LoginProps = {};

const Login: FC<LoginProps> = () => {
  // const { t } = useTranslation();
  return (
    <Container>
      <Logotype name={ivoryLogo.standart} height="40px" />
      <Title>
        <DText className={TEXT_CLASSES.TITLE} font_family={font.thin} size={30}>
          welcome to ivory
        </DText>
      </Title>
      <RegisterLink>
        <DText font_family={font.light}>
          New here?
          <NavLinkStyle>
            <Link to="/register" style={{ color: COLORS.Punch }}>
              Create an account
            </Link>
          </NavLinkStyle>
        </DText>
      </RegisterLink>
      <LoginForm />
    </Container>
  );
};

export default Login;
