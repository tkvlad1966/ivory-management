import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { font } from '../../assets/fonts/HelveticaNowDisplay';
import { RootState } from '../../redux';
import { userActionCreators, useUserId } from '../../redux/user';
import { COLORS } from '../../utils/constants';
import Box from '../Box/Box';
import Text, { TEXT_CLASSES } from '../Text/text';

const ContainerRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  width: 100%;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  margin: 9% 0%;
`;

const ContainerStatus = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const ContainerTitle = styled.div`
  flex: 1;
  text-align: right;
`;

const Ava = styled.div`
  flex: 1;
  width: 80px;
  height: 75px;
  background-color: ${COLORS.GRAY};
  border-radius: 49%;
`;

const Profile: FC<CombinedProps> = (props) => {
  const { name, status, rate, hoursPerWeek, skills, role } = props;
  const { t } = useTranslation();
  const userId = useUserId();
  const { getUserAccount } = props;
  useEffect(() => {
    getUserAccount(userId);
  }, [getUserAccount, userId]);

  return (
    <Box width="80%" height="290px" color={COLORS.Silver} b_r="20px" padding="20px">
      <ContainerRow>
        <Ava />
        <ContainerStatus>
          <Text font_family={font.bold} size={20}>
            {name}
          </Text>
          <Text className={TEXT_CLASSES.TITLE} color="rgba(0, 0, 0, 0.5)" line_height="22px">
            {status}
          </Text>
        </ContainerStatus>
        <ContainerTitle>
          <Text className={TEXT_CLASSES.GRAY_TITLE}>{role}</Text>
        </ContainerTitle>
      </ContainerRow>
      <Container>
        <Text className={TEXT_CLASSES.SUB_TITLE}>{t('home:rate')}</Text>
        <Text className={TEXT_CLASSES.PRIMARY}>
          {rate} {t('home:$/h')}
        </Text>
        <Text className={TEXT_CLASSES.SUB_TITLE}>{t('home:hours')}</Text>
        <Text className={TEXT_CLASSES.PRIMARY}>
          {hoursPerWeek} {t('home:h_week')}
        </Text>
        <Text className={TEXT_CLASSES.SUB_TITLE}>{t('home:skills')}</Text>
        {skills.map((skill) => (
          <Text className={TEXT_CLASSES.PRIMARY} key={skill._id}>
            {skill.name}
          </Text>
        ))}
      </Container>
    </Box>
  );
};

type CombinedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: RootState) => ({
  name: state.user?.userAccount?.name ?? null,
  status: state.user?.userAccount?.status ?? null,
  rate: state.user?.userAccount?.profile?.rate ?? null,
  hoursPerWeek: state.user?.userAccount?.profile?.hoursPerWeek ?? null,
  skills: state.user?.userAccount?.profile?.skills ?? [],
  role: state.user?.userAccount?.role ?? null,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUserAccount: (userId) => dispatch(userActionCreators.getUserAccount(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
