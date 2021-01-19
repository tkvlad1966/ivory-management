import { applyMiddleware, combineReducers, compose, createStore, StoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import { navbarReducer } from './navbar-reducer';
import { profileReducer } from './profile/reducer';
import { userReducer } from './user';
import { vacationReducer } from './vacation';
import logger from 'redux-logger';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  vacation: vacationReducer,
  navbar: navbarReducer,
});

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  storage,
  whitelist: ['user'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof persistedReducer>;

const sagaMiddleware = createSagaMiddleware();

const enhancers: StoreEnhancer[] = [applyMiddleware(sagaMiddleware, logger)];

export const store = createStore(persistedReducer, compose(...enhancers));

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export type AppAction = ReturnType<AppDispatch>;

sagaMiddleware.run(rootSaga);
