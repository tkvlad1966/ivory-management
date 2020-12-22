import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { COLORS, ICON } from '../../utils/constants';
import Box from '../Box/Box';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './styles.module.css';
import { connect } from 'react-redux';
import VacationRequestModal from '../../screens/employee-screen/VacationRequestModal';
import { RootState } from '../../redux';
import { Dispatch } from 'redux';
import { vacationActionCreators } from '../../redux/vacation';
import BoxFromTo from './BoxFromTo';
import { VacationRequest } from '../../services/api/api.types';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
`;

const CalendarStylesArray = [
  styles.react_calendar,
  styles.react_calendar__month_view__weekdays,
  styles.react_calendar__tile__active,
  // styles.react_calendar__month_view__days__day__weekend,
  // styles.react_calendar__month_view__days__day__neighboringMonth,
  // styles.react_calendar__tile,
];

const SvgIcon = styled.span`
  display: block;
  font-size: 30px;
  color: white;
`;

const Vacation: FC<CombinedProps> = (props) => {
  const [selectedValue, setSelectedValue] = useState(new Date());
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  // var subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // }

  function closeModal() {
    setIsOpen(false);
  }

  const returnValue = (value) => {
    setStart(value[0]);
    setSelectedValue(value);
    setEnd(value[1]);
  };
  const formatShortWeekday = (_locale: any, date: { getDay: () => React.ReactText }) =>
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][date.getDay()];

  const { vacationRequest } = props;

  const onRequest = useCallback(
    (request: VacationRequest) => {
      vacationRequest(request);
      // console.log('request', request);
    },
    [vacationRequest],
  );

  console.log('vacation', props.vacation);

  return (
    <>
      <Box height="470px" color={COLORS.Boulder} b_r="20px">
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
          <BoxFromTo label="from" date={start} />
          <BoxFromTo label="to" date={end} />
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
                <SvgIcon className={ICON.PLUS} onClick={openModal} />
              </Box>
            </div>
          </div>
        </Container>
      </Box>
      <VacationRequestModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        onRequest={onRequest}
        start={start}
        end={end}
      />
    </>
  );
};

type CombinedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: RootState) => ({
  vacation: state.vacation.vacation,
  isLoading: state.vacation.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  vacationRequest: (request: VacationRequest) =>
    dispatch(vacationActionCreators.postVacationRequest(request)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Vacation);
