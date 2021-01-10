import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { font } from '../../assets/fonts/HelveticaNowDisplay';
import Text, { TEXT_CLASSES } from '../../components/Text/text';
import { Company, WorkExperienceType } from '../../services/api/api.types';
import { COLORS, ICON } from '../../utils/constants';
import { getYear } from '../../utils/util';
import moment from 'moment';

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr 1fr;
  width: 85%;
  margin: 80px 80px 0 80px;
`;

const WorkReal = styled.div`
  display: grid;
  grid-template-columns: 3fr 7fr;
  margin-left: 80px;
`;

const Work = styled.div`
  display: grid;
  grid-template-columns: 3fr 7fr;
  margin-left: 350px;
  margin-right: 180px;
`;

export interface WorkExperienceProps {
  status: string;
  workExperience: WorkExperienceType;
  firstDayMyCompany: string;
  company: Company;
  editMode: boolean;
  onClick: () => void;
}

const WorkExperience: FC<WorkExperienceProps> = (props) => {
  const { status, workExperience, firstDayMyCompany, company, editMode } = props;
  const { onClick } = props;
  const { t } = useTranslation();

  return (
    <>
      <Container>
        <div>
          <Text className={TEXT_CLASSES.SUB_TITLE} size={24} border_bottom="2px solid black">
            {t('profile:work_')}{' '}
          </Text>
        </div>
        <WorkReal>
          <Text font_family={font.thin} size={18} margin="50px 0 50px 10px">
            {moment(firstDayMyCompany).format('MMM YYYY')} - {t('profile:present')}
          </Text>
          <div>
            <Text size={18} text_transform="capitalize" margin="50px 0 0 30px">
              {status}
            </Text>
            <Text className={TEXT_CLASSES.GRAY_TITLE} size={18} margin="0 0 0 30px">
              {company.name}
            </Text>
          </div>
        </WorkReal>
        <Text className={ICON.EDIT} onClick={onClick} color={COLORS.GRAY} size={30} />
      </Container>
      {!editMode &&
        workExperience.map((item, index) => {
          return (
            <Work key={index}>
              <Text font_family={font.thin} size={18} margin="0 0 30px 30px">
                {getYear(item.firstDay) !== getYear(item.lastDay)
                  ? `${getYear(item.firstDay)} - ${getYear(item.lastDay)}`
                  : moment(item.firstDay).format('MMM YYYY')}{' '}
                - {moment(item.lastDay).format('MMM YYYY')}
              </Text>
              <div>
                <Text size={18} text_transform="capitalize" margin="0 0 0 30px">
                  {item.status}
                </Text>
                <Text font_family={font.thin} size={18} margin="0 0 30px 30px">
                  {item.name}
                </Text>
              </div>
            </Work>
          );
        })}
    </>
  );
};

export default WorkExperience;
