import React from 'react';
import styled from 'styled-components';
import Box from '../../components/Box/Box';
import Logotype, { LOGO_CLASSES } from '../../components/logotype/logotype';
import { IconType } from '../../type';
import { COLORS, ICON } from '../../utils/constants';
import { ivoryLogo } from '../../utils/images';

const SvgIcon = styled.span`
  display: block;
  font-size: 30px;
  color: black;
  justify-content: center;
`;

const Container = styled.div`
  flex: 1;
  padding: 20px;
  text-align: center;
`;

const ContainerBar = styled.div`
  display: grid;
  margin-top: 50px;
`;

const NavBar = () => {
  const IconsBar: Array<IconType> = [ICON.HOME, ICON.TIME, ICON.USER, ICON.BRIEFCASE];
  return (
    <Container>
      <Logotype name={ivoryLogo.black} preset={LOGO_CLASSES.BLACK} height="60px" />
      <ContainerBar>
        {IconsBar.map((icon, index) => {
          return (
            <Box
              height="60px"
              width="60px"
              color={COLORS.Silver}
              margin="20px"
              b_r="20px"
              display="grid"
              justify="center"
              align="center"
              key={index}
            >
              <SvgIcon className={icon} />
            </Box>
          );
        })}
      </ContainerBar>
    </Container>
  );
};

export default NavBar;
