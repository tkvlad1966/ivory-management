import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { font } from '../../assets/fonts/HelveticaNowDisplay';
import { RootState } from '../../redux';
import { profileActionCreators } from '../../redux/profile';
import { COLORS } from '../../utils/constants';
import Box from '../Box/Box';
import DText, { TEXT_CLASSES } from '../Text/text';

const ContainerRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
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
  flex: 1;
  width: 80px;
  height: 75px;
  background-color: ${COLORS.GRAY};
  border-radius: 49%;
`;

type ProfileProps = {
  name: string;
  status: null | string;
  rate: number | null;
  hoursPerWeek: number | null;
  skills: [];
  getEmployeeAccount: () => void;
};

const Profile: FC<ProfileProps> = (props) => {
  const { name, status, rate, hoursPerWeek, skills } = props;
  const { getEmployeeAccount } = props;
  useEffect(() => {
    getEmployeeAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box width="80%" height="290px" color={COLORS.Silver} b_r="20px" padding="20px">
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
      {/* <ContainerRow> */}
      <Container>
        <DText className={TEXT_CLASSES.SUB_TITLE}>rate</DText>
        <DText className={TEXT_CLASSES.PRIMARY}>{rate + '$/h'}</DText>
        <DText className={TEXT_CLASSES.SUB_TITLE}>hours per week</DText>
        <DText className={TEXT_CLASSES.PRIMARY}>{hoursPerWeek + 'h/week'}</DText>
        <DText className={TEXT_CLASSES.SUB_TITLE}>skills</DText>
        <DText className={TEXT_CLASSES.PRIMARY}>{skills}</DText>
      </Container>
      {/* </ContainerRow> */}
    </Box>
  );
};

const mapStateToProps = (state: RootState) => ({
  name: state.profile?.employeeAccount?.name ?? null,
  status: state.profile?.employeeAccount?.status ?? null,
  rate: state.profile?.employeeAccount?.rate ?? null,
  hoursPerWeek: state.profile?.employeeAccount?.hoursPerWeek ?? null,
  skills: state.profile?.employeeAccount?.skills || 'none',
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getEmployeeAccount: () => dispatch(profileActionCreators.getEmployeeAccount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
