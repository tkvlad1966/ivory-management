import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { font } from '../../assets/fonts/HelveticaNowDisplay';
import Box from '../../components/Box/Box';
import Text, { TEXT_CLASSES } from '../../components/Text/text';
import { COLORS, ICON } from '../../utils/constants';

const Container = styled.div`
  position: relative;
  margin: 40px;
  z-index: 10;
`;

const ContainerTitle = styled.div`
  display: grid;
  grid-template-columns: 12fr 4fr;
  width: 100%;
  align-items: center;
  margin: 40px;
`;

const Circle = styled.div`
  position: absolute;
  top: 140px;
  left: 40px;
  z-index: 0;
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: 4fr 8fr;
  padding-top: 20px;
  margin: 10px 80px 60px 340px;
  border-top: 1px solid ${COLORS.GRAY};
  width: 60%;
`;

interface TitleProfileProps {
  role: string;
  name: string;
  status: string;
}

const TitleProfile: FC<TitleProfileProps> = ({ role, name, status }) => {
  const { t } = useTranslation();
  return (
    <Container>
      <ContainerTitle>
        <Text className={TEXT_CLASSES.TITLE} size={30}>
          {t('home:profile')}
        </Text>
        <Text className={TEXT_CLASSES.GRAY_TITLE} size={24}>
          {t('profile:download')}
        </Text>
        <Text className={TEXT_CLASSES.GRAY_TITLE} size={24}>
          {role}
        </Text>
        <Text className={ICON.DOWNLOAD} color={COLORS.Silver} margin={'20px'} size={28} />
      </ContainerTitle>
      <div>
        <Circle>
          <Box width="260px" height="260px" color={COLORS.Silver} b_r="49%" z_index={-1} />
        </Circle>
        <Container>
          <Text font_family={font.bold} size={48} line_height="71px" margin="90px 0 0 150px">
            {name}
          </Text>
          <Text className={TEXT_CLASSES.GRAY_TITLE} size={24} margin="20px 0 0 240px">
            {status}
          </Text>
          <Details>
            <Text className={ICON.PHONE} color={COLORS.GRAY}>
              {'  +38000-00-00'}
            </Text>
            <Text className={ICON.EMAIL} color={COLORS.GRAY}>
              {'        tkvlad88@gmail.com '}
            </Text>
          </Details>
        </Container>
      </div>
    </Container>
  );
};

export default TitleProfile;
