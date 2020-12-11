import React, { FC } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { font } from '../../assets/fonts/HelveticaNowDisplay';
import { RootState } from '../../redux';
import COLORS from '../../utils/constants';
import Box from '../Box/Box';
import DText, { TEXT_CLASSES } from '../Text/text';

const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
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
  // todo: fix size problem
  width: 80px;
  height: 75px;
  background-color: ${COLORS.GRAY};
  border-radius: 49%;
`;

type ProfileProps = {
  name: string;
  status: null | string;
  rate: number | null;
  hoursePerWeek: number | null;
  skills: string;
};

const Profile: FC<ProfileProps> = (props) => {
  const { name, status, rate, hoursePerWeek, skills } = props;

  return (
    <Box width="75%" height="290px" color={COLORS.Silver} b_r="20px" padding="20px">
      <ContainerRow>
        <Ava />
        <ContainerStatus>
          <DText font_family={font.bold} size={20}>
            {name}
          </DText>
          <DText className={TEXT_CLASSES.TITLE} color="rgba(0, 0, 0, 0.5)" line_height="22px">
            {status}
          </DText>
        </ContainerStatus>
        <ContainerTitle>
          <DText
            className={TEXT_CLASSES.TITLE}
            font_family={font.light}
            color="rgba(0, 0, 0, 0.5)"
            line_height="22px"
          >
            superadmin
          </DText>
        </ContainerTitle>
      </ContainerRow>
      <ContainerRow>
        <Container>
          <DText className={TEXT_CLASSES.SUB_TITLE}>rate</DText>
          <DText className={TEXT_CLASSES.STYLE_PRYMARY}>{rate + '$/h'}</DText>
          <DText className={TEXT_CLASSES.SUB_TITLE}>hours per week</DText>
          <DText className={TEXT_CLASSES.STYLE_PRYMARY}>{hoursePerWeek + 'h/week'}</DText>
          <DText className={TEXT_CLASSES.SUB_TITLE}>skills</DText>
          <DText className={TEXT_CLASSES.STYLE_PRYMARY}>{skills}</DText>
        </Container>
      </ContainerRow>
    </Box>
  );
};

const mapStateToProps = (state: RootState) => ({
  name: state.user?.employeeAccount?.name ?? null,
  status: state.profile.status,
  rate: state.profile.rate,
  hoursePerWeek: state.profile.hoursePerWeek,
  skills: state.profile.skills,
});

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   loginUser: (email: string, password: string) =>
//     dispatch(userActionCreators.loginUser(email, password)),
// });

export default connect(mapStateToProps)(Profile);
