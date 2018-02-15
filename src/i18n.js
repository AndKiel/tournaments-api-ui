import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LngDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

i18n
  .use(XHR)
  .use(LngDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false // not needed for react!!
    },

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    react: {
      wait: true
    }
  });

export default i18n;
