import React, { FC } from 'react';
import { ivoryLogo } from '../../utils/images';

export type logoName = typeof ivoryLogo.standart | typeof ivoryLogo.black;

interface LogotypeProps {
  name: logoName;
}

const Logotype: FC<LogotypeProps> = ({ name }) => {
  return (
    <div>
      <img src={name} alt="logotype" style={{ height: 40 }} />
    </div>
  );
};

export default Logotype;
