import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, ms, zh } from './languages';

export type LocalizationResource = typeof en;

export type Language = 'en' | 'ms' | 'zh';

i18n.use(initReactI18next).init({
  lng: 'en',
  resources: { en, ms, zh },
  // debug: __DEV__,
});

export default i18n;
