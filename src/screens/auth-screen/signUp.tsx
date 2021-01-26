import React, { FC, useCallback } from 'react';
import Logotype from '../../components/logotype/logotype';
import { ivoryLogo } from '../../utils/images/index';
import styled from 'styled-components';
// import { COLORS } from '../../utils/constants';
import SignUpForm from './signUp-form';
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
  display: grid;
  grid-template-columns: 3fr, 3fr;
  margin-top: 30px;
`;

interface SignUpProps {
  role: string;
}

const SignUp: FC<SignUpProps & CombinedProps> = (props) => {
  const { role } = props;
  const { t } = useTranslation();
  const { signUpSuperAdmin } = props;

  const onSignIn = useCallback(
    (name, email, firstDay) => {
      const company = '600a9e8f5d0e25001924c4f8';
      signUpSuperAdmin(name, email, company, firstDay);
      // i18next.changeLanguage('ua');
    },
    [signUpSuperAdmin],
  );
  return (
    <Container>
      <Logotype name={ivoryLogo.standart} height="40px" />
      <Title>
        <Text className={TEXT_CLASSES.TITLE} font_family={font.bold} size={30}>
          {t('signUp:registration')}
        </Text>
        <Text className={TEXT_CLASSES.GRAY_TITLE}>{role} </Text>
      </Title>
      <SignUpForm onSignIn={onSignIn} />
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
  signUpSuperAdmin: (name: string, email: string, firstDay: string, company: string) =>
    dispatch(userActionCreators.signUpSuperAdmin(name, email, firstDay, company)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
