import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import History from '../../components/History/history';
import Portfolio from '../../components/Portfolio/portfolio';
import ProfileComponent from '../../components/Profile/profile';
import Text, { TEXT_CLASSES } from '../../components/Text/text';
import Vacation from '../../components/Vacation/vacation';
import { RootState } from '../../redux';
import { vacationActionCreators } from '../../redux/vacation';

const SvgIcon = styled.span`
  display: block;
  font-size: 30px;
  color: black;
  margin: 20px;
  float: right;
`;

const Container = styled.div`
  font-size: 15px;
  display: flex;
  flex-direction: row;
  color: black;
`;

const ContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 8%;
  width: 37%;
  text-align: left;
`;

const ContainerTitle = styled.div`
  margin-top: 6%;
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
`;

const Home: FC<CombinedProps> = (props) => {
  const { t } = useTranslation();
  const { getVacationRequestsMe, vacationRequests } = props;

  useEffect(() => {
    getVacationRequestsMe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickExit = () => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('token');
    return window.location.replace('/login');
  };

  const vacationRequestsDate = vacationRequests.map((item) => ({
    ...item,
    beginVacationDate: new Date(Date.parse(item.beginVacationDate)),
    endVacationDate: new Date(Date.parse(item.endVacationDate)),
  }));

  return (
    <>
      <div style={{ float: 'right' }}>
        <SvgIcon className={'icon-settings'} />
      </div>
      <Container>
        <ContainerColumn>
          <ContainerTitle>
            <Text className={TEXT_CLASSES.TITLE} size={30}>
              {t('home:vacation')}
            </Text>
          </ContainerTitle>
          <Vacation />
          <ContainerTitle>
            <Text className={TEXT_CLASSES.TITLE} size={30}>
              {t('home:history')}
            </Text>
          </ContainerTitle>
          <History vacationRequestsDate={vacationRequestsDate} />
        </ContainerColumn>
        <ContainerColumn>
          <ContainerTitle>
            <Text className={TEXT_CLASSES.TITLE} size={30}>
              {t('home:profile')}
            </Text>
          </ContainerTitle>
          <ProfileComponent />
          <ContainerTitle>
            <Text className={TEXT_CLASSES.TITLE} size={30}>
              {t('home:portfolio')}
            </Text>
          </ContainerTitle>
          <Portfolio />
        </ContainerColumn>
      </Container>
      <SvgIcon onClick={handleClickExit} className={'icon-logout'} />
    </>
  );
};

type CombinedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: RootState) => ({
  vacationRequests: state.vacation.vacationRequests,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getVacationRequestsMe: () => dispatch(vacationActionCreators.getVacationRequestsMe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
