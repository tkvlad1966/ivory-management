import React, { FC } from 'react';
// import styled from 'styled-components';
import { ivoryLogo } from '../../utils/images';

export type logoName = typeof ivoryLogo.standart | typeof ivoryLogo.black;

// interface ImgStyle {
//   width?: string;
//   height?: string;
// }

// const Img = styled.image<ImgStyle>`
//   width: ${(props) => props.width};
//   height: ${(props) => props.height};
// `;

interface LogotypeProps {
  name: logoName;
  height?: string;
}

const Logotype: FC<LogotypeProps> = ({ name, height }) => {
  return (
    <div>
      <img src={name} alt="logotype" style={{ height: height }} />
    </div>
  );
};

export default Logotype;
