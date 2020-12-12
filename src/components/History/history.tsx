import React from 'react';
import { font } from '../../assets/fonts/HelveticaNowDisplay';
import { COLORS } from '../../utils/constants';
import Box from '../Box/Box';
import DText from '../Text/text';

const History = () => {
  return (
    <Box height="170px" color={COLORS.Silver} b_r="20px" padding="20px">
      <DText
        font_family={font.light}
        letter_spacing="0.3em"
        text_transform="uppercase"
        color="rgba(0, 0, 0, 0.5)"
      >
        last vacation
      </DText>
    </Box>
  );
};

export default History;
