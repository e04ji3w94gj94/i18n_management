import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nextHttpBackend from 'i18next-http-backend';
// import zhTwAll from './assets/locales/zh_tw/zh_tw.json';
// import enAll from './assets/locales/en/en.json';
// import japAll from './assets/locales/jap/jap.json';

i18n
  .use(i18nextHttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
    // resources: {
    //   zh_tw: { all: zhTwAll },
    //   en: { all: enAll },
    //   jap: { all: japAll },
    // },
    backend: {
      loadPath: '/api/locales/getLng/{{lng}}',
    },
  });

export default i18n;
