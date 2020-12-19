import React, { FC, useCallback } from 'react';
import Logotype from '../../components/logotype/logotype';
import { ivoryLogo } from '../../utils/images/index';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLORS } from '../../utils/constants';
import LoginForm from './login-form';
import { font } from '../../assets/fonts/HelveticaNowDisplay';
import DText, { TEXT_CLASSES } from '../../components/Text/text';
import { userActionCreators } from '../../redux/user';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../redux';
import { useTranslation } from 'react-i18next';
// import i18next from 'i18next';

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

const Login: FC<CombinedProps> = (props) => {
  const { t } = useTranslation();
  const { loginUser } = props;

  const onSignIn = useCallback(
    (email, password) => {
      loginUser(email, password);
      // console.log('on sign in', email, password);
      // i18next.changeLanguage('ua');
    },
    [loginUser],
  );
  return (
    <Container>
      <Logotype name={ivoryLogo.standart} height="40px" />
      <Title>
        <DText className={TEXT_CLASSES.TITLE} font_family={font.thin} size={30}>
          {t('login:welcome')}
        </DText>
      </Title>
      <RegisterLink>
        <DText font_family={font.light}>
          {t('login:new_here')}
          <NavLinkStyle>
            <Link to="/register" style={{ color: COLORS.Punch }}>
              {t('login:create')}
            </Link>
          </NavLinkStyle>
        </DText>
      </RegisterLink>
      <LoginForm onSignIn={onSignIn} />
    </Container>
  );
};

type CombinedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: RootState) => ({
  employeeAccount: state.user.employeeAccount,
  isLoading: state.user.isLoading,
  token: state.user.token,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loginUser: (email: string, password: string) =>
    dispatch(userActionCreators.loginUser(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
