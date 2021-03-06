import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { font } from '../../assets/fonts/HelveticaNowDisplay';
import Text, { TEXT_CLASSES } from '../../components/Text/text';
import { ProfileType } from '../../services/api/api.types';

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 11fr;
  width: 85%;
  margin: 80px;
`;

const ContainerOther = styled.div`
  display: grid;
  /* grid-template-columns: repeat(7, 1fr); */
  margin-left: 350px;
`;

interface OthersProps {
  profile: ProfileType;
}

const Others: FC<OthersProps> = ({ profile }) => {
  const { t } = useTranslation();

  return (
    <>
      <Container>
        <div>
          <Text className={TEXT_CLASSES.SUB_TITLE} size={24} border_bottom="2px solid black">
            {t('home:rate')}{' '}
          </Text>
        </div>
        <ContainerOther>
          <Text size={18} font_family={font.thin} margin="0 0 0 30px">
            {profile?.rate}
          </Text>
        </ContainerOther>
      </Container>
      <Container>
        <div>
          <Text className={TEXT_CLASSES.SUB_TITLE} size={24} border_bottom="2px solid black">
            {t('home:hours')}{' '}
          </Text>
        </div>
        <ContainerOther>
          <Text size={18} font_family={font.thin} margin="0 0 0 30px">
            {profile?.hoursPerWeek}
          </Text>
        </ContainerOther>
      </Container>
    </>
  );
};

export default Others;
