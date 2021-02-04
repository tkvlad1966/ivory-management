import { applyMiddleware, combineReducers, compose, createStore, StoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import { navbarReducer } from './navbar-reducer';
import { profileReducer } from './profile/reducer';
import { userReducer } from './user';
import { vacationReducer } from './vacation';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { companyReducer } from './company/reducer';
// import logger from 'redux-logger';

export const appReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  vacation: vacationReducer,
  company: companyReducer,
  navbar: navbarReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === 'USER/USER_LOGOUT_SUCCESS') {
    localStorage.removeItem('persist: root');
    state = undefined;
  }
  return appReducer(state, action);
};

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();

const enhancers: StoreEnhancer[] = [applyMiddleware(sagaMiddleware)];

export const store = createStore(persistedReducer, compose(...enhancers));

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export type AppAction = ReturnType<AppDispatch>;

sagaMiddleware.run(rootSaga);
