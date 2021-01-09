import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { font } from '../../assets/fonts/HelveticaNowDisplay';
import Text, { TEXT_CLASSES } from '../../components/Text/text';
import { SkillsType } from '../../services/api/api.types';
import { COLORS, ICON } from '../../utils/constants';
import SkillsForm from './SkillsForm';

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr 1fr;
  width: 85%;
  margin: 80px;
`;

const Work = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-left: 350px;
`;

interface SkillsProps {
  skills: SkillsType;
}

const Skills: FC<SkillsProps> = ({ skills }) => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const onClick = (editMode) => setEditMode(!editMode);

  return (
    <Container>
      <div>
        <Text className={TEXT_CLASSES.SUB_TITLE} size={24} border_bottom="2px solid black">
          {t('home:skills')}{' '}
        </Text>
      </div>
      <Work>
        {!editMode &&
          skills.map((item, index) => (
            <Text
              size={18}
              font_family={font.bold}
              text_transform="capitalize"
              margin="0 0 0 30px"
              key={index}
            >
              {item.name}
            </Text>
          ))}
        {editMode && <SkillsForm skills={skills} />}
      </Work>
      <Text className={ICON.EDIT} onClick={() => onClick(editMode)} color={COLORS.GRAY} size={30} />
    </Container>
  );
};

export default Skills;
