import styled from 'styled-components';
import { COLORS } from '../../utils/constants';

interface ButtonStyle {
  background?: string;
  margin_left?: string;
}

const Button = styled.button<ButtonStyle>`
  &.primary {
    width: 50%;
    height: 66px;
    margin-top: 1em;
    background: ${COLORS.Silver};
    border: none;
    border-radius: 100px;
  }

  &.secondary {
    width: 30%;
    height: 50px;
    margin-top: 1em;
    margin-left: ${(props) => props.margin_left};
    background: ${(props) => props.background || `${COLORS.Silver}`};
    border-radius: 100px;
  }
`;

export default Button;
