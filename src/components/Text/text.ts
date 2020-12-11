import styled from 'styled-components';
import { font } from '../../assets/fonts/HelveticaNowDisplay';

export const TEXT_CLASSES = {
  TITLE: 'title',
  SUB_TITLE: 'subTitle',
  STYLE_PRYMARY: 'stylePrymary',
};

export type fontFamilyType =
  | typeof font.thin
  | typeof font.light
  | typeof font.normal
  | typeof font.bold;

interface DTextStyle {
  font_family?: fontFamilyType;
  size?: number;
  letter_spacing?: string;
  line_height?: string;
  text_transform?: string;
  color?: string;
  padding?: string;
}

const DText = styled.div<DTextStyle>`
  font-family: ${(props) => props.font_family || font.normal};
  font-size: ${(props) => props.size + 'px' || '15px'};
  letter-spacing: ${(props) => props.letter_spacing};
  line-height: ${(props) => props.line_height || '22px'};
  text-transform: ${(props) => props.text_transform};
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};

  &.title {
    font-family: ${(props) => props.font_family || font.bold};
    font-size: ${(props) => props.size + 'px' || '30px'};
    line-height: ${(props) => props.line_height || '44px'};
    letter-spacing: 0.3em;
    text-transform: uppercase;
  }

  &.subTitle {
    font-family: ${font.bold};
    padding: 4% 0% 4% 0%;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  &.stylePrymary {
    font-family: ${font.light};
    margin-left: 10%;
    padding: 4% 0em;
    color: rgba(0, 0, 0, 0.5);
    letter-spacing: 0.2em;
  }
`;

export default DText;
