import React, { FC, useCallback, useState } from 'react';
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
import { useUserAccount } from '../../redux/user/hooks';
import { userActionCreators } from '../../redux/user';
import { profileActionCreators } from '../../redux/profile';
import { UpdateProfile } from '../../services/api/api.types';
// import { initialProfile } from '../../utils/constants';

const Container = styled.div`
  margin: 40px;
`;

const ProfileComponent: FC<CombinedProps> = (props) => {
  const userAccount = useUserAccount();
  console.log('userAccount:', userAccount);

  const { userLogout, updateUserProfile } = props;
  const [editMode, setEditMode] = useState(false);
  const [updateProfile, setUpdateProfile] = useState({});

  const handleClickExit = () => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('token');
    window.location.replace('/login');
    userLogout();
  };

  const onClick = useCallback(() => {
    setEditMode(!editMode);
  }, [setEditMode, editMode]);

  const handleSubmit = useCallback(
    (values) => {
      setUpdateProfile({ ...updateProfile, ...values });
    },
    [setUpdateProfile, updateProfile],
  );

  if (userAccount === null) {
    return null;
  }

  const { name, role, status, firstDay, company, profile } = userAccount;
  const nameInitial = `${name?.split(' ')[0][0]} ${name?.split(' ')[1][0]}`;
  const updateProfileData: UpdateProfile = { updateProfile, profileId: profile._id };

  const sendTo = () => {
    updateUserProfile(updateProfileData);
    setEditMode(false);
  };

  const renderWorkExperience = () => (
    <WorkExperience
      status={status}
      profile={profile}
      firstDayMyCompany={firstDay}
      company={company}
      editMode={editMode}
      onClick={onClick}
    />
  );
  return (
    <Container>
      <HeaderProfile nameInitial={nameInitial} handleClickExit={handleClickExit} />
      <TitleProfile name={name} role={role} status={status} />
      {renderWorkExperience()}
      {editMode && <WorksForm profile={profile} handleSubmit={handleSubmit} />}
      <Educations profile={profile} handleSubmit={handleSubmit} onClick={onClick} />
      <Skills profile={profile} handleSubmit={handleSubmit} />
      <Others profile={profile} />
      <button onClick={sendTo}>SendTo</button>
    </Container>
  );
};

type CombinedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: RootState, ownProps) => {
  return {};
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  userLogout: () => dispatch(userActionCreators.userLogout()),
  updateUserProfile: (updateProfileData) =>
    dispatch(profileActionCreators.updateUserProfile(updateProfileData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
