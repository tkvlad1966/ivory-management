import React, { FC } from 'react';
import styled from 'styled-components';
import { font } from '../../assets/fonts/HelveticaNowDisplay';
import Box from '../../components/Box/Box';
import Text from '../../components/Text/text';
import { COLORS, ICON } from '../../utils/constants';

const Container = styled.div`
  display: grid;
  grid-template-columns: 12fr 1fr 1fr 1fr;
  width: 100%;
  align-items: center;
  margin-left: 60px;
`;

const SvgIcon = styled.span`
  font-size: 28px;
  color: ${(props) => props.color};
  margin: 20px;
`;

interface HeaderProfileProps {
  nameInitial: string;
}

const HeaderProfile: FC<HeaderProfileProps> = ({ nameInitial }) => {
  return (
    <Container>
      <SvgIcon className={ICON.SEARCH} />
      <SvgIcon className={ICON.NOTIFICATION2} />
      <Box width="50px" height="50px" color={COLORS.Silver} b_r="49%" text_align="center">
        <Text font_family={font.bold} size={20} line_height="44px" text_transform="uppercase">
          {nameInitial}
        </Text>
      </Box>
      <SvgIcon className={ICON.LOGOUT} />
    </Container>
  );
};

export default HeaderProfile;
