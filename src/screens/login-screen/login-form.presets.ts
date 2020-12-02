import styled from 'styled-components';
import COLORS from '../../utils/colors';

interface LoginFormStyles {
  FieldStyle: any;
  FieldCheckStyled: any;
  Button: any;
}

const styles: LoginFormStyles = {
  FieldStyle: styled.input`
    background-color: #faf9f9;
    width: 98%;
    border: none;
    border-bottom: 1px solid #c4c4c4;
    margin: 1em 1em 0em 0;
    padding: 0.5em;
    font-family: HelveticaNowDisplayLight;
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
  Button: styled.button`
    width: 100%;
    height: 66px;
    background: #c4c4c4;
    border: none;
    border-radius: 100px;
    font-size: 30px;
    line-height: 44px;
    letter-spacing: 0.3em;
    color: #000000;
  `,
};

export default styles;
