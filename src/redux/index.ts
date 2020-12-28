import { applyMiddleware, combineReducers, compose, createStore, StoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import { profileReducer } from './profile/reducer';
import { userReducer } from './user';
import { vacationReducer } from './vacation';

export const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  vacation: vacationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();

const enhancers: StoreEnhancer[] = [applyMiddleware(sagaMiddleware)];

export const store = createStore(rootReducer, compose(...enhancers));

export type AppDispatch = typeof store.dispatch;

export type AppAction = ReturnType<AppDispatch>;

sagaMiddleware.run(rootSaga);
