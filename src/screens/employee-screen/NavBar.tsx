import React from 'react';
import styled from 'styled-components';
import Logotype from '../../components/logotype/logotype';
import { ivoryLogo } from '../../utils/images';

const Container = styled.div`
  flex: 1;
  padding: 20px;
  text-align: center;
`;

const NavBar = () => {
  return (
    <Container>
      <Logotype name={ivoryLogo.black} height="80px" />
    </Container>
  );
};

export default NavBar;
