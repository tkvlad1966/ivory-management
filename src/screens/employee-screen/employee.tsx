import React from 'react';
import styled from 'styled-components';
import Home from './home';
import NavBar from './NavBar';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
`;

const NavBarStyle = styled.div`
  width: 10em;
  height: 70em;
  border-right: 1px solid black;
`;

const HomeStyle = styled.div`
  width: 40em;
`;

const Employee = () => {
  return (
    <Container>
      <NavBarStyle>
        <NavBar />
      </NavBarStyle>
      <HomeStyle>
        <Home />
      </HomeStyle>
    </Container>
  );
};

export default Employee;
