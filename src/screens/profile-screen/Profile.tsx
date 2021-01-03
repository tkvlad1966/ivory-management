import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { font } from '../../assets/fonts/HelveticaNowDisplay';
import Box from '../../components/Box/Box';
import Text, { TEXT_CLASSES } from '../../components/Text/text';
import { RootState } from '../../redux';
import { profileActionCreators } from '../../redux/profile';
import { COLORS, ICON } from '../../utils/constants';

const SvgIcon = styled.span`
  font-size: 28px;
  color: ${(props) => props.color};
  margin: 20px;
`;

const Container = styled.div`
  position: relative;
  /* background: red; */
  margin: 40px;
  z-index: 10;
`;

const ContainerRow = styled.div`
  display: grid;
  grid-template-columns: 12fr 1fr 1fr 1fr;
  width: 100%;
  align-items: center;
  margin-left: 20px;
`;

const ContainerTitle = styled.div`
  display: grid;
  grid-template-columns: 12fr 4fr;
  width: 100%;
  align-items: center;
  margin: 40px;
`;

const Circle = styled.div`
  position: absolute;
  top: 240px;
  left: 40px;
  z-index: 0;
`;

const ProfileComponent: FC<CombinedProps> = (props) => {
  const { name, role, status } = props;
  const { t } = useTranslation();
  const { getUserAccount } = props;
  useEffect(() => {
    getUserAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const nameInitial = `${name?.split('')[0][0]} ${name?.split('')[1][0]}`;
  return (
    <Container>
      <ContainerRow>
        <SvgIcon className={ICON.SEARCH} />
        <SvgIcon className={ICON.NOTIFICATION2} />
        <Box width="50px" height="50px" color={COLORS.Silver} b_r="49%" text_align="center">
          <Text font_family={font.bold} size={20} line_height="44px" text_transform="uppercase">
            {nameInitial}
          </Text>
        </Box>
        <SvgIcon className={ICON.LOGOUT} />
      </ContainerRow>
      <ContainerTitle>
        <Text className={TEXT_CLASSES.TITLE} size={30}>
          {t('home:profile')}
        </Text>
        <Text className={TEXT_CLASSES.GRAY_TITLE} size={24}>
          {t('profile:download')}
        </Text>
        <Text className={TEXT_CLASSES.GRAY_TITLE} size={24}>
          {role}
        </Text>
        <SvgIcon className={ICON.DOWNLOAD} color={COLORS.Silver} />
      </ContainerTitle>
      <div>
        <Circle>
          <Box width="260px" height="260px" color={COLORS.Silver} b_r="49%" z_index={-1} />
        </Circle>
        <Container>
          <Text font_family={font.bold} size={48} line_height="71px" margin="60px 0 0 150px">
            {name}
          </Text>
          <Text className={TEXT_CLASSES.GRAY_TITLE} size={24} margin="20px 0 0 240px">
            {status}
          </Text>
        </Container>
      </div>
    </Container>
  );
};

type CombinedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: RootState) => ({
  name: state.profile?.userAccount?.name,
  status: state.profile?.userAccount?.status ?? null,
  rate: state.profile?.userAccount?.profile?.rate ?? null,
  hoursPerWeek: state.profile?.userAccount?.profile?.hoursPerWeek ?? null,
  skills: state.profile?.userAccount?.profile?.skills ?? [],
  role: state.profile?.userAccount?.role ?? null,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUserAccount: () => dispatch(profileActionCreators.getUserAccount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
