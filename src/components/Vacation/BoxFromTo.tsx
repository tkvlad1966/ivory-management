import React, { FC } from 'react';
import styled from 'styled-components';
import { font } from '../../assets/fonts/HelveticaNowDisplay';
import { COLORS, ICON } from '../../utils/constants';
import Box from '../Box/Box';
import Text from '../Text/text';

const SvgIconCancel = styled.span`
  display: block;
  font-size: 15px;
  color: black;
  margin: 5px;
  float: right;
`;

interface BoxFromToType {
  label: string;
  date: Date;
}

const BoxFromTo: FC<BoxFromToType> = ({ label, date }) => {
  return (
    <Box width="150px" height="70px" color={COLORS.Silver} b_r="10px" margin="10px" padding="10px">
      <Text
        font_family={font.bold}
        size={13}
        line_height="30px"
        letter_spacing="0.2em"
        text_transform="uppercase"
      >
        <SvgIconCancel className={ICON.CANCEL} />
        {label}
        <p>{date.toLocaleDateString()}</p>
      </Text>
    </Box>
  );
};

export default BoxFromTo;
