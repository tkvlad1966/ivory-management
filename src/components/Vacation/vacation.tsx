import React from 'react';
import styled from 'styled-components';
import COLORS from '../../utils/colors';
import Box from '../Box/Box';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem;
`;

const Vacation = () => {
  return (
    <Box width="32rem" height="30rem" color={COLORS.Boulder}>
      <Box width="32rem" height="20rem" color={COLORS.Silver}></Box>
      <Container>
        <Box width="10rem" height="6rem" color={COLORS.Silver} margin="1rem"></Box>
        <Box width="10rem" height="6rem" color={COLORS.Silver} margin="1rem"></Box>
      </Container>
    </Box>
  );
};

export default Vacation;
