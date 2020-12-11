import React, { FC, useState } from 'react';
import styled from 'styled-components';
import COLORS from '../../utils/constants';
import Box from '../Box/Box';
import DText from '../Text/text';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './styles.module.css';
import { font } from '../../assets/fonts/HelveticaNowDisplay';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
`;

const CalendarStylesArray = [
  styles.react_calendar,
  styles.react_calendar__month_view__weekdays,
  // styles.react_calendar__month_view__days__day__weekend,
  // styles.react_calendar__month_view__days__day__neighboringMonth,
  // styles.react_calendar__tile,
];

const SvgIcon = styled.span`
  display: block;
  font-size: 30px;
  color: white;
`;

const Vacation: FC = () => {
  const [selectedValue, setSelectedValue] = useState(new Date());
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const returnValue = (value) => {
    setStart(value[0]);
    setSelectedValue(value);
    setEnd(value[1]);
  };
  const formatShortWeekday = (_locale: any, date: { getDay: () => React.ReactText }) =>
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][date.getDay()];

  return (
    <Box height="450px" color={COLORS.Boulder} b_r="20px">
      <Box height="72%" color={COLORS.Silver} b_r="20px">
        <Calendar
          className={CalendarStylesArray}
          next2Label={null}
          prev2Label={null}
          formatShortWeekday={formatShortWeekday}
          locale="en-EN"
          selectRange={true}
          onChange={returnValue}
          value={selectedValue}
        />
      </Box>
      <Container>
        <Box
          width="150px"
          height="70px"
          color={COLORS.Silver}
          b_r="10px"
          margin="10px"
          padding="10px"
        >
          <DText
            font_family={font.bold}
            size={13}
            line_height="30px"
            letter_spacing="0.2em"
            text_transform="uppercase"
          >
            from
            <p>{start.toLocaleDateString()}</p>
          </DText>
        </Box>
        <Box
          width="150px"
          height="70px"
          color={COLORS.Silver}
          b_r="10px"
          margin="10px"
          padding="10px"
        >
          <DText
            font_family={font.bold}
            size={13}
            line_height="30px"
            letter_spacing="0.2em"
            text_transform="uppercase"
          >
            to
            <p>{end.toLocaleDateString()}</p>
          </DText>
        </Box>
        <div style={{ flex: '1' }}>
          <div style={{ float: 'right' }}>
            <Box
              display="grid"
              width="70px"
              height="70px"
              color={COLORS.COD_GRAY}
              b_r="10px"
              margin="20px"
              justify="center"
              align="center"
            >
              <SvgIcon className={'icon-plus'} />
            </Box>
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default Vacation;
