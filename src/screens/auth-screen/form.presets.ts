import styled from 'styled-components';
import { font } from '../../assets/fonts/HelveticaNowDisplay';
import { COLORS } from '../../utils/constants';

interface LoginFormStyles {
  FieldStyle: any;
  FieldCheckStyled: any;
  ButtonStyle: any;
}

const styles: LoginFormStyles = {
  FieldStyle: styled.input`
    width: 98%;
    border: none;
    border-bottom: 1px solid #c4c4c4;
    margin: 1em 1em 0em 0;
    padding: 0.5em;
    font-family: ${font.light};
    font-size: 15px;
    letter-spacing: 0.3em;
    text-transform: lowercase;
  `,
  FieldCheckStyled: styled.input`
    background-color: ${COLORS.Mercury};
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 25%;
    margin: 2em 1em 2em 1em;
  `,

  ButtonStyle: {
    marginTop: '50px',
    textAlign: 'center',
  },
};

export default styles;
