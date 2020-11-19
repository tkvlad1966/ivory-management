import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../redux';
import { userActionCreators } from '../../redux/user';

const Home: FC<CombinedProps> = (props) => {
  console.log('props:', props);
  const { name, token, refreshToken } = props;
  const [count, setCount] = useState(0);
  const handleClick = () => props.getAuthToken(refreshToken);

  return (
    <>
      <h1>Home {name} </h1>
      <button onClick={() => setCount(count + 1)}> {count} </button>
      <button onClick={handleClick}> {token} </button>
    </>
  );
};

type CombinedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: RootState) => ({
  name: state.user.employeeAccount?.name,
  token: state.user.token,
  refreshToken: state.user.refreshToken,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getAuthToken: (refreshToken: string) => dispatch(userActionCreators.getAuthToken(refreshToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
