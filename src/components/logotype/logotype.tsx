import React, { FC } from 'react';
import styled from 'styled-components';
import { ivoryLogo } from '../../utils/images';
export type logoName = typeof ivoryLogo.standart | typeof ivoryLogo.black;

export const LOGO_CLASSES = {
  BLACK: 'black',
};

interface LogotypeProps {
  name: logoName;
  preset?: typeof LOGO_CLASSES.BLACK;
  height: string;
}

interface LogoProps {
  src?: logoName;
  height: string;
}

const Logo = styled.img<LogoProps>`
  src: ${(props) => props.src};
  height: ${(props) => props.height || '40px'};
  &.black {
    width: 80px;
    background-color: black;
    border-radius: 47%;
    padding: 10px;
  }
`;

const Logotype: FC<LogotypeProps> = (props) => {
  const { name, height, preset } = props;
  return (
    <div>
      <Logo src={name} alt="logotype" height={height} className={preset} />
    </div>
  );
};

export default Logotype;
