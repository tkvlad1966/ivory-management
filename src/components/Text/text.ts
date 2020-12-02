import styled from 'styled-components';

export const Thin = 'HelveticaNowDisplayThin';
export const Light = 'HelveticaNowDisplayLight';
// const Normal ='HelveticaNowDisplay';
export const Bold = 'HelveticaNowDisplayMedium';
export const TEXT_CLASSES = {
  TITLE: 'title',
};

export type fontFamilyType = typeof Thin | typeof Light | typeof Bold;

interface DTextStyle {
  font_family?: fontFamilyType;
  size?: string;
  letter_spacing?: string;
  line_height?: string;
  text_transform?: string;
  color?: string;
}

const DText = styled.div<DTextStyle>`
  font-family: ${(props) => props.font_family};
  font-size: ${(props) => props.size};
  letter-spacing: ${(props) => props.letter_spacing};
  line-height: ${(props) => props.line_height};
  text-transform: ${(props) => props.text_transform};
  color: ${(props) => props.color};
  &.title {
    font-family: HelveticaNowDisplayMedium;
    font-size: ${(props) => props.size || '30px'};
    line-height: 44px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
  }
`;

export default DText;
