import styled from 'styled-components';

interface BoxStyle {
  width?: string;
  height?: string;
  margin?: string;
  b_r?: string;
  padding?: string;
  justify?: string;
  align?: string;
  display?: string;
}

const Box = styled.section<BoxStyle>`
  width: ${(props) => props.width};
  background: ${(props) => props.color};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  border-radius: ${(props) => props.b_r};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  display: ${(props) => props.display};
`;

export default Box;
