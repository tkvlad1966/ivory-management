import React, { FC } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { font } from '../../fonts/HelveticaNowDisplay';
import { RootState } from '../../redux';
import COLORS from '../../utils/colors';
import Box from '../Box/Box';
import DText, { TEXT_CLASSES } from '../Text/text';

const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContainerColumns = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 2rem 0em;
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

const ContainerUserName = styled.div`
  flex: 1;
`;

const Ava = styled.div`
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
    <Box width="74%" height="400px" color={COLORS.Silver} b_r="20px" padding="20px">
      <ContainerRow>
        <Ava />
        <ContainerStatus>
          <DText font_family={font.bold} size={20}>
            {name}
          </DText>
          <DText
            className={TEXT_CLASSES.TITLE}
            // size={15}
            color="rgba(0, 0, 0, 0.5)"
            line_height="22px"
          >
            {status}
          </DText>
        </ContainerStatus>
        <ContainerUserName></ContainerUserName>
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
        <ContainerColumns>
          <DText className={TEXT_CLASSES.SUB_TITLE} padding={'0.5em 0em'}>
            rate
          </DText>

          <DText className={TEXT_CLASSES.SUB_TITLE} padding={'0.5em 0em'}>
            hours per week
          </DText>

          <DText className={TEXT_CLASSES.SUB_TITLE} padding={'0.5em 0em'}>
            skills
          </DText>
        </ContainerColumns>
        <ContainerColumns>
          <DText className={TEXT_CLASSES.STYLE_PRYMARY}>{rate + '$/h'}</DText>
          <DText className={TEXT_CLASSES.STYLE_PRYMARY}>{hoursePerWeek + 'h/week'}</DText>
          <DText className={TEXT_CLASSES.STYLE_PRYMARY}>{skills}</DText>
        </ContainerColumns>
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
