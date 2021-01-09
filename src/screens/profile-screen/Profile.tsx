import React, { FC, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { RootState } from '../../redux';
import { profileActionCreators } from '../../redux/profile';
import Others from './OthersProfile';
import Education from './Education';
import HeaderProfile from './HeaderProfile';
import Skills from './Skills';
import TitleProfile from './TitleProfile';
import WorkExperience from './WorkExperience';
import { WorksForm } from './WorksForm';
const Container = styled.div`
  margin: 40px;
`;

const ProfileComponent: FC<CombinedProps> = (props) => {
  const { name, role, status } = props;
  const { workExperience, firstDayMyCompany, company } = props;
  const { educations } = props;
  const { skills } = props;
  const { rate, hoursPerWeek } = props;

  const nameInitial = `${name?.split(' ')[0][0]} ${name?.split(' ')[1][0]}`;
  const { getUserAccount } = props;
  useEffect(() => {
    getUserAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [editMode, setEditMode] = useState(false);
  const onClick = useCallback(() => {
    setEditMode(!editMode);
  }, [setEditMode, editMode]);
  return (
    <Container>
      <HeaderProfile nameInitial={nameInitial} />
      <TitleProfile name={name} role={role} status={status} />
      <WorkExperience
        status={status}
        workExperience={workExperience}
        firstDayMyCompany={firstDayMyCompany}
        company={company}
        editMode={editMode}
        onClick={onClick}
      />
      {editMode && <WorksForm workExperience={workExperience} />}
      <Education education={educations} />
      <Skills skills={skills} />
      <Others rate={rate} hoursPerWeek={hoursPerWeek} />
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
  workExperience: state.profile?.userAccount?.profile?.workExperience ?? [],
  educations: state.profile?.userAccount?.profile?.education ?? [],
  role: state.profile?.userAccount?.role ?? null,
  firstDayMyCompany: state.profile?.userAccount?.firstDay ?? null,
  company: state.profile?.userAccount?.company ?? null,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUserAccount: () => dispatch(profileActionCreators.getUserAccount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
