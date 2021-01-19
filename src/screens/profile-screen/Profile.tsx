import React, { FC, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { RootState } from '../../redux';
import Others from './OthersProfile';
import Educations from './Education';
import HeaderProfile from './HeaderProfile';
import Skills from './Skills';
import TitleProfile from './TitleProfile';
import WorkExperience from './WorkExperience';
import { WorksForm } from './WorksForm';
import { profileActionCreators } from '../../redux/profile';
import { useUserProfile } from '../../redux/profile/hooks';
import { useUserId, useUserAccount } from '../../redux/user/hooks';

const Container = styled.div`
  margin: 40px;
`;

const ProfileComponent: FC<CombinedProps> = (props) => {
  const userId = useUserId();
  const userAccount = useUserAccount();
  const userProfiles = useUserProfile(userId);
  const { name, role, status, firstDay, company } = userAccount;
  const userProfileId = userAccount.profile._id;

  const nameInitial = `${name?.split(' ')[0][0]} ${name?.split(' ')[1][0]}`;
  const { getUserProfile } = props;
  useEffect(() => {
    getUserProfile(userProfileId);
  }, [getUserProfile, userProfileId]);
  const [editMode, setEditMode] = useState(false);
  const onClick = useCallback(() => {
    setEditMode(!editMode);
  }, [setEditMode, editMode]);
  const renderWorkExperience = () => (
    <WorkExperience
      status={status}
      profile={userProfiles}
      firstDayMyCompany={firstDay}
      company={company}
      editMode={editMode}
      onClick={onClick}
    />
  );
  return (
    <Container>
      <HeaderProfile nameInitial={nameInitial} />
      <TitleProfile name={name} role={role} status={status} />
      {renderWorkExperience()}
      {editMode && <WorksForm profile={userProfiles} />}
      <Educations profile={userProfiles} />
      <Skills profile={userProfiles} />
      <Others profile={userProfiles} />
    </Container>
  );
};

type CombinedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: RootState, ownProps) => {
  return {};
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUserProfile: (profileId) => dispatch(profileActionCreators.getUserProfile(profileId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
