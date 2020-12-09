import React from 'react';
import styled from 'styled-components';
import Logotype, { LOGO_CLASSES } from '../../components/logotype/logotype';
// import stylesLogo from '../../components/logotype/logotype.presets';
import { ivoryLogo } from '../../utils/images';

const Container = styled.div`
  flex: 1;
  padding: 20px;
  text-align: center;
`;

const NavBar = () => {
  return (
    <Container>
      <Logotype name={ivoryLogo.black} preset={LOGO_CLASSES.BLACK} height="80px" />
    </Container>
  );
};

export default NavBar;
