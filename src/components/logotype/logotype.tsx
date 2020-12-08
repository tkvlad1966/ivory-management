import React, { FC } from 'react';
import styled from 'styled-components';
import { ivoryLogo } from '../../utils/images';

export type logoName = typeof ivoryLogo.standart | typeof ivoryLogo.black;

const ImgStyle = styled.div`
  background-color: black;
  border-radius: 47%;
`;

interface LogotypeProps {
  name: logoName;
  height?: string;
  width?: string;
}

const Logotype: FC<LogotypeProps> = ({ name, height, width }) => {
  return (
    <ImgStyle>
      <img src={name} alt="logotype" style={{ height: height, width: width }} />
    </ImgStyle>
  );
};

export default Logotype;
