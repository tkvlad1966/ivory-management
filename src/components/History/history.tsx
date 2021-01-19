import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { UserVacationType } from '../../services/api/api.types';
import { COLORS, Month } from '../../utils/constants';
import Box from '../Box/Box';
import Text, { TEXT_CLASSES } from '../Text/text';

const Container = styled.div`
  display: grid;
  height: 90%;
  overflow: scroll;
`;

const ContainerRequest = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr;
  /* grid-auto-rows: 1fr; */
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
  employee: UserVacationType;
};

interface HistoryProps {
  vacationRequestsDate: Array<VacationTypeDate>;
}

const History: FC<HistoryProps> = ({ vacationRequestsDate }) => {
  const { t } = useTranslation();
  return (
    <Box height="170px" color={COLORS.Silver} b_r="20px" padding="20px">
      <Text className={TEXT_CLASSES.GRAY_TITLE}>{t('home:last vacation')}</Text>
      <Container>
        {vacationRequestsDate.map((item, index) => {
          return (
            <ContainerRequest key={index}>
              <Text size={15}>
                {Month[item.beginVacationDate.getMonth()]} {item.beginVacationDate.getFullYear()}
              </Text>
              <Text size={15}>
                {item.numWorkDays} {t('home:days')}
              </Text>
              <Text size={15}>
                {item.beginVacationDate.toLocaleDateString()}-
                {item.endVacationDate.toLocaleDateString()}
              </Text>
              <Text size={15}>{item.status} </Text>
            </ContainerRequest>
          );
        })}
      </Container>
    </Box>
  );
};

export default History;
