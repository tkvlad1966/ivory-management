import React from 'react';
import styled from 'styled-components';
import COLORS from '../../utils/colors';
import Box from '../Box/Box';
import DText, { Bold } from '../Text/text';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.div`
  font-family: HelveticaNowDisplayLight;
  color: rgba(0, 0, 0, 0.5);
  letter-spacing: 0.3em;
  float: right;
`;

const Ava = styled.div`
  width: 80px;
  height: 75px;
  background-color: ${COLORS.GRAY};
  border-radius: 49%;
  margin-bottom: 2rem;
`;

const Profile = () => {
  return (
    <Box width="70%" height="400px" color={COLORS.Silver} b_r="20px" padding="30px">
      <Container>
        <Ava />
        <div style={{ flex: '1' }}>
          <Title>SUPERADMIN</Title>
        </div>
      </Container>
      <DText
        font_family={Bold}
        size="15px"
        line_height="35px"
        letter_spacing="0.2em"
        text_transform="uppercase"
      >
        rate
      </DText>
      <DText
        font_family={Bold}
        size="15px"
        line_height="35px"
        letter_spacing="0.2em"
        text_transform="uppercase"
      >
        hours per week
      </DText>
      <DText
        font_family={Bold}
        size="15px"
        line_height="35px"
        letter_spacing="0.2em"
        text_transform="uppercase"
      >
        skills
      </DText>
    </Box>
  );
};

export default Profile;
