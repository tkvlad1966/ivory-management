import React, { FC } from 'react';
import styled from 'styled-components';
import COLORS from '../../utils/colors';
import Box from '../Box/Box';

interface ContainerStyle {
  flex_dir?: string;
  margin_top?: string;
}

const Container = styled.div<ContainerStyle>`
  display: flex;
  flex-direction: ${(props) => props.flex_dir};
  margin-top: ${(props) => props.margin_top};
`;

const Title = styled.div`
  font-family: HelveticaNowDisplayLight;
  size: 12px;
  color: rgba(0, 0, 0, 0.5);
  letter-spacing: 0.3em;
  margin-left: 1em;
`;

const Portfolio: FC = () => {
  return (
    <Box width="78%" height="18rem" color={COLORS.Silver} b_r="20px" padding="10px">
      <Container flex_dir="column" margin_top="0.8rem">
        <Title>MY WORKS</Title>
        <Container flex_dir="row" margin_top="0.7rem">
          <Box height="4rem" color={COLORS.Mercury} b_r="20px" margin="8px" padding="10px" />
          <Box height="4rem" color={COLORS.Mercury} b_r="20px" margin="8px" padding="10px" />
          <Box height="4rem" color={COLORS.Mercury} b_r="20px" margin="8px" padding="10px" />
          <Box height="4rem" color={COLORS.Mercury} b_r="20px" margin="8px" padding="10px" />
        </Container>
        <Container flex_dir="row">
          <Box height="7rem" color={COLORS.Mercury} b_r="10px" margin="0.5rem"></Box>
          <Box height="7rem" color={COLORS.Mercury} b_r="10px" margin="0.5rem"></Box>
        </Container>
      </Container>
    </Box>
  );
};

export default Portfolio;
