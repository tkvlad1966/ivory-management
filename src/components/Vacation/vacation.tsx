import React, { FC, useState } from 'react';
import styled from 'styled-components';
import COLORS from '../../utils/colors';
import Box from '../Box/Box';
import DText, { Bold } from '../Text/text';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './styles.module.css';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  margin: 10px;
`;

const CalendarStylesArray = [
  styles.react_calendar,
  styles.react_calendar__month_view__weekdays,
  // styles.react_calendar__tile,
];

const Vacation: FC = () => {
  const [value, onChange] = useState(new Date());
  // const formatShortWeekday = (locale, date) => formatDate (date, 'dd')

  return (
    <Box height="27rem" color={COLORS.Boulder} b_r="20px">
      <Box height="68%" color={COLORS.Silver} b_r="20px">
        <Calendar
          className={CalendarStylesArray}
          formatShortWeekday={(_locale, date) =>
            ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][date.getDay()]
          }
          locale="en-EN"
          onChange={onChange}
          value={value}
        />
      </Box>
      <Container>
        <Box height="5em" color={COLORS.Silver} b_r="10px" margin="10px" padding="10px">
          <DText
            font_family={Bold}
            size="13px"
            line_height="30px"
            letter_spacing="0.2em"
            text_transform="uppercase"
          >
            from
            <p>15/10/20</p>
          </DText>
        </Box>
        <Box height="5em" color={COLORS.Silver} b_r="10px" margin="10px" padding="10px">
          <DText
            font_family={Bold}
            size="13px"
            line_height="30px"
            letter_spacing="0.2em"
            text_transform="uppercase"
          >
            to
            <p>15/10/20</p>
          </DText>
        </Box>
        <div style={{ flex: '1' }}>
          <div style={{ float: 'right' }}>
            <Box
              width="4.5rem"
              height="4.5rem"
              color={COLORS.COD_GRAY}
              b_r="10px"
              margin="1.5rem"
            ></Box>
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default Vacation;
