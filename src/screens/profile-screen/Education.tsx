import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { font } from '../../assets/fonts/HelveticaNowDisplay';
import Text, { TEXT_CLASSES } from '../../components/Text/text';
import { EducationType } from '../../services/api/api.types';
import { COLORS, ICON } from '../../utils/constants';

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr 1fr;
  width: 85%;
  margin: 80px;
`;

const Work = styled.div`
  display: grid;
  grid-template-columns: 3fr 7fr;
  margin-left: 80px;
`;

interface EducationProps {
  education: EducationType;
}

const Education: FC<EducationProps> = ({ education }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <div>
        <Text className={TEXT_CLASSES.SUB_TITLE} size={24} border_bottom="2px solid black">
          {t('profile:education')}{' '}
        </Text>
      </div>
      <>
        {education.map((item, index) => (
          <Work key={index}>
            <Text className={TEXT_CLASSES.PRIMARY} size={18} margin="0 0 30px 0">
              {new Date(Date.parse(item.firstDay)).getFullYear()} -{' '}
              {new Date(Date.parse(item.lastDay)).getFullYear()}
            </Text>
            <div>
              <Text
                size={18}
                font_family={font.bold}
                text_transform="capitalize"
                margin="0 0 20px 30px"
              >
                {item.name}
              </Text>
              <Text
                size={18}
                font_family={font.thin}
                text_transform="capitalize"
                margin="0 0 0 30px"
              >
                {item.degree}
              </Text>
              <Text
                size={18}
                font_family={font.thin}
                text_transform="capitalize"
                margin="0 0 0 30px"
              >
                {item.speciality}
              </Text>
            </div>
          </Work>
        ))}
      </>
      <Text className={ICON.EDIT} color={COLORS.GRAY} size={30} />
    </Container>
  );
};

export default Education;
