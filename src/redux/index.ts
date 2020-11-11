import { applyMiddleware, combineReducers, compose, createStore, StoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reactotron from '../services/reactotron';
import rootSaga from '../sagas';
import { userReducer } from './user';
// import { dashboardReducer } from './dashboard';

export const rootReducer = combineReducers({
  user: userReducer,
  // dashboard: dashboardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const sagaMonitor = reactotron?.createSagaMonitor!();

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const enhancers: StoreEnhancer[] = [applyMiddleware(sagaMiddleware)];

if (reactotron) enhancers.push(reactotron.createEnhancer!());

export const store = createStore(rootReducer, compose(...enhancers));

export type AppDispatch = typeof store.dispatch;

export type AppAction = ReturnType<AppDispatch>;

sagaMiddleware.run(rootSaga);
