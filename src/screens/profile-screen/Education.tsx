import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { font } from '../../assets/fonts/HelveticaNowDisplay';
import Text, { TEXT_CLASSES } from '../../components/Text/text';
import { Education, EducationType } from '../../services/api/api.types';
import { COLORS, ICON } from '../../utils/constants';
import moment from 'moment';
import { EducationForm } from './EducationForm';

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr 1fr;
  width: 85%;
  margin: 80px;
`;

const Work = styled.div`
  display: grid;
  grid-template-columns: 3fr 7fr;
  margin-left: 100px;
`;

interface EducationProps {
  education: EducationType;
}

const Educations: FC<EducationProps> = ({ education }) => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const onClick = useCallback(() => {
    setEditMode(!editMode);
  }, [setEditMode, editMode]);

  const renderEducationInfo = (item: Education, index: number) => {
    return (
      <Work key={index}>
        <Text font_family={font.thin} size={18} margin="0 0 30px 20px">
          {moment(item.firstDay).format('MMM YYYY')} - {moment(item.lastDay).format('MMM YYYY')}
        </Text>
        <div>
          <Text size={18} font_family={font.bold} text_transform="capitalize" margin="0 0 0px 30px">
            {item.name}
          </Text>
          <Text size={18} font_family={font.thin} text_transform="capitalize" margin="0 0 0 30px">
            {item.degree}
          </Text>
          <Text size={18} font_family={font.thin} text_transform="capitalize" margin="0 0 0 30px">
            {item.speciality}
          </Text>
        </div>
      </Work>
    );
  };

  return (
    <Container>
      <div>
        <Text className={TEXT_CLASSES.SUB_TITLE} size={24} border_bottom="2px solid black">
          {t('profile:education')}{' '}
        </Text>
      </div>
      <div>
        {!editMode && education.map(renderEducationInfo)}
        {editMode && <EducationForm education={education} />}
      </div>
      <Text className={ICON.EDIT} onClick={onClick} color={COLORS.GRAY} size={30} />
    </Container>
  );
};

export default Educations;
