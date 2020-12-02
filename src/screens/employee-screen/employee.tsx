import React from 'react';
import styled from 'styled-components';
import Home from './home';
import NavBar from './NavBar';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const NavBarStyle = styled.div`
  width: 8rem;
  height: 70rem;
  border-right: 1px solid black;
`;

const HomeStyle = styled.div`
  width: 100%;
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
