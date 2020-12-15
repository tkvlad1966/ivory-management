import React from 'react';
import Modal from 'react-modal';
import { font } from '../../assets/fonts/HelveticaNowDisplay';
import Box from '../../components/Box/Box';
import DText, { TEXT_CLASSES } from '../../components/Text/text';
import { COLORS } from '../../utils/constants';
import styled from 'styled-components';
import Button from '../../components/Button/button';
// import styles from './styles.module.css';

const Span = styled.span`
  margin: 40px 25px;
`;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    background: 'none',
  },
};

const VacationRequestModal = ({ modalIsOpen, closeModal, start, end }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      ariaHideApp={false}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      // contentLabel="Example Modal"
    >
      <Box
        display="block"
        width="610px"
        height="280px"
        color={COLORS.Silver}
        b_r="30px"
        margin="10px"
        padding="40px"
        text_align="center"
      >
        <DText className={TEXT_CLASSES.TITLE} size={30}>
          vacation
        </DText>
        <DText
          font_family={font.bold}
          size={13}
          line_height="30px"
          letter_spacing="0.2em"
          text_transform="uppercase"
          margin="40px 0px 60px 0px"
        >
          <Span> from</Span>
          <Span>{start.toLocaleDateString()}</Span>
          <Span>to</Span>
          <span>{end.toLocaleDateString()}</span>
        </DText>
        <Button onClick={closeModal} className={'secondary'}>
          <DText className={TEXT_CLASSES.PRIMARY} font_family={font.bold} size={20}>
            Change
          </DText>
        </Button>
        <Button className={'secondary'} margin_left="5%" background={COLORS.DOVE_GRAY}>
          <DText className={TEXT_CLASSES.PRIMARY} font_family={font.bold} size={20} color="white">
            Request
          </DText>
        </Button>
      </Box>
    </Modal>
  );
};

export default VacationRequestModal;
