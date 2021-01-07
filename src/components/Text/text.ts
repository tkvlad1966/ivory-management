import styled from 'styled-components';
import { font } from '../../assets/fonts/HelveticaNowDisplay';

export const TEXT_CLASSES = {
  TITLE: 'title',
  SUB_TITLE: 'subTitle',
  GRAY_TITLE: 'grayTitle',
  PRIMARY: 'stylePrimary',
};

export type fontFamilyType =
  | typeof font.thin
  | typeof font.light
  | typeof font.normal
  | typeof font.bold;

interface TextStyle {
  font_family?: fontFamilyType;
  size?: number;
  letter_spacing?: string;
  line_height?: string;
  text_transform?: string;
  color?: string;
  padding?: string;
  margin?: string;
  border_bottom?: string;
}

const Text = styled.div<TextStyle>`
  font-family: ${(props) => props.font_family || font.normal};
  font-size: ${(props) => props.size + 'px' || '15px'};
  letter-spacing: ${(props) => props.letter_spacing};
  line-height: ${(props) => props.line_height || '22px'};
  text-transform: ${(props) => props.text_transform};
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  border-bottom: ${(props) => props.border_bottom};

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
    line-height: 35px;
  }

  &.grayTitle {
    font-family: ${(props) => props.font_family || font.light};
    text-transform: uppercase;
    margin: ${(props) => props.margin};
    color: ${(props) => props.color || 'rgba(0, 0, 0, 0.5)'};
    letter-spacing: 0.3em;
  }

  &.stylePrimary {
    font-family: ${(props) => props.font_family || font.light};
    margin-left: 10%;
    /* margin-top: 4%auto; */
    padding: 10px 0em;
    color: ${(props) => props.color || 'rgba(0, 0, 0, 0.5)'};
    letter-spacing: 0.2em;
  }
`;

export default Text;
