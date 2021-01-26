import React, { FC, useCallback } from 'react';
import Logotype from '../../components/logotype/logotype';
import { ivoryLogo } from '../../utils/images/index';
import styled from 'styled-components';
import LoginForm from './login-form';
import { font } from '../../assets/fonts/HelveticaNowDisplay';
import Text, { TEXT_CLASSES } from '../../components/Text/text';
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
  margin: 7% 20%;
  padding: 3% 5%;
  background: white;
  border-radius: 20px;
`;

const Title = styled.div`
  margin-top: 30px;
`;

const Login: FC<CombinedProps> = (props) => {
  const { t } = useTranslation();
  const { loginUser } = props;

  const onSignIn = useCallback(
    (email, password) => {
      loginUser(email, password);
      // i18next.changeLanguage('ua');
    },
    [loginUser],
  );
  return (
    <Container>
      <Logotype name={ivoryLogo.standart} height="40px" />
      <Title>
        <Text className={TEXT_CLASSES.TITLE} font_family={font.thin} size={30}>
          {t('login:welcome')}
        </Text>
      </Title>

      <LoginForm onSignIn={onSignIn} />
    </Container>
  );
};

type CombinedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: RootState) => ({
  userAccount: state.user.userAccount,
  isLoading: state.user.isLoading,
  token: state.user.token,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loginUser: (email: string, password: string) =>
    dispatch(userActionCreators.loginUser(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
