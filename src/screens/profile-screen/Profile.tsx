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

const Container = styled.div`
  margin: 40px;
`;

const ProfileComponent: FC<CombinedProps> = (props) => {
  const userAccount = useUserAccount();
  const { name, role, status, firstDay, company, profile } = userAccount;
  const nameInitial = `${name?.split(' ')[0][0]} ${name?.split(' ')[1][0]}`;
  const { userLogout } = props;
  const [editMode, setEditMode] = useState(false);

  const handleClickExit = () => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('token');
    window.location.replace('/login');
    userLogout();
  };
  const onClick = useCallback(() => {
    setEditMode(!editMode);
  }, [setEditMode, editMode]);
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
      {editMode && <WorksForm profile={profile} />}
      <Educations profile={profile} />
      <Skills profile={profile} />
      <Others profile={profile} />
    </Container>
  );
};

type CombinedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: RootState, ownProps) => {
  return {};
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  userLogout: () => dispatch(userActionCreators.userLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
