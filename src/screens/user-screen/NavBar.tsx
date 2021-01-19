import React, { FC } from 'react';
import { connect } from 'react-redux';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import styled from 'styled-components';
import Box from '../../components/Box/Box';
import Logotype, { LOGO_CLASSES } from '../../components/logotype/logotype';
import Text from '../../components/Text/text';
import { RootState } from '../../redux';
import { COLORS } from '../../utils/constants';
import { ivoryLogo } from '../../utils/images';

// const SvgIcon = styled.span`
//   display: block;
//   font-size: 30px;
//   color: black;
//   justify-content: center;
// `;

const Container = styled.div`
  flex: 1;
  padding: 20px;
  text-align: center;
`;

const ContainerBar = styled.div`
  display: grid;
  margin-top: 50px;
`;

const Href = {
  textDecoration: 'none',
  borderBottom: 'none',
};

const NavBar: FC<RouteComponentProps<{}> & CombinedProps> = (props) => {
  const {
    location: { pathname },
  } = props;
  const navItems = props.navItems;

  return (
    <Container>
      <Logotype name={ivoryLogo.black} preset={LOGO_CLASSES.BLACK} height="60px" />
      <ContainerBar>
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Box
              height="60px"
              width="60px"
              color={!(pathname === '/employee/home') ? '#faf9f9' : COLORS.Silver}
              margin="20px"
              b_r="20px"
              display="grid"
              justify="center"
              align="center"
              key={item.id}
            >
              <div style={Href}>
                <NavLink to={item.href} style={Href}>
                  <Text className={item.icon} size={30} color={isActive ? 'black' : 'red'} />
                </NavLink>
              </div>
            </Box>
          );
        })}
      </ContainerBar>
    </Container>
  );
};

type CombinedProps = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: RootState) => ({
  navItems: state.navbar.items,
});

export default compose(connect(mapStateToProps), withRouter)(NavBar);
