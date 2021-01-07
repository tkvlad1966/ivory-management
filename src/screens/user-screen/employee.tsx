import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../../utils/constants';
import History from '../history-screen/History';
import Portfolio from '../portfolio-screen/Portfolio';
import Profile from '../profile-screen/Profile';
import Settings from '../settings-screen/Settings';
import Home from './home';
import NavBar from './NavBar';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const NavBarStyle = styled.div`
  width: 140px;
`;

const ComponentStyle = styled.div`
  width: 100%;
  border-left: 2px solid ${COLORS.Silver};
`;

const Employee = () => {
  return (
    <BrowserRouter>
      <Container>
        <NavBarStyle>
          <NavBar />
        </NavBarStyle>
        <ComponentStyle>
          <Route path="/employee/home" render={() => <Home />} />
          <Route path="/employee/profile" render={() => <Profile />} />
          <Route path="/employee/history" render={() => <History />} />
          <Route path="/employee/portfolio" render={() => <Portfolio />} />
          <Route path="/employee/settings" render={() => <Settings />} />
        </ComponentStyle>
      </Container>
    </BrowserRouter>
  );
};

export default Employee;
