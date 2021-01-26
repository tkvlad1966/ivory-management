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
  display: grid;
  grid-template-areas: 'n c';
  grid-template-columns: 140px 10fr;
`;

const NavBarStyle = styled.div`
  grid-area: n;
  overflow: none;
`;

const Component = styled.div`
  grid-area: c;
  width: 100%;
  border-left: 2px solid ${COLORS.Silver};
  overflow: scroll;
`;

const User = () => {
  return (
    <BrowserRouter>
      <Container>
        <Route
          render={() => {
            return (
              <NavBarStyle>
                <NavBar />
              </NavBarStyle>
            );
          }}
        />
        <Component>
          <Route path="/employee/home" render={() => <Home />} />
          <Route path="/employee/profile" render={() => <Profile />} />
          <Route path="/employee/history" render={() => <History />} />
          <Route path="/employee/portfolio" render={() => <Portfolio />} />
          <Route path="/employee/settings" render={() => <Settings />} />
        </Component>
      </Container>
    </BrowserRouter>
  );
};

export default User;
