import React, { FC } from 'react';
import styled from 'styled-components';
import { COLORS, ICON } from '../../utils/constants';
import Box from '../Box/Box';

interface ContainerStyle {
  column_start?: number;
  column_end?: number;
  row_start?: number;
  row_end?: number;
}

const SvgIcon = styled.span`
  display: block;
  font-size: 15px;
  color: black;
  margin: 5px;
  float: right;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2fr 3fr;
`;

const ContainerColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Container = styled.div<ContainerStyle>`
  grid-column-start: ${(props) => props.column_start};
  grid-column-end: ${(props) => props.column_end};
  grid-row-start: ${(props) => props.row_start};
  grid-row-end: ${(props) => props.row_end};
`;

const Title = styled.div`
  font-family: HelveticaNowDisplayLight;
  color: rgba(0, 0, 0, 0.5);
  letter-spacing: 0.3em;
  margin: 2% 0% 3% 3%;
`;

const Portfolio: FC = () => {
  return (
    <Box width="78%" height="300px" color={COLORS.Silver} b_r="20px" padding="15px">
      <SvgIcon className={ICON.NEXT} />
      <Title>MY WORKS</Title>
      <ContainerColumn>
        <Works />
        <Works />
      </ContainerColumn>
    </Box>
  );
};

const Works = () => {
  return (
    <Wrapper>
      <Box height="60%" color={COLORS.Mercury} b_r="20px" margin="8px" padding="10px" />
      <Box height="60%" color={COLORS.Mercury} b_r="20px" margin="8px" padding="10px" />
      <Container column_start={1} column_end={3} row_start={2} row_end={4}>
        <Box height="140px" color={COLORS.Mercury} b_r="20px" margin="8px"></Box>
      </Container>
    </Wrapper>
  );
};

export default Portfolio;
