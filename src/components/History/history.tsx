import React, { FC } from 'react';
import styled from 'styled-components';
import { font } from '../../assets/fonts/HelveticaNowDisplay';
import { EmployeeType } from '../../services/api/api.types';
// import { VacationRequestsType } from '../../services/api/api.types';
import { COLORS, Month } from '../../utils/constants';
import Box from '../Box/Box';
import DText from '../Text/text';

const Container = styled.div`
  display: grid;
  height: 90%;
  overflow: scroll;
`;

const ContainerRequest = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr;
  grid-auto-rows: 1fr;
  border-bottom: 1px solid rgba(99, 99, 99, 0.3);
  padding: 4px 0%;
  margin-top: 7px;
`;

type VacationTypeDate = {
  nationalHolidays: Array<string>;
  status: string;
  _id: string;
  currentAccumulatedVacation: number;
  currentUsedVacation: number;
  numWorkDays: number;
  beginVacationDate: Date;
  endVacationDate: Date;
  employee: EmployeeType;
};

interface HistoryProps {
  vacationRequestsDate: Array<VacationTypeDate>;
}

const History: FC<HistoryProps> = ({ vacationRequestsDate }) => {
  return (
    <Box height="170px" color={COLORS.Silver} b_r="20px" padding="20px">
      <DText
        font_family={font.light}
        letter_spacing="0.3em"
        text_transform="uppercase"
        color="rgba(0, 0, 0, 0.5)"
      >
        last vacation
      </DText>
      <Container>
        {vacationRequestsDate.map((item, index) => {
          return (
            <ContainerRequest key={index}>
              <DText size={15}>
                {Month[item.beginVacationDate.getMonth()]} {item.beginVacationDate.getFullYear()}
              </DText>
              <DText size={15}>{item.numWorkDays} days</DText>
              <DText size={15}>
                {item.beginVacationDate.toLocaleDateString()}-
                {item.endVacationDate.toLocaleDateString()}
              </DText>
              <DText size={15}>{item.status} </DText>
            </ContainerRequest>
          );
        })}
      </Container>
    </Box>
  );
};

export default History;
