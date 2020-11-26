import styled from 'styled-components';

interface BoxStyle {
  width: string;
  height: string;
  margin?: string;
}

const Box = styled.section<BoxStyle>`
  width: ${(props) => props.width};
  background: ${(props) => props.color};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  left: 278px;
  top: 104px;
  border-radius: 1rem;
`;

export default Box;
